import { getTeamMembers, deleteTeamMember } from "@/app/dashboard/actions";
import { DeleteButton } from "@/app/dashboard/_components/delete-button";
import Link from "next/link";
import { Plus, Pencil } from "lucide-react";

export default async function TeamPage() {
  const members = await getTeamMembers();

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Team Members</h1>
          <p className="text-sm text-muted-foreground">Manage your team profiles.</p>
        </div>
        <Link
          href="/dashboard/team/new"
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground shadow-sm hover:bg-primary/90"
        >
          <Plus className="h-4 w-4" />
          Add Member
        </Link>
      </div>

      {members.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-card/50 p-12 text-center">
          <p className="text-muted-foreground">No team members yet.</p>
          <Link
            href="/dashboard/team/new"
            className="mt-4 inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            <Plus className="h-4 w-4" />
            Add your first team member
          </Link>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {members.map((member) => (
            <div key={member.id} className="rounded-xl border border-border bg-card overflow-hidden text-center group">
              <div className="pt-6 pb-4 flex flex-col items-center">
                <div className="h-24 w-24 rounded-full overflow-hidden bg-secondary/50 mb-4 border-2 border-border shadow-sm">
                  {member.image ? (
                    <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-xs text-muted-foreground">No img</div>
                  )}
                </div>
                <h3 className="font-semibold text-lg">{member.name}</h3>
                <p className="text-xs text-primary font-medium mt-1">{member.role}</p>
                <p className="text-xs text-muted-foreground line-clamp-2 mt-2 px-4">{member.bio}</p>
              </div>
              <div className="bg-secondary/30 p-3 flex justify-center gap-2 border-t border-border">
                <Link
                  href={`/dashboard/team/${member.id}/edit`}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-1.5 text-xs font-medium hover:bg-secondary transition-colors"
                >
                  <Pencil className="h-3.5 w-3.5" />
                  Edit
                </Link>
                <DeleteButton id={member.id} action={deleteTeamMember} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
