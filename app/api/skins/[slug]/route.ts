import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

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
    statTrak: Boolean((data as any).stattrak),
    floatValue: (data as any).float_value ?? (data as any).floatValue ?? "",
  };

  return NextResponse.json({ item });
}

