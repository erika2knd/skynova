"use client";

import { useWishlist } from "@/context/wishlist-context";

export default function ProductWishlistButton({ slug }: { slug: string }) {
  const { isInWishlist, toggle } = useWishlist();
  const active = isInWishlist(slug);

  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggle(slug);
      }}
      className="inline-flex items-center justify-center rounded-2xl border border-white/[0.12] bg-white/5 px-5 py-3 text-sm font-semibold text-white/90 transition hover:bg-white/10"
      aria-pressed={active}
      aria-label={active ? "Remove from wishlist" : "Add to wishlist"}
      title={active ? "Remove from wishlist" : "Add to wishlist"}
    >
      {active ? "Remove from wishlist" : "Add to wishlist"}
    </button>
  );
}
