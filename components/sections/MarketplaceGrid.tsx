"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState, useEffect } from "react";

import { demoSkins, categories, type Skin } from "@/components/data/demoSkins";
import WishlistIconButton from "../actions/WishlistIconButton";
import SkeletonSkinCard from "../ui/SkeletonSkinCard";

const sortOptions = ["Best deal", "Newest", "Price: low", "Price: high"];
const currencyOptions = ["USD", "EUR"];

type Filters = {
  priceMin: string;
  priceMax: string;
  exterior: string[];
  statTrak: "any" | "only" | "without";
};

type MarketplaceGridProps = {
  onOpenFilters: () => void;
  filters: Filters;

  activeCategory: string;
  onCategoryChange: (next: string) => void;

  sort: string;
  onSortChange: (v: string) => void;

  query: string;
  onQueryChange: (v: string) => void;

  currency: "usd" | "eur";
  onCurrencyChange: (v: "usd" | "eur") => void;

  view: "grid" | "list";
  onViewChange: (v: "grid" | "list") => void;
};

export default function MarketplaceGrid({
  onOpenFilters,
  filters,
  activeCategory,
  onCategoryChange,
  sort,
  onSortChange,
  query,
  onQueryChange,
  currency,
  onCurrencyChange,
  view,
  onViewChange,
}: MarketplaceGridProps) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(t);
  }, [activeCategory, sort, filters, query, currency]);

  // currency formatting (demo)
  const rate = currency === "eur" ? 0.92 : 1;
  const symbol = currency === "eur" ? "€" : "$";
  const money = (v: number) => {
    const converted = Math.round(v * rate);
    return `${symbol}${converted.toLocaleString("en-US")}`;
  };

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    const min = filters.priceMin.trim() === "" ? null : Number(filters.priceMin);
    const max = filters.priceMax.trim() === "" ? null : Number(filters.priceMax);

    return demoSkins
      .filter((s) => {
        // 1) search
        if (q) {
          const hay = `${s.weapon} ${s.skin} ${s.collection}`.toLowerCase();
          if (!hay.includes(q)) return false;
        }

        // 2) category
        if (activeCategory && s.category !== activeCategory) return false;

        // 3) price range
        if (min !== null && !Number.isNaN(min) && s.price < min) return false;
        if (max !== null && !Number.isNaN(max) && s.price > max) return false;

        // 4) exterior
        if (filters.exterior.length > 0) {
          if (!filters.exterior.includes(s.exterior)) return false;
        }

        // 5) stattrak
        if (filters.statTrak === "only" && !s.statTrak) return false;
        if (filters.statTrak === "without" && s.statTrak) return false;

        return true;
      })
      .sort((a, b) => {
        if (sort === "Price: low") return a.price - b.price;
        if (sort === "Price: high") return b.price - a.price;
        if (sort === "Best deal") return Math.abs(b.discount) - Math.abs(a.discount);
        if (sort === "Newest") return Number(b.id) - Number(a.id);
        return 0;
      });
  }, [query, activeCategory, sort, filters]);

  return (
    <section>
      <div className="mx-auto max-w-[1240px] px-6 pb-12">
        {/* Top categories row */}
        <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur">
          <div className="flex items-center gap-3 overflow-x-auto">
            {categories.map((c) => {
              const active = c === activeCategory;
              return (
                <button
                  key={c}
                  onClick={() => onCategoryChange(c)}
                  className={`shrink-0 rounded-xl px-3 py-2 text-sm transition ${
                    active
                      ? "border border-[#535EFE]/30 bg-[#535EFE]/20 text-white"
                      : "text-white/70 hover:text-white"
                  }`}
                >
                  {c}
                </button>
              );
            })}
          </div>
        </div>

        {/* Filter bar */}
        <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur">
          {/* MOBILE */}
          <div className="grid gap-3 sm:hidden">
            {/* row 1 */}
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={onOpenFilters}
                className="h-12 rounded-xl border border-white/10 bg-white/5 px-4 text-sm text-white/85 transition hover:bg-white/10"
              >
                Filter
              </button>

              <Select
                value={sort}
                onChange={onSortChange}
                options={sortOptions}
                className="h-12 w-full"
              />
            </div>

            {/* row 2 */}
            <div className="grid grid-cols-2 gap-3">
              <Select
                value={currency === "usd" ? "USD" : "EUR"}
                onChange={(v) => onCurrencyChange(v === "EUR" ? "eur" : "usd")}
                options={currencyOptions}
                className="h-12 w-full"
              />

              <div className="grid grid-cols-2 gap-3">
                <ViewButton active={view === "grid"} onClick={() => onViewChange("grid")}>
                  ▦
                </ViewButton>
                <ViewButton active={view === "list"} onClick={() => onViewChange("list")}>
                  ≣
                </ViewButton>
              </div>
            </div>

            {/* row 3 */}
            <SearchInput query={query} onChange={onQueryChange} />
          </div>

          {/* DESKTOP / TABLET */}
          <div className="hidden flex-wrap items-center gap-3 sm:flex">
            <button
              onClick={onOpenFilters}
              className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/85 transition hover:bg-white/10"
            >
              Filter
            </button>

            <Select value={sort} onChange={onSortChange} options={sortOptions} />

            <Select
              value={currency === "usd" ? "USD" : "EUR"}
              onChange={(v) => onCurrencyChange(v === "EUR" ? "eur" : "usd")}
              options={currencyOptions}
            />

            <div className="flex min-w-[220px] flex-1 items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2">
              <span className="text-white/40">⌕</span>
              <input
                value={query}
                onChange={(e) => onQueryChange(e.target.value)}
                placeholder="Search"
                className="w-full bg-transparent text-sm text-white placeholder:text-white/35 outline-none"
              />
            </div>

            <div className="ml-auto flex items-center gap-2">
              <button
                type="button"
                onClick={() => onViewChange("grid")}
                aria-label="Grid view"
                className={`grid h-10 w-10 place-items-center rounded-xl border border-white/10 transition
                  ${view === "grid" ? "bg-white/10 text-white" : "bg-white/5 text-white/70 hover:bg-white/10"}
                `}
              >
                ▦
              </button>

              <button
                type="button"
                onClick={() => onViewChange("list")}
                aria-label="List view"
                className={`grid h-10 w-10 place-items-center rounded-xl border border-white/10 transition
                  ${view === "list" ? "bg-white/10 text-white" : "bg-white/5 text-white/70 hover:bg-white/10"}
                `}
              >
                ≣
              </button>
            </div>
          </div>
        </div>

        {/* Grid */}
        <div
          className={`mt-6 grid gap-5 ${
            view === "grid"
              ? "sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
              : "grid-cols-1"
          }`}
        >
          {loading
            ? Array.from({ length: 10 }).map((_, i) => <SkeletonSkinCard key={i} />)
            : filtered.map((skin) => (
                <Link
                  key={skin.id}
                  href={`/marketplace/${skin.slug}`}
                  className="block cursor-pointer transition-transform hover:scale-[1.01]"
                >
                  <SkinCard skin={skin} money={money} view={view} />
                </Link>
              ))}
        </div>

        {/* Down button */}
        <div className="mt-10 flex justify-center">
          <button className="grid h-14 w-14 place-items-center rounded-full border border-white/10 bg-white/5 text-white/70 transition hover:bg-white/10">
            ↓
          </button>
        </div>
      </div>

      {/* FULL WIDTH BANNER */}
      <div className="mt-10 overflow-hidden bg-white/5">
        <div className="relative h-[280px] w-full">
          <Image src="/images/reviews-bg.png" alt="" fill className="object-cover object-center" />

          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-black/30" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#680BE2]/45 via-transparent to-[#535EFE]/35" />

          <div className="relative mx-auto flex h-full max-w-[1240px] items-center justify-center px-6 text-center">
            <h2 className="text-4xl font-extrabold uppercase leading-[1.05] text-white md:text-6xl">
              MADE FROM PLAYERS
              <br />
              <span className="text-[#535EFE]">TO PLAYERS</span>
            </h2>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ----------------- Cards ----------------- */

function SkinCard({
  skin,
  money,
  view,
}: {
  skin: Skin;
  money: (v: number) => string;
  view: "grid" | "list";
}) {
  return (
    <div className="animated-border rounded-3xl bg-gradient-to-r from-[#535EFE] via-[#680BE2] to-[#535EFE] p-[1px]">
      <div className={`rounded-3xl bg-[#1F2023] p-4 ${view === "list" ? "sm:p-5" : ""}`}>
        {view === "grid" ? (
          <>
            {/* GRID */}
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                <div className="grid h-8 w-8 place-items-center">
                  <Image src={skin.icon} alt="" width={16} height={16} />
                </div>
                <p className="text-xs font-semibold text-white/80">{skin.floatValue}</p>
              </div>

              <p className="text-xs text-white/50">{money(skin.price)}</p>
            </div>

            <div className="mt-6 flex justify-center">
              <Image
                src={skin.image}
                alt=""
                width={220}
                height={120}
                className="h-[70px] w-auto object-contain"
              />
            </div>

            <div className="mt-6">
              <p className="text-sm font-extrabold leading-snug text-white">
                {skin.weapon}
                <br />
                {skin.collection}
              </p>

              <div className="mt-2 flex items-center justify-between">
                <p className="text-xs text-white/45">{skin.skin}</p>
                <WishlistIconButton slug={skin.slug} />
              </div>

              <p className="mt-3 text-sm font-extrabold text-white">{money(skin.price)}</p>
              <p className="mt-1 text-xs font-semibold text-[#535EFE]">{skin.discount}%</p>
            </div>
          </>
        ) : (
          <>
            {/* LIST */}
            <div className="flex items-center gap-4">
              <div className="relative h-[64px] w-[120px] shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-black/20">
                <Image src={skin.image} alt="" fill className="object-contain p-2" />
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-extrabold text-white">
                      {skin.weapon} | {skin.skin}
                    </p>
                    <p className="mt-1 text-xs text-white/50">{skin.collection}</p>
                  </div>

                  <div className="flex items-center gap-3">
                    <WishlistIconButton slug={skin.slug} />
                    <div className="text-right">
                      <div className="text-sm font-extrabold text-white">{money(skin.price)}</div>
                      <div className="text-xs font-semibold text-[#535EFE]">{skin.discount}%</div>
                    </div>
                  </div>
                </div>

                <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-white/60">
                  <span className="inline-flex items-center gap-2">
                    <Image src={skin.icon} alt="" width={14} height={14} />
                    {skin.floatValue}
                  </span>
                  <span className="text-white/30">•</span>
                  <span>{skin.exterior}</span>
                  {skin.statTrak ? (
                    <>
                      <span className="text-white/30">•</span>
                      <span>StatTrak™</span>
                    </>
                  ) : null}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

/* ----------------- UI helpers ----------------- */

function ViewButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`grid h-12 w-full place-items-center rounded-xl border border-white/10 transition
        ${active ? "bg-white/10 text-white" : "bg-white/5 text-white/70 hover:bg-white/10"}
      `}
    >
      {children}
    </button>
  );
}

function SearchInput({
  query,
  onChange,
}: {
  query: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex h-12 items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3">
      <span className="text-white/40">⌕</span>
      <input
        value={query}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search"
        className="w-full bg-transparent text-sm text-white placeholder:text-white/35 outline-none"
      />
    </div>
  );
}

function Select({
  value,
  onChange,
  options,
  className = "",
}: {
  value: string;
  onChange: (v: string) => void;
  options: string[];
  className?: string;
}) {
  return (
    <div className={`relative ${className}`}>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-full w-full appearance-none rounded-xl border border-white/10 bg-white/5 px-4 py-2 pr-9 text-sm text-white/85 outline-none transition hover:bg-white/10"
      >
        {options.map((o) => (
          <option key={o} value={o} className="bg-[#222326]">
            {o}
          </option>
        ))}
      </select>
      <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-white/40">
        ▾
      </span>
    </div>
  );
}
