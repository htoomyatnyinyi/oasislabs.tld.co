import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    if (!data.author?.trim()) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }

    if (!data.content?.trim()) {
      return NextResponse.json({ error: "Review content is required" }, { status: 400 });
    }

    await prisma.testimonial.create({
      data: {
        author: data.author.trim(),
        role: data.role?.trim() || "Client",
        company: data.company?.trim() || null,
        rating: Number(data.rating) || 5,
        content: data.content.trim(),
        image: data.image?.trim() || null,
        isApproved: false, // Submitted by client -> needs Admin approval!
      },
    });

    return NextResponse.json({
      success: true,
      message: "Thank you for your review! It will appear on our site once approved.",
    });
  } catch (error) {
    console.error("Testimonial submit API error:", error);
    return NextResponse.json(
      { error: "Failed to submit review" },
      { status: 500 }
    );
  }
}
