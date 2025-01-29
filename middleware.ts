import { NextRequest, NextResponse } from "next/server";
import { updateSession } from "@/app/lib/sessions";

export async function middleware(request: NextRequest) {
  const userSession = await updateSession(request);

  // If session doesn't exist user is not logged in and will be redirected to login
  if (!userSession) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return userSession;
}

export const config = {
  matcher: '/dashboard/:path*',
}