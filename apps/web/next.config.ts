import type {NextConfig} from "next";

const nextConfig: NextConfig = {
    devIndicators: false,
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "cdn.movieofthenight.com",
                pathname: "/show/**"
            }
        ]
    }
};

// https://cdn.movieofthenight.com/show/2756/poster/vertical/en/240.jpg?Expires=1769135487&Signature=IvepRAk2X5sQ0blV5-zMBQs65qnWQ2M76hQ2B-ny9W6RzbyE3NqYWqgJdIQZy7ZyL~HhQXWlP9WwAHY-Oiw1Ivds3FuIIkPtKjdymwc5mMKiZFbeljkZBs5zjtsaMNfbg~qzWPGQ3ubDCNj9TJAkUyZFrxWTumB~hX8xD~UaulapGEtJzyYR4NxQb3TCY184qSW4jZT6Hqj9iexRUzj8nQN6m5GPjfO3Zgrhi38K~vzFdBmAbpzKXlrDaanx0qqP35-h5W~H0wJfIHWw8NEZF6jHGeCzOwm6Do2u8QIw5ygx1Sy43WTEVsNjfAvI~Heb6m5PIF2J4m53cRoJYi~A3w__&Key-Pair-Id=KK4HN3OO4AT5R

export default nextConfig;
