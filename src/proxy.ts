import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const adminPassword = process.env.ADMIN_PASSWORD;
  const expected = adminPassword ? encodeURIComponent(adminPassword) : undefined;

  // Protect /admin routes (except /admin/login)
  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    const adminToken = request.cookies.get("admin_token")?.value;

    if (
      !adminToken ||
      !adminPassword ||
      (adminToken !== expected && adminToken !== adminPassword)
    ) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
