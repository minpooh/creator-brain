import Header from "@/components/landing/Header";
import Hero from "@/components/landing/Hero";
import Problem from "@/components/landing/Problem";
import Analysis from "@/components/landing/Analysis";
import Identity from "@/components/landing/Identity";
import Direction from "@/components/landing/Direction";
import Ideas from "@/components/landing/Ideas";
import Planning from "@/components/landing/Planning";
import Cta from "@/components/landing/Cta";
import Footer from "@/components/landing/Footer";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <Header />
      <Hero />
      <Problem />
      <Analysis />
      <Identity />
      <Direction />
      <Ideas />
      <Planning />
      <Cta />
      <Footer />
    </main>
  );
}
