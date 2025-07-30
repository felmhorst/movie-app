import {withAuth} from "@/lib/withAuth";
import {MOVIE_COLLECTION, WATCHLIST_COLLECTION} from "@/lib/db";
import {ObjectId} from "mongodb";

export const GET = withAuth(async (request, session) => {
    const userId = await session.user.id;
    const movieIds = await WATCHLIST_COLLECTION.find({userId})
        .toArray().then((entries) => entries.map((entry) => new ObjectId(entry.movieId)));
    const movies = await MOVIE_COLLECTION.find({_id: {$in: movieIds}})
        .toArray().then((movies) => movies.map((movie) => {
            movie.isOnWatchlist = true;
            return movie;
        }));
    return Response.json({movies});
});

export const PUT = withAuth(async (request, session) => {
    const {movieId} = await request.json();
    const userId = await session.user.id;

    if (!movieId)
        return Response.json({error: "Missing required field: movieId"}, {status: 400});
    if (!userId)
        return Response.json({error: "Missing session.user.id"}, {status: 400});

    const movie = await MOVIE_COLLECTION.findOne({_id: new ObjectId(movieId)});
    if (!movie)
        return Response.json({error: "Movie does not exist"}, {status: 404});

    try {
        await WATCHLIST_COLLECTION.insertOne({userId, movieId});
        return Response.json({message: "Success"}, {status: 201});
    } catch (error: any) {
        if (error.code === 11000)
            return Response.json({error: "Movie already on watchlist"}, {status: 409});
        throw error;
    }
});

export const DELETE = withAuth(async (request, session) => {
    const {movieId} = await request.json();
    const userId = await session.user.id;

    if (!movieId)
        return Response.json({error: "Missing required field: movieId"}, {status: 400});
    if (!userId)
        return Response.json({error: "Missing session.user.id"}, {status: 400});

    await WATCHLIST_COLLECTION.deleteOne({userId, movieId});
    return Response.json({message: "Success"}, {status: 200});
});