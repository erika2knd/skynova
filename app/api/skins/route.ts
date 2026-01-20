import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const q = searchParams.get("q");
  const category = searchParams.get("category");
  const sort = searchParams.get("sort");
  const statTrak = searchParams.get("statTrak");
  const exterior = searchParams.getAll("exterior");
  const priceMin = searchParams.get("priceMin");
  const priceMax = searchParams.get("priceMax");

  // --- pagination
  const limitRaw = Number(searchParams.get("limit") ?? 20);
  const offsetRaw = Number(searchParams.get("offset") ?? 0);

  const limit = Number.isFinite(limitRaw) ? Math.min(Math.max(limitRaw, 1), 50) : 20;
  const offset = Number.isFinite(offsetRaw) ? Math.max(offsetRaw, 0) : 0;

  const from = offset;
  const to = offset + limit - 1;

  let queryBuilder = supabaseAdmin
    .from("skins")
    .select("*", { count: "exact" });

  /* -------- SEARCH -------- */
  if (q && q.trim()) {
    const qq = q.trim();
    queryBuilder = queryBuilder.or(
      `weapon.ilike.%${qq}%,skin.ilike.%${qq}%,collection.ilike.%${qq}%`
    );
  }

  /* -------- CATEGORY -------- */
  if (category && category !== "All") {
    queryBuilder = queryBuilder.eq("category", category);
  }

  /* -------- STATTRAK -------- */
  if (statTrak === "only") {
    queryBuilder = queryBuilder.eq("stattrak", true);
  }

  if (statTrak === "without") {
    queryBuilder = queryBuilder.eq("stattrak", false);
  }

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
  case "Price: low":
    queryBuilder = queryBuilder.order("price", { ascending: true });
    break;
  case "Price: high":
    queryBuilder = queryBuilder.order("price", { ascending: false });
    break;
  case "Best deal":
    queryBuilder = queryBuilder.order("discount", { ascending: true });
    break;
  case "Newest":
    queryBuilder = queryBuilder.order("created_at", { ascending: false });
    break;
  default:
    queryBuilder = queryBuilder.order("created_at", { ascending: false });
}


  // apply pagination
  const { data, error, count } = await queryBuilder.range(from, to);

  if (error) {
    console.error(error);
    return NextResponse.json({ items: [], total: 0, limit, offset }, { status: 500 });
  }

  return NextResponse.json({
    items: data ?? [],
    total: count ?? 0,
    limit,
    offset,
  });
}
