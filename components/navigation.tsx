"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown, Sparkles, Building2, Users, FileText, Calendar, MessageSquare, Briefcase, HelpCircle, PhoneCall } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

// Clean Professional Grouping for Navbar
const navGroups = [
  {
    label: "Services",
    href: "#services",
    items: [
      { href: "#services", label: "Full-Stack Web Development" },
      { href: "#services", label: "Cloud Infrastructure & DevOps" },
      { href: "#services", label: "Mobile App Development" },
      { href: "#services", label: "AI & Machine Learning Integration" },
    ],
  },
  {
    label: "Company",
    href: "#about",
    items: [
      { href: "#about", label: "About OasisLabs" },
      { href: "#team", label: "Our Team" },
      { href: "#testimonials", label: "Client Reviews" },
      { href: "#careers", label: "Careers & Hiring" },
    ],
  },
  {
    label: "Work & Insights",
    href: "#portfolio",
    items: [
      { href: "#portfolio", label: "Portfolio & Case Studies" },
      { href: "#pricing", label: "Transparent Pricing" },
      { href: "#blog", label: "Blog & Tech Articles" },
    ],
  },
  {
    label: "Contact & Support",
    href: "#contact",
    items: [
      { href: "#booking", label: "Schedule a Consultation" },
      { href: "#faq", label: "FAQ & Help" },
      { href: "#contact", label: "Get in Touch" },
    ],
  },
];

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const sections = [
        "services",
        "about",
        "tech-stack",
        "portfolio",
        "pricing",
        "testimonials",
        "team",
        "blog",
        "booking",
        "faq",
        "careers",
        "contact",
      ];
      const scrollPosition = window.scrollY + 120;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const id = href.replace("#", "");
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
    setOpenDropdown(null);
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-background/80 backdrop-blur-lg border-b border-border shadow-sm"
          : "bg-transparent",
      )}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <nav className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center shadow-md">
              <span className="text-primary-foreground font-bold text-xl">
                O
              </span>
            </div>
            <span className="text-xl font-bold tracking-tight">oasislabs</span>
          </Link>

          {/* Grouped Desktop Navigation Dropdowns */}
          <div className="hidden md:flex items-center gap-6">
            {navGroups.map((group) => (
              <div
                key={group.label}
                className="relative"
                onMouseEnter={() => setOpenDropdown(group.label)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <button
                  onClick={() => scrollToSection(group.href)}
                  className={cn(
                    "text-sm font-medium transition-colors flex items-center gap-1.5 py-1 px-2 rounded-md hover:text-foreground",
                    openDropdown === group.label || group.items.some(i => i.href.replace("#", "") === activeSection)
                      ? "text-primary font-semibold"
                      : "text-muted-foreground",
                  )}
                >
                  {group.label}
                  <ChevronDown
                    className={cn(
                      "w-3.5 h-3.5 transition-transform duration-200",
                      openDropdown === group.label && "rotate-180 text-primary",
                    )}
                  />
                </button>

                <AnimatePresence>
                  {openDropdown === group.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.98 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full left-0 mt-1 w-64 bg-card/95 backdrop-blur-md border border-border rounded-xl shadow-xl overflow-hidden p-1.5 z-50"
                    >
                      {group.items.map((item) => (
                        <button
                          key={item.label}
                          onClick={() => scrollToSection(item.href)}
                          className="w-full text-left px-3.5 py-2.5 text-xs font-medium rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary/70 transition-all flex items-center justify-between"
                        >
                          <span>{item.label}</span>
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}

            <Button
              onClick={() => scrollToSection("#booking")}
              className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm"
            >
              Book Consultation
            </Button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            className="md:hidden p-2 rounded-lg text-muted-foreground hover:bg-secondary"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </nav>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden overflow-hidden"
            >
              <div className="mt-4 pb-6 border-t border-border pt-4 space-y-4">
                {navGroups.map((group) => (
                  <div key={group.label} className="space-y-1.5">
                    <p className="text-xs font-semibold text-primary uppercase tracking-wider px-2">
                      {group.label}
                    </p>
                    <div className="grid grid-cols-1 gap-1 pl-2">
                      {group.items.map((item) => (
                        <button
                          key={item.label}
                          onClick={() => scrollToSection(item.href)}
                          className={cn(
                            "text-left py-1.5 px-2 rounded-md text-sm transition-colors",
                            activeSection === item.href.replace("#", "")
                              ? "text-primary font-semibold bg-primary/10"
                              : "text-muted-foreground hover:text-foreground",
                          )}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}

                <Button
                  onClick={() => scrollToSection("#booking")}
                  className="bg-primary text-primary-foreground hover:bg-primary/90 w-full mt-2"
                >
                  Book Consultation
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
