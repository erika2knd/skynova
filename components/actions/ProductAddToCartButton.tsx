"use client";

import { useState } from "react";
import { useCart } from "@/context/cart-context";
import { useRequireAuth } from "@/components/hooks/useRequireAuth";

export default function ProductAddToCartButton({ slug }: { slug: string }) {
  const { add } = useCart();
  const { requireAuth } = useRequireAuth();

  const [busy, setBusy] = useState(false);

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

          add(slug, 1);
        } catch (err) {
          console.error("ProductAddToCartButton error:", err);
        } finally {
          setBusy(false);
        }
      }}
      className={[
        "inline-flex items-center justify-center rounded-2xl",
        "bg-gradient-to-r from-purple-500 to-indigo-500",
        "px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-purple-500/20",
        "transition hover:brightness-110",
        "disabled:opacity-60 disabled:cursor-not-allowed",
      ].join(" ")}
      aria-label="Add to cart"
      title="Add to cart"
      aria-busy={busy}
    >
      {busy ? "…" : "Add to cart"}
    </button>
  );
}
