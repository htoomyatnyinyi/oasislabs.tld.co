import { getJobApplications, deleteJobApplication } from "@/app/dashboard/actions";
import { Mail, Phone, ExternalLink, Calendar, Trash2, Briefcase } from "lucide-react";

export default async function JobApplicationsPage() {
  const applications = await getJobApplications();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Job Applications</h1>
        <p className="text-muted-foreground">
          Applications received for open career positions ({applications.length})
        </p>
      </div>

      {applications.length === 0 ? (
        <div className="rounded-lg border border-dashed border-border p-8 text-center">
          <p className="text-muted-foreground">No job applications submitted yet.</p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {applications.map((app) => (
            <div key={app.id} className="rounded-lg border border-border bg-card p-5 space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <span className="inline-flex items-center gap-1 rounded-md bg-chart-2/10 px-2.5 py-1 text-xs font-semibold text-chart-2">
                    <Briefcase className="h-3 w-3" />
                    {app.jobTitle}
                  </span>
                  <h3 className="font-semibold text-lg mt-2">{app.name}</h3>
                </div>
                <form action={deleteJobApplication.bind(null, app.id)}>
                  <button
                    type="submit"
                    className="text-muted-foreground hover:text-destructive transition-colors p-1"
                    title="Delete application"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </form>
              </div>

              <div className="text-sm space-y-1.5 text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-primary" />
                  <a href={`mailto:${app.email}`} className="hover:underline text-foreground">
                    {app.email}
                  </a>
                </div>
                {app.phone && (
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    <span>{app.phone}</span>
                  </div>
                )}
                <div className="flex items-center gap-3 pt-2">
                  {app.linkedin && (
                    <a
                      href={app.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
                    >
                      LinkedIn <ExternalLink className="h-3 w-3" />
                    </a>
                  )}
                  {app.portfolio && (
                    <a
                      href={app.portfolio}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-medium text-chart-2 hover:underline"
                    >
                      Portfolio / CV <ExternalLink className="h-3 w-3" />
                    </a>
                  )}
                </div>
              </div>

              {app.coverLetter && (
                <div className="rounded-md bg-secondary/50 p-3 text-sm italic text-muted-foreground">
                  "{app.coverLetter}"
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
