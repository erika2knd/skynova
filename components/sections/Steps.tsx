import Image from "next/image";

const steps = [
  {
    n: "01",
    title: "Create an account",
    text: "Sign in securely using your Steam account",
  },
  {
    n: "02",
    title: "List your skin",
    text: "Add your skin from Steam directly to your dashboard",
  },
  {
    n: "03",
    title: "Get discovered",
    text: "Your skin becomes visible to buyers on the marketplace",
  },
  {
    n: "04",
    title: "Withdraw earnings",
    text: "Receive your payout once your skin is sold",
  },
];

export default function Steps() {
  return (
    <section className="relative overflow-hidden py-24 bg-[#1F1E20]">
      {/* background glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-40 top-140 h-[520px] w-[520px] rounded-full bg-[#535EFE]/75 blur-[140px]" />
        <div className="absolute -right-40 top-0 h-[520px] w-[520px] rounded-full bg-[#680BE2]/75 blur-[140px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/10 to-black/0" />
      </div>

      <div className="relative mx-auto max-w-[1240px] px-6">
        {/* Title */}
        <div className="text-center">
          <h2 className="text-4xl font-extrabold uppercase leading-[1.05] text-white md:text-6xl">
            TURN YOUR SKINS INTO PROFIT
            <br />
            <span className="text-[#535EFE]">IN 4 SIMPLE STEPS</span>
          </h2>

          <p className="mx-auto mt-6 max-w-xl text-sm text-white/70 md:text-base">
            Our platform is more than a marketplace.
            <br />
            <span className="font-semibold text-white">Buy, sell, and trade Counter-Strike skins with ease.</span>
          </p>
        </div>

        {/* Step cards */}
        <div className="mt-12 grid gap-4 md:grid-cols-4">
          {steps.map((s) => (
            <div
              key={s.n}
              className="rounded-2xl border border-white/10 bg-[#222226] p-5 backdrop-blur"
            >
              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 min-w-8 shrink-0 items-center justify-center rounded-full bg-[#0F1117] text-sm font-extrabold leading-none text-[#535EFE]">
                  {s.n}
                </div>

                <div>
                  <p className="text-sm font-extrabold text-white">{s.title}</p>
                  <p className="mt-2 text-xs leading-relaxed text-white/60">
                    {s.text}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Blueprint image */}
        <div className="mt-16 flex justify-center">
          <Image
            src="/images/weapons.png"
            alt="Weapon blueprint"
            width={920}
            height={520}
            className="w-full max-w-[920px] object-contain opacity-90"
            priority={false}
          />
        </div>
      </div>
    </section>
  );
}
