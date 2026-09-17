"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const categories = [
  { id: "all", label: "All Technologies" },
  { id: "frontend", label: "Frontend" },
  { id: "backend", label: "Backend" },
  { id: "mobile", label: "Mobile" },
  { id: "cloud", label: "Cloud & DevOps" },
  { id: "database", label: "Database" },
  // { id: "ai", label: "AI & ML" },
];

const technologies = [
  // Frontend
  {
    name: "React",
    category: "frontend",
    color: "#61DAFB",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  },
  {
    name: "Next.js",
    category: "frontend",
    color: "#000000",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
  },
  // { name: "Vue.js", category: "frontend", color: "#4FC08D", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg" },
  // { name: "Angular", category: "frontend", color: "#DD0031", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg" },
  {
    name: "TypeScript",
    category: "frontend",
    color: "#3178C6",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
  },
  {
    name: "Tailwind CSS",
    category: "frontend",
    color: "#06B6D4",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg",
  },
  // { name: "Svelte", category: "frontend", color: "#FF3E00", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/svelte/svelte-original.svg" },

  // Backend
  {
    name: "Node.js",
    category: "backend",
    color: "#339933",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
  },

  // {
  //   name: "ElysiaJS",
  //   category: "backend",
  //   color: "#2c2d3a",
  //   logo: "https://elysiajs.com/img/logo.png",
  // },
  // { name: "Python", category: "backend", color: "#3776AB", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
  // { name: "Go", category: "backend", color: "#00ADD8", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg" },
  // { name: "Java", category: "backend", color: "#007396", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
  {
    name: "Rust",
    category: "backend",
    color: "#000000",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rust/rust-original.svg",
  },
  // { name: "Ruby", category: "backend", color: "#CC342D", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ruby/ruby-original.svg" },
  // { name: "GraphQL", category: "backend", color: "#E10098", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg" },

  // Mobile
  {
    name: "React Native",
    category: "mobile",
    color: "#61DAFB",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  },
  // {
  //   name: "Flutter",
  //   category: "mobile",
  //   color: "#02569B",
  //   logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg",
  // },
  // {
  //   name: "Swift",
  //   category: "mobile",
  //   color: "#FA7343",
  //   logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/swift/swift-original.svg",
  // },
  // {
  //   name: "Kotlin",
  //   category: "mobile",
  //   color: "#7F52FF",
  //   logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg",
  // },
  {
    name: "iOS",
    category: "mobile",
    color: "#000000",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apple/apple-original.svg",
  },
  {
    name: "Android",
    category: "mobile",
    color: "#3DDC84",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/android/android-original.svg",
  },
  {
    name: "tauri2.0",
    category: "mobile",
    color: "#000000",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tauri/tauri-original.svg",
  },

  // Cloud & DevOps
  // {
  //   name: "AWS",
  //   category: "cloud",
  //   color: "#FF9900",
  //   logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg",
  // },
  // {
  //   name: "Google Cloud",
  //   category: "cloud",
  //   color: "#4285F4",
  //   logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg",
  // },
  // {
  //   name: "Azure",
  //   category: "cloud",
  //   color: "#0078D4",
  //   logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg",
  // },
  {
    name: "Self-Host",
    category: "cloud",
    color: "#000000",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg",
  },
  {
    name: "Docker",
    category: "cloud",
    color: "#2496ED",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
  },
  {
    name: "Kubernetes",
    category: "cloud",
    color: "#326CE5",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg",
  },
  // {
  //   name: "Terraform",
  //   category: "cloud",
  //   color: "#7B42BC",
  //   logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/terraform/terraform-original.svg",
  // },
  {
    name: "GitHub Actions",
    category: "cloud",
    color: "#2088FF",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
  },
  // {
  //   name: "Jenkins",
  //   category: "cloud",
  //   color: "#D24939",
  //   logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jenkins/jenkins-original.svg",
  // },

  // Database
  {
    name: "PostgreSQL",
    category: "database",
    color: "#4169E1",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
  },
  // {
  //   name: "MongoDB",
  //   category: "database",
  //   color: "#47A248",
  //   logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
  // },
  {
    name: "Redis",
    category: "database",
    color: "#DC382D",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg",
  },
  {
    name: "MySQL",
    category: "database",
    color: "#4479A1",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
  },
  // {
  //   name: "Elasticsearch",
  //   category: "database",
  //   color: "#005571",
  //   logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/elasticsearch/elasticsearch-original.svg",
  // },
  {
    name: "Firebase",
    category: "database",
    color: "#FFCA28",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg",
  },
  {
    name: "Supabase",
    category: "database",
    color: "green",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/supabase/supabase-plain.svg",
  },
  // {
  //   name: "Neon",
  //   category: "database",
  //   color: "#000000",
  //   logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/neon/neon-plain.svg",
  // },

  // AI & ML
  // {
  //   name: "TensorFlow",
  //   category: "ai",
  //   color: "#FF6F00",
  //   logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg",
  // },
  // {
  //   name: "PyTorch",
  //   category: "ai",
  //   color: "#EE4C2C",
  //   logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg",
  // },
  // {
  //   name: "OpenAI",
  //   category: "ai",
  //   color: "#412991",
  //   logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/openai/openai-original.svg",
  // },
  // {
  //   name: "Ollama",
  //   category: "ai",
  //   color: "#000000",
  //   logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ollama/ollama-original.svg",
  //   // logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/ollama/ollama-plain.svg",
  // },
  // {
  //   name: "scikit-learn",
  //   category: "ai",
  //   color: "#F7931E",
  //   logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/scikitlearn/scikitlearn-original.svg",
  // },
  // {
  //   name: "Pandas",
  //   category: "ai",
  //   color: "#150458",
  //   logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg",
  // },
  // {
  //   name: "NumPy",
  //   category: "ai",
  //   color: "#013243",
  //   logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg",
  // },
];

