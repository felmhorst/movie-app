import NextAuth from "next-auth";
import {MongoDBAdapter} from "@auth/mongodb-adapter";
import client from "./lib/db";
import authConfig from "./auth.config";
import {USER_COLLECTION} from "@/lib/db";
import {ObjectId} from "mongodb";

export const { handlers, signIn, signOut, auth } = NextAuth({
    ...authConfig,
    adapter: MongoDBAdapter(client),
    events: {
        async createUser({ user }) {
            const userId = user.id;
            // add additional fields on account creation
            await USER_COLLECTION.updateOne(
                {_id: new ObjectId(userId)},
                {$set: {country: "de", streamingServices: []}});
        },
    },
});