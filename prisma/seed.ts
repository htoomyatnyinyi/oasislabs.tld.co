import {
  PrismaClient,
  Platform,
  RequirementType,
  JobType,
} from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

// Initialize PostgreSQL connection pool and Prisma driver adapter
const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);

// Pass adapter to PrismaClient constructor
const prisma = new PrismaClient({ adapter });

console.log("🌱 Starting database seed with Bun...");

// Clean existing data to allow fresh re-seeding
await prisma.$transaction([
  prisma.jobApplication.deleteMany(),
  prisma.newsletterSubscriber.deleteMany(),
  prisma.booking.deleteMany(),
  prisma.contactMessage.deleteMany(),
  prisma.blogPost.deleteMany(),
  prisma.portfolioItem.deleteMany(),
  prisma.testimonial.deleteMany(),
  prisma.postTag.deleteMany(),
  prisma.tag.deleteMany(),
  prisma.post.deleteMany(),
  prisma.blogCategory.deleteMany(),
  prisma.companyPerk.deleteMany(),
  prisma.jobBenefit.deleteMany(),
  prisma.jobRequirementOrTask.deleteMany(),
  prisma.job.deleteMany(),
  prisma.department.deleteMany(),
  prisma.faq.deleteMany(),
  prisma.faqCategory.deleteMany(),
  prisma.projectService.deleteMany(),
  prisma.projectTechnology.deleteMany(),
  prisma.projectResult.deleteMany(),
  prisma.project.deleteMany(),
  prisma.serviceTechnology.deleteMany(),
  prisma.technology.deleteMany(),
  prisma.serviceProcess.deleteMany(),
  prisma.serviceBenefit.deleteMany(),
  prisma.serviceFeature.deleteMany(),
  prisma.service.deleteMany(),
  prisma.skill.deleteMany(),
  prisma.socialLink.deleteMany(),
  prisma.teamMember.deleteMany(),
]);

console.log("🧹 Cleaned existing database records.");

// ==========================================
// 1. ADMIN & TEAM MEMBERS
// ==========================================
const adminMember = await prisma.teamMember.create({
  data: {
    name: "System Admin",
    initials: "SA",
    role: "Chief Technology Officer",
    location: "Yangon, Myanmar",
    experience: "10+ Years",
    bio: "Lead architect overseeing enterprise cloud solutions and platform security.",
    fullBio:
      "System Admin is a senior technology leader with over a decade of experience building scalable distributed systems, managing cloud architecture, and driving digital transformation for enterprise clients.",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600",
    skills: [
      "System Architecture",
      "Cloud Infrastructure",
      "PostgreSQL",
      "TypeScript",
      "Bun",
      "Node.js",
    ],
    socials: {
      github: "https://github.com/admin",
      linkedin: "https://linkedin.com/in/admin",
      twitter: "https://x.com/admin",
    },
    socialsList: {
      create: [
        { platform: Platform.GITHUB, url: "https://github.com/admin" },
        { platform: Platform.LINKEDIN, url: "https://linkedin.com/in/admin" },
        { platform: Platform.TWITTER, url: "https://x.com/admin" },
      ],
    },
    skillsList: {
      create: [
        { name: "System Architecture" },
        { name: "Cloud Infrastructure" },
        { name: "Security" },
      ],
    },
  },
});

const devMember = await prisma.teamMember.create({
  data: {
    name: "Thura Aung",
    initials: "TA",
    role: "Lead Full-Stack Engineer",
    location: "Yangon, Myanmar",
    experience: "6 Years",
    bio: "Specialist in Next.js, Prisma, and high-performance API designs.",
    fullBio:
      "Thura leads frontend and backend development teams, specializing in reactive web applications, GraphQL/REST APIs, and database design optimizations.",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=600",
    skills: ["Next.js", "React", "Prisma", "Tailwind CSS", "PostgreSQL"],
    socialsList: {
      create: [
        { platform: Platform.GITHUB, url: "https://github.com/thuraaung" },
        {
          platform: Platform.LINKEDIN,
          url: "https://linkedin.com/in/thuraaung",
        },
      ],
    },
    skillsList: {
      create: [{ name: "Next.js" }, { name: "Prisma" }, { name: "TypeScript" }],
    },
  },
});

console.log("✅ Created Team Members (including Admin)");

