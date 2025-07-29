import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import {MongoDBAdapter} from "@auth/mongodb-adapter";
import client from "./lib/db";
import authConfig from "./auth.config";

export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter: MongoDBAdapter(client),
    providers: [GitHub],
    ...authConfig
});