export const categories = [
  "Rifles",
  "Sniper Rifles",
  "Pistols",
  "Knives",
  "Gloves",
  "Machineguns",
  "SMGs",
  "Shotguns",
  "Agents",
  "Other",
];

const EXTERIOR = [
  "Factory New",
  "Minimal Wear",
  "Field-Tested",
  "Well-Worn",
  "Battle-Scarred",
] as const;

export type Skin = {
  id: string;
  slug: string;

  weapon: string;
  skin: string;
  collection: string;

  price: number;
  discount: number;
  floatValue: string;

  icon: string;
  image: string;

  category: string;
  exterior: (typeof EXTERIOR)[number];
  statTrak: boolean;
};

const makeSlug = (v: string) =>
  v
    .toLowerCase()
    .replaceAll("™", "")
    .replaceAll("|", "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");

export const demoSkins: Skin[] = Array.from({ length: 30 }).map((_, i) => {
  const category = categories[i % categories.length];
  const exterior = EXTERIOR[i % EXTERIOR.length];
  const statTrak = i % 3 === 0;
  const price = 50_000 + i * 15_000;

  const weapon = statTrak ? "StatTrak™ UMP-45" : "UMP-45";
  const collection = "Howl Collection";

  const slug = makeSlug(`${weapon} ${collection} ${i + 1}`);

  return {
    id: String(i + 1),
    slug,
    weapon,
    skin: "Howl",
    collection,
    price,
    discount: -((i % 60) + 1),
    floatValue: (0.01 + i * 0.003).toFixed(6),
    icon: "/images/fire.svg",
    image: "/images/weapon.png",
    category,
    exterior,
    statTrak,
  };
});
