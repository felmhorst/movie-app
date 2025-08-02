import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import type {NextAuthConfig} from "next-auth";
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
        // add additional properties to the token
        jwt({token, user}) {
            if (user)
                token.id = user.id;
            return token;
        },
        // add additional properties to the session
        session({session, token, user}) {
            if (!session?.user)
                return session;
            session.user.id = token.id;
            // if (!user)
            //     return session;
            // session.user.country = user.country;
            // session.user.streamingServices = user.streamingServices;
            return session;
        },
    },
} satisfies NextAuthConfig;