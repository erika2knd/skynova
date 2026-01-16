"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { readLS, writeLS } from "@/lib/storage";

export type CartLine = { slug: string; qty: number };

type CartContextValue = {
  lines: CartLine[];
  count: number; // total qty
  add: (slug: string, qty?: number) => void;
  remove: (slug: string) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);
const LS_KEY = "skynova:cart";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);

  useEffect(() => {
    setLines(readLS<CartLine[]>(LS_KEY, []));
  }, []);

  useEffect(() => {
    writeLS(LS_KEY, lines);
  }, [lines]);

  const value = useMemo<CartContextValue>(() => {
    const add = (slug: string, qty = 1) => {
      const safeQty = Math.max(1, Math.floor(qty || 1));
      setLines((prev) => {
        const existing = prev.find((l) => l.slug === slug);
        if (!existing) return [...prev, { slug, qty: safeQty }];
        return prev.map((l) => (l.slug === slug ? { ...l, qty: l.qty + safeQty } : l));
      });
    };

    const remove = (slug: string) => setLines((prev) => prev.filter((l) => l.slug !== slug));
    const clear = () => setLines([]);

    const count = lines.reduce((sum, l) => sum + l.qty, 0);

    return { lines, count, add, remove, clear };
  }, [lines]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
