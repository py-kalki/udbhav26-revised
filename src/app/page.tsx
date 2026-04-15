import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { StatsBar } from "@/components/StatsBar";
import { About } from "@/components/About";
import { Tracks } from "@/components/Tracks";
import { Timeline } from "@/components/Timeline";
import { JudgingCriteria } from "@/components/JudgingCriteria";
import { Sponsors } from "@/components/Sponsors";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      {/* <StatsBar />
      <About />
      <Tracks />
      <Timeline />
      <JudgingCriteria />
      <Sponsors />
      <Contact />
      <Footer /> */}
    </>
  );
}