// ==========================================
// 2. TECHNOLOGIES
// ==========================================
const techNext = await prisma.technology.create({ data: { name: "Next.js" } });
const techReact = await prisma.technology.create({ data: { name: "React" } });
const techNode = await prisma.technology.create({ data: { name: "Bun" } });
const techPostgres = await prisma.technology.create({
  data: { name: "PostgreSQL" },
});
const techPrisma = await prisma.technology.create({ data: { name: "Prisma" } });
const techDocker = await prisma.technology.create({ data: { name: "Docker" } });
const techAWS = await prisma.technology.create({ data: { name: "AWS" } });

console.log("✅ Created Global Technologies");

// ==========================================
// 3. SERVICES
// ==========================================
const webDevService = await prisma.service.create({
  data: {
    title: "Full-Stack Web Development",
    slug: "full-stack-web-development",
    description:
      "End-to-end modern web applications built for speed, conversion, and seamless horizontal scale.",
    icon: "Code2",
    isActive: true,
    features: [
      "Server-Side Rendering",
      "REST & GraphQL APIs",
      "Database Optimization",
      "Real-time WebSockets",
    ],
    benefits: [
      "Sub-second page load times",
      "SEO-friendly server architecture",
      "Enterprise-grade security standards",
    ],
    technologies: ["Next.js", "React", "Bun", "PostgreSQL", "Prisma"],
    process: [
      "Discovery & Scoping",
      "Architecture & Wireframing",
      "Agile Development",
      "Testing & Deployment",
    ],
    featuresList: {
      create: [
        { name: "Server-Side Rendering" },
        { name: "Database Optimization" },
      ],
    },
    benefitsList: {
      create: [
        { description: "Sub-second page load times" },
        { description: "High SEO performance scores" },
      ],
    },
    processesList: {
      create: [
        { name: "Discovery & Architecture", order: 1 },
        { name: "Sprint Execution", order: 2 },
        { name: "QA & Deployment", order: 3 },
      ],
    },
    technologiesList: {
      create: [
        { technologyId: techNext.id },
        { technologyId: techReact.id },
        { technologyId: techPostgres.id },
      ],
    },
  },
});

const cloudService = await prisma.service.create({
  data: {
    title: "Cloud Infrastructure & DevOps",
    slug: "cloud-infrastructure-devops",
    description:
      "Automated CI/CD pipelines, container orchestration, and serverless architectures on AWS.",
    icon: "Cloud",
    isActive: true,
    features: [
      "Infrastructure as Code (Terraform)",
      "Kubernetes & Docker",
      "Automated CI/CD",
      "24/7 Monitoring",
    ],
    benefits: [
      "99.99% operational uptime",
      "Zero-downtime blue/green deployments",
      "Predictable cloud spend",
    ],
    technologies: ["AWS", "Docker", "PostgreSQL", "Kubernetes"],
    process: [
      "Cloud Audit",
      "Migration Strategy",
      "IaC Setup",
      "Deployment Pipeline",
    ],
    featuresList: {
      create: [
        { name: "Infrastructure as Code" },
        { name: "Zero-Downtime Deployment" },
      ],
    },
    benefitsList: {
      create: [{ description: "99.99% operational uptime guaranteed" }],
    },
    processesList: {
      create: [
        { name: "Infrastructure Audit", order: 1 },
        { name: "Pipeline Configuration", order: 2 },
      ],
    },
    technologiesList: {
      create: [{ technologyId: techAWS.id }, { technologyId: techDocker.id }],
    },
  },
});

console.log("✅ Created Services");

// ==========================================
// 4. PROJECTS / CASE STUDIES
// ==========================================
await prisma.project.create({
  data: {
    title: "Fintech Analytics Platform",
    slug: "fintech-analytics-platform",
    category: "Fintech",
    description:
      "Real-time financial transaction processor handling over 5M daily queries.",
    fullDescription:
      "We re-architected the client’s legacy reporting monolith into a high-throughput microservice infrastructure using Bun runtime and Prisma backended by PostgreSQL.",
    challenge:
      "Legacy system suffered severe bottlenecking during peak market trading hours, leading to reporting lags exceeding 15 minutes.",
    solution:
      "Implemented PostgreSQL read-replicas, Prisma middleware caching, and real-time streaming via WebSockets.",
    summaryMetrics:
      "70% Latency Reduction | 5M+ Daily Transactions | 99.99% Uptime",
    bgGradientFrom: "emerald-500/20",
    bgGradientTo: "cyan-500/20",
    isFeatured: true,
    results: {
      create: [
        { label: "Latency Drop", value: "70%" },
        { label: "Daily Volume", value: "5,000,000+" },
        { label: "Uptime", value: "99.99%" },
      ],
    },
    technologies: {
      create: [
        { technologyId: techNext.id },
        { technologyId: techPostgres.id },
        { technologyId: techAWS.id },
      ],
    },
    services: {
      create: [{ serviceId: webDevService.id }, { serviceId: cloudService.id }],
    },
  },
});

