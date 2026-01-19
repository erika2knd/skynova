"use client";

import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { readLS, writeLS } from "@/lib/storage";

type WishlistContextValue = {
  items: string[];
  count: number;
  isInWishlist: (slug: string) => boolean;
  toggle: (slug: string) => void;
  remove: (slug: string) => void;
  clear: () => void;
  hydrated: boolean;
};

const WishlistContext = createContext<WishlistContextValue | null>(null);
const LS_KEY = "skynova:wishlist";

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);

  // load
  useEffect(() => {
    setItems(readLS<string[]>(LS_KEY, []));
    setHydrated(true);
  }, []);

  // persist (only after hydration)
  useEffect(() => {
    if (!hydrated) return;
    writeLS(LS_KEY, items);
  }, [items, hydrated]);

  // sync across tabs
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key !== LS_KEY) return;
      setItems(readLS<string[]>(LS_KEY, []));
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const isInWishlist = useCallback((slug: string) => items.includes(slug), [items]);

  const toggle = useCallback((slug: string) => {
    setItems((prev) => (prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]));
  }, []);

  const remove = useCallback((slug: string) => {
    setItems((prev) => prev.filter((s) => s !== slug));
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const value = useMemo<WishlistContextValue>(() => {
    return {
      items,
      count: items.length,
      hydrated,
      isInWishlist,
      toggle,
      remove,
      clear,
    };
  }, [items, hydrated, isInWishlist, toggle, remove, clear]);

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used within WishlistProvider");
  return ctx;
}
