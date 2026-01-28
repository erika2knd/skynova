import { NextResponse, type NextRequest } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { mapSkin } from "@/lib/mappers/skin";

export async function GET(_req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug: raw } = await params;
  const slug = (raw ?? "").trim();

  if (!slug) {
    return NextResponse.json({ item: null, error: "BAD_REQUEST" }, { status: 400 });
  }

  try {
    const { data, error } = await supabaseAdmin()
      .from("skins")
      .select("*")
      .eq("slug", slug)
      .maybeSingle();

    if (error) {
      console.error("GET /api/skins/[slug] supabase error:", {
        slug,
        message: error.message,
        details: (error as any).details,
        hint: (error as any).hint,
        code: (error as any).code,
      });

      return NextResponse.json({ item: null, error: "DB_ERROR" }, { status: 500 });
    }

    if (!data) {
      return NextResponse.json({ item: null }, { status: 404 });
    }

    return NextResponse.json({ item: mapSkin(data) }, { status: 200 });
  } catch (e: any) {
    console.error("GET /api/skins/[slug] unexpected error:", { slug, error: e });
    return NextResponse.json({ item: null, error: "UNEXPECTED_ERROR" }, { status: 500 });
  }
}

