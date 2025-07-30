import {withAuth} from "@/lib/withAuth";
import {MOVIE_COLLECTION} from "@/lib/db";

export const GET = withAuth(async (request, session) => {
    const movies = await MOVIE_COLLECTION.find({}).toArray();
    return Response.json({movies})
});