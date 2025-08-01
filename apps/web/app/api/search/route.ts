import {withAuth} from "@/lib/withAuth";
import {searchShowsByTitle} from "@/lib/showsApi";

export const POST = withAuth(async (request, session) => {
    const {query} = await request.json();
    if (!query)
        return Response.json({error: "Missing required field: query"}, {status: 400});

    console.log("API: POST /search", query);
    const shows = await searchShowsByTitle(query);
    return Response.json({shows}, {status: 200});
});