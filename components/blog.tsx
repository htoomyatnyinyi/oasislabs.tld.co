"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Clock, ArrowRight, X, User, Tag, Share2, Bookmark, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const blogPosts = [
  {
    id: 1,
    title: "The Future of AI in Enterprise Software Development",
    excerpt: "Explore how artificial intelligence is revolutionizing the way businesses build and deploy software solutions.",
    content: `Artificial Intelligence is no longer a futuristic concept—it's reshaping enterprise software development today. From automated code generation to intelligent testing frameworks, AI tools are enabling development teams to work faster and smarter than ever before.

Key trends we're seeing in 2024:

1. **AI-Powered Code Assistants**: Tools like GitHub Copilot and Amazon CodeWhisperer are becoming standard in development workflows, helping developers write code up to 55% faster.

2. **Intelligent Testing**: AI-driven testing platforms can now generate test cases, identify edge cases, and predict potential bugs before they reach production.

3. **Natural Language Requirements**: Converting business requirements written in plain English directly into functional code specifications.

4. **Automated Documentation**: AI systems that maintain and update documentation as code changes, ensuring accuracy and reducing manual effort.

5. **Predictive Maintenance**: Using machine learning to anticipate system failures and optimize performance proactively.

The enterprises that embrace these technologies today will have a significant competitive advantage tomorrow. At NexaTech, we're helping our clients integrate AI capabilities into their development pipelines, resulting in 40% faster time-to-market and 60% reduction in post-deployment issues.`,
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop",
    category: "AI & Machine Learning",
    author: "Sarah Chen",
    authorRole: "CTO",
    date: "March 15, 2024",
    readTime: "8 min read",
    tags: ["AI", "Enterprise", "Development", "Innovation"]
  },
  {
    id: 2,
    title: "Migrating Legacy Systems to Cloud: A Complete Guide",
    excerpt: "Learn the best practices for modernizing your legacy infrastructure with minimal disruption to your business.",
    content: `Legacy system migration is one of the most challenging yet rewarding transformations an organization can undertake. Done right, it unlocks new capabilities, reduces costs, and positions your business for future growth.

**Understanding the Migration Journey**

Before diving into technical details, it's crucial to understand that migration is not just a technical project—it's a business transformation. Success requires alignment between IT teams, business stakeholders, and executive leadership.

**The 6 R's of Cloud Migration:**

1. **Rehost (Lift and Shift)**: Moving applications to the cloud with minimal changes. Fastest approach but doesn't leverage cloud-native benefits.

2. **Replatform**: Making a few cloud optimizations without changing the core architecture.

3. **Refactor**: Re-architecting applications to be cloud-native, maximizing benefits but requiring significant investment.

4. **Repurchase**: Moving to a different product, often SaaS-based solutions.

5. **Retire**: Decommissioning applications that are no longer needed.

6. **Retain**: Keeping certain applications on-premises due to compliance or technical constraints.

**Best Practices for Success:**

- Start with a comprehensive assessment of your current state
- Define clear success metrics and KPIs
- Build a strong cross-functional team
- Plan for training and change management
- Implement robust testing at every stage
- Have a clear rollback strategy

Our recent migration project for a Fortune 500 financial services company resulted in 45% infrastructure cost reduction and 99.99% uptime improvement.`,
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=400&fit=crop",
    category: "Cloud Solutions",
    author: "Michael Rodriguez",
    authorRole: "Cloud Architect",
    date: "March 10, 2024",
    readTime: "12 min read",
    tags: ["Cloud", "Migration", "Legacy Systems", "AWS"]
  },
  {
    id: 3,
    title: "Building Secure Applications: Zero Trust Architecture",
    excerpt: "Discover how Zero Trust principles can protect your applications from modern cyber threats.",
    content: `In an era where traditional perimeter-based security is no longer sufficient, Zero Trust Architecture has emerged as the gold standard for protecting enterprise applications and data.

**The Core Principle: Never Trust, Always Verify**

Zero Trust operates on the assumption that threats exist both outside and inside the network. Every access request must be authenticated, authorized, and encrypted before granting access to resources.

**Key Components of Zero Trust:**

1. **Identity Verification**: Strong authentication for all users, including multi-factor authentication (MFA) and continuous validation.

2. **Device Trust**: Ensuring that only compliant and secure devices can access corporate resources.

3. **Micro-Segmentation**: Dividing the network into small, isolated segments to limit lateral movement of threats.

4. **Least Privilege Access**: Granting users only the minimum permissions necessary for their role.

5. **Continuous Monitoring**: Real-time visibility and analytics to detect and respond to threats quickly.

**Implementation Roadmap:**

Phase 1: Identify sensitive data and assets
Phase 2: Map transaction flows
Phase 3: Build a Zero Trust architecture
Phase 4: Create security policies
Phase 5: Monitor and maintain

Organizations implementing Zero Trust have seen an average 50% reduction in breach impact and 40% faster threat detection.`,
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&h=400&fit=crop",
    category: "Cybersecurity",
    author: "David Park",
    authorRole: "Security Lead",
    date: "March 5, 2024",
    readTime: "10 min read",
    tags: ["Security", "Zero Trust", "Architecture", "Best Practices"]
  },
  {
    id: 4,
    title: "React Server Components: A Game Changer for Web Apps",
    excerpt: "Understanding how React Server Components improve performance and developer experience.",
    content: `React Server Components represent a paradigm shift in how we build React applications. By moving rendering to the server, we can significantly improve performance, reduce bundle sizes, and enhance the user experience.

**What Are Server Components?**

Server Components are React components that render exclusively on the server. Unlike traditional React components that ship JavaScript to the client, Server Components send only the rendered HTML, resulting in smaller bundles and faster load times.

**Key Benefits:**

1. **Zero Bundle Size**: Server Components don't add to the JavaScript bundle sent to the client.

2. **Direct Backend Access**: Query databases and access file systems directly within components.

3. **Automatic Code Splitting**: The framework handles code splitting automatically.

4. **Improved SEO**: Content is rendered on the server, making it immediately available to search engines.

5. **Better Performance**: Reduced time-to-interactive and faster page loads.

**When to Use Server vs Client Components:**

Use Server Components for:
- Fetching data
- Accessing backend resources
- Keeping sensitive information on the server

Use Client Components for:
- Interactivity and event listeners
- State and lifecycle effects
- Browser-only APIs

Our team has achieved 60% reduction in JavaScript bundle sizes and 40% improvement in Largest Contentful Paint (LCP) by adopting Server Components in client projects.`,
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop",
    category: "Development",
    author: "Emily Watson",
    authorRole: "Lead Developer",
    date: "February 28, 2024",
    readTime: "7 min read",
    tags: ["React", "Server Components", "Performance", "Web Development"]
  },
  {
    id: 5,
    title: "Scaling Mobile Apps for Millions of Users",
    excerpt: "Technical strategies for building mobile applications that can handle massive user growth.",
    content: `Building a mobile app that works for thousands of users is one thing—scaling it to handle millions is an entirely different challenge. Here's how to architect mobile applications for massive scale.

**Architecture Principles for Scale:**

1. **Stateless Design**: Design your backend services to be stateless, allowing easy horizontal scaling.

2. **Caching Strategy**: Implement multi-layer caching—CDN, API gateway, application, and database levels.

3. **Database Optimization**: Use read replicas, sharding, and connection pooling to handle increased load.

4. **Asynchronous Processing**: Move heavy operations to background queues to keep the app responsive.

5. **Edge Computing**: Process data closer to users using edge functions and CDNs.

**Mobile-Specific Optimizations:**

- Implement efficient offline-first architecture
- Use delta sync for data updates
- Optimize image and asset delivery
- Implement intelligent prefetching
- Use push notifications strategically

**Monitoring at Scale:**

- Real-time performance monitoring
- Crash analytics and error tracking
- User behavior analytics
- A/B testing infrastructure
- Feature flag management

We recently helped a fintech client scale from 50,000 to 5 million users in 18 months, maintaining sub-100ms API response times throughout the growth journey.`,
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=400&fit=crop",
    category: "Mobile Development",
    author: "James Liu",
    authorRole: "Mobile Architect",
    date: "February 20, 2024",
    readTime: "9 min read",
    tags: ["Mobile", "Scaling", "Architecture", "Performance"]
  },
  {
    id: 6,
    title: "DevOps Best Practices for 2024",
    excerpt: "Modern DevOps strategies that are driving efficiency and reliability in software delivery.",
    content: `DevOps continues to evolve rapidly, with new tools and practices emerging to meet the demands of modern software delivery. Here are the best practices that are making the biggest impact in 2024.

**Platform Engineering Rise:**

Platform engineering is becoming essential for scaling DevOps. Internal developer platforms (IDPs) abstract infrastructure complexity, enabling developers to self-serve while maintaining governance and security.

**GitOps for Everything:**

GitOps extends beyond application deployment to infrastructure, security policies, and even compliance. Tools like ArgoCD and Flux are making declarative, version-controlled operations the standard.

**Observability 2.0:**

Moving beyond traditional monitoring to full observability with distributed tracing, log aggregation, and real-time metrics correlation. OpenTelemetry is becoming the universal standard.

**Security Shift-Left:**

Security is no longer an afterthought. DevSecOps practices integrate security scanning, vulnerability management, and compliance checks directly into CI/CD pipelines.

**AI-Enhanced Operations:**

AI is automating incident response, predicting outages, and optimizing resource allocation. AIOps tools are reducing mean time to resolution (MTTR) by up to 70%.

**Key Metrics to Track:**

- Deployment frequency
- Lead time for changes
- Mean time to recovery
- Change failure rate

Organizations adopting these practices are seeing 200x more frequent deployments with 24x faster recovery times.`,
    image: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=800&h=400&fit=crop",
    category: "DevOps",
    author: "Alex Thompson",
    authorRole: "DevOps Lead",
    date: "February 15, 2024",
    readTime: "11 min read",
    tags: ["DevOps", "CI/CD", "Automation", "Best Practices"]
  }
];

