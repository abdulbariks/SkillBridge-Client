import { NextRequest, NextResponse } from "next/server";
import { Roles } from "./constants/roles";
import { userService } from "./services/user.service";

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  let session = null;

  try {
    const { data } = await userService.getSession();
    session = data;
  } catch (error) {
    console.error("Error fetching session:", error);
  }

  // If user is logged in, prevent access to login/register pages
  if (session && (pathname === "/login" || pathname === "/register")) {
    switch (session.user.role) {
      case Roles.admin:
        return NextResponse.redirect(new URL("/", request.url));
      case Roles.tutor:
        return NextResponse.redirect(new URL("/", request.url));
      default:
        return NextResponse.redirect(new URL("/", request.url));
    }
  }

  // If user is not authenticated, block access to dashboards
  if (!session) {
    if (
      pathname.startsWith("/become-tutor") ||
      pathname.startsWith("/dashboard") ||
      pathname.startsWith("/tutor-dashboard") ||
      pathname.startsWith("/admin-dashboard")
    ) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    return NextResponse.next();
  }

  // Authenticated user role-based routing
  if (session.user.role === Roles.admin && pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/admin-dashboard", request.url));
  }

  if (session.user.role === Roles.tutor && pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/tutor-dashboard", request.url));
  }

  if (session.user.role === Roles.student && pathname.startsWith("/admin-dashboard")) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (session.user.role === Roles.student && pathname.startsWith("/tutor-dashboard")) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/login",
    "/register",
    "/become-tutor",
    "/dashboard",
    "/dashboard/:path*",
    "/tutor-dashboard",
    "/tutor-dashboard/:path*",
    "/admin-dashboard",
    "/admin-dashboard/:path*",
  ],
};
