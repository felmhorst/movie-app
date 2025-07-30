import GitHub from "next-auth/providers/github";
import type { NextAuthConfig } from "next-auth";

export default {
    secret: process.env.AUTH_SECRET,
    session: {
        strategy: "jwt"
    },
    providers: [GitHub],
    pages: {
        signIn: "/sign-in",
        newUser: "/onboarding",
    },
    callbacks: {
        // add user id to the session
        jwt({token, user}) {
            if (user)
                token.id = user.id;
            return token;
        },
        session({session, token}) {
            session.user.id = token.id;
            return session;
        }
    },
} satisfies NextAuthConfig;