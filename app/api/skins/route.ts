import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { mapSkin } from "@/lib/mappers/skin";

function sanitizeIlike(input: string) {
  return input.replaceAll("%", "\\%").replaceAll("_", "\\_").replaceAll(",", " ").trim();
}

type SortKey = "best" | "newest" | "price_low" | "price_high";

function parseSort(v: string | null): SortKey {
  if (v === "best" || v === "newest" || v === "price_low" || v === "price_high") return v;
  return "best";
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const q = searchParams.get("q");
  const category = searchParams.get("category");
  const sort = parseSort(searchParams.get("sort"));
  const statTrak = searchParams.get("statTrak");
  const exterior = searchParams.getAll("exterior");
  const priceMin = searchParams.get("priceMin");
  const priceMax = searchParams.get("priceMax");

  const limitRaw = Number(searchParams.get("limit") ?? 20);
  const offsetRaw = Number(searchParams.get("offset") ?? 0);

  const limit = Number.isFinite(limitRaw) ? Math.min(Math.max(limitRaw, 1), 50) : 20;
  const offset = Number.isFinite(offsetRaw) ? Math.max(offsetRaw, 0) : 0;

  const from = offset;
  const to = offset + limit - 1;

  try {
    let queryBuilder = supabaseAdmin().from("skins").select("*", { count: "exact" });

    /* -------- SEARCH -------- */
    if (q && q.trim()) {
      const qq = sanitizeIlike(q);
      if (qq) {
        queryBuilder = queryBuilder.or(
          `weapon.ilike.%${qq}%,skin.ilike.%${qq}%,collection.ilike.%${qq}%`
        );
      }
    }

    /* -------- CATEGORY -------- */
    if (category && category !== "All") {
      queryBuilder = queryBuilder.eq("category", category);
    }

    /* -------- STATTRAK -------- */
    if (statTrak === "only") queryBuilder = queryBuilder.eq("stattrak", true);
    if (statTrak === "without") queryBuilder = queryBuilder.eq("stattrak", false);

    /* -------- EXTERIOR -------- */
    if (exterior.length > 0) {
      queryBuilder = queryBuilder.in("exterior", exterior);
    }

    /* -------- PRICE -------- */
    if (priceMin && !Number.isNaN(Number(priceMin))) {
      queryBuilder = queryBuilder.gte("price", Number(priceMin));
    }
    if (priceMax && !Number.isNaN(Number(priceMax))) {
      queryBuilder = queryBuilder.lte("price", Number(priceMax));
    }

    /* -------- SORT -------- */
    switch (sort) {
      case "price_low":
        queryBuilder = queryBuilder.order("price", { ascending: true });
        break;
      case "price_high":
        queryBuilder = queryBuilder.order("price", { ascending: false });
        break;
      case "best":
        queryBuilder = queryBuilder.order("discount", { ascending: false });
        break;
      case "newest":
        queryBuilder = queryBuilder.order("created_at", { ascending: false });
        break;
      default:
        queryBuilder = queryBuilder.order("created_at", { ascending: false });
    }

    const { data, error, count } = await queryBuilder.range(from, to);

    if (error) {
      console.error("GET /api/skins supabase error:", {
        message: error.message,
        details: (error as any).details,
        hint: (error as any).hint,
        code: (error as any).code,
      });

      return NextResponse.json({ items: [], total: 0, limit, offset }, { status: 500 });
    }

    const items = (data ?? []).map(mapSkin);

    return NextResponse.json({
      items,
      total: count ?? 0,
      limit,
      offset,
    });
  } catch (e) {
    console.error("GET /api/skins unexpected error:", e);
    return NextResponse.json({ items: [], total: 0, limit, offset }, { status: 500 });
  }
}
