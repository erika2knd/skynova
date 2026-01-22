"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { supabaseBrowser } from "@/lib/supabase/browser";

function sanitizeNextUrl(nextUrl: string) {
  if (!nextUrl) return "/";
  try {
    const decoded = decodeURIComponent(nextUrl);
    return decoded.startsWith("/") ? decoded : "/";
  } catch {
    return "/";
  }
}

export default function LoginForm({ nextUrl }: { nextUrl: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (loading) return;

    setError("");
    setLoading(true);

    try {
      const supabase = supabaseBrowser();

      const { error } = await supabase.auth.signInWithPassword({
        email: email.trim().toLowerCase(),
        password,
      });

      if (error) {
        setError(error.message);
        return;
      }

      const safeNext = sanitizeNextUrl(nextUrl);
      router.replace(safeNext);
      router.refresh();
    } catch {
      setError("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
      <div className="space-y-3">
        <input
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          autoComplete="email"
          className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none"
        />
        <input
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          type="password"
          autoComplete="current-password"
          className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none"
        />

        {error ? <p className="text-sm text-red-300">{error}</p> : null}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-2xl bg-gradient-to-r from-purple-500 to-indigo-500 px-5 py-3 text-sm font-semibold text-white transition hover:brightness-110 disabled:opacity-60"
        >
          {loading ? "Loading..." : "Log in"}
        </button>
      </div>
    </form>
  );
}

