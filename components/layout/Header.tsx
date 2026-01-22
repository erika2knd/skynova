"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

import CartLink from "@/components/layout/header/CartLink";
import WishlistLink from "@/components/layout/header/WishlistLink";
import { supabaseBrowser } from "@/lib/supabase/browser";

const navItems = [
  { label: "Marketplace", href: "/marketplace" },
  { label: "FAQ", href: "/faq" },
  { label: "Blog", href: "/blog" },
];

export default function Header() {
  const router = useRouter();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Auth state
  const [isAuthed, setIsAuthed] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);

  // Close mobile menu by Esc
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  // Load session + subscribe to auth changes
  useEffect(() => {
    const supabase = supabaseBrowser();
    let mounted = true;

    async function init() {
      const { data } = await supabase.auth.getSession();
      if (!mounted) return;

      setIsAuthed(!!data.session);
      setAuthLoading(false);
    }

    init();

    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!mounted) return;
      setIsAuthed(!!session);
    });

    return () => {
      mounted = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  const showAuthButtons = useMemo(() => !authLoading && !isAuthed, [authLoading, isAuthed]);
  const showLogout = useMemo(() => !authLoading && isAuthed, [authLoading, isAuthed]);

  async function handleLogout() {
    const supabase = supabaseBrowser();
    await supabase.auth.signOut();

    setIsMenuOpen(false);
    router.replace("/");
    router.refresh();
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="mx-auto max-w-[1240px] px-4 sm:px-6">
        <div className="mt-4 flex items-center justify-between rounded-[20px] border border-white/10 bg-white/[0.06] px-4 py-3 backdrop-blur-2xl sm:px-6">
          {/* Logo */}
          <Link href="/" className="flex shrink-0 items-center">
            <Image
              src="/images/logo.png"
              alt="Skynova logo"
              width={140}
              height={28}
              priority
              className="h-7 w-auto"
            />
          </Link>

          {/* Nav (desktop) */}
          <nav className="hidden items-center gap-10 text-sm text-white/70 md:flex">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="transition hover:text-white">
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Language (desktop) */}
            <button className="hidden items-center gap-2 rounded-xl border border-white/10 bg-white/[0.06] px-4 py-2 text-sm text-white/80 backdrop-blur transition hover:bg-white/[0.10] md:inline-flex">
              EN <span className="text-white/60">▾</span>
            </button>

            {/* Icons (always visible) */}
            <div className="flex items-center gap-3">
              <div className="shrink-0">
                <WishlistLink />
              </div>
              <div className="shrink-0">
                <CartLink />
              </div>
            </div>

            {/* Auth (desktop) */}
            {showAuthButtons ? (
              <>
                <Link
                  href="/login"
                  className="hidden rounded-xl border border-white/10 bg-white/[0.06] px-4 py-2 text-sm text-white/80 backdrop-blur transition hover:bg-white/[0.10] md:inline-flex"
                >
                  Log in
                </Link>

                <Link
                  href="/signup"
                  className="hidden rounded-xl border border-white/10 bg-white/[0.06] px-4 py-2 text-sm text-white/80 backdrop-blur transition hover:bg-white/[0.10] md:inline-flex"
                >
                  Sign up
                </Link>
              </>
            ) : null}

            {showLogout ? (
              <button
                type="button"
                onClick={handleLogout}
                className="hidden rounded-xl border border-white/10 bg-white/[0.06] px-4 py-2 text-sm text-white/80 backdrop-blur transition hover:bg-white/[0.10] md:inline-flex"
              >
                Logout
              </button>
            ) : null}

            {/* Burger (mobile) */}
            <button
              type="button"
              onClick={() => setIsMenuOpen(true)}
              className="inline-flex items-center justify-center px-3 py-2 text-sm text-white/80 md:hidden"
              aria-label="Open menu"
            >
              <span className="relative block h-[2px] w-5 bg-white/80">
                <span className="absolute -top-2 left-0 h-[2px] w-5 bg-white/80" />
                <span className="absolute top-2 left-0 h-[2px] w-5 bg-white/80" />
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* backdrop */}
          <button
            aria-label="Close menu"
            className="absolute inset-0 bg-black/40"
            onClick={() => setIsMenuOpen(false)}
          />

          {/* panel */}
          <div className="absolute right-0 top-0 h-full w-[86%] max-w-sm border-l border-white/10 bg-[#0B0F1A]/70 p-5 backdrop-blur-2xl">
            <div className="flex items-center justify-between">
              <span className="font-medium text-white/90">Menu</span>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="rounded-xl border border-white/10 bg-white/[0.06] px-3 py-2 text-sm text-white/80 transition hover:bg-white/[0.10]"
              >
                Close
              </button>
            </div>

            <div className="mt-6 flex flex-col gap-3">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white/90 transition hover:bg-white/[0.08]"
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Auth (mobile) */}
            <div className="mt-6 grid grid-cols-2 gap-3">
              {showAuthButtons ? (
                <>
                  <Link
                    href="/login"
                    onClick={() => setIsMenuOpen(false)}
                    className="rounded-xl border border-white/10 bg-white/[0.06] px-4 py-3 text-center text-sm text-white/90 transition hover:bg-white/[0.10]"
                  >
                    Log in
                  </Link>
                  <Link
                    href="/signup"
                    onClick={() => setIsMenuOpen(false)}
                    className="rounded-xl border border-white/10 bg-white/[0.06] px-4 py-3 text-center text-sm text-white/90 transition hover:bg-white/[0.10]"
                  >
                    Sign up
                  </Link>
                </>
              ) : null}

              {showLogout ? (
                <button
                  type="button"
                  onClick={handleLogout}
                  className="col-span-2 rounded-xl border border-white/10 bg-white/[0.06] px-4 py-3 text-center text-sm text-white/90 transition hover:bg-white/[0.10]"
                >
                  Logout
                </button>
              ) : null}
            </div>

            <button
              className="mt-6 w-full rounded-xl border border-white/10 bg-white/[0.06] px-4 py-3 text-sm text-white/80 transition hover:bg-white/[0.10]"
              type="button"
            >
              EN <span className="text-white/60">▾</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

