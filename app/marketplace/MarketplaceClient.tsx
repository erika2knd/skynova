"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import MarketplaceGrid from "@/components/sections/MarketplaceGrid";
import FilterDrawer from "@/components/filters/FilterDrawer";
import type { Filters } from "@/components/filters/types";
import { categories } from "@/components/data/demoSkins";

import {
  DEFAULT_FILTERS,
  parseFiltersFromSearchParams,
  writeFiltersToSearchParams,
  parseCategoryFromSearchParams,
  writeCategoryToSearchParams,
  parseSortFromSearchParams,
  writeSortToSearchParams,
  parseQueryFromSearchParams,
  writeQueryToSearchParams,
  type SortKey,
  parseCurrencyFromSearchParams,
  writeCurrencyToSearchParams,
  type CurrencyKey,
  parseViewFromSearchParams,
  writeViewToSearchParams,
  type ViewKey,
} from "@/components/filters/url";

const sortKeyToLabel: Record<SortKey, string> = {
  best: "Best deal",
  newest: "Newest",
  price_low: "Price: low",
  price_high: "Price: high",
};

const sortLabelToKey: Record<string, SortKey> = {
  "Best deal": "best",
  Newest: "newest",
  "Price: low": "price_low",
  "Price: high": "price_high",
};

export default function MarketplaceClient() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [filtersOpen, setFiltersOpen] = useState(false);

  // ---------- URL → state ----------
  const urlFilters = useMemo<Filters>(() => {
    const sp = new URLSearchParams(searchParams.toString());
    return parseFiltersFromSearchParams(sp);
  }, [searchParams]);

  const urlCategory = useMemo(() => {
    const sp = new URLSearchParams(searchParams.toString());
    const cat = parseCategoryFromSearchParams(sp);
    return categories.includes(cat as any) ? cat : categories[0];
  }, [searchParams]);

  const urlSortLabel = useMemo(() => {
    const sp = new URLSearchParams(searchParams.toString());
    const sortKey = parseSortFromSearchParams(sp);
    return sortKeyToLabel[sortKey];
  }, [searchParams]);

  const urlQuery = useMemo(() => {
    const sp = new URLSearchParams(searchParams.toString());
    return parseQueryFromSearchParams(sp);
  }, [searchParams]);

  const urlCurrency = useMemo(() => {
    const sp = new URLSearchParams(searchParams.toString());
    return parseCurrencyFromSearchParams(sp);
  }, [searchParams]);

  const urlView = useMemo(() => {
    const sp = new URLSearchParams(searchParams.toString());
    return parseViewFromSearchParams(sp);
  }, [searchParams]);

  // ---------- state ----------
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS);
  const [draftFilters, setDraftFilters] = useState<Filters>(DEFAULT_FILTERS);

  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const [sort, setSort] = useState<string>("Best deal");

  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  const [currency, setCurrency] = useState<CurrencyKey>("usd");
  const [view, setView] = useState<ViewKey>("grid");

  // ---------- debounce search ----------
  useEffect(() => {
    const t = setTimeout(() => setDebouncedQuery(query), 300);
    return () => clearTimeout(t);
  }, [query]);

  // ---------- sync URL → state ----------
  useEffect(() => {
    setFilters(urlFilters);
    setActiveCategory(urlCategory);
    setSort(urlSortLabel);
    setQuery(urlQuery);
    setDebouncedQuery(urlQuery);
    setCurrency(urlCurrency);
    setView(urlView);
  }, [urlFilters, urlCategory, urlSortLabel, urlQuery, urlCurrency, urlView]);

  // ---------- handlers ----------
  const onCategoryChange = (next: string) => {
    setActiveCategory(next);

    const sp = new URLSearchParams(searchParams.toString());
    writeCategoryToSearchParams(sp, next);

    router.replace(`${pathname}?${sp.toString()}`, { scroll: false });
  };

  const onSortChange = (nextLabel: string) => {
    setSort(nextLabel);

    const nextKey = sortLabelToKey[nextLabel] ?? "best";
    const sp = new URLSearchParams(searchParams.toString());
    writeSortToSearchParams(sp, nextKey);

    router.replace(`${pathname}?${sp.toString()}`, { scroll: false });
  };

  const onCurrencyChange = (next: CurrencyKey) => {
    setCurrency(next);

    const sp = new URLSearchParams(searchParams.toString());
    writeCurrencyToSearchParams(sp, next);

    router.replace(`${pathname}?${sp.toString()}`, { scroll: false });
  };

  const onViewChange = (next: ViewKey) => {
    setView(next);

    const sp = new URLSearchParams(searchParams.toString());
    writeViewToSearchParams(sp, next);

    router.replace(`${pathname}?${sp.toString()}`, { scroll: false });
  };

  // ---------- write debounced search ----------
  useEffect(() => {
    const sp = new URLSearchParams(searchParams.toString());
    writeQueryToSearchParams(sp, debouncedQuery);

    router.replace(`${pathname}?${sp.toString()}`, { scroll: false });
  }, [debouncedQuery, pathname, router]);

  // ---------- render ----------
  return (
    <main className="min-h-screen bg-[#222326] pt-28">
      <MarketplaceGrid
        onOpenFilters={() => {
          setDraftFilters(filters);
          setFiltersOpen(true);
        }}
        filters={filters}
        activeCategory={activeCategory}
        onCategoryChange={onCategoryChange}
        sort={sort}
        onSortChange={onSortChange}
        query={query}
        onQueryChange={setQuery}
        currency={currency}
        onCurrencyChange={onCurrencyChange}
        view={view}
        onViewChange={onViewChange}
      />

      <FilterDrawer
        open={filtersOpen}
        onClose={() => setFiltersOpen(false)}
        draft={draftFilters}
        onChange={setDraftFilters}
        onReset={() => setDraftFilters(DEFAULT_FILTERS)}
        onApply={() => {
          setFilters(draftFilters);

          const sp = new URLSearchParams(searchParams.toString());
          writeFiltersToSearchParams(sp, draftFilters);

          router.replace(`${pathname}?${sp.toString()}`, { scroll: false });
          setFiltersOpen(false);
        }}
      />
    </main>
  );
}
