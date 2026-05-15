import Navbar from "@/components/Navbar";
import TrustBar from "@/components/TrustBar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Projects from "@/components/Projects";
import Testimonials from "@/components/Testimonials";
import Guarantees from "@/components/Guarantees";
import SaasTeaser from "@/components/SaasTeaser";
import ContactFooter from "@/components/ContactFooter";

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <Navbar />
      <TrustBar />
      <Hero />
      <Services />
      <Projects />
      <Testimonials />
      <Guarantees />
      <SaasTeaser />
      <ContactFooter />
    </main>
  );
}