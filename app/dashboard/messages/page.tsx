import { getContactSubmissions, deleteContactSubmission } from "@/app/dashboard/actions";
import { ExportCsvButton } from "@/components/ui/export-csv-button";
import { Mail, Phone, Calendar, Trash2 } from "lucide-react";

export default async function ContactMessagesPage() {
  const submissions = await getContactSubmissions();

  const exportData = submissions.map((m) => ({
    ID: m.id,
    FirstName: m.firstName,
    LastName: m.lastName,
    Email: m.email,
    Company: m.company || "",
    Service: m.service || "",
    Budget: m.budget || "",
    Message: m.message,
    SubmittedAt: new Date(m.createdAt).toISOString(),
  }));

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Contact Messages</h1>
          <p className="text-muted-foreground">
            Inquiries and messages submitted from the contact form ({submissions.length})
          </p>
        </div>
        {submissions.length > 0 && (
          <ExportCsvButton data={exportData} filename="contact_inquiries" />
        )}
      </div>

      {submissions.length === 0 ? (
        <div className="rounded-lg border border-dashed border-border p-8 text-center">
          <p className="text-muted-foreground">No contact messages received yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {submissions.map((msg) => (
            <div key={msg.id} className="rounded-lg border border-border bg-card p-5 space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-lg">
                    {msg.firstName} {msg.lastName}
                  </h3>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                    <div className="flex items-center gap-1">
                      <Mail className="h-3.5 w-3.5" />
                      <a href={`mailto:${msg.email}`} className="hover:underline text-foreground">
                        {msg.email}
                      </a>
                    </div>
                    {msg.company && (
                      <div className="flex items-center gap-1">
                        <span>• Company: {msg.company}</span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5" />
                    {new Date(msg.createdAt).toLocaleDateString()}
                  </span>
                  <form action={deleteContactSubmission.bind(null, msg.id)}>
                    <button
                      type="submit"
                      className="text-muted-foreground hover:text-destructive transition-colors p-1"
                      title="Delete message"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </form>
                </div>
              </div>

              {(msg.service || msg.budget) && (
                <div className="flex items-center gap-2 text-xs">
                  {msg.service && (
                    <span className="rounded-md bg-primary/10 px-2 py-0.5 font-medium text-primary">
                      Service: {msg.service}
                    </span>
                  )}
                  {msg.budget && (
                    <span className="rounded-md bg-chart-2/10 px-2 py-0.5 font-medium text-chart-2">
                      Budget: {msg.budget}
                    </span>
                  )}
                </div>
              )}

              <div className="rounded-md bg-secondary/50 p-4 text-sm whitespace-pre-wrap">
                {msg.message}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
