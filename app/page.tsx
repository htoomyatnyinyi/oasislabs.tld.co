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

import {
  getTestimonials,
  getTeamMembers,
  getServices,
  getPortfolioItems,
  getBlogPosts,
} from "@/app/dashboard/actions";

export default async function Home() {
  const [testimonials, teamMembers, services, portfolioItems, blogPosts] =
    await Promise.all([
      getTestimonials(),
      getTeamMembers(),
      getServices(),
      getPortfolioItems(),
      getBlogPosts(),
    ]);

  return (
    <main className="min-h-screen">
      <Navigation />
      <Hero />
      <Services servicesData={services} />
      <About />
      <TechStack />
      <Portfolio portfolioData={portfolioItems} />
      <Pricing />
      <Testimonials testimonials={testimonials} />
      <Team teamMembers={teamMembers} />
      <Blog blogData={blogPosts} />
      <Booking />
      <FAQ />
      <Careers />
      <Contact />
      <Footer />
    </main>
  );
}
