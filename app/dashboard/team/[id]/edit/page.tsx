import { prisma } from "@/lib/prisma";
import { updateTeamMember } from "@/app/dashboard/actions";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default async function EditTeamMemberPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const member = await prisma.teamMember.findUnique({ where: { id } });
  if (!member) notFound();
  
  const updateWithId = updateTeamMember.bind(null, member.id);
  const socials = (member.socials as Record<string, string>) || {};

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div className="flex items-center gap-3">
        <Link href="/dashboard/team" className="rounded-lg p-1.5 hover:bg-secondary transition-colors"><ArrowLeft className="h-5 w-5" /></Link>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Edit Team Member</h1>
          <p className="text-sm text-muted-foreground">Update {member.name}'s profile.</p>
        </div>
      </div>
      <form action={updateWithId} className="space-y-5 rounded-xl border border-border bg-card p-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium">Name</label>
            <input id="name" name="name" required defaultValue={member.name} className="w-full rounded-lg border border-border bg-input px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
          </div>
          <div className="space-y-2">
            <label htmlFor="role" className="text-sm font-medium">Role</label>
            <input id="role" name="role" required defaultValue={member.role} className="w-full rounded-lg border border-border bg-input px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
          </div>
        </div>
        <div className="space-y-2">
          <label htmlFor="bio" className="text-sm font-medium">Bio</label>
          <textarea id="bio" name="bio" required rows={3} defaultValue={member.bio} className="w-full rounded-lg border border-border bg-input px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none" />
        </div>
        <div className="space-y-2">
          <label htmlFor="image" className="text-sm font-medium">Profile Image URL</label>
          <input id="image" name="image" required defaultValue={member.image} className="w-full rounded-lg border border-border bg-input px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
        </div>
        
        <div className="pt-4 border-t border-border">
          <h3 className="text-sm font-medium mb-3">Social Links (Optional)</h3>
          <div className="space-y-3">
            <div className="space-y-1">
              <label htmlFor="twitter" className="text-xs text-muted-foreground">Twitter / X URL</label>
              <input id="twitter" name="twitter" defaultValue={socials.twitter || ""} className="w-full rounded-lg border border-border bg-input px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
            </div>
            <div className="space-y-1">
              <label htmlFor="linkedin" className="text-xs text-muted-foreground">LinkedIn URL</label>
              <input id="linkedin" name="linkedin" defaultValue={socials.linkedin || ""} className="w-full rounded-lg border border-border bg-input px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
            </div>
            <div className="space-y-1">
              <label htmlFor="github" className="text-xs text-muted-foreground">GitHub URL</label>
              <input id="github" name="github" defaultValue={socials.github || ""} className="w-full rounded-lg border border-border bg-input px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
            </div>
          </div>
        </div>

        <div className="flex gap-3 pt-4 border-t border-border">
          <button type="submit" className="rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-sm hover:bg-primary/90 transition-colors">Save Changes</button>
          <Link href="/dashboard/team" className="rounded-lg border border-border px-5 py-2.5 text-sm font-medium hover:bg-secondary transition-colors">Cancel</Link>
        </div>
      </form>
    </div>
  );
}
