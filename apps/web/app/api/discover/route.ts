import {withAuth} from "@/lib/withAuth";
import {MOVIE_COLLECTION} from "@/lib/db";


export const GET = withAuth(async (request, session) => {
    console.log("API: GET /discover");
    let movies = await MOVIE_COLLECTION.find({}).toArray();
    if (movies.length === 0)
        // await getRecommendedMovies();
        // get recommended
        // save recommended
        // return recommended
    return Response.json({movies})
});