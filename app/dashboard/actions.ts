"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// ─── Services ──────────────────────────────────────────────

export async function getServices() {
  return prisma.service.findMany({ orderBy: { createdAt: "desc" } });
}

export async function createService(formData: FormData) {
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const icon = (formData.get("icon") as string) || "Code2";
  const features = splitCsv(formData.get("features") as string);
  const benefits = splitCsv(formData.get("benefits") as string);
  const technologies = splitCsv(formData.get("technologies") as string);
  const processSteps = splitCsv(formData.get("process") as string);

  await prisma.service.create({
    data: { title, description, icon, features, benefits, technologies, process: processSteps },
  });

  revalidatePath("/dashboard/services");
  revalidatePath("/");
  redirect("/dashboard/services");
}

export async function updateService(id: string, formData: FormData) {
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const icon = (formData.get("icon") as string) || "Code2";
  const features = splitCsv(formData.get("features") as string);
  const benefits = splitCsv(formData.get("benefits") as string);
  const technologies = splitCsv(formData.get("technologies") as string);
  const processSteps = splitCsv(formData.get("process") as string);

  await prisma.service.update({
    where: { id },
    data: { title, description, icon, features, benefits, technologies, process: processSteps },
  });

  revalidatePath("/dashboard/services");
  revalidatePath("/");
  redirect("/dashboard/services");
}

export async function deleteService(id: string) {
  await prisma.service.delete({ where: { id } });
  revalidatePath("/dashboard/services");
  revalidatePath("/");
}

// ─── Portfolio ─────────────────────────────────────────────

export async function getPortfolioItems() {
  return prisma.portfolioItem.findMany({ orderBy: { createdAt: "desc" } });
}

export async function createPortfolioItem(formData: FormData) {
  await prisma.portfolioItem.create({
    data: {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      image: formData.get("image") as string,
      category: formData.get("category") as string,
      link: (formData.get("link") as string) || null,
      technologies: splitCsv(formData.get("technologies") as string),
    },
  });
  revalidatePath("/dashboard/portfolio");
  revalidatePath("/");
  redirect("/dashboard/portfolio");
}

export async function updatePortfolioItem(id: string, formData: FormData) {
  await prisma.portfolioItem.update({
    where: { id },
    data: {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      image: formData.get("image") as string,
      category: formData.get("category") as string,
      link: (formData.get("link") as string) || null,
      technologies: splitCsv(formData.get("technologies") as string),
    },
  });
  revalidatePath("/dashboard/portfolio");
  revalidatePath("/");
  redirect("/dashboard/portfolio");
}

export async function deletePortfolioItem(id: string) {
  await prisma.portfolioItem.delete({ where: { id } });
  revalidatePath("/dashboard/portfolio");
  revalidatePath("/");
}

// ─── Blog ──────────────────────────────────────────────────

export async function getBlogPosts() {
  return prisma.blogPost.findMany({ orderBy: { createdAt: "desc" } });
}

export async function createBlogPost(formData: FormData) {
  const title = formData.get("title") as string;
  await prisma.blogPost.create({
    data: {
      title,
      slug: slugify(title),
      excerpt: formData.get("excerpt") as string,
      content: formData.get("content") as string,
      image: formData.get("image") as string,
      author: formData.get("author") as string,
      category: formData.get("category") as string,
      publishedAt: formData.get("published") === "on" ? new Date() : null,
    },
  });
  revalidatePath("/dashboard/blog");
  revalidatePath("/");
  redirect("/dashboard/blog");
}

export async function updateBlogPost(id: string, formData: FormData) {
  const title = formData.get("title") as string;
  await prisma.blogPost.update({
    where: { id },
    data: {
      title,
      slug: slugify(title),
      excerpt: formData.get("excerpt") as string,
      content: formData.get("content") as string,
      image: formData.get("image") as string,
      author: formData.get("author") as string,
      category: formData.get("category") as string,
      publishedAt: formData.get("published") === "on" ? new Date() : null,
    },
  });
  revalidatePath("/dashboard/blog");
  revalidatePath("/");
  redirect("/dashboard/blog");
}

export async function deleteBlogPost(id: string) {
  await prisma.blogPost.delete({ where: { id } });
  revalidatePath("/dashboard/blog");
  revalidatePath("/");
}

// ─── Team ──────────────────────────────────────────────────

export async function getTeamMembers() {
  return prisma.teamMember.findMany({ orderBy: { createdAt: "desc" } });
}

export async function createTeamMember(formData: FormData) {
  await prisma.teamMember.create({
    data: {
      name: formData.get("name") as string,
      role: formData.get("role") as string,
      bio: formData.get("bio") as string,
      image: formData.get("image") as string,
      socials: parseSocials(formData),
    },
  });
  revalidatePath("/dashboard/team");
  revalidatePath("/");
  redirect("/dashboard/team");
}

export async function updateTeamMember(id: string, formData: FormData) {
  await prisma.teamMember.update({
    where: { id },
    data: {
      name: formData.get("name") as string,
      role: formData.get("role") as string,
      bio: formData.get("bio") as string,
      image: formData.get("image") as string,
      socials: parseSocials(formData),
    },
  });
  revalidatePath("/dashboard/team");
  revalidatePath("/");
  redirect("/dashboard/team");
}

