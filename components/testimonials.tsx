"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, Star, ChevronLeft, ChevronRight } from "lucide-react";

// 1. Defined TypeScript interface matching your Prisma schema
interface TestimonialData {
  id: string;
  author: string;
  role: string;
  company: string | null;
  content: string;
  rating: number;
  image: string | null;
  createdAt: Date;
  updatedAt: Date;
}

interface TestimonialsProps {
  testimonials: TestimonialData[];
}

const logos = ["Microsoft", "Google", "Amazon", "IBM", "Salesforce", "Oracle"];

export function Testimonials({ testimonials }: TestimonialsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying || testimonials.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, testimonials.length]);

  // Early return fallback check if database is empty
  if (!testimonials || testimonials.length === 0) {
    return null;
  }

  const goToNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const goToPrev = () => {
    setIsAutoPlaying(false);
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length,
    );
  };

  const goToSlide = (index: number) => {
    setIsAutoPlaying(false);
    setCurrentIndex(index);
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="py-24 bg-secondary/30 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-semibold tracking-wider uppercase">
            Testimonials
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6 text-balance">
            Trusted by Industry Leaders
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Don't just take our word for it. Here is what our clients have to
            say about working with us.
          </p>
        </motion.div>

        {/* Featured Testimonial Carousel */}
        <div className="relative max-w-4xl mx-auto mb-16">
          <div className="bg-card border border-border rounded-2xl p-8 md:p-12 min-h-[320px] flex flex-col justify-center shadow-sm">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="text-center"
              >
                <div className="flex justify-center gap-1 mb-6">
                  {[...Array(currentTestimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-primary text-primary"
                    />
                  ))}
                </div>

                <Quote className="w-12 h-12 text-primary/20 mx-auto mb-4" />

                {/* 2. Changed from .quote to .content */}
                <p className="text-xl md:text-2xl text-foreground mb-8 leading-relaxed max-w-3xl mx-auto">
                  &ldquo;{currentTestimonial.content}&rdquo;
                </p>

                <div className="flex items-center justify-center gap-4">
                  {/* Avatar rendering setup supporting optional dynamic URL image fallback */}
                  <div className="w-14 h-14 rounded-full overflow-hidden bg-primary/10 border border-border flex items-center justify-center shrink-0">
                    {currentTestimonial.image ? (
                      <img
                        src={currentTestimonial.image}
                        alt={currentTestimonial.author}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-primary font-bold text-lg">
                        {currentTestimonial.author
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </span>
                    )}
                  </div>
                  <div className="text-left">
                    {/* 3. Changed from .name to .author */}
                    <p className="font-semibold text-lg">
                      {currentTestimonial.author}
                    </p>
                    {/* 4. Support structural company suffix conditional separation */}
                    <p className="text-sm text-muted-foreground">
                      {currentTestimonial.role}
                      {currentTestimonial.company
                        ? `, ${currentTestimonial.company}`
                        : ""}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Arrows */}
          {testimonials.length > 1 && (
            <>
              <button
                onClick={goToPrev}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-6 w-12 h-12 rounded-full bg-card border border-border flex items-center justify-center hover:bg-secondary transition-colors z-10 shadow-sm"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={goToNext}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-6 w-12 h-12 rounded-full bg-card border border-border flex items-center justify-center hover:bg-secondary transition-colors z-10 shadow-sm"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}

          {/* Dots Navigation */}
          {testimonials.length > 1 && (
            <div className="flex justify-center gap-2 mt-6">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    index === currentIndex
                      ? "bg-primary w-8"
                      : "bg-border hover:bg-muted-foreground"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* All Testimonials Grid (Dynamically rendering database array subsets) */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 mb-20">
          {testimonials.slice(0, 3).map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`bg-card border border-border rounded-2xl p-8 flex flex-col justify-between ${
                index === currentIndex ? "ring-2 ring-primary" : ""
              }`}
            >
              <div>
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-primary text-primary"
                    />
                  ))}
                </div>

                <Quote className="w-10 h-10 text-primary/20 mb-4" />

                {/* 5. Changed from .quote to .content */}
                <p className="text-foreground mb-6 leading-relaxed line-clamp-4 text-sm">
                  &ldquo;{testimonial.content}&rdquo;
                </p>
              </div>

              <div className="flex items-center gap-4 pt-4 border-t border-border mt-auto">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-primary/10 border border-border flex items-center justify-center shrink-0">
                  {testimonial.image ? (
                    <img
                      src={testimonial.image}
                      alt={testimonial.author}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-primary font-bold text-sm">
                      {testimonial.author
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  )}
                </div>
                <div>
                  <p className="font-semibold text-sm">{testimonial.author}</p>
                  <p className="text-xs text-muted-foreground line-clamp-1">
                    {testimonial.role}
                    {testimonial.company ? ` at ${testimonial.company}` : ""}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Client Logos */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <p className="text-sm text-muted-foreground mb-8">
            Trusted by leading companies worldwide
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
            {logos.map((logo) => (
              <div
                key={logo}
                className="text-muted-foreground/50 font-semibold text-xl hover:text-muted-foreground transition-colors cursor-pointer"
              >
                {logo}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// "use client";

// import { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { Quote, Star, ChevronLeft, ChevronRight } from "lucide-react";

// const testimonials = [
//   {
//     quote:
//       "NexaTech transformed our entire digital infrastructure. Their team delivered a solution that exceeded our expectations and reduced operational costs by 40%.",
//     author: "Sarah Chen",
//     role: "CTO, TechVentures Inc.",
//     company: "TechVentures",
//     rating: 5,
//     image: null,
//   },
//   {
//     quote:
//       "Working with NexaTech was a game-changer for our startup. They understood our vision and delivered a product that helped us secure Series A funding.",
//     author: "Michael Rodriguez",
//     role: "Founder & CEO, HealthSync",
//     company: "HealthSync",
//     rating: 5,
//     image: null,
//   },
//   {
//     quote:
//       "The expertise and professionalism of the NexaTech team is unmatched. They have been our trusted technology partner for over 5 years now.",
//     author: "Emily Thompson",
//     role: "VP of Engineering, RetailMax",
//     company: "RetailMax",
//     rating: 5,
//     image: null,
//   },
//   {
//     quote:
//       "From concept to deployment, NexaTech handled everything flawlessly. Our new platform has processed over $100M in transactions without a single issue.",
//     author: "David Park",
//     role: "CEO, PayFlow Solutions",
//     company: "PayFlow",
//     rating: 5,
//     image: null,
//   },
//   {
//     quote:
//       "The AI solutions NexaTech built for us increased our conversion rates by 150%. Their deep understanding of ML is truly impressive.",
//     author: "Lisa Wang",
//     role: "Head of Product, MarketAI",
//     company: "MarketAI",
//     rating: 5,
//     image: null,
//   },
// ];

// const logos = ["Microsoft", "Google", "Amazon", "IBM", "Salesforce", "Oracle"];

// export function Testimonials() {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [isAutoPlaying, setIsAutoPlaying] = useState(true);

//   useEffect(() => {
//     if (!isAutoPlaying) return;

//     const interval = setInterval(() => {
//       setCurrentIndex((prev) => (prev + 1) % testimonials.length);
//     }, 5000);

//     return () => clearInterval(interval);
//   }, [isAutoPlaying]);

//   const goToNext = () => {
//     setIsAutoPlaying(false);
//     setCurrentIndex((prev) => (prev + 1) % testimonials.length);
//   };

//   const goToPrev = () => {
//     setIsAutoPlaying(false);
//     setCurrentIndex(
//       (prev) => (prev - 1 + testimonials.length) % testimonials.length,
//     );
//   };

//   const goToSlide = (index: number) => {
//     setIsAutoPlaying(false);
//     setCurrentIndex(index);
//   };

//   return (
//     <section className="py-24 bg-secondary/30">
//       <div className="max-w-7xl mx-auto px-6">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.6 }}
//           className="text-center mb-16"
//         >
//           <span className="text-primary text-sm font-semibold tracking-wider uppercase">
//             Testimonials
//           </span>
//           <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6 text-balance">
//             Trusted by Industry Leaders
//           </h2>
//           <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
//             Do not just take our word for it. Here is what our clients have to
//             say about working with us.
//           </p>
//         </motion.div>

//         {/* Featured Testimonial Carousel */}
//         <div className="relative max-w-4xl mx-auto mb-16">
//           <div className="bg-card border border-border rounded-2xl p-8 md:p-12 min-h-[300px] flex flex-col justify-center">
//             <AnimatePresence mode="wait">
//               <motion.div
//                 key={currentIndex}
//                 initial={{ opacity: 0, x: 20 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 exit={{ opacity: 0, x: -20 }}
//                 transition={{ duration: 0.3 }}
//                 className="text-center"
//               >
//                 <div className="flex justify-center gap-1 mb-6">
//                   {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
//                     <Star
//                       key={i}
//                       className="w-5 h-5 fill-primary text-primary"
//                     />
//                   ))}
//                 </div>

//                 <Quote className="w-12 h-12 text-primary/20 mx-auto mb-4" />

//                 <p className="text-xl md:text-2xl text-foreground mb-8 leading-relaxed max-w-3xl mx-auto">
//                   &ldquo;{testimonials[currentIndex].quote}&rdquo;
//                 </p>

//                 <div className="flex items-center justify-center gap-4">
//                   <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
//                     <span className="text-primary font-bold text-lg">
//                       {testimonials[currentIndex].author
//                         .split(" ")
//                         .map((n) => n[0])
//                         .join("")}
//                     </span>
//                   </div>
//                   <div className="text-left">
//                     <p className="font-semibold text-lg">
//                       {testimonials[currentIndex].author}
//                     </p>
//                     <p className="text-muted-foreground">
//                       {testimonials[currentIndex].role}
//                     </p>
//                   </div>
//                 </div>
//               </motion.div>
//             </AnimatePresence>
//           </div>

//           {/* Navigation Arrows */}
//           <button
//             onClick={goToPrev}
//             className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-6 w-12 h-12 rounded-full bg-card border border-border flex items-center justify-center hover:bg-secondary transition-colors"
//             aria-label="Previous testimonial"
//           >
//             <ChevronLeft className="w-5 h-5" />
//           </button>
//           <button
//             onClick={goToNext}
//             className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-6 w-12 h-12 rounded-full bg-card border border-border flex items-center justify-center hover:bg-secondary transition-colors"
//             aria-label="Next testimonial"
//           >
//             <ChevronRight className="w-5 h-5" />
//           </button>

//           {/* Dots Navigation */}
//           <div className="flex justify-center gap-2 mt-6">
//             {testimonials.map((_, index) => (
//               <button
//                 key={index}
//                 onClick={() => goToSlide(index)}
//                 className={`w-2.5 h-2.5 rounded-full transition-all ${
//                   index === currentIndex
//                     ? "bg-primary w-8"
//                     : "bg-border hover:bg-muted-foreground"
//                 }`}
//                 aria-label={`Go to testimonial ${index + 1}`}
//               />
//             ))}
//           </div>
//         </div>

//         {/* All Testimonials Grid */}
//         <div className="grid md:grid-cols-3 gap-6 mb-20">
//           {testimonials.slice(0, 3).map((testimonial, index) => (
//             <motion.div
//               key={testimonial.author}
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.6, delay: index * 0.1 }}
//               className={`bg-card border border-border rounded-2xl p-8 ${
//                 index === currentIndex ? "ring-2 ring-primary" : ""
//               }`}
//             >
//               <div className="flex gap-1 mb-4">
//                 {[...Array(testimonial.rating)].map((_, i) => (
//                   <Star key={i} className="w-4 h-4 fill-primary text-primary" />
//                 ))}
//               </div>

//               <Quote className="w-10 h-10 text-primary/20 mb-4" />

//               <p className="text-foreground mb-6 leading-relaxed line-clamp-4">
//                 &ldquo;{testimonial.quote}&rdquo;
//               </p>

//               <div className="flex items-center gap-4 pt-4 border-t border-border">
//                 <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
//                   <span className="text-primary font-bold">
//                     {testimonial.author
//                       .split(" ")
//                       .map((n) => n[0])
//                       .join("")}
//                   </span>
//                 </div>
//                 <div>
//                   <p className="font-semibold">{testimonial.author}</p>
//                   <p className="text-sm text-muted-foreground">
//                     {testimonial.role}
//                   </p>
//                 </div>
//               </div>
//             </motion.div>
//           ))}
//         </div>

//         {/* Client Logos */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.6 }}
//           className="text-center"
//         >
//           <p className="text-sm text-muted-foreground mb-8">
//             Trusted by leading companies worldwide
//           </p>
//           <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
//             {logos.map((logo) => (
//               <div
//                 key={logo}
//                 className="text-muted-foreground/50 font-semibold text-xl hover:text-muted-foreground transition-colors cursor-pointer"
//               >
//                 {logo}
//               </div>
//             ))}
//           </div>
//         </motion.div>
//       </div>
//     </section>
//   );
// }
