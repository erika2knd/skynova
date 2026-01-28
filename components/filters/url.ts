import type { Filters } from "@/components/filters/types";

export const DEFAULT_FILTERS: Filters = {
  priceMin: "",
  priceMax: "",
  exterior: [],
  statTrak: "any",
};

export function parseFiltersFromSearchParams(sp: URLSearchParams): Filters {
  const priceMin = sp.get("min") ?? "";
  const priceMax = sp.get("max") ?? "";

  const st = sp.get("st") ?? "any";
  const statTrak: Filters["statTrak"] = st === "only" || st === "without" ? st : "any";

  const ex = sp.get("ex") ?? ""; 
  const exterior = ex ? ex.split(",").map((v) => v.trim()).filter(Boolean) : [];

  return { priceMin, priceMax, exterior, statTrak };
}

export function writeFiltersToSearchParams(sp: URLSearchParams, filters: Filters) {
  if (filters.priceMin.trim()) sp.set("min", filters.priceMin.trim());
  else sp.delete("min");

  if (filters.priceMax.trim()) sp.set("max", filters.priceMax.trim());
  else sp.delete("max");

  if (filters.statTrak !== "any") sp.set("st", filters.statTrak);
  else sp.delete("st");

  if (filters.exterior.length > 0) {
    sp.set("ex", filters.exterior.map((x) => x.trim()).filter(Boolean).join(","));
  } else {
    sp.delete("ex");
  }
}

export const DEFAULT_CATEGORY = "All";

export function parseCategoryFromSearchParams(sp: URLSearchParams): string {
  return sp.get("cat") ?? DEFAULT_CATEGORY;
}

export function writeCategoryToSearchParams(sp: URLSearchParams, category: string) {
  if (category && category !== DEFAULT_CATEGORY) sp.set("cat", category);
  else sp.delete("cat");
}

export type SortKey = "best" | "newest" | "price_low" | "price_high";
export const DEFAULT_SORT: SortKey = "best";

export function parseSortFromSearchParams(sp: URLSearchParams): SortKey {
  const v = sp.get("sort");
  if (v === "best" || v === "newest" || v === "price_low" || v === "price_high") return v;
  return DEFAULT_SORT;
}

export function writeSortToSearchParams(sp: URLSearchParams, sort: SortKey) {
  if (sort !== DEFAULT_SORT) sp.set("sort", sort);
  else sp.delete("sort");
}

export function parseQueryFromSearchParams(sp: URLSearchParams): string {
  return sp.get("q") ?? "";
}

export function writeQueryToSearchParams(sp: URLSearchParams, q: string) {
  const v = q.trim();
  if (v) sp.set("q", v);
  else sp.delete("q");
}

export type CurrencyKey = "usd" | "eur";
export const DEFAULT_CURRENCY: CurrencyKey = "usd";

export function parseCurrencyFromSearchParams(sp: URLSearchParams): CurrencyKey {
  const v = sp.get("currency");
  return v === "eur" ? "eur" : "usd";
}

export function writeCurrencyToSearchParams(sp: URLSearchParams, currency: CurrencyKey) {
  if (currency !== DEFAULT_CURRENCY) sp.set("currency", currency);
  else sp.delete("currency");
}

export type ViewKey = "grid" | "list";

export function parseViewFromSearchParams(sp: URLSearchParams): ViewKey {
  const v = sp.get("view");
  return v === "list" ? "list" : "grid";
}

export function writeViewToSearchParams(sp: URLSearchParams, view: ViewKey) {
  if (view === "grid") sp.delete("view");
  else sp.set("view", view);
}



