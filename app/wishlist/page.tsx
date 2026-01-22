import Link from "next/link";
import WishlistClient from "@/components/sections/WishlistClient";

export const metadata = {
  title: "Wishlist — Skynova",
};

export default function WishlistPage() {
  return (
    <main className="relative mt-12">
      {/* Decorative glow */}
      <div className="pointer-events-none absolute left-[-120px] top-[-140px] h-[420px] w-[420px] rounded-full bg-purple-600/25 blur-3xl" />
      <div className="pointer-events-none absolute right-[-160px] top-[240px] h-[520px] w-[520px] rounded-full bg-indigo-500/20 blur-3xl" />

      <div className="mx-auto max-w-[1240px] px-6 lg:px-24">
        <div className="py-12 lg:py-16">
          {/* Breadcrumb */}
          <div className="mb-6 text-sm text-white/60">
            <Link href="/" className="hover:text-white">
              Home
            </Link>{" "}
            <span className="text-white/30">/</span>{" "}
            <span className="text-white/80">Wishlist</span>
          </div>

          <h1 className="text-4xl font-extrabold uppercase tracking-[-0.02em] text-white md:text-6xl">
            <span className="text-[#535EFE]">WISH</span>LIST
          </h1>

          <p className="mt-3 text-sm text-white/70">
            Save items you like and buy them later (demo UI).
          </p>

          {/* Pet project notice */}
          <div className="mt-6 rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur">
            <div className="text-sm font-extrabold text-white">Demo / Pet project notice</div>
            <p className="mt-2 text-sm leading-relaxed text-white/70">
              Wishlist is not connected to a real account yet. Later we’ll connect auth and persistence.
            </p>
          </div>

          <div className="mt-8">
            <WishlistClient />
          </div>
        </div>
      </div>
    </main>
  );
}
