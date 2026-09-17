"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Code2,
  Cloud,
  Smartphone,
  Brain,
  Shield,
  Zap,
  ArrowUpRight,
  X,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface Service {
  icon: React.ElementType;
  title: string;
  description: string;
  features: string[];
  benefits: string[];
  technologies: string[];
  process: string[];
}

const services: Service[] = [
  {
    icon: Code2,
    title: "Custom Software Development",
    description:
      "End-to-end software solutions tailored to your unique business needs. From concept to deployment.",
    features: ["Web Applications", "Enterprise Software", "API Development"],
    benefits: [
      "Scalable architecture designed for growth",
      "Custom features built for your workflow",
      "Seamless integration with existing systems",
      "Ongoing support and maintenance",
    ],
    technologies: [
      "React",
      "Next.js",
      "Node.js",
      "Python",
      "PostgreSQL",
      "AWS",
    ],
    process: [
      "Discovery & Requirements",
      "Architecture Design",
      "Agile Development",
      "Testing & QA",
      "Deployment & Support",
    ],
  },
  {
    icon: Cloud,
    title: "Cloud Solutions",
    description:
      "Scalable cloud infrastructure and migration services. AWS, Azure, and Google Cloud expertise.",
    features: ["Cloud Migration", "DevOps", "Infrastructure as Code"],
    benefits: [
      "Reduced infrastructure costs",
      "Improved scalability and reliability",
      "Enhanced security and compliance",
      "24/7 monitoring and support",
    ],
    technologies: [
      "AWS",
      "Azure",
      "Google Cloud",
      "Kubernetes",
      "Docker",
      "Terraform",
    ],
    process: [
      "Infrastructure Assessment",
      "Migration Planning",
      "Cloud Architecture",
      "Implementation",
      "Optimization",
    ],
  },
  {
    icon: Smartphone,
    title: "Mobile Development",
    description:
      "Native and cross-platform mobile apps that deliver exceptional user experiences.",
    features: ["iOS & Android", "React Native", "Flutter"],
    benefits: [
      "Native performance on all platforms",
      "Intuitive user interfaces",
      "Offline-first capabilities",
      "App Store optimization",
    ],
    technologies: ["React Native", "Firebase", "SQLite"],
    process: [
      "UI/UX Design",
      "Prototype Development",
      "Native Implementation",
      "Beta Testing",
      "Launch & Marketing",
    ],
  },
  // {
  //   icon: Brain,
  //   title: "AI & Machine Learning",
  //   description:
  //     "Intelligent solutions powered by cutting-edge AI and machine learning technologies.",
  //   features: ["Predictive Analytics", "NLP", "Computer Vision"],
  //   benefits: [
  //     "Data-driven decision making",
  //     "Automated processes and workflows",
  //     "Personalized user experiences",
  //     "Competitive advantage through AI",
  //   ],
  //   technologies: [
  //     "TensorFlow",
  //     "PyTorch",
  //     "OpenAI",
  //     "LangChain",
  //     "Pinecone",
  //     "Hugging Face",
  //   ],
  //   process: [
  //     "Data Analysis",
  //     "Model Development",
  //     "Training & Validation",
  //     "Integration",
  //     "Continuous Learning",
  //   ],
  // },
  // {
  //   icon: Shield,
  //   title: "Cybersecurity",
  //   description:
  //     "Comprehensive security solutions to protect your digital assets and data.",
  //   features: ["Security Audits", "Penetration Testing", "Compliance"],
  //   benefits: [
  //     "Protection against cyber threats",
  //     "Regulatory compliance (GDPR, HIPAA)",
  //     "Secure development practices",
  //     "Incident response planning",
  //   ],
  //   technologies: [
  //     "OWASP",
  //     "Burp Suite",
  //     "Nessus",
  //     "SIEM",
  //     "Zero Trust",
  //     "Encryption",
  //   ],
  //   process: [
  //     "Security Assessment",
  //     "Vulnerability Analysis",
  //     "Remediation Planning",
  //     "Implementation",
  //     "Ongoing Monitoring",
  //   ],
  // },
  // {
  //   icon: Zap,
  //   title: "Digital Transformation",
  //   description:
  //     "Strategic consulting to modernize your business processes and technology stack.",
  //   features: ["Process Automation", "Legacy Modernization", "Consulting"],
  //   benefits: [
  //     "Streamlined business operations",
  //     "Reduced manual processes",
  //     "Improved customer experience",
  //     "Future-proof technology stack",
  //   ],
  //   technologies: [
  //     "Low-code",
  //     "RPA",
  //     "BPM",
  //     "Microservices",
  //     "Event-driven",
  //     "APIs",
  //   ],
  //   process: [
  //     "Business Analysis",
  //     "Strategy Development",
  //     "Roadmap Planning",
  //     "Transformation Execution",
  //     "Change Management",
  //   ],
  // },
];

