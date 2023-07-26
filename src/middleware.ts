import { NextRequest, NextResponse } from "next/server";

export default async function middleware(request: NextRequest) {
  const token = request.cookies.get("finance.token");

  const signinURL = new URL("/signin", request.url);
  const homeURL = new URL("/", request.url);

  if (!token) {
    if (
      request.nextUrl.pathname === "/signin" ||
      request.nextUrl.pathname === "/signup"
    ) {
      return NextResponse.next();
    }
    return NextResponse.redirect(signinURL);
  }

  if (
    request.nextUrl.pathname === "/signin" ||
    request.nextUrl.pathname === "/signup"
  ) {
    return NextResponse.redirect(homeURL);
  }
}

export const config = { matcher: ["/signin", "/signup", "/"] };
