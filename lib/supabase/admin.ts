import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

console.log("ENV CHECK:", { url, hasService: !!serviceKey });

if (!url || !serviceKey) {
  throw new Error("Missing Supabase env vars in admin client");
}

export const supabaseAdmin = createClient(url, serviceKey, {
  auth: { persistSession: false },
});
