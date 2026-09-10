"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Linkedin,
  Twitter,
  Github,
  X,
  Mail,
  MapPin,
  Briefcase,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  initials: string;
  fullBio: string;
  location: string;
  experience: string;
  skills: string[];
  social: {
    linkedin?: string;
    twitter?: string;
    github?: string;
  };
}

// const team: TeamMember[] = [
//   {
//     name: "Htoo Myat Nyi Nyi",
//     role: "CEO & Founder",
//     bio: "5+ years experience in IT industry.",
//     initials: "HMNN",
//     fullBio:
//       "Htoo Myat Nyi Nyi is a visionary leader with over 5 years of experience in the technology industry. Before founding NexaTech, she served as VP of Product at Google, where she led a team of 200+ engineers building products used by billions.",
//     location: "San Francisco, CA",
//     experience: "5+ years",
//     skills: [
//       "Strategic Planning",
//       "Product Vision",
//       "Team Leadership",
//       "Fundraising",
//     ],
//     social: {
//       linkedin: "https://linkedin.com",
//       twitter: "https://twitter.com",
//     },
//   },
//   {
//     name: "David Kim",
//     role: "CTO & Co-Founder",
//     bio: "Full-stack architect. Previously at Amazon and Microsoft.",
//     initials: "DK",
//     fullBio:
//       "David is a world-class engineer with deep expertise in distributed systems and cloud architecture. He previously led the AWS Lambda team at Amazon and was a principal engineer at Microsoft working on Azure.",
//     location: "Seattle, WA",
//     experience: "18+ years",
//     skills: [
//       "System Architecture",
//       "Cloud Infrastructure",
//       "AI/ML",
//       "Security",
//     ],
//     social: {
//       linkedin: "https://linkedin.com",
//       github: "https://github.com",
//     },
//   },
//   {
//     name: "Maria Santos",
//     role: "VP of Engineering",
//     bio: "Engineering leader with expertise in scalable systems.",
//     initials: "MS",
//     fullBio:
//       "Maria leads our engineering organization with a focus on building high-performing teams and delivering quality at scale. She previously built and led engineering teams at Stripe and Airbnb.",
//     location: "New York, NY",
//     experience: "12+ years",
//     skills: ["Engineering Management", "Agile", "DevOps", "Scalability"],
//     social: {
//       linkedin: "https://linkedin.com",
//       twitter: "https://twitter.com",
//       github: "https://github.com",
//     },
//   },
//   {
//     name: "James Wilson",
//     role: "Head of Design",
//     bio: "Award-winning designer. 10+ years in product design.",
//     initials: "JW",
//     fullBio:
//       "James brings creative excellence to every project. His work has been recognized by Fast Company, Awwwards, and the Design Week awards. He previously led design at IDEO and Spotify.",
//     location: "Los Angeles, CA",
//     experience: "12+ years",
//     skills: [
//       "Product Design",
//       "UX Research",
//       "Design Systems",
//       "Brand Strategy",
//     ],
//     social: {
//       linkedin: "https://linkedin.com",
//       twitter: "https://twitter.com",
//     },
//   },
//   {
//     name: "Priya Patel",
//     role: "Head of AI/ML",
//     bio: "PhD in Machine Learning. Led AI teams at Meta.",
//     initials: "PP",
//     fullBio:
//       "Priya holds a PhD from Stanford and is an expert in applied machine learning. She led the recommendation systems team at Meta and has published over 30 papers in top AI conferences.",
//     location: "Palo Alto, CA",
//     experience: "10+ years",
//     skills: ["Machine Learning", "Deep Learning", "NLP", "Computer Vision"],
//     social: {
//       linkedin: "https://linkedin.com",
//       github: "https://github.com",
//     },
//   },
//   {
//     name: "Robert Chang",
//     role: "VP of Operations",
//     bio: "Operations expert. MBA from Stanford Business School.",
//     initials: "RC",
//     fullBio:
//       "Robert ensures our operations run smoothly and efficiently. With his MBA from Stanford and experience at McKinsey, he brings strategic thinking and operational excellence to everything we do.",
//     location: "San Francisco, CA",
//     experience: "14+ years",
//     skills: ["Operations", "Strategy", "Finance", "Business Development"],
//     social: {
//       linkedin: "https://linkedin.com",
//     },
//   },
// ];