console.log("✅ Created Projects");

// ==========================================
// 5. FAQ CATEGORIES & FAQS
// ==========================================
await prisma.faqCategory.create({
  data: {
    slug: "general",
    label: "General Inquiries",
    order: 1,
    faqs: {
      create: [
        {
          question: "What is your typical project turnaround time?",
          answer:
            "Most custom web development projects take between 6 to 12 weeks depending on scope, complexity, and third-party API integrations.",
          order: 1,
          isPinned: true,
        },
        {
          question: "Do you offer ongoing post-launch maintenance?",
          answer:
            "Yes, we provide dedicated SLA-backed support packages including security patches, performance tuning, and continuous updates.",
          order: 2,
          isPinned: false,
        },
      ],
    },
  },
});

console.log("✅ Created FAQs");

// ==========================================
// 6. DEPARTMENTS & JOBS
// ==========================================
await prisma.department.create({
  data: {
    slug: "engineering",
    label: "Engineering",
    order: 1,
    jobs: {
      create: [
        {
          title: "Senior Backend Engineer (Bun/Node.js/Prisma)",
          slug: "senior-backend-engineer",
          location: "Yangon / Remote",
          type: JobType.FULL_TIME,
          isRemote: true,
          isActive: true,
          description:
            "We are looking for a Senior Backend Engineer to architect resilient database models and high-throughput APIs using Bun and Prisma.",
          salaryMin: 2500000,
          salaryMax: 4000000,
          salaryCurrency: "MMK",
          salaryOteString: "2.5M - 4.0M MMK per month",
          requirementsAndTasks: {
            create: [
              {
                content:
                  "Architect relational schema using Prisma ORM & PostgreSQL",
                type: RequirementType.RESPONSIBILITY,
                order: 1,
              },
              {
                content:
                  "Build secure, audited RESTful and GraphQL API services",
                type: RequirementType.RESPONSIBILITY,
                order: 2,
              },
              {
                content:
                  "5+ years experience with modern TypeScript backend runtimes (Bun/Node)",
                type: RequirementType.REQUIREMENT,
                order: 1,
              },
              {
                content:
                  "Deep understanding of SQL query optimization and indexing",
                type: RequirementType.REQUIREMENT,
                order: 2,
              },
            ],
          },
          benefits: {
            create: [
              { content: "Flexible remote work arrangement", order: 1 },
              {
                content: "Annual learning and certification stipend",
                order: 2,
              },
              { content: "Comprehensive health coverage", order: 3 },
            ],
          },
        },
      ],
    },
  },
});

await prisma.companyPerk.createMany({
  data: [
    {
      icon: "Laptop",
      title: "Top-Tier Equipment",
      description: "MacBook Pro M-Series provided for all full-time engineers.",
      order: 1,
    },
    {
      icon: "Zap",
      title: "Flexible Working Hours",
      description: "Focus on deliverables rather than strict clock-in times.",
      order: 2,
    },
    {
      icon: "Heart",
      title: "Health & Wellness",
      description: "Full coverage medical insurance and mental health support.",
      order: 3,
    },
  ],
});

console.log("✅ Created Careers & Perks");

// ==========================================
// 7. BLOG CATEGORIES, TAGS & POSTS
// ==========================================
const techCategory = await prisma.blogCategory.create({
  data: {
    name: "Engineering",
    slug: "engineering",
  },
});

const prismaTag = await prisma.tag.create({
  data: { name: "Prisma", slug: "prisma" },
});
const postgresTag = await prisma.tag.create({
  data: { name: "PostgreSQL", slug: "postgresql" },
});

