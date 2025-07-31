import type {NextConfig} from "next";

const nextConfig: NextConfig = {
    devIndicators: false,
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "media.themoviedb.org",
                pathname: "/t/p/**"
            }
        ]
    }
};

export default nextConfig;
