import Header from "@/components/layout/Header";
import Hero from "@/components/sections/Hero";
import ExploreSkins from "@/components/sections/ExploreSkins";
import Steps from "@/components/sections/Steps";
import VipCollection from "@/components/sections/VipCollection";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <ExploreSkins />
      <Steps />
      <VipCollection />
    </main>
  );
}