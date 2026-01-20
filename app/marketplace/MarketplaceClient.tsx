"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import MarketplaceGrid from "@/components/sections/MarketplaceGrid";
import type { Skin } from "@/components/data/demoSkins";

type Filters = {
  priceMin: string;
  priceMax: string;
  exterior: string[];
  statTrak: "any" | "only" | "without";
};

const PAGE_SIZE = 20;

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

  const [filters, setFilters] = useState<Filters>({
    priceMin: "",
    priceMax: "",
    exterior: [],
    statTrak: "any",
  });

  const [isFilterOpen, setIsFilterOpen] = useState(false);

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

  return (
    <>
      <MarketplaceGrid
        items={items}
        loading={loading}
        filters={filters}
        onOpenFilters={() => setIsFilterOpen(true)}
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

      {/* Load more */}
      <div className="mx-auto max-w-[1240px] px-6 pb-20">
        <div className="mt-8 flex flex-col items-center gap-3">
          <div className="text-sm text-white/50">
            Showing <span className="text-white/80">{items.length}</span> of{" "}
            <span className="text-white/80">{total}</span>
          </div>

          {canLoadMore ? (
            <button
              type="button"
              onClick={onLoadMore}
              disabled={loadingMore}
              className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-purple-500 to-indigo-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-purple-500/20 transition hover:brightness-110 disabled:opacity-60"
            >
              {loadingMore ? "Loading..." : "Load more"}
            </button>
          ) : (
            !loading && (
              <div className="text-sm text-white/50">
                {total === 0 ? "No results" : "You’ve reached the end"}
              </div>
            )
          )}
        </div>
      </div>

      {/* FILTER MODAL  */}
      {isFilterOpen && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/60">
          <div className="w-full max-w-md rounded-2xl bg-[#1F2023] p-6 text-white">
            <h2 className="text-lg font-bold">Filters</h2>

            <p className="mt-2 text-sm text-white/60">
              Filter UI подключим следующим шагом
            </p>

            <button
              onClick={() => setIsFilterOpen(false)}
              className="mt-6 rounded-xl bg-white/10 px-4 py-2 text-sm hover:bg-white/20"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
