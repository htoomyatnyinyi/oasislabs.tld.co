import { getServices } from "@/app/dashboard/actions";
import { DeleteButton } from "@/app/dashboard/_components/delete-button";
import { deleteService } from "@/app/dashboard/actions";
import Link from "next/link";
import { Plus, Pencil } from "lucide-react";

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Services</h1>
          <p className="text-sm text-muted-foreground">
            Manage the services displayed on your landing page.
          </p>
        </div>
        <Link
          href="/dashboard/services/new"
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
        >
          <Plus className="h-4 w-4" />
          Add Service
        </Link>
      </div>

      {/* Table */}
      {services.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-card/50 p-12 text-center">
          <p className="text-muted-foreground">No services yet.</p>
          <Link
            href="/dashboard/services/new"
            className="mt-4 inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            <Plus className="h-4 w-4" />
            Create your first service
          </Link>
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-secondary/50">
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Title</th>
                <th className="hidden px-4 py-3 text-left font-medium text-muted-foreground md:table-cell">Icon</th>
                <th className="hidden px-4 py-3 text-left font-medium text-muted-foreground lg:table-cell">Features</th>
                <th className="px-4 py-3 text-right font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {services.map((service) => (
                <tr key={service.id} className="hover:bg-secondary/30 transition-colors">
                  <td className="px-4 py-3">
                    <div>
                      <p className="font-medium">{service.title}</p>
                      <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">{service.description}</p>
                    </div>
                  </td>
                  <td className="hidden px-4 py-3 text-muted-foreground md:table-cell">
                    <span className="rounded-md bg-secondary px-2 py-1 text-xs">{service.icon}</span>
                  </td>
                  <td className="hidden px-4 py-3 lg:table-cell">
                    <div className="flex flex-wrap gap-1">
                      {service.features.slice(0, 3).map((f) => (
                        <span key={f} className="rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary">{f}</span>
                      ))}
                      {service.features.length > 3 && (
                        <span className="text-xs text-muted-foreground">+{service.features.length - 3}</span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/dashboard/services/${service.id}/edit`}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs font-medium hover:bg-secondary transition-colors"
                      >
                        <Pencil className="h-3.5 w-3.5" />
                        Edit
                      </Link>
                      <DeleteButton id={service.id} action={deleteService} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
