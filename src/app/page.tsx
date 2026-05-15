import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Projects from "@/components/Projects";
import Testimonials from "@/components/Testimonials";
import SaasTeaser from "@/components/SaasTeaser";
import ContactFooter from "@/components/ContactFooter";

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <Navbar />
      <Hero />
      <Services />
      <Projects />
      <Testimonials />
      <SaasTeaser />
      <ContactFooter />
    </main>
  );
}