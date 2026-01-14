import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { demoSkins } from "@/components/data/demoSkins";

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80 backdrop-blur">
      {children}
    </span>
  );
}

function StatRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-xl border border-white/10 bg-white/5 px-4 py-3">
      <span className="text-sm text-white/60">{label}</span>
      <span className="text-sm text-white/90">{value}</span>
    </div>
  );
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const skin = demoSkins.find((s) => s.slug === slug);
  if (!skin) notFound();

  const name = `${skin.weapon} | ${skin.skin}`;
  const similar = demoSkins.filter((s) => s.slug !== skin.slug).slice(0, 4);

  return (
    <main className="relative">
      {/* glow */}
      <div className="pointer-events-none absolute left-[-120px] top-[-120px] h-[420px] w-[420px] rounded-full bg-purple-600/30 blur-3xl" />
      <div className="pointer-events-none absolute right-[-140px] top-[240px] h-[520px] w-[520px] rounded-full bg-indigo-500/25 blur-3xl" />

      <div className="mx-auto max-w-7xl px-6 py-10 lg:px-24 lg:py-14">
        {/* Breadcrumbs */}
        <div className="mb-6 flex flex-wrap items-center gap-2 text-sm text-white/60">
          <Link href="/marketplace" className="hover:text-white">
            Marketplace
          </Link>
          <span className="text-white/30">/</span>
          <span className="text-white/80">{name}</span>
        </div>

        <section className="grid gap-6 lg:grid-cols-12">
          {/* left */}
          <div className="lg:col-span-7">
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur">
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-purple-500/15 via-transparent to-indigo-500/10" />

              <div className="relative p-6 sm:p-8">
                <div className="mb-4 flex flex-wrap gap-2">
                  {skin.statTrak && <Chip>StatTrak™</Chip>}
                  <Chip>{skin.exterior}</Chip>
                  <Chip>{skin.category}</Chip>
                  <Chip>{skin.collection}</Chip>
                </div>

                <div className="relative mx-auto aspect-[16/9] w-full">
                  <Image
                    src={skin.image}
                    alt={name}
                    fill
                    className="object-contain drop-shadow-[0_18px_40px_rgba(0,0,0,0.45)]"
                    priority
                  />
                </div>

                <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
                  <StatRow label="Float" value={skin.floatValue} />
                  <StatRow label="Discount" value={`${skin.discount}%`} />
                  <StatRow label="ID" value={skin.id} />
                </div>
              </div>
            </div>
          </div>

          {/* right */}
          <div className="lg:col-span-5">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur sm:p-8">
              <h1 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
                {name}
              </h1>

              <p className="mt-2 text-sm text-white/60">
                The ultimate marketplace for Counter-Strike skins — buy and sell with ease.
              </p>

              <div className="mt-6 rounded-2xl border border-white/10 bg-black/20 p-5">
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <div className="text-sm text-white/60">Price</div>
                    <div className="mt-1 text-3xl font-extrabold text-white">
                      ${skin.price.toLocaleString("en-US")}
                    </div>
                  </div>

                  <div className="text-right text-xs text-white/50">
                    <div>Secure checkout</div>
                    <div>Instant delivery</div>
                  </div>
                </div>

                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <button className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-purple-500 to-indigo-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-purple-500/20 transition hover:brightness-110">
                    Buy now
                  </button>

                  <button className="inline-flex items-center justify-center rounded-2xl border border-white/12 bg-white/5 px-5 py-3 text-sm font-semibold text-white/90 transition hover:bg-white/10">
                    Add to wishlist
                  </button>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <StatRow label="Exterior" value={skin.exterior} />
                <StatRow label="Category" value={skin.category} />
                <StatRow label="Float value" value={skin.floatValue} />
                <StatRow label="StatTrak" value={skin.statTrak ? "Yes" : "No"} />
              </div>
            </div>
          </div>
        </section>

        {/* Similar */}
        <section className="mt-12">
          <div className="mb-5 flex items-end justify-between gap-4">
            <h2 className="text-xl font-extrabold text-white sm:text-2xl">Similar items</h2>

            <Link
              href="/marketplace"
              className="text-sm font-semibold text-white/70 hover:text-white"
            >
              Back to Marketplace →
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {similar.map((item) => (
              <Link
                key={item.slug}
                href={`/marketplace/${item.slug}`}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur transition hover:bg-white/8"
              >
                <div className="pointer-events-none absolute inset-0 opacity-0 transition group-hover:opacity-100">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/15 via-transparent to-indigo-500/15" />
                </div>

                <div className="relative">
                  <div className="mb-3 flex items-center gap-2">
                    {item.statTrak && <Chip>StatTrak™</Chip>}
                    <Chip>{item.exterior}</Chip>
                  </div>

                  <div className="relative mx-auto aspect-[16/10] w-full">
                    <Image
                      src={item.image}
                      alt={`${item.weapon} | ${item.skin}`}
                      fill
                      className="object-contain transition duration-300 group-hover:scale-[1.03]"
                    />
                  </div>

                  <div className="mt-4 text-sm font-semibold text-white">
                    {item.weapon} | {item.skin}
                  </div>

                  <div className="mt-2 flex items-center justify-between text-sm">
                    <span className="text-white/80">${item.price.toLocaleString("en-US")}</span>
                    <span className="text-white/45">Float {item.floatValue}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
