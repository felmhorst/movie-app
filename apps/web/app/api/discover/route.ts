import {withAuth} from "@/lib/withAuth";
import {SHOWS_COLLECTION} from "@/lib/db";
import {getRecommendedShows} from "@/lib/showsApi";


export const GET = withAuth(async (request, session) => {
    const count = await SHOWS_COLLECTION.countDocuments();
    const shows = count === 0
        ? await getRecommendedShows()
        : await SHOWS_COLLECTION.find({}).toArray();
    return Response.json({shows})
});