import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
import { supabaseAdmin } from "../lib/supabase/admin";
import { demoSkins } from "../components/data/demoSkins";

async function main() {
  const payload = demoSkins.map((s) => ({
    slug: s.slug,
    weapon: s.weapon,
    skin: s.skin,
    collection: s.collection,

    price: s.price,
    discount: s.discount,
    float_value: s.floatValue,

    icon: s.icon,
    image: s.image,

    category: s.category,
    exterior: s.exterior,
    stattrak: s.statTrak,
  }));

  const { error } = await supabaseAdmin()
    .from("skins")
    .upsert(payload, { onConflict: "slug" });

  if (error) {
    console.error("Seed error:", error);
    process.exit(1);
  }

  console.log(`✅ Seeded ${payload.length} skins into Supabase`);
}

main().catch((err) => {
  console.error("Seed crashed:", err);
  process.exit(1);
});
