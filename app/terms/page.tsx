import Link from "next/link";

export const metadata = {
  title: "Terms and Conditions — Skynova",
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

export default function TermsPage() {
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
          <span className="text-white/80">Terms</span>
        </div>

        <h1 className="text-4xl font-extrabold uppercase tracking-[-0.02em] text-white md:text-6xl">
          <span className="text-[#535EFE]">TERMS</span> & CONDITIONS
        </h1>

        <div className="mt-4 flex flex-wrap items-center gap-2 text-sm text-white/60">
          <span>Last updated: {updated}</span>
          <span className="text-white/30">•</span>
          <Link href="/privacy-policy" className="hover:text-white">
            Privacy
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
            created for learning and portfolio purposes. It does not provide real marketplace
            services.
          </P>
          <ul className="mt-3">
            <Li>No real purchases, payments, deliveries, or refunds are processed.</Li>
            <Li>Listings, prices, discounts, and availability are demo-only.</Li>
            <Li>Buttons like “Buy now” and “Add to wishlist” are UI demonstrations.</Li>
          </ul>
        </div>

        <SectionTitle>1. Acceptance of terms</SectionTitle>
        <P>
          By accessing or using the Website, you agree to these Terms. If you do not agree, please
          do not use the Website.
        </P>

        <SectionTitle>2. Eligibility</SectionTitle>
        <P>
          You must be able to legally use online services in your jurisdiction. This demo is not
          intended for children.
        </P>

        <SectionTitle>3. Demo nature of the website</SectionTitle>
        <P>
          The Website is for demonstration purposes only. Any marketplace-like features are
          simulated. No actual transactions are completed.
        </P>

        <SectionTitle>4. Accounts</SectionTitle>
        <P>
          If account features are added in the future, you will be responsible for maintaining the
          confidentiality of your login information and for all activity under your account.
        </P>

        <SectionTitle>5. Prohibited use</SectionTitle>
        <P>You agree not to:</P>
        <ul className="mt-3">
          <Li>Use the Website for unlawful purposes or to violate any applicable laws.</Li>
          <Li>Attempt to reverse engineer, exploit, or disrupt the Website.</Li>
          <Li>Upload malicious code or attempt unauthorized access.</Li>
          <Li>Use automated scraping in ways that overload the service.</Li>
        </ul>

        <SectionTitle>6. Intellectual property</SectionTitle>
        <P>
          The Website design and code are provided for portfolio/demo purposes. Counter-Strike and
          related trademarks belong to their respective owners. Demo images and names are used for
          illustrative purposes.
        </P>

        <SectionTitle>7. Third-party links</SectionTitle>
        <P>
          The Website may contain links to third-party websites. We are not responsible for their
          content, policies, or practices.
        </P>

        <SectionTitle>8. Disclaimer</SectionTitle>
        <P>
          The Website is provided “as is” and “as available” without warranties of any kind. We do
          not guarantee uninterrupted or error-free operation.
        </P>

        <SectionTitle>9. Limitation of liability</SectionTitle>
        <P>
          To the fullest extent permitted by law, we are not liable for any indirect, incidental, or
          consequential damages arising from your use of the Website.
        </P>

        <SectionTitle>10. Changes to terms</SectionTitle>
        <P>
          We may update these Terms from time to time. The “Last updated” date will reflect the most
          recent version.
        </P>

        <SectionTitle>11. Contact</SectionTitle>
        <P>
          Questions about these Terms can be sent to{" "}
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
