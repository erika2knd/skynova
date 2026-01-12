import Image from "next/image";
import Link from "next/link";

export default function VipCollection() {
  return (
    <section className=" py-24">
      <div className="mx-auto max-w-[1240px] px-6">
        {/* Title */}
        <h2 className="text-center text-5xl font-extrabold uppercase tracking-[-0.02em] text-white md:text-6xl">
          <span className="text-[#535EFE]">VIP</span> COLLECTION
        </h2>

        {/* Card */}
        <div className="relative mt-14 overflow-visible">
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#1E2026] px-10 py-14 md:px-16">
            {/* gradient background */}
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute inset-0 bg-gradient-to-r from-[#680BE2]/55 via-[#1E2026]/70 to-[#535EFE]/45" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/10" />
            </div>

            {/* content */}
            <div className="relative z-10 grid items-center gap-10 md:grid-cols-2">
              {/* left */}
              <div className="max-w-md">
                <h3 className="text-4xl font-extrabold leading-[1.05] text-white">
                  Stand out from
                  <br />
                  the rest
                </h3>

                <p className="mt-6 max-w-sm text-base text-white/70">
                  Discover exclusive skins <br />
                  designed to make an impact.
                </p>

                <div className="mt-10">
                  <Link
                    href="/marketplace"
                    className="inline-flex flex-col items-start gap-4"
                  >
                    <span className="grid h-14 w-14 place-items-center rounded-full bg-white text-black transition hover:opacity-90">
                      <span className="text-2xl leading-none">↗</span>
                    </span>

                    <span className="text-sm font-extrabold tracking-widest text-white">
                      VIEW ALL
                    </span>
                  </Link>
                </div>
              </div>

              {/* right spacer */}
              <div className="hidden md:block" />
            </div>
          </div>

          {/* Knives image (overlapping) */}
          <div className="pointer-events-none absolute right-[-40px] top-1/2 z-20 w-[520px] -translate-y-1/2 drop-shadow-[0_25px_50px_rgba(0,0,0,0.55)] md:w-[620px]">
            <Image
              src="/images/knives.png"
              alt="VIP knives"
              width={900}
              height={700}
              className="h-auto w-full object-contain"
              priority={false}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
