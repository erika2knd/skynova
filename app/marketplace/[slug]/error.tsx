"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    // Log error for debugging or monitoring
    console.error("Skin page error:", error);
  }, [error]);

  return (
    <main className="relative mt-12">
      <div className="mx-auto max-w-3xl px-6 py-20 text-center">
        <h1 className="text-3xl font-extrabold text-white">
          Something went wrong
        </h1>

        <p className="mt-3 text-white/60">
          We couldn’t load this skin right now. Please try again or return to the marketplace.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button
            onClick={reset}
            className="rounded-xl bg-[#535EFE] px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90"
          >
            Try again
          </button>

          <Link
            href="/marketplace"
            className="rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white/80 transition hover:bg-white/10"
          >
            Back to marketplace
          </Link>
        </div>
      </div>
    </main>
  );
}
