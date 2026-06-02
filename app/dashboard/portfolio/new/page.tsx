import { createPortfolioItem } from "@/app/dashboard/actions";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NewPortfolioPage() {
  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div className="flex items-center gap-3">
        <Link href="/dashboard/portfolio" className="rounded-lg p-1.5 hover:bg-secondary transition-colors">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">New Portfolio Item</h1>
          <p className="text-sm text-muted-foreground">Showcase a new project.</p>
        </div>
      </div>

      <form action={createPortfolioItem} className="space-y-5 rounded-xl border border-border bg-card p-6">
        <div className="space-y-2">
          <label htmlFor="title" className="text-sm font-medium">Title</label>
          <input id="title" name="title" required placeholder="Project name" className="w-full rounded-lg border border-border bg-input px-4 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
        </div>
        <div className="space-y-2">
          <label htmlFor="description" className="text-sm font-medium">Description</label>
          <textarea id="description" name="description" required rows={3} placeholder="Describe the project…" className="w-full rounded-lg border border-border bg-input px-4 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none" />
        </div>
        <div className="space-y-2">
          <label htmlFor="image" className="text-sm font-medium">Image URL</label>
          <input id="image" name="image" required placeholder="https://..." className="w-full rounded-lg border border-border bg-input px-4 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor="category" className="text-sm font-medium">Category</label>
            <input id="category" name="category" required placeholder="Web, Mobile, AI…" className="w-full rounded-lg border border-border bg-input px-4 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
          </div>
          <div className="space-y-2">
            <label htmlFor="link" className="text-sm font-medium">Link (optional)</label>
            <input id="link" name="link" placeholder="https://..." className="w-full rounded-lg border border-border bg-input px-4 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
          </div>
        </div>
        <div className="space-y-2">
          <label htmlFor="technologies" className="text-sm font-medium">Technologies</label>
          <input id="technologies" name="technologies" placeholder="React, Next.js, Tailwind" className="w-full rounded-lg border border-border bg-input px-4 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
          <p className="text-xs text-muted-foreground">Comma-separated list</p>
        </div>
        <div className="flex gap-3 pt-2">
          <button type="submit" className="rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-sm hover:bg-primary/90 transition-colors">Create Item</button>
          <Link href="/dashboard/portfolio" className="rounded-lg border border-border px-5 py-2.5 text-sm font-medium hover:bg-secondary transition-colors">Cancel</Link>
        </div>
      </form>
    </div>
  );
}
