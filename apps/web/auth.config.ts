import GitHub from "next-auth/providers/github";
import type { NextAuthConfig } from "next-auth";

export default {
    secret: process.env.AUTH_SECRET,
    providers: [GitHub],
    pages: {
        signIn: "/sign-in",
        newUser: "/onboarding",
    }
} satisfies NextAuthConfig;