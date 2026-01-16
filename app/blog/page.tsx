import Image from "next/image";
import Link from "next/link";

type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  date: string; // ISO or readable
  category: string;
  cover: string;
  readTime: string;
};

const posts: BlogPost[] = [
  {
    slug: "how-to-choose-skins",
    title: "How to choose skins that keep their value",
    excerpt:
      "A practical guide to understanding float, rarity, collections and what really impacts long-term pricing.",
    date: "Jan 16, 2026",
    category: "Guides",
    cover: "/images/reviews-bg.png",
    readTime: "6 min",
  },
  {
    slug: "what-is-float-value",
    title: "Float value explained (simple & visual)",
    excerpt:
      "Factory New, Minimal Wear, Field-Tested… Here’s how float works and how it changes the look and price.",
    date: "Jan 10, 2026",
    category: "Basics",
    cover: "/images/hero.png",
    readTime: "4 min",
  },
  {
    slug: "best-deals-strategy",
    title: "Best deal strategy: discounts that matter",
    excerpt:
      "Not every discount is a bargain. Learn how to spot real opportunities and avoid traps.",
    date: "Dec 28, 2025",
    category: "Market",
    cover: "/images/reviews-bg.png",
    readTime: "5 min",
  },
];

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/75 backdrop-blur">
      {children}
    </span>
  );
}

export default function BlogPage() {
  return (
    <main className="relative mt-12">
      {/* glow */}
      <div className="pointer-events-none absolute left-[-120px] top-[-140px] h-[420px] w-[420px] rounded-full bg-purple-600/25 blur-3xl" />
      <div className="pointer-events-none absolute right-[-160px] top-[240px] h-[520px] w-[520px] rounded-full bg-indigo-500/20 blur-3xl" />

      <div className="mx-auto max-w-[1240px] px-6 py-12 lg:px-24 lg:py-16">
        {/* header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="mb-2 text-sm text-white/60">
              <Link href="/" className="hover:text-white">
                Home
              </Link>{" "}
              <span className="text-white/30">/</span>{" "}
              <span className="text-white/80">Blog</span>
            </div>

            <h1 className="text-4xl font-extrabold uppercase tracking-[-0.02em] text-white md:text-6xl">
              <span className="text-[#535EFE]">BLOG</span> UPDATES
            </h1>

            <p className="mt-3 max-w-2xl text-base text-white/70">
              Guides, market insights and product updates — written for players.
            </p>
          </div>

          {/* search (UI only for now) */}
          <div className="w-full md:w-[380px]">
            <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur">
              <span className="text-white/40">⌕</span>
              <input
                placeholder="Search posts"
                className="w-full bg-transparent text-sm text-white placeholder:text-white/35 outline-none"
              />
            </div>
          </div>
        </div>

        {/* featured post */}
        <div className="mt-10 overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur">
          <Link href={`/blog/${posts[0].slug}`} className="group block">
            <div className="relative h-[260px] w-full md:h-[340px]">
              <Image
                src={posts[0].cover}
                alt={posts[0].title}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 to-black/20" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#680BE2]/35 via-transparent to-[#535EFE]/25" />
            </div>

            <div className="p-6 sm:p-8">
              <div className="flex flex-wrap items-center gap-2">
                <Chip>{posts[0].category}</Chip>
                <Chip>{posts[0].date}</Chip>
                <Chip>{posts[0].readTime}</Chip>
              </div>

              <h2 className="mt-4 text-2xl font-extrabold text-white sm:text-3xl">
                {posts[0].title}
              </h2>
              <p className="mt-2 max-w-3xl text-sm leading-relaxed text-white/70">
                {posts[0].excerpt}
              </p>

              <div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-white/80 transition group-hover:text-white">
                Read article <span className="translate-y-[1px]">→</span>
              </div>
            </div>
          </Link>
        </div>

        {/* grid */}
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.slice(1).map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur transition hover:bg-white/10"
            >
              <div className="relative h-[180px] w-full">
                <Image src={post.cover} alt={post.title} fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/10" />
              </div>

              <div className="p-6">
                <div className="flex flex-wrap items-center gap-2">
                  <Chip>{post.category}</Chip>
                  <span className="text-xs text-white/50">{post.date}</span>
                  <span className="text-xs text-white/50">•</span>
                  <span className="text-xs text-white/50">{post.readTime}</span>
                </div>

                <h3 className="mt-4 text-lg font-extrabold text-white transition group-hover:text-white">
                  {post.title}
                </h3>

                <p className="mt-2 text-sm leading-relaxed text-white/70">
                  {post.excerpt}
                </p>

                <div className="mt-4 text-sm font-semibold text-white/70 transition group-hover:text-white">
                  Read more →
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
