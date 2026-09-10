import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const authCookie = request.cookies.get("dashboard_auth");
  const { pathname } = request.nextUrl;

  // Protect /dashboard routes (except /dashboard/login)
  if (pathname.startsWith("/dashboard") && pathname !== "/dashboard/login") {
    if (!authCookie || authCookie.value !== "true") {
      return NextResponse.redirect(new URL("/dashboard/login", request.url));
    }
  }

  // Redirect away from login if already authenticated
  if (pathname === "/dashboard/login" && authCookie?.value === "true") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
