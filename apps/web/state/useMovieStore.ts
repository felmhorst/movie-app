import {create} from "zustand";
import {persist} from "zustand/middleware";
import {Movie} from "@/constants/types";

// todo: refetch after n minutes

interface RecommendationsStore {
    recommendations: Movie[];
    isRecommendationsFetched: boolean;
    fetchRecommendations: () => void;
}

interface WatchlistStore {
    watchlist: Movie[];
    isWatchlistFetched: boolean;
    fetchWatchlist: () => void;
    addToWatchlist: (movie: Movie) => void;
    removeFromWatchlist: (movie: Movie) => void;
}

interface SearchStore {
    query: string;
    searchResults: Movie[];
    searchMovie: (query: string) => void;
}

interface MovieDetailsStore {
    selectedMovie: Movie | null;
    isDetailsOpen: boolean;
    openMovieDetails: (movie: Movie) => void;
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

            openMovieDetails: (movie) => {
                set({selectedMovie: movie, isDetailsOpen: true});
            },

            closeMovieDetails: () => {
                set({selectedMovie: null, isDetailsOpen: false});
            },

            fetchRecommendations() {
                if (get().isRecommendationsFetched)
                    return;
                fetch("/api/discover", {method: "GET"})
                    .then((res) => res.json())
                    .then((data) => {
                        const {movies} = data;
                        set({
                            recommendations: movies, isRecommendationsFetched: true
                        });
                    });
            },

            fetchWatchlist() {
                if (get().isRecommendationsFetched)
                    return;
                fetch("/api/watchlist", {method: "GET"})
                    .then((response) => response.json())
                    .then((data) => {
                        const {movies} = data;
                        set({
                            watchlist: movies, isWatchlistFetched: true
                        });
                    });
            },

            addToWatchlist(movie) {
                fetch("/api/watchlist", {
                    method: "PUT",
                    body: JSON.stringify({movieId: movie._id}),
                    headers: {"Content-Type": "application/json"}
                })
                    .then(() => {
                        set((state) => ({
                            watchlist: [...state.watchlist, movie]
                        }));
                        get().updateMovieStatus(movie._id, true);
                    });
            },

            removeFromWatchlist(movie) {
                fetch("/api/watchlist", {
                    method: "DELETE",
                    body: JSON.stringify({movieId: movie._id}),
                    headers: {"Content-Type": "application/json"}
                })
                    .then(() => {
                        set((state) => ({
                            watchlist: state.watchlist.filter((movieB) => movie._id !== movieB._id)
                        }));
                        get().updateMovieStatus(movie._id, false);
                    });
            },

            updateMovieStatus(movieId, isOnWatchlist) {
                set((state) => ({
                    recommendations: state.recommendations.map((movie) =>
                        movie._id === movieId ? {...movie, isOnWatchlist} : movie
                    ),
                    watchlist: state.watchlist.map((movie) =>
                        movie._id === movieId ? {...movie, isOnWatchlist} : movie
                    ),
                    selectedMovie: movieId === state.selectedMovie?._id
                        ? {...state.selectedMovie, isOnWatchlist}
                        : state.selectedMovie,
                }));
            },

            searchMovies(query: string) {
                console.log("STORE: searchMovies", query)
                fetch("/api/search", {
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