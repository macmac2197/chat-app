import { getToken } from "next-auth/jwt";
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  async function middleware(req) {
    const pathname = req.nextUrl.pathname;

    // manage route protection
    const isAuth = await getToken({ req });
    const isLoginPage = pathname.startsWith("/login");
    const sensitiveRoutes = ["/dashboard"];

    const isAccessingSensitiveRoutes = sensitiveRoutes.some((route) =>
      pathname.startsWith(route)
    );

    if (isLoginPage) {
      // user is authenticated, redirect to dashboard
      if (isAuth) {
        return NextResponse.redirect(new URL("/dashboard", req.url));
      }
      // redirect to login page
      return NextResponse.next();
    }

    if (!isAuth && isAccessingSensitiveRoutes) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    if (pathname === "/") {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
  },
  {
    callbacks: {
      async authorized() {
        return true;
      },
    },
  }
);

export const config = {
  matcher: ["/", "/login", "/dashboard/:path*"],
};
