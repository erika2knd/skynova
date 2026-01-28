import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { mapSkin } from "@/lib/mappers/skin";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const slugsRaw = searchParams.getAll("slug");
  const slugs = slugsRaw.map((s) => s.trim()).filter(Boolean);

  if (slugs.length === 0) {
    return NextResponse.json({ items: [] }, { status: 200 });
  }

  const seen = new Set<string>();
  const limited: string[] = [];
  for (const s of slugs) {
    if (!seen.has(s)) {
      seen.add(s);
      limited.push(s);
      if (limited.length >= 50) break;
    }
  }

  try {
    const { data, error } = await supabaseAdmin()
      .from("skins")
      .select("*")
      .in("slug", limited);

    if (error) {
      console.error("GET /api/skins/by-slugs supabase error:", {
        count: limited.length,
        sample: limited.slice(0, 3),
        message: error.message,
        details: (error as any).details,
        hint: (error as any).hint,
        code: (error as any).code,
      });

      return NextResponse.json({ items: [], error: "DB_ERROR" }, { status: 500 });
    }

    type SkinOut = ReturnType<typeof mapSkin> & { slug: string };

    const mapped = (data ?? []).map(mapSkin) as SkinOut[];

    const bySlug = new Map<string, SkinOut>();
    for (const item of mapped) {
      if (item?.slug) bySlug.set(item.slug, item);
    }

    const items = limited.map((s) => bySlug.get(s)).filter(Boolean) as SkinOut[];

    return NextResponse.json({ items }, { status: 200 });
  } catch (e: any) {
    console.error("GET /api/skins/by-slugs unexpected error:", {
      count: limited.length,
      sample: limited.slice(0, 3),
      error: e,
    });

    return NextResponse.json({ items: [], error: "UNEXPECTED_ERROR" }, { status: 500 });
  }
}



