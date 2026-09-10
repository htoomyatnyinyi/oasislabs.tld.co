import { getSubscribers, deleteSubscriber } from "@/app/dashboard/actions";
import { ExportCsvButton } from "@/components/ui/export-csv-button";
import { Mail, Calendar, Trash2 } from "lucide-react";

export default async function NewsletterSubscribersPage() {
  const subscribers = await getSubscribers();

  const exportData = subscribers.map((s) => ({
    ID: s.id,
    Email: s.email,
    SubscribedAt: new Date(s.createdAt).toISOString(),
  }));

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Newsletter Subscribers</h1>
          <p className="text-muted-foreground">
            Email addresses subscribed to news and updates ({subscribers.length})
          </p>
        </div>
        {subscribers.length > 0 && (
          <ExportCsvButton data={exportData} filename="newsletter_subscribers" />
        )}
      </div>

      {subscribers.length === 0 ? (
        <div className="rounded-lg border border-dashed border-border p-8 text-center">
          <p className="text-muted-foreground">No newsletter subscribers recorded yet.</p>
        </div>
      ) : (
        <div className="rounded-lg border border-border bg-card overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-border bg-muted/40 text-xs font-semibold uppercase text-muted-foreground">
              <tr>
                <th className="px-5 py-3.5">Email Address</th>
                <th className="px-5 py-3.5">Subscribed Date</th>
                <th className="px-5 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {subscribers.map((sub) => (
                <tr key={sub.id} className="hover:bg-muted/20 transition-colors">
                  <td className="px-5 py-4 font-medium">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-primary" />
                      <a href={`mailto:${sub.email}`} className="hover:underline">
                        {sub.email}
                      </a>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-muted-foreground">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5" />
                      {new Date(sub.createdAt).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <form action={deleteSubscriber.bind(null, sub.id)}>
                      <button
                        type="submit"
                        className="text-muted-foreground hover:text-destructive transition-colors p-1"
                        title="Remove subscriber"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </form>
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
