"use client";

import { useState } from "react";
import { useWishlist } from "@/context/wishlist-context";
import { useRequireAuth } from "@/components/hooks/useRequireAuth";

export default function ProductWishlistButton({ slug }: { slug: string }) {
  const { isInWishlist, toggle } = useWishlist();
  const { requireAuth } = useRequireAuth();

  const active = isInWishlist(slug);
  const [busy, setBusy] = useState(false);

  const label = active ? "Remove from wishlist" : "Add to wishlist";

  return (
    <button
      type="button"
      disabled={busy}
      onClick={async (e) => {
        e.preventDefault();
        e.stopPropagation();

        if (busy) return;

        setBusy(true);
        try {
          const ok = await requireAuth();
          if (!ok) return;

          await Promise.resolve(toggle(slug));
        } catch (err) {
          console.error("ProductWishlistButton error:", err);
        } finally {
          setBusy(false);
        }
      }}
      className={[
        "inline-flex items-center justify-center rounded-2xl border border-white/[0.12] bg-white/5 px-5 py-3",
        "text-sm font-semibold text-white/90 transition hover:bg-white/10",
        "disabled:opacity-60 disabled:cursor-not-allowed",
      ].join(" ")}
      aria-pressed={active}
      aria-label={label}
      title={label}
      aria-busy={busy}
    >
      {busy ? "…" : label}
    </button>
  );
}
