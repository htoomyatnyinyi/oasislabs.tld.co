import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

interface ApplicationRequest {
  jobId: number;
  jobTitle: string;
  name: string;
  email: string;
  phone?: string;
  linkedin?: string;
  portfolio?: string;
  coverLetter?: string;
  resumeUrl?: string;
}

export async function POST(request: Request) {
  try {
    const body: ApplicationRequest = await request.json();

    // Validate required fields
    if (!body.name || !body.email || !body.jobId || !body.jobTitle) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Save application to database
    const application = await prisma.jobApplication.create({
      data: {
        jobTitle: body.jobTitle,
        name: body.name.trim(),
        email: body.email.trim(),
        phone: body.phone?.trim() || null,
        linkedin: body.linkedin?.trim() || null,
        portfolio: body.portfolio?.trim() || null,
        coverLetter: body.coverLetter?.trim() || null,
        resumeUrl: body.resumeUrl || null,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Application submitted successfully",
      application: {
        id: application.id,
        jobId: body.jobId,
        jobTitle: body.jobTitle,
        applicantName: body.name,
        applicantEmail: body.email,
        status: "Received",
        submittedAt: new Date().toISOString()
      }
    });
  } catch {
    console.error("Application error");
    return NextResponse.json(
      { error: "Failed to submit application" },
      { status: 500 }
    );
  }
}

export async function GET() {
  // Return list of open positions
  // In a real application, this would fetch from a database
  return NextResponse.json({
    openPositions: 6,
    departments: ["Engineering", "Design", "Product", "Sales & Marketing", "Operations"],
    locations: ["San Francisco, CA", "New York, NY", "Remote"]
  });
}
