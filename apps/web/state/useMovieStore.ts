import {create} from "zustand";
import {persist} from "zustand/middleware";

// export const useMovieStore = create((set) => ({
//     movies: [],
//     watchlist: [],
//     setMovies: (newMovies) => set({movies: newMovies}),
//     // todo: watchlist, history, updateMovie (watchlisted, watched)
// }));

export const useMovieStore = create()(
    persist(
(set, get) => ({
                recommendations: [],
                watchlist: [],
                fetchedRecommendations: false,
                fetchedWatchlist: false,

                fetchRecommendations: async () => {
                    if (get().fetchedRecommendations)
                        return;
                        fetch("/api/discover", {method: "GET"})
                            .then((res) => res.json())
                            .then((data) => {
                                    // console.log(data);
                                    // const {movies} = data;
                                    // setMovies(movies);
                            });
                },
                fetchWatchlist() {

                },
                addToWatchlist() {

                },
                removeFromWatchlist() {

                },
                updateMovieStatus(movieId, isOnWatchlist) {

                }
        })
    )
);