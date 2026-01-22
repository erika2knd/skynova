import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { mapSkin } from "@/lib/mappers/skin";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const slugs = searchParams
    .getAll("slug")
    .map((s) => s.trim())
    .filter(Boolean);

  if (slugs.length === 0) {
    return NextResponse.json({ items: [] });
  }

  // Prevent overly large requests
  const limited = Array.from(new Set(slugs)).slice(0, 50);

  const { data, error } = await supabaseAdmin()
    .from("skins")
    .select("*")
    .in("slug", limited);

  if (error) {
    console.error("GET /api/skins/by-slugs error:", error);
    return NextResponse.json({ items: [] }, { status: 500 });
  }

  const items = (data ?? []).map(mapSkin);

  return NextResponse.json({ items });
}