await prisma.post.create({
  data: {
    title: "Scaling Prisma ORM with PostgreSQL Read Replicas",
    slug: "scaling-prisma-orm-postgresql-read-replicas",
    excerpt:
      "Learn how to split read and write queries in Prisma to double your database throughput.",
    content:
      "Scaling database read operations is critical when handling spikes in web application traffic. By utilizing the Prisma Read Replicas extension, queries can be seamlessly routed to non-blocking secondary databases...",
    image:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=1200",
    readTime: "6 min read",
    isFeatured: true,
    isActive: true,
    authorId: adminMember.id,
    categoryId: techCategory.id,
    tags: {
      create: [{ tagId: prismaTag.id }, { tagId: postgresTag.id }],
    },
  },
});

await prisma.blogPost.create({
  data: {
    title: "Top 5 Tech Trends to Watch in 2026",
    slug: "top-5-tech-trends-2026",
    excerpt:
      "From edge computing AI to automated ORM optimization, explore what is shaping modern software.",
    content:
      "As software development evolves, system performance and developer velocity remain paramount...",
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1200",
    author: "System Admin",
    category: "Industry Trends",
    publishedAt: new Date(),
  },
});

console.log("✅ Created Blog Data");

// ==========================================
// 8. TESTIMONIALS & PORTFOLIO ITEMS
// ==========================================
await prisma.testimonial.create({
  data: {
    author: "Ei Ei Khaing",
    role: "Head of Product",
    company: "Apex Logistics",
    content:
      "Working with this team transformed our logistics pipeline. Their deep technical expertise in database architecture eliminated our downtime completely.",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300",
  },
});

await prisma.portfolioItem.create({
  data: {
    title: "Enterprise ERP Dashboard",
    description:
      "Real-time resource management software built for international supply chain logistics.",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
    category: "Web Application",
    link: "https://example.com/erp",
    technologies: ["Next.js", "PostgreSQL", "Tailwind CSS"],
  },
});

console.log("✅ Created Testimonials & Portfolio Items");

// ==========================================
// 9. MESSAGES, BOOKINGS, SUBSCRIBERS & APPLICATIONS
// ==========================================
await prisma.contactMessage.create({
  data: {
    firstName: "Kyaw",
    lastName: "Zin",
    email: "kyaw.zin@example.com",
    company: "Tech Innovations Myanmar",
    service: "Full-Stack Web Development",
    budget: "$5,000 - $10,000",
    message:
      "Hello, we would like to request a proposal for modernizing our core SaaS platform.",
  },
});

await prisma.booking.create({
  data: {
    name: "Aung Kyaw",
    email: "aungkyaw@example.com",
    company: "Digital Solutions Co.",
    message:
      "Looking forward to discussing our infrastructure migration strategy.",
    meetingType: "30-Min Technical Discovery",
    date: "2026-09-20",
    time: "10:00 AM",
  },
});

await prisma.newsletterSubscriber.create({
  data: {
    email: "subscriber@example.com",
  },
});

await prisma.jobApplication.create({
  data: {
    jobTitle: "Senior Backend Engineer (Bun/Node.js/Prisma)",
    name: "Min Thu",
    email: "minthu@example.com",
    phone: "+959123456789",
    linkedin: "https://linkedin.com/in/minthu",
    portfolio: "https://github.com/minthu",
    coverLetter:
      "I have 5 years of experience building TypeScript microservices with Prisma and PostgreSQL.",
    resumeUrl: "https://example.com/resumes/minthu.pdf",
  },
});

console.log("✅ Created Messages, Bookings, Subscribers, and Job Applications");
console.log("🎉 Seed process completed successfully with Bun!");

await prisma.$disconnect();
await pool.end();

// import {
//   PrismaClient,
//   Platform,
//   RequirementType,
//   JobType,
// } from "@prisma/client";
// import * as bcrypt from "bcryptjs";

// const prisma = new PrismaClient();

// async function main() {
//   console.log("🌱 Starting database seed...");

