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
  storageAvailable: boolean; 
};

const CartContext = createContext<CartContextValue | null>(null);
const LS_KEY = "skynova:cart";

function safeRead<T>(key: string, fallback: T): { value: T; ok: boolean } {
  try {
    const v = readLS<T>(key, fallback);
    return { value: v, ok: true };
  } catch (e) {
    console.warn(`[Cart] localStorage read blocked for key "${key}"`, e);
    return { value: fallback, ok: false };
  }
}

function safeWrite<T>(key: string, value: T): boolean {
  try {
    writeLS(key, value);
    return true;
  } catch (e) {
    console.warn(`[Cart] localStorage write blocked for key "${key}"`, e);
    return false;
  }
}

function normalizeLines(input: unknown): CartLine[] {
  if (!Array.isArray(input)) return [];

  const map = new Map<string, number>();

  for (const x of input) {
    const slug = typeof (x as any)?.slug === "string" ? (x as any).slug.trim() : "";
    if (!slug) continue;

    const qtyRaw = Number((x as any)?.qty);
    const qty = Number.isFinite(qtyRaw) ? Math.max(1, Math.floor(qtyRaw)) : 1;

    map.set(slug, (map.get(slug) ?? 0) + qty);
  }

  return Array.from(map.entries()).map(([slug, qty]) => ({ slug, qty }));
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [storageAvailable, setStorageAvailable] = useState(true);

  useEffect(() => {
    const { value, ok } = safeRead<CartLine[]>(LS_KEY, []);
    setStorageAvailable(ok);
    setLines(normalizeLines(value));
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;

    const ok = safeWrite(LS_KEY, lines);
    if (!ok) setStorageAvailable(false);
  }, [lines, hydrated]);

  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key !== LS_KEY) return;

      const { value, ok } = safeRead<CartLine[]>(LS_KEY, []);
      setStorageAvailable(ok);
      setLines(normalizeLines(value));
    };

    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const add = useCallback((slug: string, qty = 1) => {
    const s = slug?.trim();
    if (!s) return;

    const qtyRaw = Number(qty);
    const safeQty = Number.isFinite(qtyRaw) ? Math.max(1, Math.floor(qtyRaw)) : 1;

    setLines((prev) => {
      const map = new Map(prev.map((l) => [l.slug, l.qty]));
      map.set(s, (map.get(s) ?? 0) + safeQty);
      return Array.from(map.entries()).map(([slug, qty]) => ({ slug, qty }));
    });
  }, []);

  const remove = useCallback((slug: string) => {
    const s = slug?.trim();
    if (!s) return;

    setLines((prev) => prev.filter((l) => l.slug !== s));
  }, []);

  const clear = useCallback(() => setLines([]), []);

  const count = useMemo(() => lines.reduce((sum, l) => sum + l.qty, 0), [lines]);

  const value = useMemo<CartContextValue>(() => {
    return { lines, count, hydrated, storageAvailable, add, remove, clear };
  }, [lines, count, hydrated, storageAvailable, add, remove, clear]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
