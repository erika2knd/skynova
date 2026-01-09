import Image from "next/image";
import Link from "next/link";

type Skin = {
  id: string;
  float: string;
  priceUsd: string;
  priceEth: string;
  name: string;
  collection: string;
  discount: string;
  image: string;
};

const skins: Skin[] = [
  {
    id: "1",
    float: "0.133423",
    priceEth: "0.133423",
    priceUsd: "$ 589.62",
    name: "StatTrak™ UMP-45",
    collection: "Howl",
    discount: "-51%",
    image: "/images/weapon.png",
  },
  { ...same("2") },
  { ...same("3") },
  { ...same("4") },
  { ...same("5") },
  { ...same("6") },
  { ...same("7") },
  { ...same("8") },
  { ...same("9") },
  { ...same("10") },
  { ...same("11") },
  { ...same("12") },
];

function same(id: string): Skin {
  return {
    id,
    float: "0.133423",
    priceEth: "0.133423",
    priceUsd: "$ 589.62",
    name: "StatTrak™ UMP-45",
    collection: "Howl",
    discount: "-51%",
    image: "/images/weapon.png",
  };
}

export default function ExploreSkins() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-[1240px] px-6">
        {/* Title */}
        <h2 className="text-center text-5xl font-extrabold uppercase tracking-[-0.02em] text-white md:text-6xl">
          <span className="text-[#535EFE]">EXPLORE</span> SKINS
        </h2>

        {/* Grid row */}
        <div className="mt-14 relative">
          {/* Cards */}
          <div className="flex gap-6 overflow-x-auto pb-2 pr[220px]">
            {skins.map((skin) => (
              <SkinCard key={skin.id} skin={skin} />
            ))}
          </div>

          {/* See all */}
          <SeeAllOverlay />
        </div>
      </div>
    </section>
  );
}

function SkinCard({ skin }: { skin: Skin }) {
  return (
    <div className="shrink-0">
      {/* animated gradient border */}
      <div className="animated-border rounded-3xl bg-gradient-to-r from-[#535EFE] via-[#680BE2] to-[#8E2BFF] p-[1px]">
        {/* card body */}
        <div className="w-[260px] rounded-3xl bg-[#222226] p-6">
          {/* top row */}
          <div className="flex items-center justify-between text-xs text-white/60">
            <div className="flex items-center gap-3">
              <Image src="/images/fire.svg" alt="" width={18} height={18} />
              <span className="text-white/80">{skin.float}</span>
            </div>
            <span className="text-white/70">{skin.priceUsd}</span>
          </div>

          {/* image */}
          <div className="mt-8 flex justify-center">
            <Image
              src={skin.image}
              alt={skin.name}
              width={220}
              height={90}
              className="h-[90px] w-auto object-contain"
            />
          </div>

          {/* name + like */}
          <div className="mt-10 flex items-end justify-between">
            <p className="text-lg font-extrabold leading-[1.05] text-white">
              {skin.name}
              <br />
              {skin.name}
            </p>

            <button className="text-white/60 transition hover:text-white">
              ♡
            </button>
          </div>

          {/* collection */}
          <p className="mt-4 text-sm text-white/45">{skin.collection}</p>

          {/* price */}
          <p className="mt-2 text-xl font-extrabold text-white">{skin.priceEth}</p>

          {/* discount */}
          <p className="mt-2 text-sm font-semibold text-[#535EFE]">{skin.discount}</p>
        </div>
      </div>
    </div>
  );
}


function SeeAllOverlay() {
  return (
    <div className="pointer-events-none absolute right-0 top-0 h-[420px] w-[180px]">
      <div className="absolute inset-0 bg-gradient-to-l from-[#26272D] via-[#26272D]/100 to-transparent" />
      <div
  className="absolute inset-0 rounded-3xl backdrop-blur-[18px]"
  style={{
    WebkitMaskImage: "linear-gradient(to left, black 60%, transparent 100%)",
    maskImage: "linear-gradient(to left, black 60%, transparent 100%)",
  }}
/>


      <div className="pointer-events-auto relative z-10 flex h-full -translate-y-2 flex-col items-center justify-center gap-4">
        <Link
  href="/marketplace"
  className="grid h-20 w-20 place-items-center rounded-full border-2 border-[#535EFE]/70 text-[#535EFE] transition transform hover:scale-105 "
  aria-label="See all skins"
>
  <span className="text-3xl">↗</span>
</Link>

        <p className="text-sm font-extrabold tracking-widest text-white">
          SEE ALL
        </p>
      </div>
    </div>
  );
}


