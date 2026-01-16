import Link from "next/link";

export const metadata = {
  title: "Privacy Policy — Skynova",
};

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mt-10 text-xl font-extrabold text-white sm:text-2xl">
      {children}
    </h2>
  );
}

function P({ children }: { children: React.ReactNode }) {
  return <p className="mt-3 text-sm leading-relaxed text-white/70">{children}</p>;
}

function Li({ children }: { children: React.ReactNode }) {
  return (
    <li className="mt-2 text-sm leading-relaxed text-white/70">
      <span className="text-white/50">• </span>
      {children}
    </li>
  );
}

export default function PrivacyPolicyPage() {
  const updated = "January 16, 2026";

  return (
    <main className="relative mt-12">
      {/* glow */}
      <div className="pointer-events-none absolute left-[-120px] top-[-140px] h-[420px] w-[420px] rounded-full bg-purple-600/25 blur-3xl" />
      <div className="pointer-events-none absolute right-[-160px] top-[240px] h-[520px] w-[520px] rounded-full bg-indigo-500/20 blur-3xl" />

      <div className="mx-auto max-w-[1000px] px-6 py-12 lg:px-24 lg:py-16">
        {/* breadcrumb */}
        <div className="mb-6 text-sm text-white/60">
          <Link href="/" className="hover:text-white">
            Home
          </Link>{" "}
          <span className="text-white/30">/</span>{" "}
          <span className="text-white/80">Privacy Policy</span>
        </div>

        <h1 className="text-4xl font-extrabold uppercase tracking-[-0.02em] text-white md:text-6xl">
          <span className="text-[#535EFE]">PRIVACY</span> POLICY
        </h1>

        <div className="mt-4 flex flex-wrap items-center gap-2 text-sm text-white/60">
          <span>Last updated: {updated}</span>
          <span className="text-white/30">•</span>
          <Link href="/terms" className="hover:text-white">
            Terms
          </Link>
          <span className="text-white/30">•</span>
          <Link href="/cookies" className="hover:text-white">
            Cookies
          </Link>
        </div>

        {/* Pet project disclaimer */}
        <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur sm:p-8">
          <div className="text-sm font-extrabold text-white">Demo / Pet project notice</div>
          <P>
            This website is a <span className="text-white/90 font-semibold">pet project</span>{" "}
            created for learning and portfolio purposes. It is not a real commercial marketplace.
          </P>
          <ul className="mt-3">
            <Li>No real purchases, payments, or deliveries are processed.</Li>
            <Li>Product listings, prices, discounts, and “live feed” data are demo-only.</Li>
            <Li>Any contact details shown are placeholders unless explicitly stated otherwise.</Li>
          </ul>
        </div>

        {/* Main content */}
        <SectionTitle>1. Who we are</SectionTitle>
        <P>
          “Skynova” (the “Website”) is a demo web application. For the purposes of this policy, the
          creator acts as the website operator. If you are using this website, you understand it is
          a non-commercial demo.
        </P>

        <SectionTitle>2. What data we collect</SectionTitle>
        <P>
          In its current demo form, the Website may collect limited technical information
          automatically, such as basic analytics (e.g., page views) and standard server logs.
        </P>
        <ul className="mt-3">
          <Li>Device and browser information (approximate, non-sensitive).</Li>
          <Li>IP address (typically in server logs).</Li>
          <Li>Pages visited and interaction events (if analytics are enabled).</Li>
        </ul>

        <SectionTitle>3. What we do not collect</SectionTitle>
        <P>
          The Website is not intended to process sensitive data. We do not intentionally collect:
        </P>
        <ul className="mt-3">
          <Li>Payment card details.</Li>
          <Li>Government IDs or sensitive personal data.</Li>
          <Li>Steam credentials (never enter them on demo pages).</Li>
        </ul>

        <SectionTitle>4. Cookies</SectionTitle>
        <P>
          Cookies may be used for basic website functionality (e.g., remembering UI preferences) and
          analytics. You can disable cookies in your browser settings. See the{" "}
          <Link href="/cookies" className="text-white/80 underline decoration-white/30 hover:text-white">
            Cookies Policy
          </Link>{" "}
          for more details.
        </P>

        <SectionTitle>5. Third-party services</SectionTitle>
        <P>
          If enabled, we may use third-party services such as analytics or hosting providers. These
          providers may process limited technical data to deliver the service (e.g., page requests).
        </P>

        <SectionTitle>6. Data retention</SectionTitle>
        <P>
          Demo logs and analytics data (if any) are retained only as long as necessary for debugging,
          performance monitoring, and learning purposes.
        </P>

        <SectionTitle>7. Your choices</SectionTitle>
        <ul className="mt-3">
          <Li>You can disable cookies in your browser settings.</Li>
          <Li>You can stop using the Website at any time.</Li>
        </ul>

        <SectionTitle>8. Contact</SectionTitle>
        <P>
          If you have questions about this Privacy Policy, you can contact the website operator at{" "}
          <span className="text-white/90 font-semibold">support@skynova.com</span> (demo placeholder).
        </P>

        <div className="mt-12 flex flex-wrap gap-3">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-2xl border border-white/12 bg-white/5 px-5 py-3 text-sm font-semibold text-white/90 transition hover:bg-white/10"
          >
            ← Back to Home
          </Link>

          <Link
            href="/blog"
            className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-purple-500 to-indigo-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-purple-500/20 transition hover:brightness-110"
          >
            Visit Blog
          </Link>
        </div>
      </div>
    </main>
  );
}
