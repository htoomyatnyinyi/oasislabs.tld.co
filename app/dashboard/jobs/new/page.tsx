import { createJob } from "@/app/dashboard/actions";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NewJobPage() {
  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div className="flex items-center gap-3">
        <Link
          href="/dashboard/jobs"
          className="rounded-lg p-1.5 hover:bg-secondary transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Create Job Opening
          </h1>
          <p className="text-sm text-muted-foreground">
            Post a new position for applicants to apply.
          </p>
        </div>
      </div>

      <form
        action={createJob}
        className="space-y-5 rounded-xl border border-border bg-card p-6"
      >
        <div className="space-y-2">
          <label htmlFor="title" className="text-sm font-medium">
            Job Title *
          </label>
          <input
            id="title"
            name="title"
            required
            placeholder="e.g. Senior Full-Stack Engineer"
            className="w-full rounded-lg border border-border bg-input px-4 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor="location" className="text-sm font-medium">
              Location *
            </label>
            <input
              id="location"
              name="location"
              required
              placeholder="e.g. Mawlamyine, Mon State, Myanmar"
              className="w-full rounded-lg border border-border bg-input px-4 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="type" className="text-sm font-medium">
              Job Type *
            </label>
            <select
              id="type"
              name="type"
              className="w-full rounded-lg border border-border bg-input px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              <option value="FULL_TIME">Full-time</option>
              <option value="PART_TIME">Part-time</option>
              <option value="CONTRACT">Contract</option>
              <option value="INTERNSHIP">Internship</option>
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="salary" className="text-sm font-medium">
            Salary Range *
          </label>
          <input
            id="salary"
            name="salary"
            required
            placeholder="e.g. MMK 1,500,000 - MMK 2,000,000"
            className="w-full rounded-lg border border-border bg-input px-4 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="description" className="text-sm font-medium">
            Description *
          </label>
          <textarea
            id="description"
            name="description"
            required
            rows={5}
            placeholder="Describe the job position and requirements..."
            className="w-full rounded-lg border border-border bg-input px-4 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-y"
          />
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="remote"
            name="remote"
            defaultChecked
            className="rounded border-border"
          />
          <label htmlFor="remote" className="text-sm font-medium">
            Remote Work Available
          </label>
        </div>

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            className="rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-sm hover:bg-primary/90 transition-colors"
          >
            Publish Job Opening
          </button>
          <Link
            href="/dashboard/jobs"
            className="rounded-lg border border-border px-5 py-2.5 text-sm font-medium hover:bg-secondary transition-colors"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
