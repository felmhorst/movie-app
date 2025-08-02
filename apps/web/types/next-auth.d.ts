import NextAuth, {DefaultSession} from "next-auth";
import { JWT } from "next-auth/jwt";
import type {Service} from "streaming-availability";

/*
Extend default next-auth interfaces.
See: https://next-auth.js.org/getting-started/typescript#extend-default-interface-properties
 */
declare module "next-auth" {
    interface User {
        country?: string;
        streamingServices?: Service[];
    }

    interface Session {
        user: {
            id: string;
            country?: string;
            streamingServices?: Service[];
        } & DefaultSession["user"];
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        country?: string;
        streamingServices?: Service[];
    }
}