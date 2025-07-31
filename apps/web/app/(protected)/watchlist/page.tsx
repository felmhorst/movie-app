"use client";

import {MoviePreview} from "@/components/MoviePreview/MoviePreview";
import {MovieSection} from "@/components/MovieSection/MovieSection";
import {useEffect} from "react";
import {useMovieStore} from "@/state/useMovieStore";

export default function Watchlist() {
    const {watchlist, fetchWatchlist} = useMovieStore();

    useEffect(() => {
        fetchWatchlist();
    }, []);


    return (
        <>
            <h1>Watchlist</h1>
            <MovieSection title={"Kostenlos in deinen Abos"}>
                {watchlist.map((movie, index) => (
                    <MoviePreview
                        key={index}
                        movie={movie}/>
                ))}
            </MovieSection>
        </>
    );
}