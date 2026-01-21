import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";

export async function GET(
  _req: Request,
  { params }: { params: { slug: string } }
) {
  // Get slug from URL params
  const slug = params.slug;

  // Fetch a single item by slug
  const { data, error } = await supabaseAdmin
    .from("skins")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();

  if (error) {
    console.error("GET /api/skins/[slug] error:", error);
    return NextResponse.json({ item: null }, { status: 500 });
  }

  // If not found, return 404
  if (!data) {
    return NextResponse.json({ item: null }, { status: 404 });
  }

  // Normalize field name for frontend (stattrak -> statTrak)
  const item = { ...data, statTrak: (data as any).stattrak };

  return NextResponse.json({ item });
}

