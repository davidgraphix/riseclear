import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Trust from "@/components/Trust";
import Services from "@/components/Services";
import Process from "@/components/Process";
import Benefits from "@/components/Benefits";
import Testimonials from "@/components/Testimonials";
import CTA from "@/components/CTA";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import InstagramButton from "@/components/InstagramButton";

export default function Home() {
  return (
    <main className="relative bg-white overflow-x-hidden">
      <Navbar />
      <Hero />
      <Trust />
      <Services />
      <Process />
      <Benefits />
      <Testimonials />
      <CTA />
      <Contact />
      <Footer />
      <InstagramButton />
    </main>
  );
}