const ICON_MAP: Record<string, React.ElementType> = {
  Code2,
  Cloud,
  Smartphone,
  Brain,
  Shield,
  Zap,
};

export function Services({ servicesData }: { servicesData?: any[] }) {
  const displayServices =
    servicesData && servicesData.length > 0
      ? servicesData.map((item) => ({
          slug:
            item.slug ||
            item.title
              .toLowerCase()
              .replace(/[^\w\s-]/g, "")
              .replace(/[\s_]+/g, "-"),
          icon: ICON_MAP[item.icon] || Code2,
          title: item.title,
          description: item.description,
          features: item.features || [],
          benefits: item.benefits || [],
          technologies: item.technologies || [],
          process: item.process || [],
        }))
      : services.map((s) => ({
          ...s,
          slug: s.title
            .toLowerCase()
            .replace(/[^\w\s-]/g, "")
            .replace(/[\s_]+/g, "-"),
        }));

  const [selectedService, setSelectedService] = useState<Service | null>(null);

  const scrollToContact = () => {
    setSelectedService(null);
    setTimeout(() => {
      const element = document.getElementById("contact");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  return (
    <section id="services" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-semibold tracking-wider uppercase">
            Our Services
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6 text-balance">
            Comprehensive Software Solutions
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            We deliver end-to-end technology services that drive innovation and
            accelerate your business growth.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayServices.map((service, index) => (
            <motion.div
              key={service.title}
              id={service.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative bg-card border border-border rounded-2xl p-8 hover:border-primary/50 transition-all duration-300 cursor-pointer"
              onClick={() => setSelectedService(service)}
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <service.icon className="w-7 h-7 text-primary" />
              </div>

              <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                {service.description}
              </p>

              <ul className="space-y-2 mb-6">
                {service.features.map((feature: any) => (
                  <li
                    key={feature}
                    className="flex items-center gap-2 text-sm text-muted-foreground"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    {feature}
                  </li>
                ))}
              </ul>

              <button className="flex items-center gap-2 text-primary font-medium text-sm group-hover:gap-3 transition-all">
                Learn More
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Service Detail Modal */}
      <AnimatePresence>
        {selectedService && (
          <div
            className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-6"
            onClick={() => setSelectedService(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-card border border-border rounded-2xl overflow-hidden max-w-3xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="sticky top-0 bg-card border-b border-border p-6 flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
                    <selectedService.icon className="w-7 h-7 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">
                      {selectedService.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {selectedService.description}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedService(null)}
                  className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center hover:bg-secondary/80 transition-colors flex-shrink-0"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 space-y-8">
                {/* Benefits */}
                <div>
                  <h4 className="text-lg font-semibold mb-4">Key Benefits</h4>
                  <div className="grid md:grid-cols-2 gap-3">
                    {selectedService.benefits.map((benefit) => (
                      <div key={benefit} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Technologies */}
                <div>
                  <h4 className="text-lg font-semibold mb-4">
                    Technologies We Use
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedService.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-4 py-2 bg-secondary rounded-lg text-sm font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Process */}
                <div>
                  <h4 className="text-lg font-semibold mb-4">Our Process</h4>
                  <div className="flex flex-col md:flex-row gap-4">
                    {selectedService.process.map((step, index) => (
                      <div key={step} className="flex-1 relative">
                        <div className="flex md:flex-col items-center md:items-start gap-3">
                          <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold flex-shrink-0">
                            {index + 1}
                          </div>
                          <span className="text-sm">{step}</span>
                        </div>
                        {index < selectedService.process.length - 1 && (
                          <div className="hidden md:block absolute top-4 left-8 w-full h-0.5 bg-border -z-10" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <div className="pt-4 border-t border-border flex flex-col sm:flex-row gap-4">
                  <Button
                    onClick={scrollToContact}
                    className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    Get Started
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setSelectedService(null)}
                    className="flex-1 border-border"
                  >
                    Close
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
