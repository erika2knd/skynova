import Link from "next/link";

export default function NotFound() {
  return (
    <main className="relative flex min-h-[80vh] items-center justify-center px-6">
      {/* glow */}
      <div className="pointer-events-none absolute left-[-120px] top-[-120px] h-[420px] w-[420px] rounded-full bg-purple-600/30 blur-3xl" />
      <div className="pointer-events-none absolute right-[-140px] top-[240px] h-[520px] w-[520px] rounded-full bg-indigo-500/25 blur-3xl" />

      <div className="relative z-10 max-w-xl text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-white/50">
          Error 404
        </p>

        <h1 className="mt-4 text-4xl font-extrabold text-white sm:text-6xl">
          Page not found
        </h1>

        <p className="mt-4 text-base text-white/70">
          This page doesn’t exist or has been moved.
          <br />
          The project is a demo, so some pages may be intentionally unavailable.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-purple-500 to-indigo-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-purple-500/20 transition hover:brightness-110"
          >
            Back to Home
          </Link>

          <Link
            href="/marketplace"
            className="inline-flex items-center justify-center rounded-2xl border border-white/12 bg-white/5 px-6 py-3 text-sm font-semibold text-white/90 transition hover:bg-white/10"
          >
            Explore Marketplace
          </Link>
        </div>
      </div>
    </main>
  );
}
