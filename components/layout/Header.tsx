import Link from "next/link";
import Image from "next/image";

const navItems = [
  { label: "Marketplace", href: "/marketplace" },
  { label: "FAQ", href: "/faq" },
  { label: "Blog", href: "/blog" },
];

export default function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mt-4 flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-5 py-4 backdrop-blur ">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/images/logo.png"
              alt="Logo"
              width={150}
              height={150}
              className="rounded-full"
            />
          </Link>

          {/* Nav */}
          <nav className="hidden items-center gap-8 text-sm text-white/70 md:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="transition hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <button className="hidden rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/80 transition hover:bg-white/10 md:inline-flex">
              EN
            </button>

            <Link
              href="/login"
              className="rounded-xl px-3 py-2 text-sm text-white/80 transition hover:text-white"
            >
              Log in
            </Link>

            <Link
              href="/signup"
              className="rounded-xl bg-violet-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-violet-400"
            >
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
