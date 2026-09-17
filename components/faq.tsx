"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, Search, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const faqCategories = [
  { id: "general", label: "General" },
  { id: "services", label: "Services" },
  { id: "process", label: "Process" },
  { id: "pricing", label: "Pricing" },
  { id: "support", label: "Support" },
];

const faqs = [
  {
    category: "general",
    question: "What industries does oasislabs specialize in?",
    answer:
      "We serve a diverse range of industries including fintech, healthcare, e-commerce, logistics, manufacturing, and education. Our team has deep domain expertise in each sector, allowing us to understand unique challenges and deliver tailored solutions.",
  },
  {
    category: "general",
    question: "Where is oasislabs located?",
    answer:
      "Our headquarters is in Mawlamyine, Myanmar. We work with clients globally and have experience delivering projects across different time zones and cultural contexts.",
  },
  {
    category: "general",
    question: "How large is your development team?",
    answer:
      "We have over 5 full-time engineers, designers, and project managers. Additionally, we maintain a vetted network of specialized contractors for scaling projects that require niche expertise.",
  },
  {
    category: "services",
    question: "What technologies do you work with?",
    answer:
      "We work with modern technology stacks including React, Next.js, Node.js, Python, Go, AWS, Google Cloud, Azure, Kubernetes, and more. Our team stays current with emerging technologies like AI/ML frameworks, blockchain, and edge computing.",
  },
  {
    category: "services",
    question: "Do you provide ongoing maintenance and support?",
    answer:
      "Yes, we offer comprehensive maintenance and support packages. These include 24/7 monitoring, regular security updates, performance optimization, and feature enhancements. Our SLA guarantees 99.9% uptime for critical systems.",
  },
  {
    category: "services",
    question: "Can you help with an existing project?",
    answer:
      "Absolutely. We frequently take over or augment existing projects. We start with a thorough code audit and architecture review to understand the current state and develop a clear roadmap for improvements.",
  },
  {
    category: "process",
    question: "What is your development methodology?",
    answer:
      "We use an Agile methodology with 2-week sprints. This includes daily standups, sprint planning, retrospectives, and continuous integration/deployment. We adapt our process to match your organization's workflow and preferences.",
  },
  {
    category: "process",
    question: "How do you ensure project quality?",
    answer:
      "Quality is ensured through multiple layers: code reviews by senior engineers, automated testing (unit, integration, E2E), manual QA testing, security audits, and performance benchmarking. We maintain 80%+ code coverage on all projects.",
  },
  {
    category: "process",
    question: "How long does a typical project take?",
    answer:
      "Project timelines vary based on scope and complexity. A minimum viable product (MVP) typically takes 8-12 weeks, while enterprise applications can take 6-12 months. We provide detailed timeline estimates during our discovery phase.",
  },
  {
    category: "pricing",
    question: "How do you structure project pricing?",
    answer:
      "We offer three engagement models: fixed-price for well-defined projects, time-and-materials for evolving requirements, and dedicated team arrangements for long-term partnerships. We recommend the best model during our initial consultation.",
  },
  {
    category: "pricing",
    question: "What is your typical project budget range?",
    answer:
      "Our projects typically range from $50,000 for focused MVPs to $2M+ for comprehensive enterprise solutions. We work with you to maximize value within your budget constraints and can phase projects to spread investment over time.",
  },
  {
    category: "pricing",
    question: "Do you require upfront payment?",
    answer:
      "For fixed-price projects, we typically require a 30% deposit to begin work, with remaining payments tied to milestone deliveries. For time-and-materials engagements, we invoice bi-weekly or monthly based on your preference.",
  },
  {
    category: "support",
    question: "What support options are available after launch?",
    answer:
      "We offer tiered support packages: Basic (email support, 48h response), Professional (priority support, 24h response, monthly reviews), and Enterprise (24/7 support, dedicated account manager, proactive monitoring).",
  },
  {
    category: "support",
    question: "How do I report issues or request changes?",
    answer:
      "All clients have access to our client portal where you can submit tickets, track progress, and communicate with your team. For urgent issues, Enterprise clients have a direct hotline for immediate assistance.",
  },
  {
    category: "support",
    question: "Do you provide training for our team?",
    answer:
      "Yes, we include comprehensive knowledge transfer as part of every project. This includes documentation, video tutorials, and live training sessions. Additional training packages are available for broader organizational education.",
  },
];

export function FAQ() {
  const [activeCategory, setActiveCategory] = useState("general");
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredFaqs = faqs.filter((faq) => {
    const matchesCategory =
      activeCategory === "all" || faq.category === activeCategory;
    const matchesSearch =
      searchQuery === "" ||
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const scrollToContact = () => {
    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="faq" className="py-24 bg-background">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-medium tracking-wider uppercase">
            FAQ
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6 text-balance">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto text-pretty">
            Find answers to common questions about our services, process, and
            pricing.
          </p>
        </motion.div>

        {/* Search */}
        <div className="relative mb-8">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search questions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-card border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {faqCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => {
                setActiveCategory(category.id);
                setExpandedFaq(null);
              }}
              className={cn(
                "px-4 py-2 rounded-full text-sm transition-all",
                activeCategory === category.id
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-muted-foreground hover:bg-secondary/80 hover:text-foreground",
              )}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* FAQ List */}
        <div className="space-y-4">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq, index) => (
              <motion.div
                key={`${faq.category}-${index}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-card border border-border rounded-xl overflow-hidden"
              >
                <button
                  onClick={() =>
                    setExpandedFaq(expandedFaq === index ? null : index)
                  }
                  className="w-full flex items-center justify-between p-5 text-left"
                >
                  <span className="font-medium pr-4">{faq.question}</span>
                  <span className="flex-shrink-0 p-1 rounded-full bg-secondary">
                    {expandedFaq === index ? (
                      <Minus className="w-4 h-4 text-primary" />
                    ) : (
                      <Plus className="w-4 h-4 text-muted-foreground" />
                    )}
                  </span>
                </button>
                <AnimatePresence>
                  {expandedFaq === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 pb-5 text-muted-foreground leading-relaxed">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <p className="text-muted-foreground mb-4">
                No questions found matching your search.
              </p>
              <Button variant="outline" onClick={() => setSearchQuery("")}>
                Clear Search
              </Button>
            </motion.div>
          )}
        </div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 p-6 bg-card border border-border rounded-2xl text-center"
        >
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-primary/10 rounded-full">
              <MessageCircle className="w-6 h-6 text-primary" />
            </div>
          </div>
          <h3 className="text-xl font-semibold mb-2">Still have questions?</h3>
          <p className="text-muted-foreground mb-4">
            Can&apos;t find the answer you&apos;re looking for? Our team is here
            to help.
          </p>
          <Button
            onClick={scrollToContact}
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            Contact Us
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
