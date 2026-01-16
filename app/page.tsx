import Hero from "@/components/sections/Hero";
import ExploreSkins from "@/components/sections/ExploreSkins";
import Steps from "@/components/sections/Steps";
import VipCollection from "@/components/sections/VipCollection";
import Reviews from "@/components/sections/Reviews";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <ExploreSkins />
      <Steps />
      <VipCollection />
      <Reviews />
    </main>
  );
}