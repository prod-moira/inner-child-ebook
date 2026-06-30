import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Bypass static files and Next.js internal paths to avoid breaking asset loading
  if (pathname.startsWith("/_next") || pathname.includes(".")) {
    return NextResponse.next();
  }

  const isAdminDeployment = process.env.IS_ADMIN_DEPLOYMENT === "true";
  const isAdminRoute =
    pathname === "/admin" ||
    pathname.startsWith("/admin/") ||
    pathname === "/api/admin" ||
    pathname.startsWith("/api/admin/");

  if (isAdminDeployment) {
    // Admin deployment: only allow admin pages and admin APIs
    if (!isAdminRoute) {
      const url = request.nextUrl.clone();
      url.pathname = "/admin";
      return NextResponse.redirect(url);
    }
  } else {
    // Public deployment: block admin pages and admin APIs, return 404
    if (isAdminRoute) {
      return new NextResponse("Not Found", { status: 404 });
    }
  }

  return updateSession(request);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
