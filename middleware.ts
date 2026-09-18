import { NextResponse, type NextRequest } from "next/server";
import { createMiddlewareClient } from "@/lib/supabase/middleware";

const PUBLIC_ROUTES = [
  "/",
  "/login",
  "/forgot-password",
  "/formations",
  "/contact",
  "/faq",
  "/candidature",
  "/403",
];
const PUBLIC_ROUTE_PREFIXES = ["/formations/", "/actualites", "/evenements"];

function isPublicRoute(pathname: string): boolean {
  if (PUBLIC_ROUTES.includes(pathname)) return true;
  return PUBLIC_ROUTE_PREFIXES.some((prefix) => pathname.startsWith(prefix));
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (isPublicRoute(pathname)) {
    if (pathname === "/login") {
      const supabase = createMiddlewareClient(request);
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session) {
        const redirectUrl = request.nextUrl.clone();
        redirectUrl.pathname = "/dashboard";
        redirectUrl.search = "";
        return NextResponse.redirect(redirectUrl);
      }
    }
    return NextResponse.next();
  }

  const supabase = createMiddlewareClient(request);
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = "/login";
    redirectUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(redirectUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
