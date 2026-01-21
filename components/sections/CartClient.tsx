"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import { useCart } from "@/context/cart-context";

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

export default function CartClient() {
  const { lines, remove, clear, hydrated } = useCart();

  const [skins, setSkins] = useState<Skin[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    let cancelled = false;

    async function loadCartItems() {
      // Wait until localStorage is hydrated to avoid SSR/client mismatch
      if (!hydrated) return;

      // Reset UI state for a clean fetch cycle
      setError("");

      // If cart is empty, reset state and skip fetch
      if (lines.length === 0) {
        setSkins([]);
        return;
      }

      setLoading(true);

      try {
        // Build query: /api/skins/by-slugs?slug=a&slug=b
        const params = new URLSearchParams();
        lines.forEach((l) => params.append("slug", l.slug));

        const res = await fetch(`/api/skins/by-slugs?${params.toString()}`);

        if (!res.ok) {
          throw new Error(`Failed to load cart items (${res.status})`);
        }

        const json: { items: Skin[] } = await res.json();

        // Preserve cart order (API does not guarantee ordering)
        const map = new Map((json.items ?? []).map((s) => [s.slug, s]));
        const ordered = lines
          .map((l) => map.get(l.slug))
          .filter(Boolean) as Skin[];

        if (!cancelled) {
          setSkins(ordered);
        }
      } catch (e: any) {
        console.error("Cart fetch error:", e);
        if (!cancelled) {
          setSkins([]);
          setError("We couldn’t load your cart right now.");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadCartItems();

    return () => {
      cancelled = true;
    };
  }, [lines, hydrated]);

  // Create line items by joining skins with cart quantities
  const items = useMemo(() => {
    const qtyMap = new Map(lines.map((l) => [l.slug, l.qty]));
    return skins
      .map((skin) => {
        const qty = qtyMap.get(skin.slug) ?? 0;
        return qty > 0 ? { skin, qty } : null;
      })
      .filter(Boolean) as { skin: Skin; qty: number }[];
  }, [skins, lines]);

  const subtotal = useMemo(() => items.reduce((sum, i) => sum + i.skin.price * i.qty, 0), [items]);
  const fee = useMemo(() => Math.round(subtotal * 0.02), [subtotal]);
  const total = subtotal + fee;

  // Loading placeholder (only when we have lines but no data yet)
  const showInitialLoading = loading && hydrated && lines.length > 0 && skins.length === 0;

  return (
    <section className="grid gap-6 lg:grid-cols-12">
      {/* LEFT */}
      <div className="lg:col-span-8">
        {showInitialLoading ? (
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur">
            <div className="text-xl font-extrabold text-white">Loading cart…</div>
            <p className="mt-2 text-sm text-white/70">Fetching items from the marketplace.</p>
          </div>
        ) : error ? (
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur">
            <div className="text-xl font-extrabold text-white">Cart</div>
            <p className="mt-2 text-sm text-white/70">{error}</p>

            <div className="mt-6 flex flex-wrap gap-3">
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
        ) : items.length === 0 ? (
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur">
            <div className="text-xl font-extrabold text-white">Your cart is empty</div>
            <p className="mt-2 text-sm text-white/70">Go to the marketplace and add some skins.</p>

            <div className="mt-6">
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
        ) : (
          <>
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <div className="text-sm text-white/60">
                Items: <span className="font-semibold text-white/85">{items.length}</span>
                <span className="ml-3 text-white/40">•</span>
                <span className="ml-3 text-white/60">Subtotal:</span>{" "}
                <span className="font-semibold text-white/85">{money(subtotal)}</span>
              </div>

              <button
                type="button"
                onClick={() => clear()}
                className="rounded-2xl border border-white/12 bg-white/5 px-4 py-2 text-sm font-semibold text-white/80 transition hover:bg-white/10"
              >
                Clear cart
              </button>
            </div>

            <div className="space-y-4">
              {items.map(({ skin, qty }) => {
                const name = `${skin.weapon} | ${skin.skin}`;
                const linePrice = skin.price * qty;

                return (
                  <div
                    key={skin.slug}
                    className="rounded-3xl border border-white/10 bg-white/5 p-4 backdrop-blur sm:p-5"
                  >
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex items-center gap-4">
                        <div className="relative h-[72px] w-[120px] overflow-hidden rounded-2xl border border-white/10 bg-black/20">
                          <Image src={skin.image} alt={name} fill className="object-contain p-2" />
                        </div>

                        <div className="min-w-0">
                          <Link
                            href={`/marketplace/${skin.slug}`}
                            className="block truncate text-base font-extrabold text-white hover:text-white/90"
                            title={name}
                          >
                            {name}
                          </Link>

                          <div className="mt-2 flex flex-wrap items-center gap-2">
                            <Chip>{skin.exterior}</Chip>
                            <Chip>Instant delivery</Chip>
                            {skin.statTrak ? <Chip>StatTrak™</Chip> : null}
                            {qty > 1 ? <Chip>Qty {qty}</Chip> : null}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between gap-4 sm:justify-end">
                        <div className="text-lg font-extrabold text-white">{money(linePrice)}</div>

                        <button
                          onClick={() => remove(skin.slug)}
                          className="rounded-2xl border border-white/12 bg-white/5 px-4 py-2 text-sm font-semibold text-white/80 transition hover:bg-white/10"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Background update hint */}
            {loading ? <div className="mt-6 text-sm text-white/50">Updating cart…</div> : null}
          </>
        )}
      </div>

      {/* RIGHT */}
      <div className="lg:col-span-4">
        <div className="sticky top-24 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur sm:p-8">
          <div className="text-xl font-extrabold text-white">Order summary</div>
          <p className="mt-2 text-sm text-white/60">Demo totals. Later we’ll connect real checkout.</p>

          <div className="mt-6 space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-white/60">Subtotal</span>
              <span className="font-semibold text-white/90">{money(subtotal)}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-white/60">Service fee (2%)</span>
              <span className="font-semibold text-white/90">{money(fee)}</span>
            </div>

            <div className="my-4 h-px bg-white/10" />

            <div className="flex items-center justify-between">
              <span className="text-sm text-white/60">Total</span>
              <span className="text-2xl font-extrabold text-white">{money(total)}</span>
            </div>
          </div>

          <button
            onClick={() => alert("Demo: checkout is not connected yet 🙂")}
            disabled={items.length === 0}
            className={`
              mt-6 w-full rounded-full px-8 py-4 text-lg font-extrabold text-white transition
              ${
                items.length > 0
                  ? "bg-gradient-to-r from-[#8E2BFF] to-[#535EFE] shadow-[0_0_40px_rgba(142,43,255,0.55)] hover:brightness-110"
                  : "bg-gradient-to-r from-[#8E2BFF]/40 to-[#535EFE]/40 opacity-60 cursor-not-allowed"
              }
            `}
          >
            Proceed to checkout
          </button>

          <Link
            href="/marketplace"
            className="mt-4 inline-flex w-full items-center justify-center rounded-2xl border border-white/12 bg-white/5 px-5 py-3 text-sm font-semibold text-white/90 transition hover:bg-white/10"
          >
            Continue shopping
          </Link>
        </div>
      </div>
    </section>
  );
}

