import { createTestimonial } from "../../actions";
import { ImageUploader } from "@/components/ui/image-uploader";
import Link from "next/link";

const NewTestimonialPage = () => {
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold tracking-tight">Add Testimonial</h1>
        <p className="text-sm text-muted-foreground">
          Add a new testimonial to your website.
        </p>
      </div>

      <form
        action={createTestimonial}
        className="space-y-4 rounded-xl border border-border bg-card p-6"
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-1.5">
            {/* Form field matched to Prisma's 'author' */}
            <label className="text-sm font-medium" htmlFor="author">
              Name
            </label>
            <input
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              type="text"
              name="author"
              id="author"
              required
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <ImageUploader name="image" label="Author Avatar" />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium" htmlFor="role">
              Role
            </label>
            <input
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              type="text"
              name="role"
              id="role"
              required
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium" htmlFor="company">
              Company (Optional)
            </label>
            <input
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              type="text"
              name="company"
              id="company"
            />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium" htmlFor="rating">
            Rating (1-5)
          </label>
          <input
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            type="number"
            name="rating"
            id="rating"
            min="1"
            max="5"
            defaultValue="5"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          {/* Form field matched to Prisma's 'content' */}
          <label className="text-sm font-medium" htmlFor="content">
            Review Content
          </label>
          <textarea
            className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            name="content"
            id="content"
            required
          ></textarea>
        </div>

        <div className="flex items-center justify-end gap-3 pt-4 border-t border-border">
          <Link
            href="/dashboard/testimonials"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            Save Testimonial
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewTestimonialPage;

// import { createTestimonial } from "../../actions";

// const page = () => {
//   return (
//     <div className="space-y-6">
//       <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
//         <div>
//           <h1 className="text-2xl font-bold tracking-tight">Add Testimonial</h1>
//           <p className="text-sm text-muted-foreground">
//             Add a new testimonial to your website.
//           </p>
//         </div>
//       </div>
//       <form action={createTestimonial} className="space-y-4">
//         <div>
//           <label htmlFor="name">Name</label>
//           <input className="input" type="text" name="name" id="name" />
//         </div>
//         <div>
//           <label htmlFor="role">Role</label>
//           <input className="input" type="text" name="role" id="role" />
//         </div>
//         <div>
//           <label htmlFor="company">Company</label>
//           <input className="input" type="text" name="company" id="company" />
//         </div>
//         <div>
//           <label htmlFor="rating">Rating</label>
//           <input type="number" name="rating" id="rating" />
//         </div>
//         <div>
//           <label htmlFor="review">Review</label>
//           <textarea name="review" id="review"></textarea>
//         </div>
//         <div>
//           <label htmlFor="image">Image</label>
//           <input type="text" name="image" id="image" />
//         </div>
//         <div>
//           <button type="submit">Add</button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default page;