export function Team({ teamMembers }: { teamMembers: TeamMember[] }) {
  console.log("teamMembers: ", teamMembers);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  const scrollToContact = () => {
    setSelectedMember(null);
    setTimeout(() => {
      const element = document.getElementById("contact");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  return (
    <section id="team" className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-semibold tracking-wider uppercase">
            Our Team
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6 text-balance">
            Meet the Experts
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Our leadership team brings decades of experience from the
            world&apos;s leading tech companies.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group bg-card border border-border rounded-2xl p-6 hover:border-primary/50 transition-all duration-300 cursor-pointer"
              onClick={() => setSelectedMember(member)}
            >
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                  <span className="text-primary font-bold text-xl">
                    {member.initials}
                  </span>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{member.name}</h3>
                  <p className="text-primary text-sm mb-2">{member.role}</p>
                  <p className="text-muted-foreground text-sm">{member.bio}</p>
                </div>
              </div>

              <div className="flex gap-3 mt-6 pt-4 border-t border-border">
                {member.social?.linkedin && (
                  <a
                    href={member.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                    aria-label={`${member.name}'s LinkedIn`}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                )}
                {member.social?.twitter && (
                  <a
                    href={member.social.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                    aria-label={`${member.name}'s Twitter`}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Twitter className="w-4 h-4" />
                  </a>
                )}
                {member.social?.github && (
                  <a
                    href={member.social.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                    aria-label={`${member.name}'s GitHub`}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Github className="w-4 h-4" />
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 bg-card border border-border rounded-2xl p-8 md:p-12 text-center"
        >
          <h3 className="text-2xl md:text-3xl font-bold mb-4">Join Our Team</h3>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            We&apos;re always looking for talented individuals to join our
            growing team. Check out our open positions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
              View Open Positions
            </Button>
            <Button
              variant="outline"
              className="border-border"
              onClick={scrollToContact}
            >
              Contact Us
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Team Member Modal */}
      <AnimatePresence>
        {selectedMember && (
          <div
            className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-6"
            onClick={() => setSelectedMember(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-card border border-border rounded-2xl overflow-hidden max-w-2xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-8">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 rounded-xl bg-primary/10 flex items-center justify-center">
                      <span className="text-primary font-bold text-2xl">
                        {selectedMember.initials}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold">
                        {selectedMember.name}
                      </h3>
                      <p className="text-primary">{selectedMember.role}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedMember(null)}
                    className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center hover:bg-secondary/80 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <p className="text-muted-foreground leading-relaxed mb-6">
                  {selectedMember.fullBio}
                </p>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Location</p>
                      <p className="font-medium">{selectedMember.location}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Briefcase className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Experience
                      </p>
                      <p className="font-medium">{selectedMember.experience}</p>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="font-semibold mb-3">Expertise</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedMember.skills?.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1.5 bg-secondary rounded-lg text-sm font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-6 border-t border-border">
                  <span className="text-sm text-muted-foreground">
                    Connect:
                  </span>
                  {selectedMember.social?.linkedin && (
                    <a
                      href={selectedMember.social.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                    >
                      <Linkedin className="w-5 h-5" />
                    </a>
                  )}
                  {selectedMember.social?.twitter && (
                    <a
                      href={selectedMember.social.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                    >
                      <Twitter className="w-5 h-5" />
                    </a>
                  )}
                  {selectedMember.social?.github && (
                    <a
                      href={selectedMember.social.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                    >
                      <Github className="w-5 h-5" />
                    </a>
                  )}
                  <a
                    href={`mailto:${selectedMember.name.toLowerCase().replace(" ", ".")}@nexatech.com`}
                    className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    <Mail className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
