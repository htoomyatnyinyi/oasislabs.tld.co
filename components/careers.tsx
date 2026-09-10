"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Clock,
  Briefcase,
  DollarSign,
  X,
  ChevronRight,
  Users,
  Heart,
  Zap,
  Coffee,
  Building2,
  Send,
  Upload,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const departments = [
  { id: "all", label: "All Departments" },
  { id: "engineering", label: "Engineering" },
  { id: "design", label: "Design" },
  { id: "product", label: "Product" },
  { id: "sales", label: "Sales & Marketing" },
  { id: "operations", label: "Operations" },
];

const jobs = [
  {
    id: 1,
    title: "Senior Full-Stack Engineer",
    department: "engineering",
    location: "Mawlamyine, Mon State, Myanamr",
    type: "Full-time",
    salary: "MMK 1500k - MMK 2000k",
    remote: true,
    description:
      "We're looking for an experienced Full-Stack Engineer to join our core platform team. You'll be building scalable web applications using React, Node.js, and cloud technologies.",
    responsibilities: [
      "Design and implement scalable web applications and APIs",
      "Collaborate with product and design teams to deliver exceptional user experiences",
      "Mentor junior engineers and contribute to engineering best practices",
      "Participate in code reviews and architectural discussions",
      "Drive technical decisions and help shape our technology roadmap",
    ],
    requirements: [
      "5+ years of experience in full-stack development",
      "Strong proficiency in React, TypeScript, and Node.js",
      "Experience with cloud platforms (AWS, GCP, or Azure)",
      "Excellent problem-solving and communication skills",
      "Bachelor's degree in Computer Science or equivalent experience",
    ],
    benefits: [
      "Competitive salary and equity",
      "Comprehensive health, dental, and vision insurance",
      "Unlimited PTO",
      "Remote-first culture",
      "Learning and development budget",
    ],
  },
  {
    id: 2,
    title: "Product Designer",
    department: "design",
    location: "Mawlamyine, Mon State, Myanamr",
    type: "Full-time",
    salary: "MMK 1200k - MMK 1600k",
    remote: true,
    description:
      "Join our design team to create beautiful, intuitive experiences for our enterprise clients. You'll work on complex problems and have significant impact on our product direction.",
    responsibilities: [
      "Lead end-to-end design for new features and products",
      "Create wireframes, prototypes, and high-fidelity designs",
      "Conduct user research and usability testing",
      "Collaborate with engineering to ensure design quality in implementation",
      "Contribute to and evolve our design system",
    ],
    requirements: [
      "4+ years of product design experience",
      "Strong portfolio demonstrating UX and visual design skills",
      "Proficiency in Figma and modern design tools",
      "Experience with design systems and component libraries",
      "Excellent communication and presentation skills",
    ],
    benefits: [
      "Competitive salary and equity",
      "Comprehensive health, dental, and vision insurance",
      "Unlimited PTO",
      "Remote-first culture",
      "Conference and workshop allowance",
    ],
  },
  {
    id: 3,
    title: "DevOps Engineer",
    department: "engineering",
    location: "Mawlamyine, Mon State, Myanamr",
    type: "Full-time",
    salary: "MMK 1400k - MMK 1800k",
    remote: true,
    description:
      "Help us scale our infrastructure and improve our deployment pipelines. You'll work with cutting-edge cloud technologies and have significant impact on our platform reliability.",
    responsibilities: [
      "Design and maintain CI/CD pipelines",
      "Manage and optimize cloud infrastructure on AWS/GCP",
      "Implement monitoring, alerting, and logging solutions",
      "Automate infrastructure provisioning using Terraform",
      "Ensure security best practices across our infrastructure",
    ],
    requirements: [
      "4+ years of DevOps/SRE experience",
      "Strong experience with Kubernetes and container orchestration",
      "Proficiency in infrastructure as code (Terraform, Pulumi)",
      "Experience with monitoring tools (Datadog, Prometheus, Grafana)",
      "Strong scripting skills (Python, Bash)",
    ],
    benefits: [
      "Competitive salary and equity",
      "Comprehensive health, dental, and vision insurance",
      "Unlimited PTO",
      "Remote-first culture",
      "Home office setup budget",
    ],
  },
  {
    id: 4,
    title: "Product Manager",
    department: "product",
    location: "Mawlamyine, Mon State, Myanamr",
    type: "Full-time",
    salary: " 800,000 MMK - 1,000,000 MMK",
    remote: true,
    description:
      "Lead product strategy and execution for our enterprise platform. You'll work closely with customers, engineering, and design to deliver impactful features.",
    responsibilities: [
      "Define product vision and roadmap for key features",
      "Gather and prioritize customer requirements",
      "Write clear product specifications and user stories",
      "Analyze metrics and make data-driven decisions",
      "Coordinate launches and go-to-market strategies",
    ],
    requirements: [
      "5+ years of product management experience in B2B SaaS",
      "Strong technical background or experience working with engineering teams",
      "Excellent analytical and problem-solving skills",
      "Experience with Agile methodologies",
      "Outstanding communication and leadership skills",
    ],
    benefits: [
      "Competitive salary and equity",
      "Comprehensive health, dental, and vision insurance",
      "Unlimited PTO",
      "Annual company retreat",
      "Professional development opportunities",
    ],
  },
  {
    id: 5,
    title: "Account Executive",
    department: "sales",
    location: "New York, NY",
    type: "Full-time",
    salary: "$100k - $150k + Commission",
    remote: false,
    description:
      "Drive revenue growth by closing enterprise deals. You'll work with some of the world's most innovative companies and help them transform their technology landscape.",
    responsibilities: [
      "Manage full sales cycle from prospecting to close",
      "Build relationships with key decision makers",
      "Present product demos and proposals",
      "Negotiate contracts and pricing",
      "Collaborate with customer success for smooth handoffs",
    ],
    requirements: [
      "3+ years of B2B enterprise sales experience",
      "Track record of exceeding quota",
      "Experience selling technical products or services",
      "Strong presentation and negotiation skills",
      "CRM proficiency (Salesforce preferred)",
    ],
    benefits: [
      "Competitive base salary + uncapped commission",
      "Comprehensive health, dental, and vision insurance",
      "Unlimited PTO",
      "President's Club for top performers",
      "Career growth opportunities",
    ],
  },
  {
    id: 6,
    title: "Technical Writer",
    department: "operations",
    location: "Remote",
    type: "Full-time",
    salary: "$90k - $120k",
    remote: true,
    description:
      "Create clear, comprehensive documentation for our platform. You'll work with engineering and product teams to ensure our docs help customers succeed.",
    responsibilities: [
      "Write and maintain technical documentation",
      "Create tutorials, guides, and API references",
      "Develop documentation standards and style guides",
      "Gather feedback and iterate on documentation",
      "Collaborate with support to identify documentation gaps",
    ],
    requirements: [
      "3+ years of technical writing experience",
      "Strong understanding of software development concepts",
      "Experience with docs-as-code workflows",
      "Excellent writing and editing skills",
      "Ability to explain complex concepts simply",
    ],
    benefits: [
      "Competitive salary",
      "Comprehensive health, dental, and vision insurance",
      "Unlimited PTO",
      "Remote-first culture",
      "Learning and development budget",
    ],
  },
];