const categories = ["All", "AI & Machine Learning", "Cloud Solutions", "Cybersecurity", "Development", "Mobile Development", "DevOps"];

export function Blog() {
  const [selectedPost, setSelectedPost] = useState<typeof blogPosts[0] | null>(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 3;

  const filteredPosts = activeCategory === "All" 
    ? blogPosts 
    : blogPosts.filter(post => post.category === activeCategory);

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const paginatedPosts = filteredPosts.slice((currentPage - 1) * postsPerPage, currentPage * postsPerPage);

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setCurrentPage(1);
  };

  return (
    <section id="blog" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-medium tracking-wider uppercase">
            Insights & Articles
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6 text-balance">
            Latest from Our Blog
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto text-pretty">
            Stay updated with the latest trends, best practices, and insights from our team of experts.
          </p>
        </motion.div>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={cn(
                "px-4 py-2 rounded-full text-sm transition-all",
                activeCategory === category
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-muted-foreground hover:bg-secondary/80 hover:text-foreground"
              )}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Blog Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {paginatedPosts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/50 transition-all cursor-pointer"
              onClick={() => setSelectedPost(post)}
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-primary/90 text-primary-foreground text-xs font-medium rounded-full">
                    {post.category}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {post.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {post.readTime}
                  </span>
                </div>
                <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                      <User className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-sm font-medium">{post.author}</span>
                  </div>
                  <span className="text-primary flex items-center gap-1 text-sm font-medium group-hover:gap-2 transition-all">
                    Read More <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-12">
            <button
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-lg bg-secondary text-muted-foreground hover:bg-secondary/80 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={cn(
                  "w-10 h-10 rounded-lg text-sm font-medium transition-all",
                  currentPage === page
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-muted-foreground hover:bg-secondary/80"
                )}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg bg-secondary text-muted-foreground hover:bg-secondary/80 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>

      {/* Blog Post Modal */}
      <AnimatePresence>
        {selectedPost && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
            onClick={() => setSelectedPost(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-card border border-border rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative h-64 md:h-80">
                <img
                  src={selectedPost.image}
                  alt={selectedPost.title}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => setSelectedPost(null)}
                  className="absolute top-4 right-4 p-2 bg-background/80 backdrop-blur-sm rounded-full hover:bg-background transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="absolute bottom-4 left-4">
                  <span className="px-3 py-1 bg-primary text-primary-foreground text-sm font-medium rounded-full">
                    {selectedPost.category}
                  </span>
                </div>
              </div>
              <div className="p-8">
                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {selectedPost.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {selectedPost.readTime}
                  </span>
                  <span className="flex items-center gap-1">
                    <User className="w-4 h-4" />
                    {selectedPost.author}, {selectedPost.authorRole}
                  </span>
                </div>
                <h2 className="text-3xl font-bold mb-6 text-balance">{selectedPost.title}</h2>
                <div className="prose prose-invert max-w-none">
                  {selectedPost.content.split('\n\n').map((paragraph, index) => (
                    <p key={index} className="text-muted-foreground mb-4 leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2 mt-8 pt-6 border-t border-border">
                  {selectedPost.tags.map((tag) => (
                    <span
                      key={tag}
                      className="flex items-center gap-1 px-3 py-1 bg-secondary text-muted-foreground text-sm rounded-full"
                    >
                      <Tag className="w-3 h-3" />
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-4 mt-6">
                  <Button variant="outline" className="flex items-center gap-2">
                    <Share2 className="w-4 h-4" />
                    Share
                  </Button>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Bookmark className="w-4 h-4" />
                    Save
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
