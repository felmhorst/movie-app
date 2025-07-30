export interface Movie {
    _id: string;
    title: string;
    summary: string;
    posterPath: string;
    isOnWatchlist?: boolean;
}