"use client";

import { useState } from "react";
import Header from "@/components/layout/Header";
import MarketplaceGrid from "@/components/sections/MarketplaceGrid";
import Footer from "@/components/layout/Footer";
import FilterDrawer from "@/components/filters/FilterDrawer";
import type { Filters } from "@/components/filters/types";

export default function MarketplacePage() {
  const [filtersOpen, setFiltersOpen] = useState(false);

  const defaultFilters: Filters = {
    priceMin: "",
    priceMax: "",
    exterior: [],
    statTrak: "any",
  };

  const [filters, setFilters] = useState<Filters>(defaultFilters);
  const [draftFilters, setDraftFilters] = useState<Filters>(defaultFilters);

  return (
    <main className="min-h-screen bg-[#222326] pt-28">
      <Header />

      <MarketplaceGrid
        onOpenFilters={() => {
          setDraftFilters(filters); 
          setFiltersOpen(true);
        }}
        filters={filters}
      />

      <FilterDrawer
        open={filtersOpen}
        onClose={() => setFiltersOpen(false)}
        draft={draftFilters}
        onChange={setDraftFilters}
        onReset={() => setDraftFilters(defaultFilters)}
        onApply={() => {
          setFilters(draftFilters); 
          setFiltersOpen(false); 
        }}
      />

      <Footer />
    </main>
  );
}
