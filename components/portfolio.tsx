"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, X, ExternalLink, Github, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Project {
  title: string;
  category: string;
  description: string;
  fullDescription: string;
  tech: string[];
  metrics: string;
  color: string;
  results: { label: string; value: string }[];
  challenge: string;
  solution: string;
}

const projects: Project[] = [
  {
    title: "FinanceFlow",
    category: "Fintech Platform",
    description:
      "A comprehensive banking solution serving 2M+ users with real-time transactions and AI-powered insights.",
    fullDescription:
      "FinanceFlow is a next-generation digital banking platform that revolutionizes how users manage their finances. The platform combines real-time transaction processing with AI-powered insights to help users make smarter financial decisions.",
    tech: ["React", "Node.js", "PostgreSQL", "AWS", "Redis", "Stripe"],
    metrics: "200% increase in user engagement",
    color: "from-cyan-500/20 to-blue-500/20",
    results: [
      { label: "Active Users", value: "2M+" },
      { label: "Transaction Volume", value: "$500M/month" },
      { label: "Uptime", value: "99.99%" },
      { label: "Load Time", value: "<200ms" }
    ],
    challenge:
      "The client needed to replace their legacy banking system with a modern, scalable platform that could handle millions of transactions while providing real-time insights.",
    solution:
      "We built a microservices architecture on AWS with real-time event streaming, implemented AI models for fraud detection and personalized recommendations, and created an intuitive mobile-first interface."
  },
  {
    title: "HealthSync Pro",
    category: "Healthcare",
    description:
      "HIPAA-compliant telemedicine platform connecting patients with healthcare providers globally.",
    fullDescription:
      "HealthSync Pro is a comprehensive telemedicine solution that enables healthcare providers to deliver care remotely while maintaining full HIPAA compliance. The platform supports video consultations, secure messaging, and integrated EHR systems.",
    tech: ["Next.js", "Python", "MongoDB", "GCP", "WebRTC", "HL7 FHIR"],
    metrics: "50K+ consultations monthly",
    color: "from-emerald-500/20 to-teal-500/20",
    results: [
      { label: "Monthly Consultations", value: "50K+" },
      { label: "Healthcare Providers", value: "5,000+" },
      { label: "Patient Satisfaction", value: "4.8/5" },
      { label: "Wait Time Reduction", value: "75%" }
    ],
    challenge:
      "Creating a telemedicine platform that meets strict healthcare regulations while providing a seamless experience for both patients and providers across different time zones.",
    solution:
      "We developed a secure, HIPAA-compliant video consultation system with end-to-end encryption, integrated with major EHR systems, and implemented intelligent scheduling that accounts for provider availability and patient preferences."
  },
  {
    title: "RetailGenius",
    category: "E-commerce",
    description:
      "AI-powered inventory management and demand forecasting system for enterprise retailers.",
    fullDescription:
      "RetailGenius uses advanced machine learning algorithms to predict demand, optimize inventory levels, and automate reordering processes. The system has helped major retailers reduce costs while improving product availability.",
    tech: ["Vue.js", "FastAPI", "Redis", "Azure", "TensorFlow", "Kafka"],
    metrics: "30% reduction in inventory costs",
    color: "from-orange-500/20 to-amber-500/20",
    results: [
      { label: "Cost Reduction", value: "30%" },
      { label: "Forecast Accuracy", value: "95%" },
      { label: "SKUs Managed", value: "1M+" },
      { label: "ROI", value: "400%" }
    ],
    challenge:
      "Enterprise retailers were struggling with overstock and stockout issues, leading to millions in lost revenue and wasted inventory.",
    solution:
      "We implemented ML models trained on historical sales data, seasonal patterns, and external factors to predict demand with 95% accuracy, integrated with suppliers for automated reordering."
  },
  {
    title: "LogiTrack",
    category: "Logistics",
    description:
      "Real-time fleet management and route optimization platform for delivery companies.",
    fullDescription:
      "LogiTrack provides complete visibility into fleet operations with real-time tracking, intelligent route optimization, and predictive maintenance. The platform has transformed logistics operations for major delivery companies.",
    tech: ["React Native", "Go", "Kafka", "AWS", "HERE Maps", "IoT"],
    metrics: "40% improvement in delivery times",
    color: "from-rose-500/20 to-pink-500/20",
    results: [
      { label: "Delivery Time", value: "-40%" },
      { label: "Fuel Costs", value: "-25%" },
      { label: "Fleet Utilization", value: "+35%" },
      { label: "Customer Satisfaction", value: "+50%" }
    ],
    challenge:
      "Delivery companies needed real-time visibility into their operations and intelligent routing to compete with larger players.",
    solution:
      "We built a comprehensive fleet management system with GPS tracking, AI-powered route optimization considering traffic and weather, driver mobile apps, and predictive maintenance alerts."
  }
];

