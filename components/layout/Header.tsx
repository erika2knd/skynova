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
      <div className="mx-auto max-w-[1240px] px-6">
        <div className="mt-4 flex items-center justify-between rounded-[20px] border border-white/10 bg-white/[0.06] px-6 py-3 backdrop-blur-2xl">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/images/logo.png"
              alt="Skynova logo"
              width={140}
              height={28}
              priority
              className="h-7 w-auto"
            />
          </Link>

          {/* Nav */}
          <nav className="hidden items-center gap-10 text-sm text-white/70 md:flex">
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
          <div className="flex items-center gap-4">
            <button className="hidden items-center gap-2 rounded-xl border border-white/10 bg-white/[0.06] px-4 py-2 text-sm text-white/80 backdrop-blur transition hover:bg-white/[0.10] md:inline-flex">
              EN
              <span className="text-white/60">▾</span>
            </button>

            <Link
              href="/cart"
              className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.06] px-4 py-2 text-sm text-white/80 backdrop-blur transition hover:bg-white/[0.10]"
            >
              <Image
                src="/images/cart.svg"
                alt="Shopping bag"
                width={20}
                height={20}
                priority
              />
            </Link>

            <Link
              href="/login"
              className="px-3 py-2 text-sm text-white/80 transition hover:text-white rounded-xl border border-white/10 bg-white/[0.06] px-4 py-2 text-sm text-white/80 backdrop-blur transition hover:bg-white/[0.10] md:inline-flex"
            >
              Log in
            </Link>

            <Link
              href="/signup"
              className="rounded-xl border border-white/10 bg-white/[0.06] px-4 py-2 text-sm text-white/80 backdrop-blur transition hover:bg-white/[0.10] md:inline-flex"
            >
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
