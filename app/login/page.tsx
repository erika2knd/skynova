import Link from "next/link";
import LoginForm from "@/components/sections/LoginForm";

export const metadata = {
  title: "Log in — Skynova",
};

export default function LoginPage({
  searchParams,
}: {
  searchParams?: { next?: string };
}) {
  // Pass "next" to the client form so it can redirect after login
  const nextUrl = searchParams?.next ?? "/";

  return (
    <main className="relative mt-12">
      {/* glow */}
      <div className="pointer-events-none absolute left-[-120px] top-[-140px] h-[420px] w-[420px] rounded-full bg-purple-600/25 blur-3xl" />
      <div className="pointer-events-none absolute right-[-160px] top-[240px] h-[520px] w-[520px] rounded-full bg-indigo-500/20 blur-3xl" />

      <div className="mx-auto max-w-[1240px] px-6 py-12 lg:px-24 lg:py-16">
        <div className="mx-auto max-w-[520px]">
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
            Demo authentication page for the marketplace UI.
          </p>

          {/* Pet project notice */}
          <div className="mt-6 rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur">
            <div className="text-sm font-extrabold text-white">Demo / Pet project notice</div>
            <p className="mt-2 text-sm leading-relaxed text-white/70">
              This is a portfolio project. Login is not connected to a real backend yet.
            </p>
          </div>

          {/* client form */}
          <div className="mt-6">
            <LoginForm nextUrl={nextUrl} />
          </div>

          <div className="mt-6 text-center text-xs text-white/45">
            By continuing, you agree to the{" "}
            <Link href="/terms" className="underline decoration-white/30 hover:text-white">
              Terms
            </Link>{" "}
            and{" "}
            <Link href="/privacy-policy" className="underline decoration-white/30 hover:text-white">
              Privacy Policy
            </Link>
            .
          </div>
        </div>
      </div>
    </main>
  );
}