export function Portfolio() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const scrollToContact = () => {
    setSelectedProject(null);
    setTimeout(() => {
      const element = document.getElementById("contact");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  return (
    <section id="portfolio" className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-semibold tracking-wider uppercase">
            Our Portfolio
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6 text-balance">
            Projects That Drive Results
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Explore our latest work and see how we&apos;ve helped businesses transform through
            technology.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/50 transition-all duration-300 cursor-pointer"
              onClick={() => setSelectedProject(project)}
            >
              {/* Gradient Background */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
              />

              <div className="relative p-8">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <span className="text-xs text-primary font-medium uppercase tracking-wider">
                      {project.category}
                    </span>
                    <h3 className="text-2xl font-bold mt-2">{project.title}</h3>
                  </div>
                  <button className="w-10 h-10 rounded-full border border-border flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-all">
                    <ArrowUpRight className="w-5 h-5 group-hover:text-primary-foreground transition-colors" />
                  </button>
                </div>

                <p className="text-muted-foreground mb-6 leading-relaxed">{project.description}</p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-secondary rounded-full text-xs font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.tech.length > 4 && (
                    <span className="px-3 py-1 bg-secondary rounded-full text-xs font-medium">
                      +{project.tech.length - 4} more
                    </span>
                  )}
                </div>

                <div className="pt-4 border-t border-border flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-primary" />
                  <p className="text-sm text-primary font-medium">{project.metrics}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mt-12"
        >
          <button
            onClick={scrollToContact}
            className="inline-flex items-center gap-2 px-6 py-3 border border-border rounded-full hover:border-primary hover:text-primary transition-all"
          >
            Start Your Project
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </motion.div>
      </div>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div
            className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-6"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-card border border-border rounded-2xl overflow-hidden max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div
                className={`bg-gradient-to-br ${selectedProject.color} p-8 border-b border-border`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-xs text-primary font-medium uppercase tracking-wider">
                      {selectedProject.category}
                    </span>
                    <h3 className="text-3xl font-bold mt-2">{selectedProject.title}</h3>
                    <p className="text-muted-foreground mt-2 max-w-xl">
                      {selectedProject.fullDescription}
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="w-10 h-10 rounded-full bg-background/50 flex items-center justify-center hover:bg-background transition-colors flex-shrink-0"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Results Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                  {selectedProject.results.map((result) => (
                    <div key={result.label} className="bg-background/50 backdrop-blur rounded-xl p-4">
                      <p className="text-2xl font-bold text-primary">{result.value}</p>
                      <p className="text-sm text-muted-foreground">{result.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-8 space-y-8">
                {/* Challenge & Solution */}
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-lg font-semibold mb-3">The Challenge</h4>
                    <p className="text-muted-foreground leading-relaxed">
                      {selectedProject.challenge}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-3">Our Solution</h4>
                    <p className="text-muted-foreground leading-relaxed">
                      {selectedProject.solution}
                    </p>
                  </div>
                </div>

                {/* Technologies */}
                <div>
                  <h4 className="text-lg font-semibold mb-4">Technologies Used</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-4 py-2 bg-secondary rounded-lg text-sm font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <div className="pt-4 border-t border-border flex flex-col sm:flex-row gap-4">
                  <Button className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 gap-2">
                    <ExternalLink className="w-4 h-4" />
                    View Live Project
                  </Button>
                  <Button variant="outline" className="flex-1 border-border gap-2">
                    <Github className="w-4 h-4" />
                    View Case Study
                  </Button>
                  <Button
                    onClick={scrollToContact}
                    variant="outline"
                    className="flex-1 border-border"
                  >
                    Start Similar Project
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
