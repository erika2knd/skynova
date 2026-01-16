"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

type WishItem = {
  id: string;
  slug: string;
  weapon: string;
  skin: string;
  exterior: string;
  floatValue: string;
  price: number;
  image: string;
  icon?: string;
};

const demoWishlist: WishItem[] = [
  {
    id: "1",
    slug: "stattrak-ump-45-howl-1",
    weapon: "StatTrak™ UMP-45",
    skin: "Howl",
    exterior: "Factory New",
    floatValue: "0.010000",
    price: 50000,
    image: "/images/weapon.png",
    icon: "/images/fire.svg",
  },
  {
    id: "2",
    slug: "ump-45-howl-2",
    weapon: "UMP-45",
    skin: "Howl",
    exterior: "Field-Tested",
    floatValue: "0.133423",
    price: 65000,
    image: "/images/weapon.png",
    icon: "/images/fire.svg",
  },
];

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
  const [items, setItems] = useState<WishItem[]>(demoWishlist);
  const count = items.length;

  const total = useMemo(() => items.reduce((sum, i) => sum + i.price, 0), [items]);

  const remove = (id: string) => setItems((prev) => prev.filter((i) => i.id !== id));

  const addToCart = (item: WishItem) => {
    alert(`Demo: "${item.weapon} | ${item.skin}" added to cart 🙂`);
  };

  if (items.length === 0) {
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
      {/* LEFT: list */}
      <div className="lg:col-span-8">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div className="text-sm text-white/60">
            Saved items: <span className="font-semibold text-white/85">{count}</span>
          </div>

          <Link href="/marketplace" className="text-sm font-semibold text-white/70 hover:text-white">
            Browse more →
          </Link>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          {items.map((item) => (
            <div
              key={item.id}
              className="animated-border rounded-3xl bg-gradient-to-r from-[#535EFE] via-[#680BE2] to-[#8E2BFF] p-[1px]"
            >
              <div className="rounded-3xl bg-[#1F2023] p-5">
                {/* top */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2">
                    {item.icon ? (
                      <Image src={item.icon} alt="" width={18} height={18} />
                    ) : null}
                    <span className="text-xs font-semibold text-white/75">{item.floatValue}</span>
                  </div>

                  <div className="text-xs text-white/60">{money(item.price)}</div>
                </div>

                {/* image */}
                <Link href={`/marketplace/${item.slug}`} className="mt-6 block">
                  <div className="relative mx-auto h-[90px] w-full">
                    <Image
                      src={item.image}
                      alt={`${item.weapon} | ${item.skin}`}
                      fill
                      className="object-contain"
                    />
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
                  </div>
                </div>

                {/* actions */}
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  <button
                    onClick={() => addToCart(item)}
                    className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-purple-500 to-indigo-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-purple-500/20 transition hover:brightness-110"
                  >
                    Add to cart
                  </button>

                  <button
                    onClick={() => remove(item.id)}
                    className="inline-flex items-center justify-center rounded-2xl border border-white/12 bg-white/5 px-5 py-3 text-sm font-semibold text-white/90 transition hover:bg-white/10"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
