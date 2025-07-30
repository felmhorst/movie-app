"use client";

import {MoviePreview} from "@/components/MoviePreview/MoviePreview";
import {MovieSection} from "@/components/MovieSection/MovieSection";
import {useEffect, useState} from "react";

export default function Watchlist() {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        fetch("/api/watchlist")
            .then((res) => res.json())
            .then((data) => {
                const {movies} = data;
                setMovies(movies);
            });
    }, []);


    return (
        <>
            <h1>Watchlist</h1>
            <MovieSection title={"Kostenlos in deinen Abos"}>
                {movies.map((movie, index) => (
                    <MoviePreview
                        key={index}
                        movie={movie}/>
                ))}
            </MovieSection>
        </>
    );
}