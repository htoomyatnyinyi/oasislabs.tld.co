"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function getServices() {
  return prisma.service.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export async function createService(formData: FormData) {
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const icon = formData.get("icon") as string || "Code2";
  const features = (formData.get("features") as string || "").split(",").map(s => s.trim()).filter(Boolean);
  const benefits = (formData.get("benefits") as string || "").split(",").map(s => s.trim()).filter(Boolean);
  const technologies = (formData.get("technologies") as string || "").split(",").map(s => s.trim()).filter(Boolean);
  const process = (formData.get("process") as string || "").split(",").map(s => s.trim()).filter(Boolean);

  await prisma.service.create({
    data: {
      title,
      description,
      icon,
      features,
      benefits,
      technologies,
      process,
    },
  });

  revalidatePath("/dashboard/services");
  revalidatePath("/#services");
  redirect("/dashboard/services");
}

export async function deleteService(id: string) {
  await prisma.service.delete({
    where: { id },
  });

  revalidatePath("/dashboard/services");
  revalidatePath("/#services");
}
