import Link from "next/link";
import { Pencil, Plus } from "lucide-react";
import { DeleteButton } from "../_components/delete-button";
import { getTestimonials, deleteTestimonial } from "@/app/dashboard/actions";

const TestimonialsPage = async () => {
  const testimonials = await getTestimonials();

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Testimonials</h1>
        </div>
        <div>
          <Link
            href="/dashboard/testimonials/new"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground shadow-sm hover:bg-primary/90"
          >
            <Plus className="h-4 w-4" />
            Add Testimonial
          </Link>
        </div>
      </div>
      {testimonials.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-card/50 p-12 text-center">
          <p className="text-muted-foreground">No testimonials yet.</p>
          <Link
            href="/dashboard/testimonials/new"
            className="mt-4 inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            <Plus className="h-4 w-4" />
            Add your first testimonial
          </Link>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="rounded-xl border border-border bg-card overflow-hidden text-center group flex flex-col justify-between"
            >
              <div className="pt-6 pb-4 flex flex-col items-center flex-1">
                <div className="h-24 w-24 rounded-full overflow-hidden bg-secondary/50 mb-4 border-2 border-border shadow-sm">
                  {testimonial.image ? (
                    <img
                      src={testimonial.image}
                      alt={testimonial.author}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-xs text-muted-foreground">
                      No img
                    </div>
                  )}
                </div>
                {/* Fixed: author name field */}
                <h3 className="font-semibold text-lg px-4 line-clamp-1">
                  {testimonial.author}
                </h3>

                <p className="text-xs text-primary font-medium mt-1 px-4 line-clamp-1">
                  {testimonial.role}{" "}
                  {testimonial.company ? `at ${testimonial.company}` : ""}
                </p>

                {testimonial.rating && (
                  <div className="text-yellow-500 text-xs mt-1">
                    {"★".repeat(testimonial.rating)}
                  </div>
                )}
                {/* Fixed: content text body field */}
                <p className="text-xs text-muted-foreground line-clamp-3 mt-2 px-4 italic">
                  "{testimonial.content}"
                </p>
              </div>
              <div className="bg-secondary/30 p-3 flex justify-center gap-2 border-t border-border">
                <Link
                  href={`/dashboard/testimonials/${testimonial.id}/edit`}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-1.5 text-xs font-medium hover:bg-secondary transition-colors"
                >
                  <Pencil className="h-3.5 w-3.5" />
                  Edit
                </Link>
                <DeleteButton id={testimonial.id} action={deleteTestimonial} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TestimonialsPage;
// import Link from "next/link";
// import { Pencil, Plus } from "lucide-react";
// import { DeleteButton } from "../_components/delete-button";
// import { getTestimonials } from "@/app/dashboard/actions";

// const TestimonialsPage = async () => {
//   const testimonials = await getTestimonials();

//   return (
//     <div className="space-y-6">
//       <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
//         <div>
//           <h1>Testimonials</h1>
//         </div>
//         <div>
//           <Link
//             href="/dashboard/testimonials/new"
//             className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground shadow-sm hover:bg-primary/90"
//           >
//             <Plus className="h-4 w-4" />
//             Add Testimonial
//           </Link>
//         </div>
//       </div>
//       {testimonials.length === 0 ? (
//         <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-card/50 p-12 text-center">
//           <p className="text-muted-foreground">No testimonials yet.</p>
//           <Link
//             href="/dashboard/testimonials/new"
//             className="mt-4 inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
//           >
//             <Plus className="h-4 w-4" />
//             Add your first testimonial
//           </Link>
//         </div>
//       ) : (
//         <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
//           {testimonials.map((testimonial) => (
//             <div
//               key={testimonial.id}
//               className="rounded-xl border border-border bg-card overflow-hidden text-center group"
//             >
//               <div className="pt-6 pb-4 flex flex-col items-center">
//                 <div className="h-24 w-24 rounded-full overflow-hidden bg-secondary/50 mb-4 border-2 border-border shadow-sm">
//                   {testimonial.image ? (
//                     <img
//                       src={testimonial.image}
//                       alt={testimonial.name}
//                       className="w-full h-full object-cover"
//                     />
//                   ) : (
//                     <div className="w-full h-full flex items-center justify-center text-xs text-muted-foreground">
//                       No img
//                     </div>
//                   )}
//                 </div>
//                 <h3 className="font-semibold text-lg">{testimonial.name}</h3>
//                 <p className="text-xs text-primary font-medium mt-1">
//                   {testimonial.position}
//                 </p>
//                 <p className="text-xs text-muted-foreground line-clamp-2 mt-2 px-4">
//                   {testimonial.review}
//                 </p>
//               </div>
//               <div className="bg-secondary/30 p-3 flex justify-center gap-2 border-t border-border">
//                 <Link
//                   href={`/dashboard/testimonials/${testimonial.id}/edit`}
//                   className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-1.5 text-xs font-medium hover:bg-secondary transition-colors"
//                 >
//                   <Pencil className="h-3.5 w-3.5" />
//                   Edit
//                 </Link>
//                 <DeleteButton id={testimonial.id} action={deleteTestimonial} />
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default TestimonialsPage;
