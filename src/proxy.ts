import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = [
  "/cart",
  "/checkout",
  "/allorders",
  "/wishlist",
  "/profile",
];

const authRoutes = ["/login", "/signup", "/forget-password", "/reset-password"];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("token")?.value || null;
  const isAuthenticated = !!token;

  const isProtectedRoute = protectedRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );

  const isAuthRoute = authRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );

  if (isProtectedRoute && !isAuthenticated) {
    const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  if (isAuthRoute && isAuthenticated) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/profile/:path*",
    "/checkout/:path*",
    "/cart/:path*",
    "/wishlist/:path*",
    "/allorders/:path*",
    "/login",
    "/signup",
    "/forget-password",
    "/reset-password",
  ],
};