//   // Clean existing data to allow fresh re-seeding
//   await prisma.$transaction([
//     prisma.jobApplication.deleteMany(),
//     prisma.newsletterSubscriber.deleteMany(),
//     prisma.booking.deleteMany(),
//     prisma.contactMessage.deleteMany(),
//     prisma.blogPost.deleteMany(),
//     prisma.portfolioItem.deleteMany(),
//     prisma.testimonial.deleteMany(),
//     prisma.postTag.deleteMany(),
//     prisma.tag.deleteMany(),
//     prisma.post.deleteMany(),
//     prisma.blogCategory.deleteMany(),
//     prisma.companyPerk.deleteMany(),
//     prisma.jobBenefit.deleteMany(),
//     prisma.jobRequirementOrTask.deleteMany(),
//     prisma.job.deleteMany(),
//     prisma.department.deleteMany(),
//     prisma.faq.deleteMany(),
//     prisma.faqCategory.deleteMany(),
//     prisma.projectService.deleteMany(),
//     prisma.projectTechnology.deleteMany(),
//     prisma.projectResult.deleteMany(),
//     prisma.project.deleteMany(),
//     prisma.serviceTechnology.deleteMany(),
//     prisma.technology.deleteMany(),
//     prisma.serviceProcess.deleteMany(),
//     prisma.serviceBenefit.deleteMany(),
//     prisma.serviceFeature.deleteMany(),
//     prisma.service.deleteMany(),
//     prisma.skill.deleteMany(),
//     prisma.socialLink.deleteMany(),
//     prisma.teamMember.deleteMany(),
//   ]);

//   console.log("🧹 Cleaned existing database records.");

//   // ==========================================
//   // 1. ADMIN & TEAM MEMBERS
//   // ==========================================
//   const adminMember = await prisma.teamMember.create({
//     data: {
//       name: "System Admin",
//       initials: "SA",
//       role: "Chief Technology Officer",
//       location: "Yangon, Myanmar",
//       experience: "10+ Years",
//       bio: "Lead architect overseeing enterprise cloud solutions and platform security.",
//       fullBio:
//         "System Admin is a senior technology leader with over a decade of experience building scalable distributed systems, managing cloud architecture, and driving digital transformation for enterprise clients.",
//       image:
//         "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600",
//       skills: [
//         "System Architecture",
//         "Cloud Infrastructure",
//         "PostgreSQL",
//         "TypeScript",
//         "Node.js",
//       ],
//       socials: {
//         github: "https://github.com/admin",
//         linkedin: "https://linkedin.com/in/admin",
//         twitter: "https://x.com/admin",
//       },
//       socialsList: {
//         create: [
//           { platform: Platform.GITHUB, url: "https://github.com/admin" },
//           { platform: Platform.LINKEDIN, url: "https://linkedin.com/in/admin" },
//           { platform: Platform.TWITTER, url: "https://x.com/admin" },
//         ],
//       },
//       skillsList: {
//         create: [
//           { name: "System Architecture" },
//           { name: "Cloud Infrastructure" },
//           { name: "Security" },
//         ],
//       },
//     },
//   });

//   const devMember = await prisma.teamMember.create({
//     data: {
//       name: "Thura Aung",
//       initials: "TA",
//       role: "Lead Full-Stack Engineer",
//       location: "Yangon, Myanmar",
//       experience: "6 Years",
//       bio: "Specialist in Next.js, Prisma, and high-performance API designs.",
//       fullBio:
//         "Thura leads frontend and backend development teams, specializing in reactive web applications, GraphQL/REST APIs, and database design optimizations.",
//       image:
//         "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=600",
//       skills: ["Next.js", "React", "Prisma", "Tailwind CSS", "PostgreSQL"],
//       socialsList: {
//         create: [
//           { platform: Platform.GITHUB, url: "https://github.com/thuraaung" },
//           {
//             platform: Platform.LINKEDIN,
//             url: "https://linkedin.com/in/thuraaung",
//           },
//         ],
//       },
//       skillsList: {
//         create: [
//           { name: "Next.js" },
//           { name: "Prisma" },
//           { name: "TypeScript" },
//         ],
//       },
//     },
//   });

//   console.log("✅ Created Team Members (including Admin)");

//   // ==========================================
//   // 2. TECHNOLOGIES
//   // ==========================================
//   const techNext = await prisma.technology.create({
//     data: { name: "Next.js" },
//   });
//   const techReact = await prisma.technology.create({ data: { name: "React" } });
//   const techNode = await prisma.technology.create({
//     data: { name: "Node.js" },
//   });
//   const techPostgres = await prisma.technology.create({
//     data: { name: "PostgreSQL" },
//   });
//   const techPrisma = await prisma.technology.create({
//     data: { name: "Prisma" },
//   });
//   const techDocker = await prisma.technology.create({
//     data: { name: "Docker" },
//   });
//   const techAWS = await prisma.technology.create({ data: { name: "AWS" } });

//   console.log("✅ Created Global Technologies");

