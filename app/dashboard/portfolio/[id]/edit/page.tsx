import { prisma } from "@/lib/prisma";
import { updatePortfolioItem } from "@/app/dashboard/actions";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default async function EditPortfolioPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const item = await prisma.portfolioItem.findUnique({ where: { id } });
  if (!item) notFound();
  const updateWithId = updatePortfolioItem.bind(null, item.id);

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div className="flex items-center gap-3">
        <Link href="/dashboard/portfolio" className="rounded-lg p-1.5 hover:bg-secondary transition-colors"><ArrowLeft className="h-5 w-5" /></Link>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Edit Portfolio Item</h1>
          <p className="text-sm text-muted-foreground">Update &ldquo;{item.title}&rdquo;</p>
        </div>
      </div>
      <form action={updateWithId} className="space-y-5 rounded-xl border border-border bg-card p-6">
        <div className="space-y-2">
          <label htmlFor="title" className="text-sm font-medium">Title</label>
          <input id="title" name="title" required defaultValue={item.title} className="w-full rounded-lg border border-border bg-input px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
        </div>
        <div className="space-y-2">
          <label htmlFor="description" className="text-sm font-medium">Description</label>
          <textarea id="description" name="description" required rows={3} defaultValue={item.description} className="w-full rounded-lg border border-border bg-input px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none" />
        </div>
        <div className="space-y-2">
          <label htmlFor="image" className="text-sm font-medium">Image URL</label>
          <input id="image" name="image" required defaultValue={item.image} className="w-full rounded-lg border border-border bg-input px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor="category" className="text-sm font-medium">Category</label>
            <input id="category" name="category" required defaultValue={item.category} className="w-full rounded-lg border border-border bg-input px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
          </div>
          <div className="space-y-2">
            <label htmlFor="link" className="text-sm font-medium">Link (optional)</label>
            <input id="link" name="link" defaultValue={item.link || ""} className="w-full rounded-lg border border-border bg-input px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
          </div>
        </div>
        <div className="space-y-2">
          <label htmlFor="technologies" className="text-sm font-medium">Technologies</label>
          <input id="technologies" name="technologies" defaultValue={item.technologies.join(", ")} className="w-full rounded-lg border border-border bg-input px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
          <p className="text-xs text-muted-foreground">Comma-separated list</p>
        </div>
        <div className="flex gap-3 pt-2">
          <button type="submit" className="rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-sm hover:bg-primary/90 transition-colors">Save Changes</button>
          <Link href="/dashboard/portfolio" className="rounded-lg border border-border px-5 py-2.5 text-sm font-medium hover:bg-secondary transition-colors">Cancel</Link>
        </div>
      </form>
    </div>
  );
}
