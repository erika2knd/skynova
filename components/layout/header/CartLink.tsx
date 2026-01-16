"use client";

import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/cart-context";

export default function CartLink() {
  const { count } = useCart();

  return (
    <Link
      href="/cart"
      className="relative flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.06] px-4 py-2 text-sm text-white/80 backdrop-blur transition hover:bg-white/[0.10]"
      aria-label="Cart"
    >
      <Image src="/images/cart.svg" alt="" width={20} height={20} priority />

      {count > 0 ? (
        <span className="absolute -right-2 -top-2 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-[#535EFE] px-1 text-[11px] font-extrabold text-white">
          {count}
        </span>
      ) : null}
    </Link>
  );
}
