import { updateTestimonial, getTestimonials } from "@/app/dashboard/actions";
import Link from "next/link";
import { notFound } from "next/navigation";

const EditTestimonialPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const testimonials = await getTestimonials();
  const testimonial = testimonials.find((t) => t.id === id);

  if (!testimonial) {
    notFound();
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold tracking-tight">Edit Testimonial</h1>
        <p className="text-sm text-muted-foreground">
          Make changes to the testimonial below.
        </p>
      </div>

      <form
        action={updateTestimonial}
        className="space-y-4 rounded-xl border border-border bg-card p-6"
      >
        {/* Pass the dynamic ID to the server action update handler implicitly */}
        <input type="hidden" name="id" value={testimonial.id} />

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium" htmlFor="author">
              Name
            </label>
            <input
              defaultValue={testimonial.author}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              type="text"
              name="author"
              id="author"
              required
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium" htmlFor="image">
              Image URL
            </label>
            <input
              defaultValue={testimonial.image ?? ""}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              type="text"
              name="image"
              id="image"
            />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium" htmlFor="role">
              Role
            </label>
            <input
              defaultValue={testimonial.role}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              type="text"
              name="role"
              id="role"
              required
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium" htmlFor="company">
              Company
            </label>
            <input
              defaultValue={testimonial.company ?? ""}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              type="text"
              name="company"
              id="company"
            />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium" htmlFor="rating">
            Rating
          </label>
          <input
            defaultValue={testimonial.rating.toString()}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            type="number"
            name="rating"
            id="rating"
            min="1"
            max="5"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium" htmlFor="content">
            Review Content
          </label>
          <textarea
            className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            name="content"
            id="content"
            defaultValue={testimonial.content}
            required
          />
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
            Update Testimonial
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditTestimonialPage;

// import { updateTestimonial } from "@/app/dashboard/actions";
// import Link from "next/link";
// import { notFound } from "next/navigation";
// import { getTestimonials } from "@/app/dashboard/actions";

// const page = async ({ params }: { params: Promise<{ id: string }> }) => {
//   const { id } = await params;
//   const testimonials = await getTestimonials();
//   const testimonial = testimonials.find((t) => t.id === id);

//   if (!testimonial) {
//     notFound();
//   }
//   return (
//     <div className="space-y-6">
//       <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
//         <div>
//           <h1 className="text-2xl font-bold tracking-tight">
//             Edit Testimonial
//           </h1>
//           <p className="text-sm text-muted-foreground">Edit the testimonial.</p>
//         </div>
//       </div>
//       <form action={updateTestimonial} className="space-y-4">
//         <div>
//           <label htmlFor="name">Name</label>
//           <input
//             value={testimonial.name}
//             className="input"
//             type="text"
//             name="name"
//             id="name"
//           />
//         </div>
//         <div>
//           <label htmlFor="role">Role</label>
//           <input
//             value={testimonial.role}
//             className="input"
//             type="text"
//             name="role"
//             id="role"
//           />
//         </div>
//         <div>
//           <label htmlFor="company">Company</label>
//           <input
//             value={testimonial.company}
//             className="input"
//             type="text"
//             name="company"
//             id="company"
//           />
//         </div>
//         <div>
//           <label htmlFor="rating">Rating</label>
//           <input
//             value={testimonial.rating.toString()}
//             type="number"
//             name="rating"
//             id="rating"
//           />
//         </div>
//         <div>
//           <label htmlFor="review">Review</label>
//           <textarea className="input" name="review" id="review">
//             {testimonial.author}
//           </textarea>
//         </div>
//         <div>
//           <label htmlFor="image">Image</label>
//           <input
//             value={testimonial.image}
//             className="input"
//             type="text"
//             name="image"
//             id="image"
//           />
//         </div>
//         <div>
//           <button type="submit">Update</button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default page;
