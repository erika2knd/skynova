import Image from "next/image";
import type { ReactNode } from "react";
import Link from "next/link";

import { supabaseAdmin } from "@/lib/supabase/admin";

type LiveSkinRow = {
  id: string;
  slug: string;
  price: number;
  image: string;
  created_at: string;
};

async function fetchLiveFeedSkins(limit = 6) {
  // Fetch latest skins for the "Live feed" row (server-side)
  const { data, error } = await supabaseAdmin
    .from("skins")
    .select("id, slug, price, image, created_at")
    .order("created_at", { ascending: false })
    .limit(limit)
    .returns<LiveSkinRow[]>();

  // Fail softly: return empty list if Supabase has an error
  if (error || !data) return [];
  return data;
}

export default async function Hero() {
  const liveSkins = await fetchLiveFeedSkins(6);

  return (
    <section className="relative">
      {/* Background */}
      <div
        className="relative min-h-[680px] w-full overflow-hidden pb-24"
        style={{
          backgroundImage: "url(/images/hero.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#535EFE]/20 via-[#680BE2]/25 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0D12] via-transparent to-[#0B0D12]/20" />

        {/* Content */}
        <div className="relative mx-auto max-w-6xl px-6 pt-36">
          <h1 className="mt-4 max-w-3xl text-5xl font-extrabold leading-[1.05] tracking-tight md:text-6xl">
            DOMINATE IN STYLE
          </h1>

          <div className="mt-6 flex flex-wrap items-center gap-4 md:flex-nowrap">
            <span className="rounded-md bg-[#535EFE] px-4 py-2 text-base font-semibold leading-none text-white md:text-lg">
              Evolve your visual identity
            </span>

            <p className="text-base font-medium text-white/90 md:text-lg">
              The ultimate marketplace for Counter-Strike skins
            </p>
          </div>

          {/* Live feed */}
          <div className="mt-10 w-full max-w-[600px] rounded-3xl border border-white/10 bg-[#222326] p-6 backdrop-blur-2xl">
            {/* header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Image src="/images/live.svg" alt="" width={20} height={20} />
                <p className="text-base font-semibold text-white">Live feed</p>
              </div>
            </div>

            {/* cards row */}
            <div className="mt-6 flex gap-4 overflow-x-auto overflow-y-hidden pb-2 pr-2 snap-x snap-mandatory">
              {liveSkins.length === 0 ? (
                // Soft fallback UI if there are no items (or fetch failed)
                <div className="text-sm text-white/60">
                  No live items yet. Add skins to Supabase to see updates here.
                </div>
              ) : (
                liveSkins.map((skin) => (
                  <Link
                    key={skin.id}
                    href={`/marketplace/${skin.slug}`}
                    className="group shrink-0 snap-start"
                  >
                    <div className="animated-border rounded-2xl bg-gradient-to-r from-[#535EFE] via-[#680BE2] to-[#8E2BFF] p-[1px]">
                      <div
                        className="
                          relative h-[150px] w-[150px] rounded-2xl bg-[#222226] p-4
                          transition-transform duration-300
                          group-hover:scale-[1.04]
                        "
                      >
                        <p className="text-sm font-semibold text-white/90">
                          ${skin.price.toLocaleString("en-US")}
                        </p>

                        <div className="mt-3 flex justify-center">
                          <Image
                            src={skin.image}
                            alt=""
                            width={160}
                            height={64}
                            className="h-14 w-auto object-contain"
                          />
                        </div>

                        <div className="absolute bottom-3 left-3 grid h-8 w-8 place-items-center">
                          <Image src="/images/arrow.svg" alt="" width={16} height={16} />
                        </div>
                      </div>
                    </div>
                  </Link>
                ))
              )}
            </div>
          </div>

          {/* Cards */}
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            <FeatureCard
              icon="/images/telescope.svg"
              title={
                <>
                  Explore over <span className="text-[#535EFE]">1.2M</span>
                  <br />
                  skins
                </>
              }
            />
            <FeatureCard
              icon="/images/refresh.svg"
              title={
                <>
                  Buy <span className="text-[#535EFE]">& sell</span> <br /> with ease{" "}
                </>
              }
            />
            <FeatureCard
              icon="/images/diamond.svg"
              title={
                <>
                  Find the best <br />
                  <span className="text-[#535EFE]">deals</span>
                </>
              }
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ icon, title }: { icon: string; title: ReactNode }) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#222326] p-6 backdrop-blur">
      <div className="pointer-events-none absolute -top-20 -left-20 h-48 w-48 rounded-full bg-gradient-to-r from-[#535EFE] via-[#680BE2]/70 to-[#9553FE]/35 blur-3xl" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-black/0 via-black/0 to-black/20" />

      <div className="relative z-10">
        <div className="mb-6">
          <Image src={icon} alt="" width={26} height={26} />
        </div>

        <p className="text-3xl font-extrabold leading-tight text-white">{title}</p>
      </div>
    </div>
  );
}
