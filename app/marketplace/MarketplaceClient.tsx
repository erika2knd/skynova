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

  const currentQs = searchParams.toString();

  const [filtersOpen, setFiltersOpen] = useState(false);

  // --- URL -> state (filters)
  const urlFilters = useMemo<Filters>(() => {
    const sp = new URLSearchParams(currentQs);
    return parseFiltersFromSearchParams(sp);
  }, [currentQs]);

  // --- URL -> state (category)
  const urlCategory = useMemo(() => {
    const sp = new URLSearchParams(currentQs);
    const cat = parseCategoryFromSearchParams(sp);
    return categories.includes(cat as any) ? cat : categories[0];
  }, [currentQs]);

  // --- URL -> state (sort label)
  const urlSortLabel = useMemo(() => {
    const sp = new URLSearchParams(currentQs);
    const sortKey = parseSortFromSearchParams(sp);
    return sortKeyToLabel[sortKey];
  }, [currentQs]);

  // --- URL -> state (query)
  const urlQuery = useMemo(() => {
    const sp = new URLSearchParams(currentQs);
    return parseQueryFromSearchParams(sp);
  }, [currentQs]);

  // --- URL -> state (currency)
  const urlCurrency = useMemo(() => {
    const sp = new URLSearchParams(currentQs);
    return parseCurrencyFromSearchParams(sp);
  }, [currentQs]);

  // --- URL -> state (view)
  const urlView = useMemo(() => {
    const sp = new URLSearchParams(currentQs);
    return parseViewFromSearchParams(sp);
  }, [currentQs]);

  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS);
  const [draftFilters, setDraftFilters] = useState<Filters>(DEFAULT_FILTERS);
  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const [sort, setSort] = useState<string>("Best deal");

  const [query, setQuery] = useState<string>("");
  const [debouncedQuery, setDebouncedQuery] = useState<string>("");

  const [currency, setCurrency] = useState<CurrencyKey>("usd");
  const [view, setView] = useState<ViewKey>("grid");

  // debounce for query input
  useEffect(() => {
    const t = setTimeout(() => setDebouncedQuery(query), 300);
    return () => clearTimeout(t);
  }, [query]);

  // sync: when URL changes -> update applied state
  useEffect(() => {
    setFilters(urlFilters);
    setActiveCategory(urlCategory);
    setSort(urlSortLabel);

    setQuery(urlQuery);
    setDebouncedQuery(urlQuery);

    setCurrency(urlCurrency);
    setView(urlView);
  }, [urlFilters, urlCategory, urlSortLabel, urlQuery, urlCurrency, urlView]);

  // category change -> write to URL
  const onCategoryChange = (next: string) => {
    setActiveCategory(next);

    const sp = new URLSearchParams(currentQs);
    writeCategoryToSearchParams(sp, next);

    const nextQs = sp.toString();
    if (nextQs === currentQs) return;

    router.replace(nextQs ? `${pathname}?${nextQs}` : pathname, { scroll: false });
  };

  // sort change -> write to URL
  const onSortChange = (nextLabel: string) => {
    setSort(nextLabel);

    const nextKey = sortLabelToKey[nextLabel] ?? "best";

    const sp = new URLSearchParams(currentQs);
    writeSortToSearchParams(sp, nextKey);

    const nextQs = sp.toString();
    if (nextQs === currentQs) return;

    router.replace(nextQs ? `${pathname}?${nextQs}` : pathname, { scroll: false });
  };

  // currency change -> write to URL
  const onCurrencyChange = (next: CurrencyKey) => {
    setCurrency(next);

    const sp = new URLSearchParams(currentQs);
    writeCurrencyToSearchParams(sp, next);

    const nextQs = sp.toString();
    if (nextQs === currentQs) return;

    router.replace(nextQs ? `${pathname}?${nextQs}` : pathname, { scroll: false });
  };

  // view change -> write to URL
  const onViewChange = (next: ViewKey) => {
    setView(next);

    const sp = new URLSearchParams(currentQs);
    writeViewToSearchParams(sp, next);

    const nextQs = sp.toString();
    if (nextQs === currentQs) return;

    router.replace(nextQs ? `${pathname}?${nextQs}` : pathname, { scroll: false });
  };

  // debounced query -> write to URL
  useEffect(() => {
    const sp = new URLSearchParams(currentQs);
    writeQueryToSearchParams(sp, debouncedQuery);

    const nextQs = sp.toString();
    if (nextQs === currentQs) return; 

    router.replace(nextQs ? `${pathname}?${nextQs}` : pathname, { scroll: false });
  }, [debouncedQuery, pathname, router, currentQs]);

  return (
    <main className="min-h-screen pt-28 pb-16 md:pb-24">
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

          const sp = new URLSearchParams(currentQs);
          writeFiltersToSearchParams(sp, draftFilters);

          const nextQs = sp.toString();
          if (nextQs !== currentQs) {
            router.replace(nextQs ? `${pathname}?${nextQs}` : pathname, { scroll: false });
          }

          setFiltersOpen(false);
        }}
      />
    </main>
  );
}
