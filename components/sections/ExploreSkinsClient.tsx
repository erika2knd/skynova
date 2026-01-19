"use client";

import { useSearchParams } from "next/navigation";
import ExploreSkins from "@/components/sections/ExploreSkins";

export default function ExploreSkinsClient() {
  const searchParams = useSearchParams();
  const currency = searchParams.get("currency") === "eur" ? "eur" : "usd";

  return <ExploreSkins currency={currency} />;
}