export function TechStack() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);

  const filteredTechnologies =
    activeCategory === "all"
      ? technologies
      : technologies.filter((tech) => tech.category === activeCategory);

  return (
    <section id="tech-stack" className="py-24 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-medium tracking-wider uppercase">
            Our Expertise
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6 text-balance">
            Technologies We Master
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto text-pretty">
            We leverage the latest and most reliable technologies to build
            scalable, secure, and high-performance solutions.
          </p>
        </motion.div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={cn(
                "px-4 py-2 rounded-full text-sm transition-all",
                activeCategory === category.id
                  ? "bg-primary text-primary-foreground"
                  : "bg-card border border-border text-muted-foreground hover:border-primary/50 hover:text-foreground",
              )}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Tech Grid */}
        <motion.div
          layout
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 lg:grid-cols-8 gap-3 sm:gap-4"
        >
          <AnimatePresence mode="popLayout">
            {filteredTechnologies.map((tech) => (
              <motion.div
                key={tech.name}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2 }}
                onMouseEnter={() => setHoveredTech(tech.name)}
                onMouseLeave={() => setHoveredTech(null)}
                className="relative group"
              >
                <div
                  className={cn(
                    "bg-card border border-border rounded-xl p-4 flex flex-col items-center justify-center aspect-square transition-all cursor-pointer",
                    hoveredTech === tech.name &&
                      "border-primary shadow-lg shadow-primary/10",
                  )}
                >
                  <img
                    src={tech.logo}
                    alt={tech.name}
                    className="w-10 h-10 object-contain mb-2 transition-transform group-hover:scale-110"
                    loading="lazy"
                  />
                  <span className="text-xs text-center text-muted-foreground group-hover:text-foreground transition-colors">
                    {tech.name}
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Stats */}
        {/* <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            { label: "Technologies", value: "40+" },
            { label: "Certifications", value: "25+" },
            { label: "Years Experience", value: "12+" },
            { label: "Expert Engineers", value: "150+" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-card border border-border rounded-xl p-6 text-center"
            >
              <div className="text-3xl font-bold text-primary mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </motion.div> */}

        {/* Certifications */}
        {/* <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <h3 className="text-xl font-semibold text-center mb-8">
            Certified Partnerships
          </h3>
          <div className="flex flex-wrap justify-center items-center gap-8">
            {[
              {
                name: "AWS Partner",
                logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg",
              },
              {
                name: "Google Cloud Partner",
                logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg",
              },
              {
                name: "Microsoft Partner",
                logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg",
              },
              {
                name: "MongoDB Partner",
                logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
              },
            ].map((partner) => (
              <div
                key={partner.name}
                className="flex flex-col items-center gap-2 opacity-70 hover:opacity-100 transition-opacity"
              >
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="h-12 w-auto object-contain grayscale hover:grayscale-0 transition-all"
                />
                <span className="text-xs text-muted-foreground">
                  {partner.name}
                </span>
              </div>
            ))}
          </div>
        </motion.div> */}
      </div>
    </section>
  );
}
