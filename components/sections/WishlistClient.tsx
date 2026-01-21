"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import { useWishlist } from "@/context/wishlist-context";
import { useCart } from "@/context/cart-context";
import { useRequireAuth } from "@/components/hooks/useRequireAuth";

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
  floatValue: string;
  statTrak: boolean;
};

function money(v: number) {
  return `$${v.toLocaleString("en-US")}`;
}

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80 backdrop-blur">
      {children}
    </span>
  );
}

export default function WishlistClient() {
  const { items: wishSlugs, remove } = useWishlist();
  const { add: addToCart } = useCart();

  const [skins, setSkins] = useState<Skin[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const { requireAuth } = useRequireAuth();

  useEffect(() => {
    let cancelled = false;

    async function loadWishlistItems() {
      // Reset UI state for a clean fetch cycle
      setError("");

      // If wishlist is empty, reset state and skip fetch
      if (wishSlugs.length === 0) {
        setSkins([]);
        return;
      }

      setLoading(true);

      try {
        // Build query: /api/skins/by-slugs?slug=a&slug=b
        const params = new URLSearchParams();
        wishSlugs.forEach((slug) => params.append("slug", slug));

        const res = await fetch(`/api/skins/by-slugs?${params.toString()}`);

        if (!res.ok) {
          throw new Error(`Failed to load wishlist items (${res.status})`);
        }

        const json: { items: Skin[] } = await res.json();

        // Preserve wishlist order (API does not guarantee ordering)
        const map = new Map((json.items ?? []).map((s) => [s.slug, s]));
        const ordered = wishSlugs
          .map((slug) => map.get(slug))
          .filter(Boolean) as Skin[];

        if (!cancelled) {
          setSkins(ordered);
        }
      } catch (e: any) {
        console.error("Wishlist fetch error:", e);
        if (!cancelled) {
          setSkins([]);
          setError("We couldn’t load your wishlist right now.");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadWishlistItems();

    return () => {
      cancelled = true;
    };
  }, [wishSlugs]);

  const count = skins.length;

  const total = useMemo(() => {
    return skins.reduce((sum, s) => sum + (s?.price ?? 0), 0);
  }, [skins]);

  // Loading state (only when we actually have slugs to fetch)
  if (loading && wishSlugs.length > 0 && skins.length === 0) {
    return (
      <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur">
        <div className="text-xl font-extrabold text-white">Loading wishlist…</div>
        <p className="mt-2 text-sm text-white/70">Fetching items from the marketplace.</p>
      </div>
    );
  }

  // Error state (soft)
  if (error) {
    return (
      <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur">
        <div className="text-xl font-extrabold text-white">Wishlist</div>
        <p className="mt-2 text-sm text-white/70">{error}</p>

        <div className="mt-6 flex flex-wrap justify-center gap-4 sm:justify-start">
          <Link
            href="/marketplace"
            className="inline-flex items-center justify-center rounded-full px-8 py-4 text-lg font-extrabold text-white
              bg-gradient-to-r from-[#8E2BFF] to-[#535EFE]
              shadow-[0_0_40px_rgba(142,43,255,0.55)]
              transition hover:brightness-110"
          >
            Explore Marketplace
          </Link>
        </div>
      </div>
    );
  }

  // Empty state
  if (count === 0) {
    return (
      <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur">
        <div className="text-xl font-extrabold text-white">Your wishlist is empty</div>
        <p className="mt-2 text-sm text-white/70">
          Browse the marketplace and tap ♡ to save items here.
        </p>

        <div className="mt-6 flex flex-wrap justify-center gap-4 sm:justify-start">
          <Link
            href="/marketplace"
            className="inline-flex items-center justify-center rounded-full px-8 py-4 text-lg font-extrabold text-white
              bg-gradient-to-r from-[#8E2BFF] to-[#535EFE]
              shadow-[0_0_40px_rgba(142,43,255,0.55)]
              transition hover:brightness-110"
          >
            Explore Marketplace
          </Link>

          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-2xl border border-white/12 bg-white/5 px-6 py-3 text-sm font-semibold text-white/90 transition hover:bg-white/10"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <section className="grid gap-6 lg:grid-cols-12">
      <div className="lg:col-span-12 xl:mx-auto xl:max-w-[1180px]">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div className="text-sm text-white/60">
            Saved items: <span className="font-semibold text-white/85">{count}</span>
            <span className="ml-3 text-white/40">•</span>
            <span className="ml-3 text-white/60">Total:</span>{" "}
            <span className="font-semibold text-white/85">{money(total)}</span>
          </div>

          <Link href="/marketplace" className="text-sm font-semibold text-white/70 hover:text-white">
            Browse more →
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {skins.map((item) => {
            const title = `${item.weapon} | ${item.skin}`;

            return (
              <div
                key={item.slug}
                className="animated-border h-full overflow-hidden rounded-3xl bg-gradient-to-r from-[#535EFE] via-[#680BE2] to-[#8E2BFF] p-[1px]"
              >
                <div
                  className="flex h-full flex-col rounded-[23px] bg-[#1F2023] p-5"
                >
                  {/* top */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2">
                      {item.icon ? <Image src={item.icon} alt="" width={18} height={18} /> : null}
                      <span className="text-xs font-semibold text-white/75">{item.floatValue}</span>
                    </div>

                    <div className="text-xs text-white/60">{money(item.price)}</div>
                  </div>

                  {/* image */}
                  <Link href={`/marketplace/${item.slug}`} className="mt-6 block">
                    <div className="relative mx-auto h-[110px] w-full">
                      <Image src={item.image} alt={title} fill className="object-contain" />
                    </div>
                  </Link>

                  {/* title */}
                  <div className="mt-6">
                    <Link
                      href={`/marketplace/${item.slug}`}
                      className="text-lg font-extrabold leading-[1.1] text-white hover:text-white/90"
                    >
                      {item.weapon}
                      <br />
                      {item.skin}
                    </Link>

                    <div className="mt-3 flex flex-wrap items-center gap-2">
                      <Chip>{item.exterior}</Chip>
                      <Chip>Instant delivery</Chip>
                      {item.statTrak ? <Chip>StatTrak™</Chip> : null}
                    </div>
                  </div>

                  {/* actions */}
                  <div className="mt-auto pt-6">
                    <div className="grid gap-3 sm:grid-cols-2">
                      <button
                        onClick={async () => {
  const ok = await requireAuth();
  if (!ok) return;
  addToCart(item.slug, 1);
}}
                        className="inline-flex items-center justify-center whitespace-nowrap rounded-2xl bg-gradient-to-r from-purple-500 to-indigo-500 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-purple-500/20 transition hover:brightness-110"
                      >
                        Add to cart
                      </button>

                      <button
                        onClick={() => remove(item.slug)}
                        className="inline-flex items-center justify-center whitespace-nowrap rounded-2xl border border-white/12 bg-white/5 px-4 py-3 text-sm font-semibold text-white/90 transition hover:bg-white/10"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Light footer note */}
        {loading ? (
          <div className="mt-6 text-sm text-white/50">Updating wishlist…</div>
        ) : null}
      </div>
    </section>
  );
}
