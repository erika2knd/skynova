import { Suspense } from "react";

import Hero from "@/components/sections/Hero";
import ExploreSkinsClient from "@/components/sections/ExploreSkinsClient";
import Steps from "@/components/sections/Steps";
import VipCollection from "@/components/sections/VipCollection";
import Reviews from "@/components/sections/Reviews";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />

      <Suspense fallback={null}>
        <ExploreSkinsClient />
      </Suspense>

      <Steps />
      <VipCollection />
      <Reviews />
    </main>
  );
}
