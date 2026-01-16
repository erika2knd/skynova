"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { readLS, writeLS } from "@/lib/storage";

type WishlistContextValue = {
  items: string[]; // slugs
  count: number;
  isInWishlist: (slug: string) => boolean;
  toggle: (slug: string) => void;
  remove: (slug: string) => void;
  clear: () => void;
};

const WishlistContext = createContext<WishlistContextValue | null>(null);
const LS_KEY = "skynova:wishlist";

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<string[]>([]);

  useEffect(() => {
    setItems(readLS<string[]>(LS_KEY, []));
  }, []);

  useEffect(() => {
    writeLS(LS_KEY, items);
  }, [items]);

  const value = useMemo<WishlistContextValue>(() => {
    const isInWishlist = (slug: string) => items.includes(slug);

    const toggle = (slug: string) => {
      setItems((prev) => (prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]));
    };

    const remove = (slug: string) => setItems((prev) => prev.filter((s) => s !== slug));
    const clear = () => setItems([]);

    return { items, count: items.length, isInWishlist, toggle, remove, clear };
  }, [items]);

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used within WishlistProvider");
  return ctx;
}
