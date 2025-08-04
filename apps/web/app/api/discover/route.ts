import {withAuth} from "@/lib/withAuth";
import {RECOMMENDATION_COLLECTION, SHOWS_COLLECTION} from "@/lib/db";
import {getRecommendedShows} from "@/lib/showsApi";


export const GET = withAuth(async (request, session) => {
    const countryCode = "de";
    const count = await RECOMMENDATION_COLLECTION.countDocuments({countryCode});

    if (count === 0)
        return Response.json({shows: await getRecommendedShows(countryCode)}, {status: 200});

    const recommendations = await RECOMMENDATION_COLLECTION.findOne({countryCode});
    const shows = await SHOWS_COLLECTION.find({id: {$in: recommendations.showIds}})
        .toArray();
    return Response.json({shows}, {status: 200});
});