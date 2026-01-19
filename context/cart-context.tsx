"use client";

import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { readLS, writeLS } from "@/lib/storage";

export type CartLine = { slug: string; qty: number };

type CartContextValue = {
  lines: CartLine[];
  count: number;
  add: (slug: string, qty?: number) => void;
  remove: (slug: string) => void;
  clear: () => void;
  hydrated: boolean;
};

const CartContext = createContext<CartContextValue | null>(null);
const LS_KEY = "skynova:cart";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [hydrated, setHydrated] = useState(false);

  // load
  useEffect(() => {
    setLines(readLS<CartLine[]>(LS_KEY, []));
    setHydrated(true);
  }, []);

  // persist (only after hydration)
  useEffect(() => {
    if (!hydrated) return;
    writeLS(LS_KEY, lines);
  }, [lines, hydrated]);

  // sync across tabs
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key !== LS_KEY) return;
      setLines(readLS<CartLine[]>(LS_KEY, []));
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const add = useCallback((slug: string, qty = 1) => {
    const safeQty = Math.max(1, Math.floor(qty || 1));
    setLines((prev) => {
      const existing = prev.find((l) => l.slug === slug);
      if (!existing) return [...prev, { slug, qty: safeQty }];
      return prev.map((l) => (l.slug === slug ? { ...l, qty: l.qty + safeQty } : l));
    });
  }, []);

  const remove = useCallback((slug: string) => {
    setLines((prev) => prev.filter((l) => l.slug !== slug));
  }, []);

  const clear = useCallback(() => setLines([]), []);

  const count = useMemo(() => lines.reduce((sum, l) => sum + l.qty, 0), [lines]);

  const value = useMemo<CartContextValue>(() => {
    return { lines, count, hydrated, add, remove, clear };
  }, [lines, count, hydrated, add, remove, clear]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
