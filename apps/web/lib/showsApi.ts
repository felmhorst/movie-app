import {Client, Configuration, Country, Service, Show} from "streaming-availability";
import {MOVIE_COLLECTION, SERVICE_COLLECTION} from "@/lib/db";

const RAPID_API_KEY = process.env.RAPID_API_KEY!;

const streamingApiClient = new Client(new Configuration({
    apiKey: RAPID_API_KEY,
}));

export async function getRecommendedShows(country = "de"): Promise<Show[]> {
    const shows = await streamingApiClient.showsApi.getTopShows({
        country: country,
        service: "netflix",
        showType: "movie",
    });
    await MOVIE_COLLECTION.insertMany(shows);
    return shows;
}

export async function searchShowsByTitle(query: string): Promise<Show[]> {
    return await streamingApiClient.showsApi.searchShowsByTitle({
        country: "de",
        title: query
    });
}

export async function getCountries(): Promise<Country[]> {
    const countriesDictionary = await streamingApiClient.countriesApi.getCountries({});
    const countriesArray = Object.values(countriesDictionary) as Country[];
    await SERVICE_COLLECTION.insertMany(countriesArray);
    return countriesArray;
}