"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import MarketplaceGrid from "@/components/sections/MarketplaceGrid";
import type { Skin } from "@/components/data/demoSkins";

import FilterDrawer from "@/components/filters/FilterDrawer";
import type { Filters } from "@/components/filters/types";
import { DEFAULT_FILTERS } from "@/components/filters/url";

const PAGE_SIZE = 20;

function normalizePriceRange(draft: Filters): Filters {
  const minRaw = draft.priceMin.trim();
  const maxRaw = draft.priceMax.trim();

  if (!minRaw || !maxRaw) return { ...draft, priceMin: minRaw, priceMax: maxRaw };

  const min = Number(minRaw);
  const max = Number(maxRaw);

  if (!Number.isFinite(min) || !Number.isFinite(max)) {
    return { ...draft, priceMin: minRaw, priceMax: maxRaw };
  }

  if (min > max) {
    return { ...draft, priceMin: maxRaw, priceMax: minRaw };
  }

  return { ...draft, priceMin: minRaw, priceMax: maxRaw };
}

export default function MarketplaceClient() {
  const [items, setItems] = useState<Skin[]>([]);
  const [total, setTotal] = useState(0);

  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  const [activeCategory, setActiveCategory] = useState("All");
  const [sort, setSort] = useState("Best deal");
  const [query, setQuery] = useState("");
  const [currency, setCurrency] = useState<"usd" | "eur">("usd");
  const [view, setView] = useState<"grid" | "list">("grid");

  // applied filters 
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS);

  // draft filters 
  const [draftFilters, setDraftFilters] = useState<Filters>(DEFAULT_FILTERS);

  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const onOpenFilters = () => {
    setDraftFilters(filters);
    setIsFilterOpen(true);
  };

  const onCloseFilters = () => setIsFilterOpen(false);

  const onApplyFilters = () => {
    const next = normalizePriceRange(draftFilters);
    setFilters(next);
    setIsFilterOpen(false);
  };

  const onResetFilters = () => {
    setDraftFilters(DEFAULT_FILTERS);
    setFilters(DEFAULT_FILTERS);
    setIsFilterOpen(false);
  };

    const onClearFilters = () => {
    // Clear both draft and applied filters, and close the drawer if it's open
    setDraftFilters(DEFAULT_FILTERS);
    setFilters(DEFAULT_FILTERS);
    setIsFilterOpen(false);
  };


  const [debouncedQuery, setDebouncedQuery] = useState(query);
  useEffect(() => {
    const t = setTimeout(() => setDebouncedQuery(query), 300);
    return () => clearTimeout(t);
  }, [query]);

  const baseParams = useMemo(() => {
    const params = new URLSearchParams();

    if (debouncedQuery.trim()) params.set("q", debouncedQuery.trim());
    if (activeCategory && activeCategory !== "All") params.set("category", activeCategory);

    params.set("sort", sort);

    if (filters.statTrak !== "any") params.set("statTrak", filters.statTrak);
    filters.exterior.forEach((e) => params.append("exterior", e));

    if (filters.priceMin.trim()) params.set("priceMin", filters.priceMin.trim());
    if (filters.priceMax.trim()) params.set("priceMax", filters.priceMax.trim());

    params.set("limit", String(PAGE_SIZE));

    return params;
  }, [activeCategory, sort, filters, debouncedQuery]);

  const queryKey = baseParams.toString();

  const abortRef = useRef<AbortController | null>(null);

  async function fetchPage(offset: number, mode: "replace" | "append") {
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    const params = new URLSearchParams(baseParams);
    params.set("offset", String(offset));

    const res = await fetch(`/api/skins?${params.toString()}`, { signal: controller.signal });
    if (!res.ok) throw new Error("Failed to fetch skins");

    const json: { items: Skin[]; total: number; limit: number; offset: number } = await res.json();

    if (mode === "replace") {
      setItems(json.items ?? []);
    } else {
      setItems((prev) => [...prev, ...(json.items ?? [])]);
    }

    setTotal(json.total ?? 0);
  }

  useEffect(() => {
    let cancelled = false;

    async function loadFirst() {
      setLoading(true);
      try {
        await fetchPage(0, "replace");
      } catch (err: any) {
        if (err?.name !== "AbortError") console.error("Marketplace fetch error:", err);
        if (!cancelled) {
          setItems([]);
          setTotal(0);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadFirst();

    return () => {
      cancelled = true;
      abortRef.current?.abort();
    };
  }, [queryKey]);

  const canLoadMore = items.length < total;

  const onLoadMore = async () => {
    if (!canLoadMore || loadingMore) return;

    setLoadingMore(true);
    try {
      await fetchPage(items.length, "append");
    } catch (err: any) {
      if (err?.name !== "AbortError") console.error("Load more error:", err);
    } finally {
      setLoadingMore(false);
    }
  };

  // Count active filter groups (used for UI indicator)
const activeFilterCount = useMemo(() => {
  let count = 0;

  // Price filter is active if min or max is set
  if (filters.priceMin.trim() || filters.priceMax.trim()) {
    count += 1;
  }

  // Exterior filter is active if at least one value is selected
  if (filters.exterior.length > 0) {
    count += 1;
  }

  // StatTrak filter is active if not set to "any"
  if (filters.statTrak !== "any") {
    count += 1;
  }

  return count;
}, [filters]);


  return (
    <>
      <MarketplaceGrid
  items={items}
  total={total}
  loading={loading}
  loadingMore={loadingMore}
  canLoadMore={canLoadMore}
  onLoadMore={onLoadMore}
  filters={filters}
  activeFilterCount={activeFilterCount}
  onOpenFilters={onOpenFilters}
  onClearFilters={onClearFilters}
  activeCategory={activeCategory}
  onCategoryChange={setActiveCategory}
  sort={sort}
  onSortChange={setSort}
  query={query}
  onQueryChange={setQuery}
  currency={currency}
  onCurrencyChange={setCurrency}
  view={view}
  onViewChange={setView}
/>


      <FilterDrawer
        open={isFilterOpen}
        onClose={onCloseFilters}
        draft={draftFilters}
        onChange={setDraftFilters}
        onReset={onResetFilters}
        onApply={onApplyFilters}
      />
    </>
  );
}

