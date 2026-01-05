export default function Hero() {
  return (
    <section className="relative">
      {/* Background */}
      <div
        className="relative h-[680px] w-full overflow-hidden"
        style={{
          backgroundImage: "url(/images/hero.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B0D12]/95 via-[#0B0D12]/55 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0D12] via-transparent to-[#0B0D12]/30" />

        {/* Content */}
        <div className="relative mx-auto max-w-6xl px-6 pt-36">
          <p className="text-sm font-medium text-white/70">
            Evolve your visual identity
          </p>

          <h1 className="mt-4 max-w-3xl text-5xl font-extrabold leading-[1.05] tracking-tight md:text-6xl">
            DOMINATE IN <span className="text-violet-400">STYLE</span>
          </h1>

          <p className="mt-5 max-w-xl text-base text-white/70 md:text-lg">
            The ultimate marketplace for Counter-Strike skins. Discover
            exclusive drops, track prices, and build your collection.
          </p>

          {/* Live feed */}
          <div className="mt-10 w-full max-w-xl rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold">Live feed</p>
              <span className="text-xs text-white/50">Updated now</span>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-white/10 bg-white/5 px-3 py-3"
                >
                  <div className="h-8 rounded-lg bg-white/10" />
                  <p className="mt-2 text-xs text-white/60">$ 59.99</p>
                  <p className="text-[10px] text-white/40">AK-47</p>
                </div>
              ))}
            </div>
          </div>

          {/* Cards */}
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            <FeatureCard
              title="Explore over 1.2M skins"
              subtitle="Browse the largest curated catalog."
            />
            <FeatureCard
              title="Buy & sell with ease"
              subtitle="Fast listings and smooth checkout."
            />
            <FeatureCard
              title="Find the best deals"
              subtitle="Track prices and spot discounts."
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function FeatureCard({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur transition hover:bg-white/10">
      <p className="text-lg font-semibold">{title}</p>
      <p className="mt-2 text-sm text-white/60">{subtitle}</p>
    </div>
  );
}
