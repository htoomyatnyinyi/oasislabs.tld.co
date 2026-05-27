import { NextResponse } from "next/server";

interface BookingRequest {
  name: string;
  email: string;
  company?: string;
  message?: string;
  meetingType: string;
  date: string;
  time: string;
}

export async function POST(request: Request) {
  try {
    const body: BookingRequest = await request.json();

    // Validate required fields
    if (!body.name || !body.email || !body.meetingType || !body.date || !body.time) {
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
    // 1. Check calendar availability
    // 2. Create a calendar event
    // 3. Send confirmation emails
    // 4. Store the booking in a database
    // 5. Integrate with a scheduling service (Calendly, Cal.com, etc.)

    console.log("Booking received:", {
      name: body.name,
      email: body.email,
      company: body.company || "Not provided",
      message: body.message || "No message",
      meetingType: body.meetingType,
      date: body.date,
      time: body.time,
      timestamp: new Date().toISOString()
    });

    // Simulate processing time
    await new Promise((resolve) => setTimeout(resolve, 500));

    return NextResponse.json({
      success: true,
      message: "Booking confirmed successfully",
      booking: {
        id: `BK-${Date.now()}`,
        name: body.name,
        email: body.email,
        meetingType: body.meetingType,
        dateTime: `${body.date} at ${body.time}`,
        confirmationSent: true
      }
    });
  } catch {
    console.error("Booking error");
    return NextResponse.json(
      { error: "Failed to process booking" },
      { status: 500 }
    );
  }
}

export async function GET() {
  // Return available time slots for a given date
  // In a real application, this would check calendar availability
  return NextResponse.json({
    availableSlots: [
      "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
      "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM"
    ],
    timezone: "America/Los_Angeles"
  });
}
