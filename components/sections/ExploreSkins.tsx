"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import WishlistIconButton from "../actions/WishlistIconButton";

type Skin = {
  id: string | number;
  slug: string;
  weapon: string;
  skin: string;
  collection: string;
  category: string;
  image: string;
  icon: string;
  price: number;
  discount: number;
  exterior: string;
  floatValue?: string; // In case API returns camelCase
  float_value?: string; // In case API returns snake_case
  statTrak?: boolean; // In case API returns camelCase
  stattrak?: boolean; // In case API returns snake_case
};

function normalizeSkin(s: Skin) {
  // Normalize API fields to consistent frontend shape
  const floatValue = s.floatValue ?? s.float_value ?? "";
  const statTrak = s.statTrak ?? s.stattrak ?? false;

  return {
    ...s,
    floatValue,
    statTrak,
  };
}

export default function ExploreSkins({ currency }: { currency: "usd" | "eur" }) {
  const [skins, setSkins] = useState<ReturnType<typeof normalizeSkin>[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function loadExploreSkins() {
      // Fetch latest skins for the homepage carousel
      setLoading(true);

      try {
        const params = new URLSearchParams();
        params.set("sort", "Newest");
        params.set("limit", "12");
        params.set("offset", "0");

        const res = await fetch(`/api/skins?${params.toString()}`, {
          cache: "no-store",
        });

        if (!res.ok) {
          throw new Error(`Failed to load explore skins (${res.status})`);
        }

        const json: { items: Skin[] } = await res.json();

        const list = (json.items ?? []).map(normalizeSkin);

        if (!cancelled) setSkins(list);
      } catch (e) {
        console.error("ExploreSkins fetch error:", e);
        if (!cancelled) setSkins([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadExploreSkins();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section className="py-20">
      <div className="mx-auto max-w-[1240px] px-4 sm:px-6">
        <h2 className="text-center text-5xl font-extrabold uppercase tracking-[-0.02em] text-white md:text-6xl">
          <span className="text-[#535EFE]">EXPLORE</span> SKINS
        </h2>

        <div className="relative mt-14">
          <div className="flex gap-6 overflow-x-auto pb-2 md:pr-[220px] snap-x snap-mandatory">
            {loading
              ? Array.from({ length: 6 }).map((_, i) => <ExploreSkinSkeleton key={i} />)
              : skins.map((skin) => (
                  <Link
                    key={skin.id}
                    href={`/marketplace/${skin.slug}${currency === "eur" ? "?currency=eur" : ""}`}
                    className="group block shrink-0 snap-start"
                  >
                    <SkinCard skin={skin} currency={currency} />
                  </Link>
                ))}
          </div>

          {/* Mobile CTA (instead of overlay) */}
          <div className="mt-6 md:hidden">
            <Link
              href={currency === "eur" ? "/marketplace?currency=eur" : "/marketplace"}
              className="inline-flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-purple-500 to-indigo-500 px-5 py-4 text-sm font-semibold text-white shadow-lg shadow-purple-500/20 transition hover:brightness-110"
              aria-label="See all skins"
            >
              SEE ALL <span className="text-lg">↗</span>
            </Link>
          </div>

          {/* Desktop overlay */}
          <SeeAllOverlay currency={currency} />
        </div>
      </div>
    </section>
  );
}

function SkinCard({
  skin,
  currency,
}: {
  skin: ReturnType<typeof normalizeSkin>;
  currency: "usd" | "eur";
}) {
  const rate = currency === "eur" ? 0.92 : 1;
  const symbol = currency === "eur" ? "€" : "$";

  const money = useMemo(() => {
    // Format money consistently for the chosen currency
    return (v: number) => `${symbol}${Math.round(v * rate).toLocaleString("en-US")}`;
  }, [rate, symbol]);

  return (
    <div className="shrink-0">
      <div className="animated-border rounded-3xl bg-gradient-to-r from-[#535EFE] via-[#680BE2] to-[#8E2BFF] p-[1px]">
        <div className="w-[240px] sm:w-[260px] min-h-[360px] rounded-3xl bg-[#222226] p-6 transition-colors duration-300 group-hover:bg-[#1F2023]">
          <div className="flex items-center justify-between text-xs text-white/60">
            <div className="flex items-center gap-3">
              <Image src={skin.icon || "/images/fire.svg"} alt="" width={18} height={18} />
              <span className="text-white/80">{skin.floatValue}</span>
            </div>
            <span className="text-white/70">{money(skin.price)}</span>
          </div>

          <div className="mt-8 flex justify-center">
            <Image
              src={skin.image}
              alt={`${skin.weapon} | ${skin.skin}`}
              width={220}
              height={90}
              className="h-[90px] w-auto object-contain"
            />
          </div>

          <div className="mt-10 flex items-start justify-between gap-3">
            <p className="min-w-0 text-lg font-extrabold leading-[1.05] text-white line-clamp-2">
              {skin.weapon} {skin.skin}
            </p>

            <div className="shrink-0">
              <WishlistIconButton slug={skin.slug} />
            </div>
          </div>

          <p className="mt-4 text-sm text-white/45">{skin.skin}</p>
          <p className="mt-2 text-xl font-extrabold text-white">{skin.floatValue}</p>
          <p className="mt-2 text-sm font-semibold text-[#535EFE]">{skin.discount}%</p>
        </div>
      </div>
    </div>
  );
}

function ExploreSkinSkeleton() {
  // Simple skeleton card to avoid layout jump during fetch
  return (
    <div className="shrink-0">
      <div className="rounded-3xl border border-white/10 bg-white/5 p-6 w-[240px] sm:w-[260px] min-h-[360px] backdrop-blur">
        <div className="h-4 w-32 rounded bg-white/10" />
        <div className="mt-4 h-[90px] rounded bg-white/10" />
        <div className="mt-8 h-6 w-44 rounded bg-white/10" />
        <div className="mt-4 h-4 w-24 rounded bg-white/10" />
        <div className="mt-3 h-6 w-28 rounded bg-white/10" />
        <div className="mt-3 h-4 w-16 rounded bg-white/10" />
      </div>
    </div>
  );
}

function SeeAllOverlay({ currency }: { currency: "usd" | "eur" }) {
  return (
    <div className="pointer-events-none absolute right-0 top-0 hidden h-[420px] w-[180px] md:block">
      <div className="absolute inset-0 bg-gradient-to-l from-[#26272D] via-[#26272D]/100 to-transparent" />
      <div
        className="absolute inset-0 rounded-3xl backdrop-blur-[18px]"
        style={{
          WebkitMaskImage: "linear-gradient(to left, black 60%, transparent 100%)",
          maskImage: "linear-gradient(to left, black 60%, transparent 100%)",
        }}
      />

      <div className="pointer-events-auto relative z-10 flex h-full -translate-y-2 flex-col items-center justify-center gap-4">
        <Link
          href={currency === "eur" ? "/marketplace?currency=eur" : "/marketplace"}
          className="grid h-20 w-20 place-items-center rounded-full border-2 border-[#535EFE]/70 text-[#535EFE] transition-transform hover:scale-105"
          aria-label="See all skins"
        >
          <span className="text-3xl">↗</span>
        </Link>

        <p className="text-sm font-extrabold tracking-widest text-white">SEE ALL</p>
      </div>
    </div>
  );
}



