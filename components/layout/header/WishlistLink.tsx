"use client";

import Link from "next/link";
import { useWishlist } from "@/context/wishlist-context";

function HeartIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M12 21s-7.2-4.35-9.6-8.55C.6 9.6 2.1 6.6 5.4 6c1.8-.3 3.45.45 4.5 1.65C10.95 6.45 12.6 5.7 14.4 6c3.3.6 4.8 3.6 3 6.45C19.2 16.65 12 21 12 21z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
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
