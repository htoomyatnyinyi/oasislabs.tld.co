import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

interface NewsletterData {
  email: string;
}

export async function POST(request: NextRequest) {
  try {
    const data: NewsletterData = await request.json();

    // Validate email
    if (!data.email?.trim()) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Upsert to avoid duplicates
    await prisma.newsletterSubscriber.upsert({
      where: { email: data.email.trim().toLowerCase() },
      update: {},
      create: { email: data.email.trim().toLowerCase() },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Successfully subscribed to the newsletter!"
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Newsletter subscription error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again later." },
      { status: 500 }
    );
  }
}
