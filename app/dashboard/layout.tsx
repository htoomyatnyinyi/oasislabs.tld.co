"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Settings,
  FileText,
  Users,
  Image as ImageIcon,
  MessageSquare,
  ArrowLeft,
  Menu,
  X,
  Calendar,
  Inbox,
  Briefcase,
  Mail,
} from "lucide-react";
import { useState } from "react";

const navItems = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/services", label: "Services", icon: Settings },
  { href: "/dashboard/portfolio", label: "Portfolio", icon: ImageIcon },
  { href: "/dashboard/blog", label: "Blog Posts", icon: FileText },
  { href: "/dashboard/team", label: "Team", icon: Users },
  { href: "/dashboard/testimonials", label: "Testimonials", icon: MessageSquare },
  { href: "/dashboard/bookings", label: "Bookings", icon: Calendar },
  { href: "/dashboard/messages", label: "Messages", icon: Inbox },
  { href: "/dashboard/applications", label: "Applications", icon: Briefcase },
  { href: "/dashboard/jobs", label: "Job Openings", icon: Briefcase },
  { href: "/dashboard/subscribers", label: "Subscribers", icon: Mail },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-background">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 transform border-r border-border bg-card transition-transform duration-200 ease-in-out md:static md:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col">
          {/* Logo / Brand */}
          <div className="flex items-center justify-between border-b border-border p-5">
            <div>
              <h2 className="text-xl font-bold tracking-tight bg-gradient-to-r from-primary to-chart-2 bg-clip-text text-transparent">
                Dashboard
              </h2>
              <p className="text-xs text-muted-foreground mt-0.5">Content Management</p>
            </div>
            <button
              className="rounded-lg p-1.5 text-muted-foreground hover:bg-secondary md:hidden"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 p-3">
            {navItems.map((item) => {
              const isActive =
                item.href === "/dashboard"
                  ? pathname === "/dashboard"
                  : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-150 ${
                    isActive
                      ? "bg-primary/10 text-primary shadow-sm"
                      : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                  }`}
                >
                  <item.icon className={`h-[18px] w-[18px] ${isActive ? "text-primary" : ""}`} />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Back to site */}
          <div className="border-t border-border p-3">
            <Link
              href="/"
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-[18px] w-[18px]" />
              Back to Website
            </Link>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {/* Top bar */}
        <div className="sticky top-0 z-30 border-b border-border bg-card/80 backdrop-blur-md">
          <div className="flex h-14 items-center gap-4 px-6">
            <button
              className="rounded-lg p-1.5 text-muted-foreground hover:bg-secondary md:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </button>
            <div className="flex-1" />
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
                <span className="text-xs font-bold text-primary">A</span>
              </div>
              <span className="hidden text-sm text-muted-foreground sm:inline">Admin</span>
            </div>
          </div>
        </div>

        {/* Page content */}
        <div className="p-6 md:p-8">{children}</div>
      </main>
    </div>
  );
}