const perks = [
  {
    icon: Heart,
    title: "Health & Wellness",
    description: "Comprehensive medical, dental, and vision coverage",
  },
  {
    icon: DollarSign,
    title: "Competitive Pay",
    description: "Top-of-market salary plus equity",
  },
  {
    icon: Coffee,
    title: "Unlimited PTO",
    description: "Take the time you need to recharge",
  },
  {
    icon: Zap,
    title: "Growth Budget",
    description: "$2,000 annual learning allowance",
  },
  {
    icon: Building2,
    title: "Remote First",
    description: "Work from anywhere in the world",
  },
  {
    icon: Users,
    title: "Team Events",
    description: "Quarterly offsites and team building",
  },
];

export function Careers() {
  const [activeDepartment, setActiveDepartment] = useState("all");
  const [selectedJob, setSelectedJob] = useState<(typeof jobs)[0] | null>(null);
  const [showApplication, setShowApplication] = useState(false);
  const [applicationSubmitted, setApplicationSubmitted] = useState(false);
  const [applicationData, setApplicationData] = useState({
    name: "",
    email: "",
    phone: "",
    linkedin: "",
    portfolio: "",
    coverLetter: "",
  });

  const filteredJobs =
    activeDepartment === "all"
      ? jobs
      : jobs.filter((job) => job.department === activeDepartment);

  const handleSubmitApplication = async () => {
    try {
      await fetch("/api/careers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jobId: selectedJob?.id || 1,
          jobTitle: selectedJob?.title || "General",
          name: applicationData.name,
          email: applicationData.email,
          phone: applicationData.phone,
          linkedin: applicationData.linkedin,
          portfolio: applicationData.portfolio,
          coverLetter: applicationData.coverLetter,
        }),
      });
      setApplicationSubmitted(true);
    } catch (err) {
      console.error(err);
      setApplicationSubmitted(true);
    }
  };

  return (
    <section id="careers" className="py-24 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-medium tracking-wider uppercase">
            Join Our Team
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6 text-balance">
            Build the Future With Us
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto text-pretty">
            We&apos;re always looking for talented individuals to join our
            mission of transforming businesses through technology.
          </p>
        </motion.div>

        {/* Perks */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-16"
        >
          {perks.map((perk) => {
            const Icon = perk.icon;
            return (
              <div
                key={perk.title}
                className="bg-card border border-border rounded-xl p-4 text-center"
              >
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <h4 className="font-medium text-sm mb-1">{perk.title}</h4>
                <p className="text-xs text-muted-foreground">
                  {perk.description}
                </p>
              </div>
            );
          })}
        </motion.div>

        {/* Department Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {departments.map((dept) => (
            <button
              key={dept.id}
              onClick={() => setActiveDepartment(dept.id)}
              className={cn(
                "px-4 py-2 rounded-full text-sm transition-all",
                activeDepartment === dept.id
                  ? "bg-primary text-primary-foreground"
                  : "bg-card border border-border text-muted-foreground hover:border-primary/50 hover:text-foreground",
              )}
            >
              {dept.label}
            </button>
          ))}
        </div>

        {/* Job Listings */}
        <div className="space-y-4">
          {filteredJobs.map((job, index) => (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-all cursor-pointer"
              onClick={() => setSelectedJob(job)}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">{job.title}</h3>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {job.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {job.type}
                    </span>
                    <span className="flex items-center gap-1">
                      <DollarSign className="w-4 h-4" />
                      {job.salary}
                    </span>
                    {job.remote && (
                      <span className="px-2 py-0.5 bg-primary/10 text-primary text-xs font-medium rounded-full">
                        Remote OK
                      </span>
                    )}
                  </div>
                </div>
                <Button
                  variant="outline"
                  className="flex items-center gap-2"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedJob(job);
                  }}
                >
                  View Details
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Job Modal */}
        <AnimatePresence>
          {selectedJob && !showApplication && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
              onClick={() => setSelectedJob(null)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="bg-card border border-border rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-8">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h2 className="text-2xl font-bold mb-2">
                        {selectedJob.title}
                      </h2>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {selectedJob.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Briefcase className="w-4 h-4" />
                          {selectedJob.type}
                        </span>
                        <span className="flex items-center gap-1">
                          <DollarSign className="w-4 h-4" />
                          {selectedJob.salary}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => setSelectedJob(null)}
                      className="p-2 hover:bg-secondary rounded-full transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <p className="text-muted-foreground mb-8">
                    {selectedJob.description}
                  </p>

                  <div className="space-y-6">
                    <div>
                      <h3 className="font-semibold mb-3">Responsibilities</h3>
                      <ul className="space-y-2">
                        {selectedJob.responsibilities.map((item, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-2 text-sm text-muted-foreground"
                          >
                            <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-3">Requirements</h3>
                      <ul className="space-y-2">
                        {selectedJob.requirements.map((item, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-2 text-sm text-muted-foreground"
                          >
                            <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-3">Benefits</h3>
                      <ul className="space-y-2">
                        {selectedJob.benefits.map((item, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-2 text-sm text-muted-foreground"
                          >
                            <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="flex gap-4 mt-8 pt-6 border-t border-border">
                    <Button
                      onClick={() => setShowApplication(true)}
                      className="bg-primary text-primary-foreground hover:bg-primary/90 flex-1"
                    >
                      Apply Now
                    </Button>
                    <Button variant="outline">Share</Button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Application Modal */}
        <AnimatePresence>
          {showApplication && selectedJob && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
              onClick={() => {
                setShowApplication(false);
                setApplicationSubmitted(false);
              }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="bg-card border border-border rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-8">
                  {applicationSubmitted ? (
                    <div className="text-center py-8">
                      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Check className="w-8 h-8 text-primary" />
                      </div>
                      <h3 className="text-xl font-bold mb-2">
                        Application Submitted!
                      </h3>
                      <p className="text-muted-foreground mb-6">
                        Thank you for applying to {selectedJob.title}.
                        We&apos;ll review your application and get back to you
                        within 5-7 business days.
                      </p>
                      <Button
                        onClick={() => {
                          setShowApplication(false);
                          setSelectedJob(null);
                          setApplicationSubmitted(false);
                        }}
                      >
                        Close
                      </Button>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-start justify-between mb-6">
                        <div>
                          <h2 className="text-xl font-bold mb-1">
                            Apply for {selectedJob.title}
                          </h2>
                          <p className="text-sm text-muted-foreground">
                            {selectedJob.location}
                          </p>
                        </div>
                        <button
                          onClick={() => setShowApplication(false)}
                          className="p-2 hover:bg-secondary rounded-full transition-colors"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>

                      <div className="space-y-4">
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium mb-2">
                              Full Name *
                            </label>
                            <input
                              type="text"
                              value={applicationData.name}
                              onChange={(e) =>
                                setApplicationData({
                                  ...applicationData,
                                  name: e.target.value,
                                })
                              }
                              className="w-full px-4 py-3 bg-secondary border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                              placeholder="John Doe"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">
                              Email *
                            </label>
                            <input
                              type="email"
                              value={applicationData.email}
                              onChange={(e) =>
                                setApplicationData({
                                  ...applicationData,
                                  email: e.target.value,
                                })
                              }
                              className="w-full px-4 py-3 bg-secondary border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                              placeholder="john@email.com"
                            />
                          </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium mb-2">
                              Phone
                            </label>
                            <input
                              type="tel"
                              value={applicationData.phone}
                              onChange={(e) =>
                                setApplicationData({
                                  ...applicationData,
                                  phone: e.target.value,
                                })
                              }
                              className="w-full px-4 py-3 bg-secondary border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                              placeholder="+1 (555) 000-0000"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">
                              LinkedIn Profile
                            </label>
                            <input
                              type="url"
                              value={applicationData.linkedin}
                              onChange={(e) =>
                                setApplicationData({
                                  ...applicationData,
                                  linkedin: e.target.value,
                                })
                              }
                              className="w-full px-4 py-3 bg-secondary border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                              placeholder="linkedin.com/in/username"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-2">
                            Portfolio / Website
                          </label>
                          <input
                            type="url"
                            value={applicationData.portfolio}
                            onChange={(e) =>
                              setApplicationData({
                                ...applicationData,
                                portfolio: e.target.value,
                              })
                            }
                            className="w-full px-4 py-3 bg-secondary border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                            placeholder="https://yourportfolio.com"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-2">
                            Resume *
                          </label>
                          <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors cursor-pointer">
                            <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                            <p className="text-sm text-muted-foreground">
                              Drag and drop your resume or{" "}
                              <span className="text-primary">browse</span>
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                              PDF, DOC up to 5MB
                            </p>
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-2">
                            Cover Letter
                          </label>
                          <textarea
                            value={applicationData.coverLetter}
                            onChange={(e) =>
                              setApplicationData({
                                ...applicationData,
                                coverLetter: e.target.value,
                              })
                            }
                            rows={4}
                            className="w-full px-4 py-3 bg-secondary border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                            placeholder="Tell us why you're interested in this role..."
                          />
                        </div>
                      </div>

                      <div className="flex gap-4 mt-6">
                        <Button
                          onClick={handleSubmitApplication}
                          disabled={
                            !applicationData.name || !applicationData.email
                          }
                          className="bg-primary text-primary-foreground hover:bg-primary/90 flex-1"
                        >
                          <Send className="w-4 h-4 mr-2" />
                          Submit Application
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => setShowApplication(false)}
                        >
                          Cancel
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
