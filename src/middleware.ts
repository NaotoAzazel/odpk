import { NextResponse } from "next/server";
import { withAuth } from "next-auth/middleware";

export default withAuth(
  async function middleware(req) {
    const token = req.nextauth.token;
    const isAuth = !!token;

    const isAuthPage = req.nextUrl.pathname.startsWith("/login");
    if (isAuthPage) {
      if (isAuth) {
        return NextResponse.redirect(new URL("/", req.url));
      }

      return null;
    }

    if (!isAuth) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  },
  {
    callbacks: {
      authorized() {
        // Always return true to call middleware function above
        return true;
      },
    },
  },
);

export const config = {
  matcher: [
    `/news-editor/:path*`,
    `/page-editor/:path*`,
    "/login",
    "/dashboard/:path*",
  ],
};
