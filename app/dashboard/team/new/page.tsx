import { createTeamMember } from "@/app/dashboard/actions";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NewTeamMemberPage() {
  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div className="flex items-center gap-3">
        <Link
          href="/dashboard/team"
          className="rounded-lg p-1.5 hover:bg-secondary transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">New Team Member</h1>
          <p className="text-sm text-muted-foreground">
            Add someone to your team.
          </p>
        </div>
      </div>
      <form
        action={createTeamMember}
        className="space-y-5 rounded-xl border border-border bg-card p-6"
      >
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium">
              Name
            </label>
            <input
              id="name"
              name="name"
              required
              placeholder="John Doe"
              className="w-full rounded-lg border border-border bg-input px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="role" className="text-sm font-medium">
              Role
            </label>
            <input
              id="role"
              name="role"
              required
              placeholder="Lead Engineer"
              className="w-full rounded-lg border border-border bg-input px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
        </div>
        <div className="space-y-2">
          <label htmlFor="bio" className="text-sm font-medium">
            Bio
          </label>
          <textarea
            id="bio"
            name="bio"
            required
            rows={3}
            placeholder="A short bio…"
            className="w-full rounded-lg border border-border bg-input px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="image" className="text-sm font-medium">
            Profile Image URL
          </label>
          <input
            id="image"
            name="image"
            required
            placeholder="https://..."
            className="w-full rounded-lg border border-border bg-input px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>

        <div className="pt-4 border-t border-border">
          <h3 className="text-sm font-medium mb-3">Social Links (Optional)</h3>
          <div className="space-y-3">
            <div className="space-y-1">
              <label
                htmlFor="twitter"
                className="text-xs text-muted-foreground"
              >
                Twitter / X URL
              </label>
              <input
                id="twitter"
                name="twitter"
                placeholder="https://twitter.com/..."
                className="w-full rounded-lg border border-border bg-input px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
            <div className="space-y-1">
              <label
                htmlFor="linkedin"
                className="text-xs text-muted-foreground"
              >
                LinkedIn URL
              </label>
              <input
                id="linkedin"
                name="linkedin"
                placeholder="https://linkedin.com/in/..."
                className="w-full rounded-lg border border-border bg-input px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
            <div className="space-y-1">
              <label htmlFor="github" className="text-xs text-muted-foreground">
                GitHub URL
              </label>
              <input
                id="github"
                name="github"
                placeholder="https://github.com/..."
                className="w-full rounded-lg border border-border bg-input px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
          </div>
        </div>

        <div className="flex gap-3 pt-4 border-t border-border">
          <button
            type="submit"
            className="rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-sm hover:bg-primary/90 transition-colors"
          >
            Add Member
          </button>
          <Link
            href="/dashboard/team"
            className="rounded-lg border border-border px-5 py-2.5 text-sm font-medium hover:bg-secondary transition-colors"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
