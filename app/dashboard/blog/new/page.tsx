import { createBlogPost } from "@/app/dashboard/actions";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NewBlogPostPage() {
  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div className="flex items-center gap-3">
        <Link
          href="/dashboard/blog"
          className="rounded-lg p-1.5 hover:bg-secondary transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">New Blog Post</h1>
          <p className="text-sm text-muted-foreground">Write a new article.</p>
        </div>
      </div>
      <form
        action={createBlogPost}
        className="space-y-5 rounded-xl border border-border bg-card p-6"
      >
        <div className="space-y-2">
          <label htmlFor="title" className="text-sm font-medium">
            Title
          </label>
          <input
            id="title"
            name="title"
            required
            placeholder="Article title"
            className="w-full rounded-lg border border-border bg-input px-4 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="excerpt" className="text-sm font-medium">
            Excerpt
          </label>
          <textarea
            id="excerpt"
            name="excerpt"
            required
            rows={2}
            placeholder="Short summary…"
            className="w-full rounded-lg border border-border bg-input px-4 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="content" className="text-sm font-medium">
            Content
          </label>
          <textarea
            id="content"
            name="content"
            required
            rows={10}
            placeholder="Write your article…"
            className="w-full rounded-lg border border-border bg-input px-4 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-y"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="image" className="text-sm font-medium">
            Cover Image URL
          </label>
          <input
            id="image"
            name="image"
            required
            placeholder="https://..."
            className="w-full rounded-lg border border-border bg-input px-4 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor="author" className="text-sm font-medium">
              Author
            </label>
            <input
              id="author"
              name="author"
              required
              placeholder="Author name"
              className="w-full rounded-lg border border-border bg-input px-4 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="category" className="text-sm font-medium">
              Category
            </label>
            <input
              id="category"
              name="category"
              required
              placeholder="Technology, Design…"
              className="w-full rounded-lg border border-border bg-input px-4 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="published"
            name="published"
            className="rounded border-border"
          />
          <label htmlFor="published" className="text-sm font-medium">
            Publish immediately
          </label>
        </div>
        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            className="rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-sm hover:bg-primary/90 transition-colors"
          >
            Create Post
          </button>
          <Link
            href="/dashboard/blog"
            className="rounded-lg border border-border px-5 py-2.5 text-sm font-medium hover:bg-secondary transition-colors"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
