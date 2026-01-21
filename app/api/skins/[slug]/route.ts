import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";

export async function GET(
  _req: Request,
  { params }: { params: { slug: string } }
) {
  const slug = params.slug;

  const { data, error } = await supabaseAdmin
    .from("skins")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();

  if (error) {
    return NextResponse.json({ item: null }, { status: 500 });
  }

  if (!data) {
    return NextResponse.json({ item: null }, { status: 404 });
  }

  const item = {
    ...data,
    statTrak: (data as any).stattrak,
  };

  return NextResponse.json({ item });
}

