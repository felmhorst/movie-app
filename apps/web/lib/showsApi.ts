import {Client, Configuration} from "streaming-availability";
import {MOVIE_COLLECTION} from "@/lib/db";

const RAPID_API_KEY = process.env.RAPID_API_KEY!;

const streamingApiClient = new Client(new Configuration({
    apiKey: RAPID_API_KEY,
}));

export async function getRecommendedMovies() {
    const movies = await streamingApiClient.showsApi.getTopShows({
        country: "de",
        service: "netflix",
        showType: "movie",
    });
    await MOVIE_COLLECTION.insertMany(movies);
    return movies;
}
