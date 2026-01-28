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
  storageAvailable: boolean; // NEW: useful for debugging/UX
};

const WishlistContext = createContext<WishlistContextValue | null>(null);
const LS_KEY = "skynova:wishlist";

// Helpers: safe wrappers so provider never crashes if storage is blocked
function safeRead<T>(key: string, fallback: T): { value: T; ok: boolean } {
  try {
    const v = readLS<T>(key, fallback);
    return { value: v, ok: true };
  } catch (e) {
    console.warn(`[Wishlist] localStorage read blocked for key "${key}"`, e);
    return { value: fallback, ok: false };
  }
}

function safeWrite<T>(key: string, value: T): boolean {
  try {
    writeLS(key, value);
    return true;
  } catch (e) {
    console.warn(`[Wishlist] localStorage write blocked for key "${key}"`, e);
    return false;
  }
}

function normalizeSlugs(input: unknown): string[] {
  if (!Array.isArray(input)) return [];
  const cleaned = input
    .map((x) => (typeof x === "string" ? x.trim() : ""))
    .filter(Boolean);
  // unique
  return Array.from(new Set(cleaned));
}

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [storageAvailable, setStorageAvailable] = useState(true);

  // load
  useEffect(() => {
    const { value, ok } = safeRead<string[]>(LS_KEY, []);
    setStorageAvailable(ok);

    // ensure we never store garbage
    setItems(normalizeSlugs(value));
    setHydrated(true);
  }, []);

  // persist (only after hydration)
  useEffect(() => {
    if (!hydrated) return;

    // If storage is blocked, we still keep wishlist in memory
    const ok = safeWrite(LS_KEY, items);
    if (!ok) setStorageAvailable(false);
  }, [items, hydrated]);

  // sync across tabs (only if storage is available)
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key !== LS_KEY) return;

      // Re-read via safe wrapper (storage might be blocked on some browsers)
      const { value, ok } = safeRead<string[]>(LS_KEY, []);
      setStorageAvailable(ok);
      setItems(normalizeSlugs(value));
    };

    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const isInWishlist = useCallback((slug: string) => items.includes(slug), [items]);

  const toggle = useCallback((slug: string) => {
    const s = slug?.trim();
    if (!s) return;

    setItems((prev) => {
      const set = new Set(prev);
      if (set.has(s)) set.delete(s);
      else set.add(s);
      return Array.from(set);
    });
  }, []);

  const remove = useCallback((slug: string) => {
    const s = slug?.trim();
    if (!s) return;

    setItems((prev) => prev.filter((x) => x !== s));
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const value = useMemo<WishlistContextValue>(() => {
    return {
      items,
      count: items.length,
      hydrated,
      storageAvailable,
      isInWishlist,
      toggle,
      remove,
      clear,
    };
  }, [items, hydrated, storageAvailable, isInWishlist, toggle, remove, clear]);

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used within WishlistProvider");
  return ctx;
}
