import {withAuth} from "@/lib/withAuth";
import {SHOWS_COLLECTION, WATCHLIST_COLLECTION} from "@/lib/db";

export const GET = withAuth(async (request, session) => {
    const userId = await session.user.id;
    const showsId = await WATCHLIST_COLLECTION.find({userId})
        .toArray();
    const shows = await SHOWS_COLLECTION.find({id: {$in: showsId}})
        .toArray().then((shows) => shows.map((show) => {
            show.isOnWatchlist = true;
            return show;
        }));
    return Response.json({shows}, {status: 200});
});

export const PUT = withAuth(async (request, session) => {
    const {showId} = await request.json();
    const userId = await session.user.id;

    if (!showId)
        return Response.json({error: "Missing required field: showId"}, {status: 400});
    if (!userId)
        return Response.json({error: "Missing session.user.id"}, {status: 400});

    const show = await SHOWS_COLLECTION.findOne({id: showId});
    if (!show)
        return Response.json({error: "Show does not exist"}, {status: 404});

    try {
        await WATCHLIST_COLLECTION.insertOne({userId, showId});
        return Response.json({message: "Success"}, {status: 201});
    } catch (error: any) {
        if (error.code === 11000)
            return Response.json({error: "Show already on watchlist"}, {status: 409});
        throw error;
    }
});

export const DELETE = withAuth(async (request, session) => {
    const {showId} = await request.json();
    const userId = await session.user.id;

    if (!showId)
        return Response.json({error: "Missing required field: showId"}, {status: 400});
    if (!userId)
        return Response.json({error: "Missing session.user.id"}, {status: 400});

    await WATCHLIST_COLLECTION.deleteOne({userId, showId});
    return Response.json({message: "Success"}, {status: 200});
});