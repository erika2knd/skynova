"use client";

import Link from "next/link";
import { useWishlist } from "@/context/wishlist-context";

function HeartIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true" className="block">
      <path
        d="M12 20.35l-1.45-1.32C5.4 14.36 2 11.28 2 7.5
           2 4.42 4.42 2 7.5 2
           9.24 2 10.91 2.81 12 4.08
           13.09 2.81 14.76 2 16.5 2
           19.58 2 22 4.42 22 7.5
           22 11.28 18.6 14.36 13.45 19.04
           L12 20.35z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function WishlistLink() {
  const { count } = useWishlist();

  return (
    <Link
      href="/wishlist"
      className="relative flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.06] px-4 py-2 text-sm text-white/80 backdrop-blur transition hover:bg-white/[0.10]"
      aria-label="Wishlist"
    >
      <HeartIcon />

      {count > 0 ? (
        <span className="absolute -right-2 -top-2 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-[#535EFE] px-1 text-[11px] font-extrabold text-white">
          {count}
        </span>
      ) : null}
    </Link>
  );
}
