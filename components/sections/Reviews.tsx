"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";

type Review = {
  id: string;
  title: string;
  text: string;
  user: string;
  date: string;
  rating: number; 
};

const reviews: Review[] = [
  {
    id: "1",
    title: "A trusted marketplace...",
    text: "A trusted marketplace for buying and selling skins. Fast transactions, fair prices, and a smooth experience every time.",
    user: "User1293874",
    date: "Mar 8, 2024",
    rating: 5,
  },
  {
    id: "2",
    title: "Great user interface...",
    text: "Great UI and easy navigation. I found what I needed quickly and the pricing feels transparent.",
    user: "User4821901",
    date: "Apr 2, 2024",
    rating: 5,
  },
  {
    id: "3",
    title: "The catalog is well-structured...",
    text: "The catalog is well-structured. Filters make it easy to browse and compare skins.",
    user: "User0091283",
    date: "Apr 19, 2024",
    rating: 5,
  },
  {
    id: "4",
    title: "Everything feels fast...",
    text: "Everything feels fast and polished. Would recommend to anyone who trades skins often.",
    user: "User7735120",
    date: "May 5, 2024",
    rating: 5,
  },
  {
    id: "5",
    title: "The visuals are amazing...",
    text: "The visuals are amazing, and the overall experience feels premium. Nice work!",
    user: "User5549200",
    date: "May 21, 2024",
    rating: 5,
  },
];

export default function Reviews() {
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(0);

  const pages = useMemo(() => {
    return reviews.length;
  }, []);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    const onScroll = () => {
      const children = Array.from(el.children) as HTMLElement[];
      if (children.length === 0) return;

      const left = el.getBoundingClientRect().left;
      let bestIdx = 0;
      let bestDist = Number.POSITIVE_INFINITY;

      children.forEach((child, idx) => {
        const dist = Math.abs(child.getBoundingClientRect().left - left);
        if (dist < bestDist) {
          bestDist = dist;
          bestIdx = idx;
        }
      });

      setActive(bestIdx);
    };

    el.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToIndex = (idx: number) => {
    const el = scrollerRef.current;
    if (!el) return;
    const child = el.children[idx] as HTMLElement | undefined;
    if (!child) return;
    child.scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });
  };

  return (
  <section className="relative overflow-hidden">
    {/* TOP: image background only for title */}
    <div className="relative overflow-hidden py-38">
      <div className="pointer-events-none absolute inset-0">
        <Image
          src="/images/reviews-bg.png"
          alt=""
          fill
          className="object-cover object-top"
          priority={false}
        />
        {/* overlays on image */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/60 to-[#222326]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#680BE2]/35 via-transparent to-[#535EFE]/20" />
      </div>

      <div className="relative mx-auto max-w-[1240px] px-6">
        <div className="text-center">
          <h2 className="text-5xl font-extrabold uppercase leading-[1.05] text-white md:text-6xl">
            BUILT BY PLAYERS
            <br />
            <span className="text-[#535EFE]">FOR PLAYERS</span>
          </h2>
        </div>
      </div>
    </div>

    {/* BOTTOM: plain background for subtitle + cards */}
    <div className="mx-auto max-w-[1240px] px-6 pb-24">
      <p className="mt-8 text-center text-xl font-extrabold text-white md:text-2xl">
        Trusted by players worldwide
      </p>

      <div className="mt-12">
        <div
          ref={scrollerRef}
          className="flex gap-6 overflow-x-auto scroll-smooth pb-3 pr-2"
          style={{ scrollSnapType: "x mandatory" }}
        >
          {reviews.map((r) => (
            <ReviewCard key={r.id} review={r} />
          ))}
        </div>

        {/* dots */}
        <div className="mt-10 flex items-center justify-center gap-2">
          {Array.from({ length: pages }).map((_, i) => (
            <button
              key={i}
              onClick={() => scrollToIndex(i)}
              className={`h-2 w-2 rounded-full transition ${
                i === active ? "bg-white" : "bg-white/25 hover:bg-white/40"
              }`}
              aria-label={`Go to review ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  </section>
);
}

function ReviewCard({ review }: { review: Review }) {
  return (
    <div
      className="shrink-0 w-[340px] rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-md md:w-[360px]"
      style={{ scrollSnapAlign: "start" }}
    >
      {/* stars */}
      <div className="flex items-center gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} filled={i < review.rating} />
        ))}
      </div>

      <p className="mt-6 text-lg font-extrabold leading-snug text-white">
        {review.title}
      </p>

      <p className="mt-4 text-sm leading-relaxed text-white/65">
        {review.text}
      </p>

      <div className="mt-10 flex items-center gap-3">
        <div className="grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white/70">
          <span className="text-lg">👤</span>
        </div>

        <div>
          <p className="text-sm font-semibold text-white/85">{review.user}</p>
          <p className="text-xs text-white/45">{review.date}</p>
        </div>
      </div>
    </div>
  );
}

function Star({ filled }: { filled: boolean }) {
  return (
    <span
      className={`inline-flex h-5 w-5 items-center justify-center rounded-[4px] ${
        filled ? "bg-[#535EFE]" : "bg-[#535EFE]/50"
      }`}
    >
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
        <path
          d="M12 17.27l5.18 3.05-1.64-5.81L20 9.24l-5.97-.52L12 3.5 9.97 8.72 4 9.24l4.46 5.27-1.64 5.81L12 17.27z"
          fill="white"
        />
      </svg>
    </span>
  );
}
