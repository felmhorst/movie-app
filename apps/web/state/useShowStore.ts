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
    addToWatchlist: (show: Show) => void;
    removeFromWatchlist: (show: Show) => void;
}

interface SearchStore {
    query: string;
    searchResults: Show[];
    searchShows: (query: string) => void;
}

interface ShowDetailsStore {
    selectedShow: Show | null;
    isDetailsOpen: boolean;
    openShowDetails: (show: Show) => void;
    closeShowDetails: () => void;
}

interface ShowStore extends RecommendationsStore, WatchlistStore, SearchStore, ShowDetailsStore {
    updateShowStatus: (showId: string, isOnWatchlist: boolean) => void;
}

export const useShowStore = create<ShowStore>()(
    persist((set, get) => (
        {
            recommendations: [],
            isRecommendationsFetched: false,

            watchlist: [],
            isWatchlistFetched: false,

            query: "",
            searchResults: [],

            selectedShow: null,
            isDetailsOpen: false,

            openShowDetails: (show) => {
                set({selectedMovie: show, isDetailsOpen: true});
            },

            closeShowDetails: () => {
                set({selectedMovie: null, isDetailsOpen: false});
            },

            async fetchRecommendations() {
                if (get().isRecommendationsFetched)
                    return;
                await fetch("/api/discover", {method: "GET"})
                    .then((res) => res.json())
                    .then((data) => {
                        const {shows} = data;
                        set({
                            recommendations: shows, isRecommendationsFetched: true
                        });
                    });
            },

            async fetchWatchlist() {
                if (get().isRecommendationsFetched)
                    return;
                await fetch("/api/watchlist", {method: "GET"})
                    .then((response) => response.json())
                    .then((data) => {
                        const {shows} = data;
                        set({
                            watchlist: shows, isWatchlistFetched: true
                        });
                    });
            },

            async addToWatchlist(show) {
                await fetch("/api/watchlist", {
                    method: "PUT",
                    body: JSON.stringify({showId: show.id}),
                    headers: {"Content-Type": "application/json"}
                })
                    .then(() => {
                        set((state) => ({
                            watchlist: [...state.watchlist, show]
                        }));
                        get().updateShowStatus(show.id, true);
                    });
            },

            async removeFromWatchlist(show) {
                await fetch("/api/watchlist", {
                    method: "DELETE",
                    body: JSON.stringify({showId: show.id}),
                    headers: {"Content-Type": "application/json"}
                })
                    .then(() => {
                        set((state) => ({
                            watchlist: state.watchlist.filter((otherShow) => show.id !== otherShow.id)
                        }));
                        get().updateShowStatus(show.id, false);
                    });
            },

            updateShowStatus(showId, isOnWatchlist) {
                set((state) => ({
                    recommendations: state.recommendations.map((show) =>
                        show.id === showId ? {...show, isOnWatchlist} : show
                    ),
                    watchlist: state.watchlist.map((show) =>
                        show.id === showId ? {...show, isOnWatchlist} : show
                    ),
                    selectedMovie: showId === state.selectedMovie?.id
                        ? {...state.selectedMovie, isOnWatchlist}
                        : state.selectedMovie,
                }));
            },

            async searchShows(query: string) {
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
            name: "show-store",
            partialize: (state) => ({
                recommendations: state.recommendations,
                watchlist: state.watchlist,
                isRecommendationsFetched: state.isRecommendationsFetched,
                isWatchlistFetched: state.isWatchlistFetched,
            })
        }
    )
);