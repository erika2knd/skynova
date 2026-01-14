"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

import { demoSkins, categories, type Skin } from "@/components/data/demoSkins";

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
};

export default function MarketplaceGrid({ onOpenFilters, filters }: MarketplaceGridProps) {
  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const [sort, setSort] = useState(sortOptions[0]);
  const [currency, setCurrency] = useState(currencyOptions[0]);
  const [query, setQuery] = useState("");

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
    <section className="pb-24">
      <div className="mx-auto max-w-[1240px] px-6">
        {/* Top categories row */}
        <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur">
          <div className="flex items-center gap-3 overflow-x-auto">
            {categories.map((c) => {
              const active = c === activeCategory;
              return (
                <button
                  key={c}
                  onClick={() => setActiveCategory(c)}
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
        <div className="mt-4 flex flex-wrap items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur">
          <button
            onClick={onOpenFilters}
            className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/85 transition hover:bg-white/10"
          >
            Filter
          </button>

          <Select value={sort} onChange={setSort} options={sortOptions} />
          <Select value={currency} onChange={setCurrency} options={currencyOptions} />

          {/* Search */}
          <div className="flex min-w-[220px] flex-1 items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2">
            <span className="text-white/40">⌕</span>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search"
              className="w-full bg-transparent text-sm text-white placeholder:text-white/35 outline-none"
            />
          </div>

          {/* View buttons */}
          <div className="ml-auto flex items-center gap-2">
            <button className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/5 text-white/70 transition hover:bg-white/10">
              ▦
            </button>
            <button className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/5 text-white/70 transition hover:bg-white/10">
              ≣
            </button>
          </div>
        </div>

        {/* Grid */}
        <div className="mt-6 grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {filtered.map((skin) => (
            <Link
              key={skin.id}
              href={`/marketplace/${skin.slug}`}
              className="block cursor-pointer transition-transform hover:scale-[1.01]"
            >
              <SkinCard skin={skin} />
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
      <div className="mt-14 overflow-hidden bg-white/5">
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

function SkinCard({ skin }: { skin: Skin }) {
  return (
    <div className="animated-border rounded-3xl bg-gradient-to-r from-[#535EFE] via-[#680BE2] to-[#535EFE] p-[1px]">
      <div className="rounded-3xl bg-[#1F2023] p-4">
        {/* top row */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <div className="grid h-8 w-8 place-items-center">
              <Image src={skin.icon} alt="" width={16} height={16} />
            </div>
            <p className="text-xs font-semibold text-white/80">{skin.floatValue}</p>
          </div>

          <p className="text-xs text-white/50">${skin.price.toLocaleString("en-US")}</p>
        </div>

        {/* weapon image */}
        <div className="mt-6 flex justify-center">
          <Image
            src={skin.image}
            alt=""
            width={220}
            height={120}
            className="h-[70px] w-auto object-contain"
          />
        </div>

        {/* title */}
        <div className="mt-6">
          <p className="text-sm font-extrabold leading-snug text-white">
            {skin.weapon}
            <br />
            {skin.collection}
          </p>

          <div className="mt-2 flex items-center justify-between">
            <p className="text-xs text-white/45">{skin.skin}</p>

            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
              className="text-white/50 transition hover:text-white"
            >
              ♡
            </button>
          </div>

          <p className="mt-3 text-sm font-extrabold text-white">${skin.price.toLocaleString( "en-US")}</p>

          <p className="mt-1 text-xs font-semibold text-[#535EFE]">{skin.discount}%</p>
        </div>
      </div>
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
      <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-white/40">
        ▾
      </span>
    </div>
  );
}