//   // ==========================================
//   // 3. SERVICES
//   // ==========================================
//   const webDevService = await prisma.service.create({
//     data: {
//       title: "Full-Stack Web Development",
//       slug: "full-stack-web-development",
//       description:
//         "End-to-end modern web applications built for speed, conversion, and seamless horizontal scale.",
//       icon: "Code2",
//       isActive: true,
//       features: [
//         "Server-Side Rendering",
//         "REST & GraphQL APIs",
//         "Database Optimization",
//         "Real-time WebSockets",
//       ],
//       benefits: [
//         "Sub-second page load times",
//         "SEO-friendly server architecture",
//         "Enterprise-grade security standards",
//       ],
//       technologies: ["Next.js", "React", "Node.js", "PostgreSQL", "Prisma"],
//       process: [
//         "Discovery & Scoping",
//         "Architecture & Wireframing",
//         "Agile Development",
//         "Testing & Deployment",
//       ],
//       featuresList: {
//         create: [
//           { name: "Server-Side Rendering" },
//           { name: "Database Optimization" },
//         ],
//       },
//       benefitsList: {
//         create: [
//           { description: "Sub-second page load times" },
//           { description: "High SEO performance scores" },
//         ],
//       },
//       processesList: {
//         create: [
//           { name: "Discovery & Architecture", order: 1 },
//           { name: "Sprint Execution", order: 2 },
//           { name: "QA & Deployment", order: 3 },
//         ],
//       },
//       technologiesList: {
//         create: [
//           { technologyId: techNext.id },
//           { technologyId: techReact.id },
//           { technologyId: techPostgres.id },
//         ],
//       },
//     },
//   });

//   const cloudService = await prisma.service.create({
//     data: {
//       title: "Cloud Infrastructure & DevOps",
//       slug: "cloud-infrastructure-devops",
//       description:
//         "Automated CI/CD pipelines, container orchestration, and serverless architectures on AWS.",
//       icon: "Cloud",
//       isActive: true,
//       features: [
//         "Infrastructure as Code (Terraform)",
//         "Kubernetes & Docker",
//         "Automated CI/CD",
//         "24/7 Monitoring",
//       ],
//       benefits: [
//         "99.99% operational uptime",
//         "Zero-downtime blue/green deployments",
//         "Predictable cloud spend",
//       ],
//       technologies: ["AWS", "Docker", "PostgreSQL", "Kubernetes"],
//       process: [
//         "Cloud Audit",
//         "Migration Strategy",
//         "IaC Setup",
//         "Deployment Pipeline",
//       ],
//       featuresList: {
//         create: [
//           { name: "Infrastructure as Code" },
//           { name: "Zero-Downtime Deployment" },
//         ],
//       },
//       benefitsList: {
//         create: [{ description: "99.99% operational uptime guaranteed" }],
//       },
//       processesList: {
//         create: [
//           { name: "Infrastructure Audit", order: 1 },
//           { name: "Pipeline Configuration", order: 2 },
//         ],
//       },
//       technologiesList: {
//         create: [{ technologyId: techAWS.id }, { technologyId: techDocker.id }],
//       },
//     },
//   });

//   console.log("✅ Created Services");

//   // ==========================================
//   // 4. PROJECTS / CASE STUDIES
//   // ==========================================
//   await prisma.project.create({
//     data: {
//       title: "Fintech Analytics Platform",
//       slug: "fintech-analytics-platform",
//       category: "Fintech",
//       description:
//         "Real-time financial transaction processor handling over 5M daily queries.",
//       fullDescription:
//         "We re-architected the client’s legacy reporting monolith into a high-throughput microservice infrastructure. Utilizing Next.js and serverless Node.js endpoints backended by PostgreSQL, transaction processing latency dropped by 70%.",
//       challenge:
//         "Legacy system suffered severe bottlenecking during peak market trading hours, leading to reporting lags exceeding 15 minutes.",
//       solution:
//         "Implemented PostgreSQL read-replicas, Prisma middleware caching, and real-time streaming via WebSockets.",
//       summaryMetrics:
//         "70% Latency Reduction | 5M+ Daily Transactions | 99.99% Uptime",
//       bgGradientFrom: "emerald-500/20",
//       bgGradientTo: "cyan-500/20",
//       isFeatured: true,
//       results: {
//         create: [
//           { label: "Latency Drop", value: "70%" },
//           { label: "Daily Volume", value: "5,000,000+" },
//           { label: "Uptime", value: "99.99%" },
//         ],
//       },
//       technologies: {
//         create: [
//           { technologyId: techNext.id },
//           { technologyId: techPostgres.id },
//           { technologyId: techAWS.id },
//         ],
//       },
//       services: {
//         create: [
//           { serviceId: webDevService.id },
//           { serviceId: cloudService.id },
//         ],
//       },
//     },
//   });

