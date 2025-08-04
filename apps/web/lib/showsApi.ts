import {Client, Configuration, Country, Show} from "streaming-availability";
import {SHOWS_COLLECTION, SERVICE_COLLECTION, RECOMMENDATION_COLLECTION} from "@/lib/db";

const RAPID_API_KEY = process.env.RAPID_API_KEY!;

const streamingApiClient = new Client(new Configuration({
    apiKey: RAPID_API_KEY,
}));

export async function getRecommendedShows(countryCode: string = "de"): Promise<Show[]> {
    let shows = [];
    for (const service of ["netflix", "prime", "disney", "apple", "hbo"]) {
        const showsInService = await streamingApiClient.showsApi.getTopShows({
            country: countryCode,
            service
        });
        shows.push(...showsInService);
    }
    await SHOWS_COLLECTION.insertMany(shows);
    const showIds = shows.map((show) => show.id);
    await RECOMMENDATION_COLLECTION.insertOne({
        countryCode,
        showIds
    });
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