export async function deleteTeamMember(id: string) {
  await prisma.teamMember.delete({ where: { id } });
  revalidatePath("/dashboard/team");
  revalidatePath("/");
}

// ─── Testimonials ──────────────────────────────────────────

export async function getTestimonials() {
  return prisma.testimonial.findMany({ orderBy: { createdAt: "desc" } });
}

export async function getApprovedTestimonials() {
  return prisma.testimonial.findMany({
    where: { isApproved: true },
    orderBy: { createdAt: "desc" },
  });
}

export async function toggleTestimonialApproval(id: string, isApproved: boolean) {
  await prisma.testimonial.update({
    where: { id },
    data: { isApproved: !isApproved },
  });
  revalidatePath("/dashboard/testimonials");
  revalidatePath("/");
}

export async function createTestimonial(formData: FormData) {
  await prisma.testimonial.create({
    data: {
      author: formData.get("author") as string,
      role: formData.get("role") as string,
      company: (formData.get("company") as string) || null,
      content: formData.get("content") as string,
      rating: Number(formData.get("rating")) || 5,
      image: (formData.get("image") as string) || null,
      isApproved: true, // Created directly by Admin -> Approved automatically!
    },
  });
  revalidatePath("/dashboard/testimonials");
  revalidatePath("/");
  redirect("/dashboard/testimonials");
}

export async function updateTestimonial(id: string, formData: FormData) {
  await prisma.testimonial.update({
    where: { id },
    data: {
      author: formData.get("author") as string,
      role: formData.get("role") as string,
      company: (formData.get("company") as string) || null,
      content: formData.get("content") as string,
      rating: Number(formData.get("rating")) || 5,
      image: (formData.get("image") as string) || null,
    },
  });
  revalidatePath("/dashboard/testimonials");
  revalidatePath("/");
  redirect("/dashboard/testimonials");
}

export async function deleteTestimonial(id: string) {
  await prisma.testimonial.delete({ where: { id } });
  revalidatePath("/dashboard/testimonials");
  revalidatePath("/");
}

// ─── Bookings ──────────────────────────────────────────────

export async function getBookings() {
  return prisma.booking.findMany({ orderBy: { createdAt: "desc" } });
}

export async function deleteBooking(id: string) {
  await prisma.booking.delete({ where: { id } });
  revalidatePath("/dashboard/bookings");
}

// ─── Contact Submissions ───────────────────────────────────

export async function getContactSubmissions() {
  return prisma.contactMessage.findMany({ orderBy: { createdAt: "desc" } });
}

export async function deleteContactSubmission(id: string) {
  await prisma.contactMessage.delete({ where: { id } });
  revalidatePath("/dashboard/messages");
}

// ─── Job Postings (Openings) ───────────────────────────────

export async function getJobs() {
  return prisma.job.findMany({ orderBy: { createdAt: "desc" } });
}

export async function createJob(formData: FormData) {
  const title = formData.get("title") as string;
  await prisma.job.create({
    data: {
      title,
      slug: slugify(title),
      location: formData.get("location") as string,
      type: (formData.get("type") as any) || "FULL_TIME",
      salary: formData.get("salary") as string,
      description: formData.get("description") as string,
      remote: formData.get("remote") === "on",
      departmentId: (formData.get("departmentId") as string) || undefined,
    },
  });
  revalidatePath("/dashboard/jobs");
  revalidatePath("/");
  redirect("/dashboard/jobs");
}

export async function deleteJob(id: string) {
  await prisma.job.delete({ where: { id } });
  revalidatePath("/dashboard/jobs");
  revalidatePath("/");
}

// ─── Job Applications ──────────────────────────────────────

export async function getJobApplications() {
  return prisma.jobApplication.findMany({ orderBy: { createdAt: "desc" } });
}

export async function deleteJobApplication(id: string) {
  await prisma.jobApplication.delete({ where: { id } });
  revalidatePath("/dashboard/applications");
}

// ─── Newsletter Subscribers ────────────────────────────────

export async function getSubscribers() {
  return prisma.newsletterSubscriber.findMany({ orderBy: { createdAt: "desc" } });
}

export async function deleteSubscriber(id: string) {
  await prisma.newsletterSubscriber.delete({ where: { id } });
  revalidatePath("/dashboard/subscribers");
}

// ─── Helpers ───────────────────────────────────────────────

function splitCsv(val: string | null): string[] {
  return (val || "").split(",").map((s) => s.trim()).filter(Boolean);
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .concat("-", Date.now().toString(36));
}

function parseSocials(formData: FormData) {
  const socials: Record<string, string> = {};
  const twitter = formData.get("twitter") as string;
  const linkedin = formData.get("linkedin") as string;
  const github = formData.get("github") as string;
  if (twitter) socials.twitter = twitter;
  if (linkedin) socials.linkedin = linkedin;
  if (github) socials.github = github;
  return Object.keys(socials).length > 0 ? socials : undefined;
}
