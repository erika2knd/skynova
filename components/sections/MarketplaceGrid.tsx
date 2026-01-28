"use client";

import Image from "next/image";
import Link from "next/link";

import type { Skin } from "@/components/data/demoSkins";
import type { SortKey } from "@/components/filters/url";

import WishlistIconButton from "../actions/WishlistIconButton";
import SkeletonSkinCard from "../ui/SkeletonSkinCard";

const MARKETPLACE_CATEGORIES = ["All", "Rifles", "Pistols", "Knives", "Gloves"] as const;

const SORT_OPTIONS: Array<{ value: SortKey; label: string }> = [
  { value: "best", label: "Best deal" },
  { value: "newest", label: "Newest" },
  { value: "price_low", label: "Price: low" },
  { value: "price_high", label: "Price: high" },
];

const currencyOptions = ["USD", "EUR"] as const;

type Filters = {
  priceMin: string;
  priceMax: string;
  exterior: string[];
  statTrak: "any" | "only" | "without";
};

type MarketplaceGridProps = {
  items: Skin[];
  total: number;
  loading: boolean;
  loadingMore: boolean;
  canLoadMore: boolean;
  onLoadMore: () => void;

  onOpenFilters: () => void;
  filters: Filters;

  activeFilterCount: number;

  activeCategory: string;
  onCategoryChange: (next: string) => void;

  // ✅ now uses SortKey
  sort: SortKey;
  onSortChange: (v: SortKey) => void;

  query: string;
  onQueryChange: (v: string) => void;

  currency: "usd" | "eur";
  onCurrencyChange: (v: "usd" | "eur") => void;

  view: "grid" | "list";
  onViewChange: (v: "grid" | "list") => void;

  onClearFilters: () => void;

  error?: string | null;
  onRetry?: () => void;
};

