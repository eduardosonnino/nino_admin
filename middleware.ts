import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  // Check if the user is authenticated
  if (!session) {
    // If the user is not authenticated and trying to access a protected route
    if (
      req.nextUrl.pathname.startsWith("/dashboard") ||
      req.nextUrl.pathname.startsWith("/student-dashboard") ||
      req.nextUrl.pathname.startsWith("/parent-dashboard") ||
      req.nextUrl.pathname.startsWith("/teacher-dashboard")
    ) {
      const redirectUrl = req.nextUrl.clone()
      redirectUrl.pathname = "/login"
      redirectUrl.searchParams.set("redirectedFrom", req.nextUrl.pathname)
      return NextResponse.redirect(redirectUrl)
    }
  } else {
    // If the user is authenticated, check their role and redirect if necessary
    const { data: profile } = await supabase.from("profiles").select("user_type").eq("id", session.user.id).single()

    if (profile) {
      // Redirect users based on their role if they're accessing the wrong dashboard
      if (
        profile.user_type === "student" &&
        (req.nextUrl.pathname.startsWith("/dashboard") ||
          req.nextUrl.pathname.startsWith("/parent-dashboard") ||
          req.nextUrl.pathname.startsWith("/teacher-dashboard"))
      ) {
        return NextResponse.redirect(new URL("/student-dashboard", req.url))
      }

      if (
        profile.user_type === "parent" &&
        (req.nextUrl.pathname.startsWith("/dashboard") ||
          req.nextUrl.pathname.startsWith("/student-dashboard") ||
          req.nextUrl.pathname.startsWith("/teacher-dashboard"))
      ) {
        return NextResponse.redirect(new URL("/parent-dashboard", req.url))
      }

      if (
        profile.user_type === "teacher" &&
        (req.nextUrl.pathname.startsWith("/dashboard") ||
          req.nextUrl.pathname.startsWith("/student-dashboard") ||
          req.nextUrl.pathname.startsWith("/parent-dashboard"))
      ) {
        return NextResponse.redirect(new URL("/teacher-dashboard", req.url))
      }

      if (
        profile.user_type === "admin" &&
        (req.nextUrl.pathname.startsWith("/student-dashboard") ||
          req.nextUrl.pathname.startsWith("/parent-dashboard") ||
          req.nextUrl.pathname.startsWith("/teacher-dashboard"))
      ) {
        return NextResponse.redirect(new URL("/dashboard", req.url))
      }
    }
  }

  return res
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/student-dashboard/:path*",
    "/parent-dashboard/:path*",
    "/teacher-dashboard/:path*",
    "/login",
    "/register",
  ],
}
