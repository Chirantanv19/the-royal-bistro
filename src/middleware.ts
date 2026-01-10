import { auth } from "@/auth"; // Make sure this path is correct for your project
import { NextResponse } from "next/server";

export default auth((req) => {
    const isLoggedIn = !!req.auth;
    const isOnDashboard = req.nextUrl.pathname.startsWith("/dashboard");
    const isLoginPage = req.nextUrl.pathname.startsWith("/login");

    // 1. If trying to access Dashboard AND NOT logged in -> Kick to Login
    if (isOnDashboard && !isLoggedIn) {
        return NextResponse.redirect(new URL("/login", req.nextUrl));
    }

    // 2. If trying to access Login Page AND ALREADY logged in -> Kick to Dashboard
    if (isLoginPage && isLoggedIn) {
        return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
    }

    return NextResponse.next();
});

// Configure paths that trigger this middleware
export const config = {
    matcher: ["/dashboard/:path*", "/login"],
};