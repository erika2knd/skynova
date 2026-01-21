export default function Loading() {
  return (
    <main className="relative mt-12">
      {/* Decorative glow */}
      <div className="pointer-events-none absolute left-[-120px] top-[-120px] h-[420px] w-[420px] rounded-full bg-purple-600/30 blur-3xl" />
      <div className="pointer-events-none absolute right-[-140px] top-[240px] h-[520px] w-[520px] rounded-full bg-indigo-500/25 blur-3xl" />

      <div className="mx-auto max-w-7xl px-6 py-10 lg:px-24 lg:py-14">
        {/* Breadcrumb skeleton */}
        <div className="mb-6 h-5 w-[420px] rounded-lg border border-white/10 bg-white/5" />

        <section className="grid gap-6 lg:grid-cols-12">
          {/* Left skeleton */}
          <div className="lg:col-span-7">
            <div className="h-[520px] rounded-3xl border border-white/10 bg-white/5" />
          </div>

          {/* Right skeleton */}
          <div className="lg:col-span-5">
            <div className="h-[520px] rounded-3xl border border-white/10 bg-white/5" />
          </div>
        </section>

        {/* Similar skeleton */}
        <section className="mt-12">
          <div className="mb-5 h-7 w-48 rounded-lg border border-white/10 bg-white/5" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-[220px] rounded-2xl border border-white/10 bg-white/5" />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
