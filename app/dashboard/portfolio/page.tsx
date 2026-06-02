import { getPortfolioItems, deletePortfolioItem } from "@/app/dashboard/actions";
import { DeleteButton } from "@/app/dashboard/_components/delete-button";
import Link from "next/link";
import { Plus, Pencil } from "lucide-react";

export default async function PortfolioPage() {
  const items = await getPortfolioItems();

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Portfolio</h1>
          <p className="text-sm text-muted-foreground">Manage your portfolio items.</p>
        </div>
        <Link
          href="/dashboard/portfolio/new"
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground shadow-sm hover:bg-primary/90"
        >
          <Plus className="h-4 w-4" />
          Add Item
        </Link>
      </div>

      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-card/50 p-12 text-center">
          <p className="text-muted-foreground">No portfolio items yet.</p>
          <Link
            href="/dashboard/portfolio/new"
            className="mt-4 inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            <Plus className="h-4 w-4" />
            Create your first item
          </Link>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <div key={item.id} className="rounded-xl border border-border bg-card overflow-hidden group">
              <div className="aspect-video bg-secondary/50 flex items-center justify-center text-xs text-muted-foreground">
                {item.image ? (
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                ) : (
                  "No image"
                )}
              </div>
              <div className="p-4 space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="font-medium">{item.title}</p>
                    <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary">{item.category}</span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground line-clamp-2">{item.description}</p>
                <div className="flex items-center gap-2 pt-1">
                  <Link
                    href={`/dashboard/portfolio/${item.id}/edit`}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs font-medium hover:bg-secondary transition-colors"
                  >
                    <Pencil className="h-3.5 w-3.5" />
                    Edit
                  </Link>
                  <DeleteButton id={item.id} action={deletePortfolioItem} />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
