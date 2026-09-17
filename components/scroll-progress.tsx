"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const sections = [
  { id: "hero", label: "HOME" },
  { id: "services", label: "SERVICES" },
  { id: "about", label: "ABOUT" },
  { id: "tech-stack", label: "TECH STACK" },
  { id: "portfolio", label: "PORTFOLIO" },
  { id: "pricing", label: "PRICING" },
  { id: "testimonials", label: "TESTIMONIALS" },
  { id: "team", label: "TEAM" },
  { id: "blog", label: "BLOG" },
  { id: "booking", label: "BOOKING" },
  { id: "faq", label: "FAQ" },
  { id: "careers", label: "CAREERS" },
  { id: "contact", label: "CONTACT" },
];

export function ScrollProgress() {
  const [activeSection, setActiveSection] = useState("hero");
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (let i = sections.length - 1; i >= 0; i--) {
        const sectionId = sections[i].id;
        const element = document.getElementById(sectionId);
        if (element) {
          const top = element.offsetTop;
          if (scrollPosition >= top - 100) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    if (id === "hero") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <aside
      aria-label="Section navigation"
      className="fixed right-4 md:right-8 top-1/2 -translate-y-1/2 z-40 hidden sm:flex flex-col items-end gap-5 pointer-events-auto select-none"
    >
      {sections.map((section) => {
        const isActive = activeSection === section.id;
        const isHovered = hoveredSection === section.id;
        const showLabel = isActive || isHovered;

        return (
          <div
            key={section.id}
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => scrollToSection(section.id)}
            onMouseEnter={() => setHoveredSection(section.id)}
            onMouseLeave={() => setHoveredSection(null)}
          >
            {/* Section Label */}
            <AnimatePresence>
              {showLabel && (
                <motion.span
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.15 }}
                  className={cn(
                    "text-xs font-bold tracking-widest uppercase transition-colors whitespace-nowrap",
                    isActive
                      ? "text-foreground font-extrabold"
                      : "text-muted-foreground group-hover:text-foreground",
                  )}
                >
                  {section.label}
                </motion.span>
              )}
            </AnimatePresence>

            {/* Indicator Dot */}
            <div className="relative flex items-center justify-center w-6 h-6">
              {isActive ? (
                <motion.div
                  layoutId="activeDotRing"
                  className="w-6 h-6 rounded-full border-2 border-foreground/80 dark:border-white/80 bg-foreground/10 flex items-center justify-center shadow-sm"
                  transition={{ type: "spring", stiffness: 350, damping: 25 }}
                >
                  <div className="w-2.5 h-2.5 rounded-full bg-foreground dark:bg-white" />
                </motion.div>
              ) : (
                <div
                  className={cn(
                    "w-2.5 h-2.5 rounded-full transition-all duration-200",
                    isHovered
                      ? "bg-foreground/70 dark:bg-white/70 scale-125"
                      : "bg-muted-foreground/30 hover:bg-muted-foreground/60",
                  )}
                />
              )}
            </div>
          </div>
        );
      })}
    </aside>
  );
}
