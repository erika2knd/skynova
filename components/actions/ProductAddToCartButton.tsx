"use client";

import { useCart } from "@/context/cart-context";

export default function ProductAddToCartButton({ slug }: { slug: string }) {
  const { add } = useCart();

  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        add(slug, 1);
      }}
      className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-purple-500 to-indigo-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-purple-500/20 transition hover:brightness-110"
      aria-label="Add to cart"
      title="Add to cart"
    >
      Add to cart
    </button>
  );
}
