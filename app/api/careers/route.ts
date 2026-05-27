import { NextResponse } from "next/server";

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

    // In a real application, you would:
    // 1. Store the application in a database
    // 2. Upload resume to cloud storage
    // 3. Send confirmation email to applicant
    // 4. Notify HR/hiring manager
    // 5. Integrate with ATS (Applicant Tracking System)

    console.log("Job application received:", {
      jobId: body.jobId,
      jobTitle: body.jobTitle,
      name: body.name,
      email: body.email,
      phone: body.phone || "Not provided",
      linkedin: body.linkedin || "Not provided",
      portfolio: body.portfolio || "Not provided",
      hasCoverLetter: !!body.coverLetter,
      hasResume: !!body.resumeUrl,
      timestamp: new Date().toISOString()
    });

    // Simulate processing time
    await new Promise((resolve) => setTimeout(resolve, 500));

    return NextResponse.json({
      success: true,
      message: "Application submitted successfully",
      application: {
        id: `APP-${Date.now()}`,
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
