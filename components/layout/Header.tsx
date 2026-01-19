"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import CartLink from "@/components/layout/header/CartLink";
import WishlistLink from "@/components/layout/header/WishlistLink";

const navItems = [
  { label: "Marketplace", href: "/marketplace" },
  { label: "FAQ", href: "/faq" },
  { label: "Blog", href: "/blog" },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="mx-auto max-w-[1240px] px-4 sm:px-6">
        <div className="mt-4 flex items-center justify-between rounded-[20px] border border-white/10 bg-white/[0.06] px-4 sm:px-6 py-3 backdrop-blur-2xl">
          {/* Logo */}
          <Link href="/" className="flex items-center shrink-0">
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
              <Link
                key={item.href}
                href={item.href}
                className="transition hover:text-white"
              >
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

            {/* Burger (mobile) */}
            <button
              type="button"
              onClick={() => setIsMenuOpen(true)}
              className="inline-flex md:hidden items-center justify-center px-3 py-2 text-sm text-white/80"
              aria-label="Open menu"
            >
              {/* simple burger */}
              <span className="block h-[2px] w-5 bg-white/80 relative">
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
          <div className="absolute right-0 top-0 h-full w-[86%] max-w-sm border-l border-white/10 bg-[#0B0F1A]/70 backdrop-blur-2xl p-5">
            <div className="flex items-center justify-between">
              <span className="text-white/90 font-medium">Menu</span>
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

            <div className="mt-6 grid grid-cols-2 gap-3">
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

