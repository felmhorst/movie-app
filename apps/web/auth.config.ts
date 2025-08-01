import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import type { NextAuthConfig } from "next-auth";
import {Provider} from "next-auth/providers";

const providers: Provider[] = [GitHub, Google];

export const oauthProviders = providers
    .map((provider) => {
        const {id, name} = typeof provider === "function"
            ? provider()
            : provider;
        return {id, name};
    })
    .filter((provider) => provider.id !== "credentials");

export default {
    secret: process.env.AUTH_SECRET,
    providers,
    session: {
        strategy: "jwt",
    },
    pages: {
        signIn: "/sign-in",
        newUser: "/onboarding",
        // signOut
        // error
        // verifyRequest
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
        },
    },
} satisfies NextAuthConfig;