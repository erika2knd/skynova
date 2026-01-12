import Image from "next/image";
import Link from "next/link";

const policyLinks = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms and Conditions", href: "/terms" },
  { label: "Cookies Policy", href: "/cookies" },
  { label: "Disclaimers", href: "/disclaimers" },
];

export default function Footer() {
  return (
    <footer className=" pb-10">
      <div className="mx-auto max-w-[1240px] px-6">
        <div className="rounded-3xl border border-white/10 bg-white/5 px-8 py-10 backdrop-blur md:px-12">
          <div className="grid gap-10 md:grid-cols-3 md:gap-6">
            {/* Left */}
            <div>
              <Link href="/" className="inline-flex items-center">
                <Image
                  src="/images/logo.png"
                  alt="Skynova"
                  width={150}
                  height={40}
                  className="h-auto w-[150px]"
                />
              </Link>

              <div className="mt-6 space-y-1 text-sm text-white/80">
                <p>Company name</p>
                <p>Company ID</p>
                <p>Company address</p>
                <p className="pt-2">Company e-mail</p>
              </div>

              <p className="mt-10 text-sm font-semibold text-white/50">
                Copyright © 2025 Skynova
              </p>
            </div>

            {/* Center */}
            <div className="md:text-center">
              <p className="text-sm font-extrabold uppercase tracking-widest text-white/40">
                POLICIES
              </p>

              <ul className="mt-6 space-y-3 text-sm text-white/85">
                {policyLinks.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="transition hover:text-white"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right */}
            <div className="flex flex-col items-start gap-6 md:items-end">
              {/* Social icon */}
              <Link
                href="#"
                aria-label="Instagram"
                className="grid h-12 w-12 place-items-center rounded-2xl border-2 border-[#535EFE]/70 text-[#535EFE] transition hover:bg-white/5"
              >
                <span className="text-xl">◎</span>
              </Link>

              {/* Payments */}
              <div className="flex flex-col items-start gap-3 md:items-end">
                <p className="text-2xl font-extrabold italic text-white">
                  VISA
                </p>

                <div className="flex items-center gap-2 text-sm text-white/70">
                  <span className="relative inline-flex h-5 w-9 items-center">
                    <span className="absolute left-0 h-5 w-5 rounded-full bg-white/25" />
                    <span className="absolute left-3 h-5 w-5 rounded-full bg-white/10" />
                  </span>
                  <span className="font-semibold text-white/75">mastercard</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
}