export default function MarketplaceGrid({
  items,
  total,
  loading,
  loadingMore,
  canLoadMore,
  onLoadMore,

  onOpenFilters,
  onClearFilters,
  activeFilterCount,

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

  error,
  onRetry,
}: MarketplaceGridProps) {
  const rate = currency === "eur" ? 0.92 : 1;
  const symbol = currency === "eur" ? "€" : "$";
  const currencyQuery = currency === "eur" ? "?currency=eur" : "";

  const money = (v: number) => {
    const converted = Math.round(v * rate);
    return `${symbol}${converted.toLocaleString("en-US")}`;
  };

  return (
    <section className="mt-24">
      <div className="mx-auto max-w-[1240px] px-6 pb-12">
        <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur">
          <div className="flex items-center gap-3 overflow-x-auto">
            {MARKETPLACE_CATEGORIES.map((c) => {
              const active = c === activeCategory;

              return (
                <button
                  key={c}
                  type="button"
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

        <div className="mt-4 flex flex-wrap items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onOpenFilters}
              className="relative rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/85 transition hover:bg-white/10"
            >
              <span>Filter</span>

              {activeFilterCount > 0 && (
                <span className="ml-2 inline-flex min-w-[20px] items-center justify-center rounded-full bg-[#535EFE] px-1.5 text-xs font-semibold text-white">
                  {activeFilterCount}
                </span>
              )}
            </button>

            {activeFilterCount > 0 && (
              <button
                type="button"
                onClick={onClearFilters}
                className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70 transition hover:bg-white/10 hover:text-white"
              >
                Clear
              </button>
            )}
          </div>

          {/* ✅ Sort select now uses SortKey */}
          <SelectSort value={sort} onChange={onSortChange} />

          <Select
            value={currency === "usd" ? "USD" : "EUR"}
            onChange={(v) => onCurrencyChange(v === "EUR" ? "eur" : "usd")}
            options={[...currencyOptions]}
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
              className={`grid h-10 w-10 place-items-center rounded-xl border border-white/10 transition ${
                view === "grid"
                  ? "bg-white/10 text-white"
                  : "bg-white/5 text-white/70 hover:bg-white/10"
              }`}
            >
              ▦
            </button>

            <button
              type="button"
              onClick={() => onViewChange("list")}
              aria-label="List view"
              className={`grid h-10 w-10 place-items-center rounded-xl border border-white/10 transition ${
                view === "list"
                  ? "bg-white/10 text-white"
                  : "bg-white/5 text-white/70 hover:bg-white/10"
              }`}
            >
              ≣
            </button>
          </div>
        </div>

        {!loading && error ? (
          <div className="mt-6 rounded-2xl border border-red-500/20 bg-red-500/10 p-8 text-center text-white/80">
            <p className="font-semibold">{error}</p>

            {onRetry ? (
              <button
                type="button"
                onClick={onRetry}
                className="mt-4 rounded-xl border border-white/10 bg-white/10 px-4 py-2 text-sm transition hover:bg-white/15"
              >
                Retry
              </button>
            ) : null}
          </div>
        ) : null}

        <div
          className={`mt-6 grid gap-5 ${
            view === "grid"
              ? "sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
              : "grid-cols-1"
          }`}
        >
          {loading
            ? Array.from({ length: 10 }).map((_, i) => <SkeletonSkinCard key={i} />)
            : items.map((skin) => (
                <Link
                  key={skin.id}
                  href={`/marketplace/${skin.slug}${currencyQuery}`}
                  className="block cursor-pointer transition-transform hover:scale-[1.01]"
                >
                  <SkinCard skin={skin} money={money} view={view} />
                </Link>
              ))}
        </div>

        {!loading && !error && items.length === 0 ? (
          <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-8 text-center text-white/70">
            No results found. Try changing filters or search query.
          </div>
        ) : null}

        <div className="mt-10 flex flex-col items-center gap-3">
          <div className="text-sm text-white/50">
            Showing <span className="text-white/80">{items.length}</span> of{" "}
            <span className="text-white/80">{total}</span>
          </div>

          {canLoadMore ? (
            <button
              type="button"
              onClick={onLoadMore}
              disabled={loadingMore}
              aria-label="Load more"
              className={[
                "grid h-14 w-14 place-items-center rounded-full border border-white/10",
                "bg-white/5 text-white/70 transition hover:bg-white/10",
                "disabled:opacity-60 disabled:cursor-not-allowed",
              ].join(" ")}
            >
              {loadingMore ? "…" : "↓"}
            </button>
          ) : !loading ? (
            <div className="text-sm text-white/50">
              {total === 0 ? "No results" : "You’ve reached the end"}
            </div>
          ) : null}
        </div>
      </div>

      <div className="mt-10 mb-24 overflow-hidden bg-white/5">
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

function SkinCard({
  skin,
  money,
  view,
}: {
  skin: Skin;
  money: (v: number) => string;
  view: "grid" | "list";
}) {
  const iconSrc = skin.icon || "/images/fire.svg";
  const imageSrc = skin.image || "/images/placeholder.png";

  return (
    <div className="animated-border rounded-3xl bg-gradient-to-r from-[#535EFE] via-[#680BE2] to-[#535EFE] p-[1px]">
      <div className={`rounded-3xl bg-[#1F2023] p-4 ${view === "list" ? "sm:p-5" : ""}`}>
        {view === "grid" ? (
          <>
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                <div className="grid h-8 w-8 place-items-center">
                  <Image src={iconSrc} alt="" width={16} height={16} />
                </div>
                <p className="text-xs font-semibold text-white/80">{skin.floatValue}</p>
              </div>

              <p className="text-xs text-white/50">{money(skin.price)}</p>
            </div>

            <div className="mt-6 flex justify-center">
              <Image src={imageSrc} alt="" width={220} height={120} className="h-[70px] w-auto object-contain" />
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
          <div className="flex items-center gap-4">
            <div className="relative h-[64px] w-[120px] shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-black/20">
              <Image src={imageSrc} alt="" fill className="object-contain p-2" />
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
                  <Image src={iconSrc} alt="" width={14} height={14} />
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
        )}
      </div>
    </div>
  );
}

function SelectSort({
  value,
  onChange,
}: {
  value: SortKey;
  onChange: (v: SortKey) => void;
}) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as SortKey)}
        className="appearance-none rounded-xl border border-white/10 bg-white/5 px-4 py-2 pr-9 text-sm text-white/85 outline-none transition hover:bg-white/10"
      >
        {SORT_OPTIONS.map((o) => (
          <option key={o.value} value={o.value} className="bg-[#222326]">
            {o.label}
          </option>
        ))}
      </select>
      <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-white/40">▾</span>
    </div>
  );
}

function Select({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (v: string) => void;
  options: string[];
}) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="appearance-none rounded-xl border border-white/10 bg-white/5 px-4 py-2 pr-9 text-sm text-white/85 outline-none transition hover:bg-white/10"
      >
        {options.map((o) => (
          <option key={o} value={o} className="bg-[#222326]">
            {o}
          </option>
        ))}
      </select>
      <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-white/40">▾</span>
    </div>
  );
}
