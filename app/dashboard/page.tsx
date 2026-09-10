import { prisma } from "@/lib/prisma";
import {
  Settings,
  Image as ImageIcon,
  FileText,
  Users,
  MessageSquare,
  TrendingUp,
  Inbox,
  Calendar,
  Briefcase,
  Mail,
} from "lucide-react";
import Link from "next/link";

export default async function DashboardOverview() {
  const [
    servicesCount,
    portfolioCount,
    blogCount,
    teamCount,
    testimonialCount,
    contactSubmissionsCount,
    bookingsCount,
    applicationsCount,
    subscribersCount,
    recentSubmissions,
    recentBookings,
  ] = await Promise.all([
    prisma.service.count().catch(() => 0),
    prisma.portfolioItem.count().catch(() => 0),
    prisma.blogPost.count().catch(() => 0),
    prisma.teamMember.count().catch(() => 0),
    prisma.testimonial.count().catch(() => 0),
    prisma.contactMessage.count().catch(() => 0),
    prisma.booking.count().catch(() => 0),
    prisma.jobApplication.count().catch(() => 0),
    prisma.newsletterSubscriber.count().catch(() => 0),
    prisma.contactMessage.findMany({
      orderBy: { createdAt: "desc" },
      take: 4,
    }).catch(() => []),
    prisma.booking.findMany({
      orderBy: { createdAt: "desc" },
      take: 4,
    }).catch(() => []),
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
      color: "text-purple-500",
      bg: "bg-purple-500/10",
    },
    {
      label: "Bookings",
      count: bookingsCount,
      icon: Calendar,
      href: "/dashboard/bookings",
      color: "text-emerald-500",
      bg: "bg-emerald-500/10",
    },
    {
      label: "Messages",
      count: contactSubmissionsCount,
      icon: Inbox,
      href: "/dashboard/messages",
      color: "text-amber-500",
      bg: "bg-amber-500/10",
    },
    {
      label: "Applications",
      count: applicationsCount,
      icon: Briefcase,
      href: "/dashboard/applications",
      color: "text-sky-500",
      bg: "bg-sky-500/10",
    },
    {
      label: "Subscribers",
      count: subscribersCount,
      icon: Mail,
      href: "/dashboard/subscribers",
      color: "text-rose-500",
      bg: "bg-rose-500/10",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard Overview</h1>
        <p className="mt-1 text-muted-foreground">
          Manage website content, review consultations, applications, and subscriber submissions.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
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

      {/* Messages & Bookings Section */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Recent Messages */}
        <div className="rounded-xl border border-border bg-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <Inbox className="h-5 w-5 text-amber-500" />
              Recent Messages ({contactSubmissionsCount})
            </h2>
            <Link href="/dashboard/messages" className="text-xs text-primary hover:underline">
              View all
            </Link>
          </div>
          {recentSubmissions.length === 0 ? (
            <p className="text-sm text-muted-foreground py-4 text-center">
              No contact messages received yet.
            </p>
          ) : (
            <div className="space-y-3">
              {recentSubmissions.map((msg) => (
                <div
                  key={msg.id}
                  className="rounded-lg border border-border bg-secondary/30 p-3 text-sm space-y-1"
                >
                  <div className="flex items-center justify-between font-medium">
                    <span>
                      {msg.name} ({msg.email})
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {new Date(msg.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  {msg.subject && (
                    <p className="text-xs font-semibold text-primary">
                      {msg.subject}
                    </p>
                  )}
                  <p className="text-muted-foreground line-clamp-2 text-xs">
                    {msg.message}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Bookings */}
        <div className="rounded-xl border border-border bg-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <Calendar className="h-5 w-5 text-emerald-500" />
              Recent Bookings ({bookingsCount})
            </h2>
            <Link href="/dashboard/bookings" className="text-xs text-primary hover:underline">
              View all
            </Link>
          </div>
          {recentBookings.length === 0 ? (
            <p className="text-sm text-muted-foreground py-4 text-center">
              No meeting bookings scheduled yet.
            </p>
          ) : (
            <div className="space-y-3">
              {recentBookings.map((b) => (
                <div
                  key={b.id}
                  className="rounded-lg border border-border bg-secondary/30 p-3 text-sm space-y-1"
                >
                  <div className="flex items-center justify-between font-medium">
                    <span>
                      {b.name} ({b.email})
                    </span>
                    <span className="text-xs text-primary font-semibold">
                      {b.date} at {b.time}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Type: {b.meetingType} {b.company ? `• ${b.company}` : ""}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
