import { getJobs, deleteJob } from "@/app/dashboard/actions";
import { DeleteButton } from "@/app/dashboard/_components/delete-button";
import Link from "next/link";
import { Plus, MapPin, Briefcase, DollarSign } from "lucide-react";

export default async function JobsPage() {
  const jobs = await getJobs();

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Job Openings</h1>
          <p className="text-sm text-muted-foreground">Manage active career opportunities on your site ({jobs.length}).</p>
        </div>
        <Link
          href="/dashboard/jobs/new"
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground shadow-sm hover:bg-primary/90 transition-colors"
        >
          <Plus className="h-4 w-4" />
          Add Job Opening
        </Link>
      </div>

      {jobs.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-card/50 p-12 text-center">
          <p className="text-muted-foreground">No job openings created yet.</p>
          <Link
            href="/dashboard/jobs/new"
            className="mt-4 inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            <Plus className="h-4 w-4" />
            Create your first job opening
          </Link>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {jobs.map((job) => (
            <div key={job.id} className="rounded-xl border border-border bg-card p-5 space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-lg">{job.title}</h3>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground mt-1">
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5 text-primary" />
                      {job.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Briefcase className="h-3.5 w-3.5 text-chart-2" />
                      {job.type}
                    </span>
                    <span className="flex items-center gap-1">
                      <DollarSign className="h-3.5 w-3.5 text-emerald-500" />
                      {job.salary}
                    </span>
                  </div>
                </div>
                <DeleteButton id={job.id} action={deleteJob} />
              </div>
              <p className="text-sm text-muted-foreground line-clamp-2">{job.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
