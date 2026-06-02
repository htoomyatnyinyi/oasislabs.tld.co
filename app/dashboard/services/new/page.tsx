import { createService } from "@/app/dashboard/actions";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NewServicePage() {
  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div className="flex items-center gap-3">
        <Link
          href="/dashboard/services"
          className="rounded-lg p-1.5 hover:bg-secondary transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">New Service</h1>
          <p className="text-sm text-muted-foreground">Add a new service to your landing page.</p>
        </div>
      </div>

      <form action={createService} className="space-y-5 rounded-xl border border-border bg-card p-6">
        <div className="space-y-2">
          <label htmlFor="title" className="text-sm font-medium">Title</label>
          <input
            id="title"
            name="title"
            required
            placeholder="e.g. Custom Software Development"
            className="w-full rounded-lg border border-border bg-input px-4 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="description" className="text-sm font-medium">Description</label>
          <textarea
            id="description"
            name="description"
            required
            rows={3}
            placeholder="Briefly describe this service…"
            className="w-full rounded-lg border border-border bg-input px-4 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="icon" className="text-sm font-medium">Icon Name</label>
          <input
            id="icon"
            name="icon"
            placeholder="e.g. Code2, Cloud, Smartphone"
            defaultValue="Code2"
            className="w-full rounded-lg border border-border bg-input px-4 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
          <p className="text-xs text-muted-foreground">
            Use a Lucide icon name. See{" "}
            <a href="https://lucide.dev/icons" target="_blank" className="underline text-primary">
              lucide.dev/icons
            </a>
          </p>
        </div>

        <div className="space-y-2">
          <label htmlFor="features" className="text-sm font-medium">Features</label>
          <input
            id="features"
            name="features"
            placeholder="Web Applications, Enterprise Software, API Development"
            className="w-full rounded-lg border border-border bg-input px-4 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
          <p className="text-xs text-muted-foreground">Comma-separated list</p>
        </div>

        <div className="space-y-2">
          <label htmlFor="benefits" className="text-sm font-medium">Benefits</label>
          <input
            id="benefits"
            name="benefits"
            placeholder="Scalable architecture, Custom features, Seamless integration"
            className="w-full rounded-lg border border-border bg-input px-4 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
          <p className="text-xs text-muted-foreground">Comma-separated list</p>
        </div>

        <div className="space-y-2">
          <label htmlFor="technologies" className="text-sm font-medium">Technologies</label>
          <input
            id="technologies"
            name="technologies"
            placeholder="React, Next.js, Node.js, Python"
            className="w-full rounded-lg border border-border bg-input px-4 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
          <p className="text-xs text-muted-foreground">Comma-separated list</p>
        </div>

        <div className="space-y-2">
          <label htmlFor="process" className="text-sm font-medium">Process Steps</label>
          <input
            id="process"
            name="process"
            placeholder="Discovery, Architecture, Development, Testing, Deployment"
            className="w-full rounded-lg border border-border bg-input px-4 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
          <p className="text-xs text-muted-foreground">Comma-separated list</p>
        </div>

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            className="rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-sm hover:bg-primary/90 transition-colors"
          >
            Create Service
          </button>
          <Link
            href="/dashboard/services"
            className="rounded-lg border border-border px-5 py-2.5 text-sm font-medium hover:bg-secondary transition-colors"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
