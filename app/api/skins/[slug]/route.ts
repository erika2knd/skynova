import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { mapSkin } from "@/lib/mappers/skin";

export async function GET(
  _req: Request,
  { params }: { params: { slug: string } }
) {
  const slug = params.slug;

  const { data, error } = await supabaseAdmin()
    .from("skins")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();

  if (error) {
    console.error("GET /api/skins/[slug] error:", error);
    return NextResponse.json({ item: null }, { status: 500 });
  }

  if (!data) {
    return NextResponse.json({ item: null }, { status: 404 });
  }

  return NextResponse.json({ item: mapSkin(data) });
}
