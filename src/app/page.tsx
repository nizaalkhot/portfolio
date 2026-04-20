import { Nav } from "@/components/ui/Nav";
import { Footer } from "@/components/ui/Footer";
import { Hero } from "@/components/sections/Hero";
import { Playground } from "@/components/sections/Playground";
import { About } from "@/components/sections/About";
import { Capabilities } from "@/components/sections/Capabilities";
import { Expertise } from "@/components/sections/Expertise";
import { Experience } from "@/components/sections/Experience";
import { Work } from "@/components/sections/Work";
import { Credentials } from "@/components/sections/Credentials";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Nav />
      <main id="main" className="flex-1">
        <Hero />
        <Playground />
        <About />
        <Capabilities />
        <Expertise />
        <Experience />
        <Work />
        <Credentials />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
