import Header from "@/components/layout/Header";
import Hero from "@/components/sections/Hero";
import ExploreSkins from "@/components/sections/ExploreSkins";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <ExploreSkins />
    </main>
  );
}