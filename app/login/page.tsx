import Link from "next/link";
import type { Metadata } from "next";
import LoginForm from "@/components/sections/LoginForm";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Log in — Skynova",
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const { next = "/" } = await searchParams;

  return (
    <main className="relative mt-12">
      {/* glow */}
      <div className="pointer-events-none absolute left-[-120px] top-[-140px] h-[420px] w-[420px] rounded-full bg-purple-600/25 blur-3xl" />
      <div className="pointer-events-none absolute right-[-160px] top-[240px] h-[520px] w-[520px] rounded-full bg-indigo-500/20 blur-3xl" />

      <div className="mx-auto max-w-[1240px] px-6 py-12 lg:px-24 lg:py-16">
        <div className="mx-auto max-w-[560px]">
          {/* breadcrumb */}
          <div className="mb-6 text-sm text-white/60">
            <Link href="/" className="hover:text-white">
              Home
            </Link>{" "}
            <span className="text-white/30">/</span>{" "}
            <span className="text-white/80">Log in</span>
          </div>

          <h1 className="text-4xl font-extrabold uppercase tracking-[-0.02em] text-white md:text-5xl">
            <span className="text-[#535EFE]">LOG</span> IN
          </h1>

          <p className="mt-3 text-sm text-white/70">
            Sign in to use wishlist and cart (demo will become real).
          </p>

          <div className="mt-6">
            <LoginForm nextUrl={next} />
          </div>

          <div className="mt-6 text-center text-sm text-white/60">
            Don’t have an account?{" "}
            <Link href="/signup" className="font-semibold text-white/80 hover:text-white">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

