import { getBlogPosts, deleteBlogPost } from "@/app/dashboard/actions";
import { DeleteButton } from "@/app/dashboard/_components/delete-button";
import Link from "next/link";
import { Plus, Pencil } from "lucide-react";
import { format } from "date-fns";

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Blog Posts</h1>
          <p className="text-sm text-muted-foreground">Manage your blog content.</p>
        </div>
        <Link
          href="/dashboard/blog/new"
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground shadow-sm hover:bg-primary/90"
        >
          <Plus className="h-4 w-4" />
          New Post
        </Link>
      </div>

      {posts.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-card/50 p-12 text-center">
          <p className="text-muted-foreground">No blog posts yet.</p>
          <Link
            href="/dashboard/blog/new"
            className="mt-4 inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            <Plus className="h-4 w-4" />
            Write your first post
          </Link>
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-secondary/50">
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Title</th>
                <th className="hidden px-4 py-3 text-left font-medium text-muted-foreground md:table-cell">Category</th>
                <th className="hidden px-4 py-3 text-left font-medium text-muted-foreground lg:table-cell">Status</th>
                <th className="hidden px-4 py-3 text-left font-medium text-muted-foreground lg:table-cell">Date</th>
                <th className="px-4 py-3 text-right font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {posts.map((post) => (
                <tr key={post.id} className="hover:bg-secondary/30 transition-colors">
                  <td className="px-4 py-3">
                    <div>
                      <p className="font-medium">{post.title}</p>
                      <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">{post.excerpt}</p>
                    </div>
                  </td>
                  <td className="hidden px-4 py-3 md:table-cell">
                    <span className="rounded-full bg-chart-4/10 px-2 py-0.5 text-xs text-chart-4">{post.category}</span>
                  </td>
                  <td className="hidden px-4 py-3 lg:table-cell">
                    {post.publishedAt ? (
                      <span className="rounded-full bg-green-500/10 px-2 py-0.5 text-xs text-green-400">Published</span>
                    ) : (
                      <span className="rounded-full bg-yellow-500/10 px-2 py-0.5 text-xs text-yellow-400">Draft</span>
                    )}
                  </td>
                  <td className="hidden px-4 py-3 text-xs text-muted-foreground lg:table-cell">
                    {format(post.createdAt, "MMM d, yyyy")}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/dashboard/blog/${post.id}/edit`}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs font-medium hover:bg-secondary transition-colors"
                      >
                        <Pencil className="h-3.5 w-3.5" />
                        Edit
                      </Link>
                      <DeleteButton id={post.id} action={deleteBlogPost} />
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
