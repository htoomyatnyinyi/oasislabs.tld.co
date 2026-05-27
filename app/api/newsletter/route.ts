import { NextRequest, NextResponse } from "next/server";

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

    // Here you would typically:
    // 1. Check if email already exists in your newsletter list
    // 2. Add to newsletter service (Mailchimp, ConvertKit, etc.)
    // 3. Save to database
    // 4. Send welcome email

    console.log("Newsletter subscription:", {
      email: data.email,
      timestamp: new Date().toISOString()
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
