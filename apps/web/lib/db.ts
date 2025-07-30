// This approach is taken from https://github.com/vercel/next.js/tree/canary/examples/with-mongodb
import { MongoClient, ServerApiVersion } from "mongodb"

if (!process.env.MONGODB_URI)
    throw new Error('Invalid/Missing environment variable: "MONGODB_URI"')

const URI = process.env.MONGODB_URI!;
const options = {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
}

let client: MongoClient;

if (process.env.NODE_ENV === "development") {
    // In development mode, use a global variable so that the value
    // is preserved across module reloads caused by HMR (Hot Module Replacement).
    let globalWithMongo = global as typeof globalThis & {
        _mongoClient?: MongoClient
    }

    if (!globalWithMongo._mongoClient) {
        globalWithMongo._mongoClient = new MongoClient(URI, options)
    }
    client = globalWithMongo._mongoClient
} else {
    // In production mode, it's best to not use a global variable.
    client = new MongoClient(URI, options);
}

// db & collections
const DB = client.db("test");
const MOVIE_COLLECTION = DB.collection("movies");
const WATCHLIST_COLLECTION = DB.collection("watchlists");

await WATCHLIST_COLLECTION.createIndex({userId: 1, movieId: 1}, {unique: true});
export {DB, MOVIE_COLLECTION, WATCHLIST_COLLECTION};

// Export a module-scoped MongoClient. By doing this in a
// separate module, the client can be shared across functions.
export default client;