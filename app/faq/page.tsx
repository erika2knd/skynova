import Link from "next/link";
import FaqAccordion from "@/components/sections/FaqAccordion";

export const metadata = {
  title: "FAQ — Skynova",
};

export default function FAQPage() {
  return (
    <main className="relative mt-12">
      {/* glow */}
      <div className="pointer-events-none absolute left-[-120px] top-[-140px] h-[520px] w-[520px] rounded-full bg-purple-600/25 blur-3xl" />
      <div className="pointer-events-none absolute right-[-160px] top-[300px] h-[520px] w-[520px] rounded-full bg-indigo-500/20 blur-3xl" />

      <div className="mx-auto max-w-[1240px] px-6 py-12 lg:px-24 lg:py-16">
        {/* breadcrumb */}
        <div className="mb-6 flex flex-wrap items-center gap-2 text-sm text-white/60">
          <Link href="/" className="hover:text-white">
            Home
          </Link>
          <span className="text-white/30">/</span>
          <span className="text-white/80">FAQ</span>
        </div>

        {/* title */}
        <h1 className="text-4xl font-extrabold uppercase tracking-[-0.02em] text-white md:text-6xl">
          <span className="text-[#535EFE]">FAQ</span> / HELP
        </h1>

        <p className="mt-4 max-w-2xl text-base text-white/70">
          Here you can find answers about buying, selling, delivery, and account settings.
        </p>

        {/* accordion */}
        <div className="mt-10">
          <FaqAccordion />
        </div>

        {/* support box */}
        <div className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur sm:p-8">
          <div className="text-lg font-extrabold text-white">Still have questions?</div>
          <p className="mt-2 text-sm text-white/70">
            Contact us and we’ll help you as soon as possible.
          </p>

          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href="/marketplace"
              className="inline-flex items-center justify-center rounded-2xl border border-white/12 bg-white/5 px-5 py-3 text-sm font-semibold text-white/90 transition hover:bg-white/10"
            >
              Explore Marketplace
            </Link>

            <a
              href="mailto:support@skynova.com"
              className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-purple-500 to-indigo-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-purple-500/20 transition hover:brightness-110"
            >
              Email support
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
