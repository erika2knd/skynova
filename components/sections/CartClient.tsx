"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";

import { demoSkins } from "@/components/data/demoSkins";
import { useCart } from "@/context/cart-context";

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
  const { lines, remove } = useCart();

  const items = useMemo(() => {
    const map = new Map(demoSkins.map((s) => [s.slug, s]));
    return lines
      .map((l) => {
        const skin = map.get(l.slug);
        if (!skin) return null;
        return { skin, qty: l.qty };
      })
      .filter(Boolean) as { skin: (typeof demoSkins)[number]; qty: number }[];
  }, [lines]);

  const subtotal = useMemo(
    () => items.reduce((sum, i) => sum + i.skin.price * i.qty, 0),
    [items]
  );
  const fee = useMemo(() => Math.round(subtotal * 0.02), [subtotal]);
  const total = subtotal + fee;

  return (
    <section className="grid gap-6 lg:grid-cols-12">
      {/* LEFT */}
      <div className="lg:col-span-8">
        {items.length === 0 ? (
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

                      <div>
                        <Link
                          href={`/marketplace/${skin.slug}`}
                          className="text-base font-extrabold text-white hover:text-white/90"
                        >
                          {name}
                        </Link>

                        <div className="mt-2 flex flex-wrap items-center gap-2">
                          <Chip>{skin.exterior}</Chip>
                          <Chip>Instant delivery</Chip>
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
