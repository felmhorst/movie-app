import {create} from "zustand";
import {persist} from "zustand/middleware";
import {Show} from "streaming-availability";

// todo: refetch after n minutes

interface RecommendationsStore {
    recommendations: Show[];
    isRecommendationsFetched: boolean;
    fetchRecommendations: () => void;
}

interface WatchlistStore {
    watchlist: Show[];
    isWatchlistFetched: boolean;
    fetchWatchlist: () => void;
    addToWatchlist: (movie: Show) => void;
    removeFromWatchlist: (movie: Show) => void;
}

interface SearchStore {
    query: string;
    searchResults: Show[];
    searchMovie: (query: string) => void;
}

interface MovieDetailsStore {
    selectedMovie: Show | null;
    isDetailsOpen: boolean;
    openMovieDetails: (show: Show) => void;
    closeMovieDetails: () => void;
}

interface MovieStore extends RecommendationsStore, WatchlistStore, SearchStore, MovieDetailsStore {
    updateMovieStatus: (movieId: string, isOnWatchlist: boolean) => void;
}

export const useMovieStore = create<MovieStore>()(
    persist((set, get) => (
        {
            recommendations: [],
            isRecommendationsFetched: false,

            watchlist: [],
            isWatchlistFetched: false,

            query: "",
            searchResults: [],

            selectedMovie: null,
            isDetailsOpen: false,

            openMovieDetails: (show) => {
                set({selectedMovie: show, isDetailsOpen: true});
            },

            closeMovieDetails: () => {
                set({selectedMovie: null, isDetailsOpen: false});
            },

            async fetchRecommendations() {
                if (get().isRecommendationsFetched)
                    return;
                await fetch("/api/discover", {method: "GET"})
                    .then((res) => res.json())
                    .then((data) => {
                        const {movies} = data;
                        set({
                            recommendations: movies, isRecommendationsFetched: true
                        });
                    });
            },

            async fetchWatchlist() {
                if (get().isRecommendationsFetched)
                    return;
                await fetch("/api/watchlist", {method: "GET"})
                    .then((response) => response.json())
                    .then((data) => {
                        const {movies} = data;
                        set({
                            watchlist: movies, isWatchlistFetched: true
                        });
                    });
            },

            async addToWatchlist(show) {
                await fetch("/api/watchlist", {
                    method: "PUT",
                    body: JSON.stringify({movieId: show._id}),
                    headers: {"Content-Type": "application/json"}
                })
                    .then(() => {
                        set((state) => ({
                            watchlist: [...state.watchlist, movie]
                        }));
                        get().updateMovieStatus(movie._id, true);
                    });
            },

            async removeFromWatchlist(show) {
                await fetch("/api/watchlist", {
                    method: "DELETE",
                    body: JSON.stringify({movieId: show._id}),
                    headers: {"Content-Type": "application/json"}
                })
                    .then(() => {
                        set((state) => ({
                            watchlist: state.watchlist.filter((movieB) => show._id !== movieB._id)
                        }));
                        get().updateMovieStatus(show._id, false);
                    });
            },

            updateMovieStatus(showId, isOnWatchlist) {
                set((state) => ({
                    recommendations: state.recommendations.map((show) =>
                        show._id === showId ? {...show, isOnWatchlist} : show
                    ),
                    watchlist: state.watchlist.map((show) =>
                        show._id === showId ? {...show, isOnWatchlist} : show
                    ),
                    selectedMovie: showId === state.selectedMovie?._id
                        ? {...state.selectedMovie, isOnWatchlist}
                        : state.selectedMovie,
                }));
            },

            async searchMovies(query: string) {
                await fetch("/api/search", {
                    method: "POST",
                    body: JSON.stringify({query}),
                    headers: {"Content-Type": "application/json"}
                })
                    .then((response) => response.json())
                    .then((data) => {
                        const {shows} = data;
                        set({searchResults: shows});
                    });
            },
        }), {
            name: "movie-store",
            partialize: (state) => ({
                recommendations: state.recommendations,
                watchlist: state.watchlist,
                isRecommendationsFetched: state.isRecommendationsFetched,
                isWatchlistFetched: state.isWatchlistFetched,
            })
        }
    )
);