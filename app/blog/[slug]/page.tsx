import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";

type BlogPost = {
  slug: string;
  title: string;
  date: string;
  category: string;
  cover: string;
  readTime: string;
  content: string[];
};

const posts: BlogPost[] = [
  {
    slug: "how-to-choose-skins",
    title: "How to choose skins that keep their value",
    date: "Jan 16, 2026",
    category: "Guides",
    cover: "/images/reviews-bg.png",
    readTime: "6 min",
    content: [
      "Choosing skins is more than just looks. Understanding float, rarity and collection supply helps you avoid overpaying.",
      "Start with the basics: check exterior, compare float range, and verify historical price trends.",
      "Avoid hype-only purchases. Prefer liquid items with stable demand and transparent pricing.",
    ],
  },
  {
    slug: "what-is-float-value",
    title: "Float value explained (simple & visual)",
    date: "Jan 10, 2026",
    category: "Basics",
    cover: "/images/hero.png",
    readTime: "4 min",
    content: [
      "Float value is a number that represents wear. Lower float usually means a cleaner look and higher price.",
      "Two skins with the same exterior label can still look different — float is the reason.",
      "When buying, always check both the float and the actual preview image.",
    ],
  },
  {
    slug: "best-deals-strategy",
    title: "Best deal strategy: discounts that matter",
    date: "Dec 28, 2025",
    category: "Market",
    cover: "/images/reviews-bg.png",
    readTime: "5 min",
    content: [
      "A discount is only good if the baseline price is real. Compare with similar listings.",
      "Look for mispriced items, not flashy percentages.",
      "Build a watchlist and track prices over time.",
    ],
  },
];

function Chip({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/75 backdrop-blur">
      {children}
    </span>
  );
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const post = posts.find((p) => p.slug === slug);
  if (!post) notFound();

  return (
    <main className="relative mt-12">
      <div className="pointer-events-none absolute left-[-120px] top-[-140px] h-[420px] w-[420px] rounded-full bg-purple-600/25 blur-3xl" />
      <div className="pointer-events-none absolute right-[-160px] top-[240px] h-[520px] w-[520px] rounded-full bg-indigo-500/20 blur-3xl" />

      <article className="mx-auto max-w-[900px] px-6 py-12 lg:px-24 lg:py-16">
        <div className="mb-6 text-sm text-white/60">
          <Link href="/blog" className="hover:text-white">
            Blog
          </Link>{" "}
          <span className="text-white/30">/</span>{" "}
          <span className="text-white/80">{post.title}</span>
        </div>

        <h1 className="text-3xl font-extrabold text-white sm:text-5xl">
          {post.title}
        </h1>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <Chip>{post.category}</Chip>
          <Chip>{post.date}</Chip>
          <Chip>{post.readTime}</Chip>
        </div>

        <div className="mt-8 overflow-hidden rounded-3xl border border-white/10 bg-white/5">
          <div className="relative h-[240px] w-full sm:h-[320px]">
            <Image
              src={post.cover}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/10" />
          </div>
        </div>

        <div className="mt-10 space-y-5 text-base leading-relaxed text-white/75">
          {post.content.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>

        <div className="mt-12 flex justify-between gap-4">
          <Link
            href="/blog"
            className="inline-flex items-center justify-center rounded-2xl border border-white/12 bg-white/5 px-5 py-3 text-sm font-semibold text-white/90 transition hover:bg-white/10"
          >
            ← Back to Blog
          </Link>

          <Link
            href="/marketplace"
            className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-purple-500 to-indigo-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-purple-500/20 transition hover:brightness-110"
          >
            Explore Marketplace
          </Link>
        </div>
      </article>
    </main>
  );
}