//   console.log("✅ Created Projects");

//   // ==========================================
//   // 5. FAQ CATEGORIES & FAQS
//   // ==========================================
//   const generalFaqCategory = await prisma.faqCategory.create({
//     data: {
//       slug: "general",
//       label: "General Inquiries",
//       order: 1,
//       faqs: {
//         create: [
//           {
//             question: "What is your typical project turnaround time?",
//             answer:
//               "Most custom web development projects take between 6 to 12 weeks depending on scope, complexity, and third-party API integrations.",
//             order: 1,
//             isPinned: true,
//           },
//           {
//             question: "Do you offer ongoing post-launch maintenance?",
//             answer:
//               "Yes, we provide dedicated SLA-backed support packages including security patches, performance tuning, and continuous updates.",
//             order: 2,
//             isPinned: false,
//           },
//         ],
//       },
//     },
//   });

//   console.log("✅ Created FAQs");

//   // ==========================================
//   // 6. DEPARTMENTS & JOBS
//   // ==========================================
//   await prisma.department.create({
//     data: {
//       slug: "engineering",
//       label: "Engineering",
//       order: 1,
//       jobs: {
//         create: [
//           {
//             title: "Senior Backend Engineer (Node.js/Prisma)",
//             slug: "senior-backend-engineer",
//             location: "Yangon / Remote",
//             type: JobType.FULL_TIME,
//             isRemote: true,
//             isActive: true,
//             description:
//               "We are looking for a Senior Backend Engineer to architect resilient database models and high-throughput APIs.",
//             salaryMin: 2500000,
//             salaryMax: 4000000,
//             salaryCurrency: "MMK",
//             salaryOteString: "2.5M - 4.0M MMK per month",
//             requirementsAndTasks: {
//               create: [
//                 {
//                   content:
//                     "Architect relational schema using Prisma ORM & PostgreSQL",
//                   type: RequirementType.RESPONSIBILITY,
//                   order: 1,
//                 },
//                 {
//                   content:
//                     "Build secure, audited RESTful and GraphQL API services",
//                   type: RequirementType.RESPONSIBILITY,
//                   order: 2,
//                 },
//                 {
//                   content:
//                     "5+ years experience with modern JavaScript/TypeScript backend runtimes",
//                   type: RequirementType.REQUIREMENT,
//                   order: 1,
//                 },
//                 {
//                   content:
//                     "Deep understanding of SQL query optimization and indexing",
//                   type: RequirementType.REQUIREMENT,
//                   order: 2,
//                 },
//               ],
//             },
//             benefits: {
//               create: [
//                 { content: "Flexible remote work arrangement", order: 1 },
//                 {
//                   content: "Annual learning and certification stipend",
//                   order: 2,
//                 },
//                 { content: "Comprehensive health coverage", order: 3 },
//               ],
//             },
//           },
//         ],
//       },
//     },
//   });

//   await prisma.companyPerk.createMany({
//     data: [
//       {
//         icon: "Laptop",
//         title: "Top-Tier Equipment",
//         description:
//           "MacBook Pro M-Series provided for all full-time engineers.",
//         order: 1,
//       },
//       {
//         icon: "Zap",
//         title: "Flexible Working Hours",
//         description: "Focus on deliverables rather than strict clock-in times.",
//         order: 2,
//       },
//       {
//         icon: "Heart",
//         title: "Health & Wellness",
//         description:
//           "Full coverage medical insurance and mental health support.",
//         order: 3,
//       },
//     ],
//   });

//   console.log("✅ Created Careers & Perks");

//   // ==========================================
//   // 7. BLOG CATEGORIES, TAGS & POSTS
//   // ==========================================
//   const techCategory = await prisma.blogCategory.create({
//     data: {
//       name: "Engineering",
//       slug: "engineering",
//     },
//   });

