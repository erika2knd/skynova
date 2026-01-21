"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { supabaseBrowser } from "@/lib/supabase/browser";

// This hook checks Supabase auth on the client
// and redirects to /login if the user is not authenticated.
export function useRequireAuth() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const requireAuth = useCallback(async () => {
    // Build "next" URL so after login we can return back
    const query = searchParams?.toString();
    const nextUrl = query ? `${pathname}?${query}` : pathname;

    const supabase = supabaseBrowser();

    // Check current session
    const { data, error } = await supabase.auth.getSession();

    if (error || !data.session) {
      // Redirect to login and preserve "next" return URL
      router.push(`/login?next=${encodeURIComponent(nextUrl)}`);
      return false;
    }

    return true;
  }, [router, pathname, searchParams]);

  return { requireAuth };
}