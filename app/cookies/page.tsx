import Link from "next/link";

export const metadata = {
  title: "Cookies Policy — Skynova",
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

export default function CookiesPolicyPage() {
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
          <span className="text-white/80">Cookies</span>
        </div>

        <h1 className="text-4xl font-extrabold uppercase tracking-[-0.02em] text-white md:text-6xl">
          <span className="text-[#535EFE]">COOKIES</span> POLICY
        </h1>

        <div className="mt-4 flex flex-wrap items-center gap-2 text-sm text-white/60">
          <span>Last updated: {updated}</span>
          <span className="text-white/30">•</span>
          <Link href="/privacy-policy" className="hover:text-white">
            Privacy
          </Link>
          <span className="text-white/30">•</span>
          <Link href="/terms" className="hover:text-white">
            Terms
          </Link>
        </div>

        {/* Pet project disclaimer */}
        <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur sm:p-8">
          <div className="text-sm font-extrabold text-white">Demo / Pet project notice</div>
          <P>
            This website is a <span className="text-white/90 font-semibold">pet project</span>. Any
            cookies mentioned below are used for demo functionality and learning purposes.
          </P>
          <ul className="mt-3">
            <Li>No payments or real transactions are processed.</Li>
            <Li>Demo analytics (if enabled) may set basic cookies.</Li>
          </ul>
        </div>

        <SectionTitle>1. What are cookies?</SectionTitle>
        <P>
          Cookies are small text files stored on your device when you visit a website. They help
          the site remember information about your visit (for example, your preferences).
        </P>

        <SectionTitle>2. How we use cookies</SectionTitle>
        <P>
          In the current demo version, cookies may be used for:
        </P>
        <ul className="mt-3">
          <Li>Remembering UI preferences (e.g., theme, language, or filters if implemented).</Li>
          <Li>Basic security and anti-abuse protections (if implemented).</Li>
          <Li>Analytics (optional) to understand which pages are visited.</Li>
        </ul>

        <SectionTitle>3. Types of cookies</SectionTitle>
        <P>Depending on what is enabled, the Website may use:</P>
        <ul className="mt-3">
          <Li>
            <span className="text-white/85 font-semibold">Essential cookies</span> — required for
            basic functionality (e.g., navigation, security).
          </Li>
          <Li>
            <span className="text-white/85 font-semibold">Preference cookies</span> — remember your
            settings (e.g., UI preferences).
          </Li>
          <Li>
            <span className="text-white/85 font-semibold">Analytics cookies</span> — help measure
            usage (optional).
          </Li>
        </ul>

        <SectionTitle>4. Managing cookies</SectionTitle>
        <P>
          You can control cookies through your browser settings:
        </P>
        <ul className="mt-3">
          <Li>Block all cookies (may affect website functionality).</Li>
          <Li>Delete existing cookies.</Li>
          <Li>Set rules per website.</Li>
        </ul>

        <SectionTitle>5. Third-party cookies</SectionTitle>
        <P>
          If third-party services are enabled (for example, analytics or embedded content), they may
          set their own cookies. We do not control third-party cookies.
        </P>

        <SectionTitle>6. Updates to this policy</SectionTitle>
        <P>
          We may update this Cookies Policy as the demo evolves. The “Last updated” date will show
          the latest version.
        </P>

        <SectionTitle>7. Contact</SectionTitle>
        <P>
          If you have questions about cookies on this website, contact{" "}
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
            href="/privacy-policy"
            className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-purple-500 to-indigo-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-purple-500/20 transition hover:brightness-110"
          >
            View Privacy Policy
          </Link>
        </div>
      </div>
    </main>
  );
}