//   const prismaTag = await prisma.tag.create({
//     data: { name: "Prisma", slug: "prisma" },
//   });
//   const postgresTag = await prisma.tag.create({
//     data: { name: "PostgreSQL", slug: "postgresql" },
//   });

//   await prisma.post.create({
//     data: {
//       title: "Scaling Prisma ORM with PostgreSQL Read Replicas",
//       slug: "scaling-prisma-orm-postgresql-read-replicas",
//       excerpt:
//         "Learn how to split read and write queries in Prisma to double your database throughput.",
//       content:
//         "Scaling database read operations is critical when handling spikes in web application traffic. By utilizing the Prisma Read Replicas extension, queries can be seamlessly routed to non-blocking secondary databases...",
//       image:
//         "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=1200",
//       readTime: "6 min read",
//       isFeatured: true,
//       isActive: true,
//       authorId: adminMember.id,
//       categoryId: techCategory.id,
//       tags: {
//         create: [{ tagId: prismaTag.id }, { tagId: postgresTag.id }],
//       },
//     },
//   });

//   // Simple Blog Post
//   await prisma.blogPost.create({
//     data: {
//       title: "Top 5 Tech Trends to Watch in 2026",
//       slug: "top-5-tech-trends-2026",
//       excerpt:
//         "From edge computing AI to automated ORM optimization, explore what is shaping modern software.",
//       content:
//         "As software development evolves, system performance and developer velocity remain paramount...",
//       image:
//         "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1200",
//       author: "System Admin",
//       category: "Industry Trends",
//       publishedAt: new Date(),
//     },
//   });

//   console.log("✅ Created Blog Data");

//   // ==========================================
//   // 8. TESTIMONIALS & PORTFOLIO ITEMS
//   // ==========================================
//   await prisma.testimonial.create({
//     data: {
//       author: "Ei Ei Khaing",
//       role: "Head of Product",
//       company: "Apex Logistics",
//       content:
//         "Working with this team transformed our logistics pipeline. Their deep technical expertise in database architecture eliminated our downtime completely.",
//       rating: 5,
//       image:
//         "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300",
//     },
//   });

//   await prisma.portfolioItem.create({
//     data: {
//       title: "Enterprise ERP Dashboard",
//       description:
//         "Real-time resource management software built for international supply chain logistics.",
//       image:
//         "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
//       category: "Web Application",
//       link: "https://example.com/erp",
//       technologies: ["Next.js", "PostgreSQL", "Tailwind CSS"],
//     },
//   });

//   console.log("✅ Created Testimonials & Portfolio Items");

//   // ==========================================
//   // 9. MESSAGES, BOOKINGS, SUBSCRIBERS & APPLICATIONS
//   // ==========================================
//   await prisma.contactMessage.create({
//     data: {
//       firstName: "Kyaw",
//       lastName: "Zin",
//       email: "kyaw.zin@example.com",
//       company: "Tech Innovations Myanmar",
//       service: "Full-Stack Web Development",
//       budget: "$5,000 - $10,000",
//       message:
//         "Hello, we would like to request a proposal for modernizing our core SaaS platform.",
//     },
//   });

//   await prisma.booking.create({
//     data: {
//       name: "Aung Kyaw",
//       email: "aungkyaw@example.com",
//       company: "Digital Solutions Co.",
//       message:
//         "Looking forward to discussing our infrastructure migration strategy.",
//       meetingType: "30-Min Technical Discovery",
//       date: "2026-09-20",
//       time: "10:00 AM",
//     },
//   });

//   await prisma.newsletterSubscriber.create({
//     data: {
//       email: "subscriber@example.com",
//     },
//   });

//   await prisma.jobApplication.create({
//     data: {
//       jobTitle: "Senior Backend Engineer (Node.js/Prisma)",
//       name: "Min Thu",
//       email: "minthu@example.com",
//       phone: "+959123456789",
//       linkedin: "https://linkedin.com/in/minthu",
//       portfolio: "https://github.com/minthu",
//       coverLetter:
//         "I have 5 years of experience building Node.js microservices with Prisma and PostgreSQL.",
//       resumeUrl: "https://example.com/resumes/minthu.pdf",
//     },
//   });

//   console.log(
//     "✅ Created Messages, Bookings, Subscribers, and Job Applications",
//   );
//   console.log("🎉 Seed process completed successfully!");
// }

// main()
//   .catch((e) => {
//     console.error("❌ Error executing seed:", e);
//     process.exit(1);
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });
