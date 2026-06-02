import { prisma } from "@/lib/prisma";
import {
  Settings,
  Image as ImageIcon,
  FileText,
  Users,
  MessageSquare,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";

export default async function DashboardOverview() {
  const [servicesCount, portfolioCount, blogCount, teamCount, testimonialCount] =
    await Promise.all([
      prisma.service.count().catch(() => 0),
      prisma.portfolioItem.count().catch(() => 0),
      prisma.blogPost.count().catch(() => 0),
      prisma.teamMember.count().catch(() => 0),
      prisma.testimonial.count().catch(() => 0),
    ]);

  const stats = [
    {
      label: "Services",
      count: servicesCount,
      icon: Settings,
      href: "/dashboard/services",
      color: "text-primary",
      bg: "bg-primary/10",
    },
    {
      label: "Portfolio",
      count: portfolioCount,
      icon: ImageIcon,
      href: "/dashboard/portfolio",
      color: "text-chart-2",
      bg: "bg-chart-2/10",
    },
    {
      label: "Blog Posts",
      count: blogCount,
      icon: FileText,
      href: "/dashboard/blog",
      color: "text-chart-4",
      bg: "bg-chart-4/10",
    },
    {
      label: "Team Members",
      count: teamCount,
      icon: Users,
      href: "/dashboard/team",
      color: "text-chart-5",
      bg: "bg-chart-5/10",
    },
    {
      label: "Testimonials",
      count: testimonialCount,
      icon: MessageSquare,
      href: "/dashboard/testimonials",
      color: "text-chart-3",
      bg: "bg-chart-3/10",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="mt-1 text-muted-foreground">
          Manage your website content from here.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="group relative rounded-xl border border-border bg-card p-5 shadow-sm transition-all duration-200 hover:border-primary/30 hover:shadow-md"
          >
            <div className="flex items-center justify-between">
              <div className={`rounded-lg p-2.5 ${stat.bg}`}>
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </div>
              <TrendingUp className="h-4 w-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
            </div>
            <p className="mt-4 text-3xl font-bold tabular-nums">{stat.count}</p>
            <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="mb-4 text-lg font-semibold">Quick Actions</h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <Link
            href="/dashboard/services"
            className="flex items-center gap-3 rounded-xl border border-border bg-card p-4 transition-all duration-200 hover:border-primary/30 hover:shadow-sm"
          >
            <div className="rounded-lg bg-primary/10 p-2">
              <Settings className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium">Manage Services</p>
              <p className="text-xs text-muted-foreground">Add, edit, or remove services</p>
            </div>
          </Link>
          <Link
            href="/dashboard/blog"
            className="flex items-center gap-3 rounded-xl border border-border bg-card p-4 transition-all duration-200 hover:border-primary/30 hover:shadow-sm"
          >
            <div className="rounded-lg bg-chart-4/10 p-2">
              <FileText className="h-5 w-5 text-chart-4" />
            </div>
            <div>
              <p className="text-sm font-medium">Write Blog Post</p>
              <p className="text-xs text-muted-foreground">Create a new article</p>
            </div>
          </Link>
          <Link
            href="/dashboard/team"
            className="flex items-center gap-3 rounded-xl border border-border bg-card p-4 transition-all duration-200 hover:border-primary/30 hover:shadow-sm"
          >
            <div className="rounded-lg bg-chart-5/10 p-2">
              <Users className="h-5 w-5 text-chart-5" />
            </div>
            <div>
              <p className="text-sm font-medium">Update Team</p>
              <p className="text-xs text-muted-foreground">Add or update team members</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
