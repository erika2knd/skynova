"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { supabaseBrowser } from "@/lib/supabase/browser";

export function useRequireAuth() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const requireAuth = useCallback(async () => {
    if (pathname?.startsWith("/login")) return true;

    const query = searchParams?.toString();
    const nextUrl = query ? `${pathname}?${query}` : pathname;

    try {
      const supabase = supabaseBrowser();

      const { data, error } = await supabase.auth.getSession();

      if (error || !data?.session) {
        router.replace(`/login?next=${encodeURIComponent(nextUrl)}`);
        return false;
      }

      return true;
    } catch (e) {
      console.error("requireAuth unexpected error:", e);
      router.replace(`/login?next=${encodeURIComponent(nextUrl)}`);
      return false;
    }
  }, [router, pathname, searchParams]);

  return { requireAuth };
}
