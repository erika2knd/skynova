"use client";

import { useWishlist } from "@/context/wishlist-context";
import { useRequireAuth } from "@/components/hooks/useRequireAuth";

function HeartIcon({ active }: { active: boolean }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true" className="block">
      <path
        d="M12 20.35l-1.45-1.32C5.4 14.36 2 11.28 2 7.5
           2 4.42 4.42 2 7.5 2
           9.24 2 10.91 2.81 12 4.08
           13.09 2.81 14.76 2 16.5 2
           19.58 2 22 4.42 22 7.5
           22 11.28 18.6 14.36 13.45 19.04
           L12 20.35z"
        fill={active ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function WishlistIconButton({ slug }: { slug: string }) {
  const { isInWishlist, toggle } = useWishlist();
  const { requireAuth } = useRequireAuth();

  const active = isInWishlist(slug);

  return (
    <button
      type="button"
      onClick={async (e) => {
        e.preventDefault();
        e.stopPropagation();

        // Require auth before wishlist action
        const ok = await requireAuth();
        if (!ok) return;

        toggle(slug);
      }}
      aria-label={active ? "Remove from wishlist" : "Add to wishlist"}
      aria-pressed={active}
      title={active ? "Remove from wishlist" : "Add to wishlist"}
      className={[
        "inline-flex h-10 w-10 sm:h-8 sm:w-8 items-center justify-center rounded-full",
        "border border-white/10 bg-white/5 backdrop-blur",
        "transition hover:bg-white/10",
        active
          ? "text-[#535EFE] shadow-[0_0_18px_rgba(83,94,254,0.35)]"
          : "text-white/60 hover:text-white",
      ].join(" ")}
    >
      <HeartIcon active={active} />
    </button>
  );
}

