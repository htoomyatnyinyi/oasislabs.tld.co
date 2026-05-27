import { Navigation } from "@/components/navigation";
import { Hero } from "@/components/hero";
import { Services } from "@/components/services";
import { About } from "@/components/about";
import { TechStack } from "@/components/tech-stack";
import { Portfolio } from "@/components/portfolio";
import { Pricing } from "@/components/pricing";
import { Testimonials } from "@/components/testimonials";
import { Team } from "@/components/team";
import { Blog } from "@/components/blog";
import { FAQ } from "@/components/faq";
import { Booking } from "@/components/booking";
import { Careers } from "@/components/careers";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <Hero />
      <Services />
      <About />
      <TechStack />
      <Portfolio />
      <Pricing />
      <Testimonials />
      <Team />
      <Blog />
      <Booking />
      <FAQ />
      <Careers />
      <Contact />
      <Footer />
    </main>
  );
}
