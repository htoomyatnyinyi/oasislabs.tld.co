import { prisma } from "@/lib/prisma";
import { updateService } from "@/app/dashboard/actions";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default async function EditServicePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const service = await prisma.service.findUnique({ where: { id } });
  if (!service) notFound();

  const updateWithId = updateService.bind(null, service.id);

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
          <h1 className="text-2xl font-bold tracking-tight">Edit Service</h1>
          <p className="text-sm text-muted-foreground">Update &ldquo;{service.title}&rdquo;</p>
        </div>
      </div>

      <form action={updateWithId} className="space-y-5 rounded-xl border border-border bg-card p-6">
        <div className="space-y-2">
          <label htmlFor="title" className="text-sm font-medium">Title</label>
          <input
            id="title"
            name="title"
            required
            defaultValue={service.title}
            className="w-full rounded-lg border border-border bg-input px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="description" className="text-sm font-medium">Description</label>
          <textarea
            id="description"
            name="description"
            required
            rows={3}
            defaultValue={service.description}
            className="w-full rounded-lg border border-border bg-input px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="icon" className="text-sm font-medium">Icon Name</label>
          <input
            id="icon"
            name="icon"
            defaultValue={service.icon}
            className="w-full rounded-lg border border-border bg-input px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="features" className="text-sm font-medium">Features</label>
          <input
            id="features"
            name="features"
            defaultValue={service.features.join(", ")}
            className="w-full rounded-lg border border-border bg-input px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
          <p className="text-xs text-muted-foreground">Comma-separated list</p>
        </div>

        <div className="space-y-2">
          <label htmlFor="benefits" className="text-sm font-medium">Benefits</label>
          <input
            id="benefits"
            name="benefits"
            defaultValue={service.benefits.join(", ")}
            className="w-full rounded-lg border border-border bg-input px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
          <p className="text-xs text-muted-foreground">Comma-separated list</p>
        </div>

        <div className="space-y-2">
          <label htmlFor="technologies" className="text-sm font-medium">Technologies</label>
          <input
            id="technologies"
            name="technologies"
            defaultValue={service.technologies.join(", ")}
            className="w-full rounded-lg border border-border bg-input px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
          <p className="text-xs text-muted-foreground">Comma-separated list</p>
        </div>

        <div className="space-y-2">
          <label htmlFor="process" className="text-sm font-medium">Process Steps</label>
          <input
            id="process"
            name="process"
            defaultValue={service.process.join(", ")}
            className="w-full rounded-lg border border-border bg-input px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
          <p className="text-xs text-muted-foreground">Comma-separated list</p>
        </div>

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            className="rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-sm hover:bg-primary/90 transition-colors"
          >
            Save Changes
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
