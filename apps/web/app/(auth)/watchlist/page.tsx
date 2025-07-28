"use client";

import {MoviePreview} from "@/components/MoviePreview/MoviePreview";
import {MovieSection} from "@/components/MovieSection/MovieSection";
import {useEffect, useState} from "react";
import {api} from "@/utility/api";

export default function Watchlist() {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        api.get("/watchlist")
            .then((e) => {
                setMovies(e.data);
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