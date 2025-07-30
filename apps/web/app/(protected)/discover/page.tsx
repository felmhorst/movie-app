"use client";

import {useEffect} from "react";
import {MoviePreview} from "@/components/MoviePreview/MoviePreview";
import {MovieSection} from "@/components/MovieSection/MovieSection";
import {useMovieStore} from "@/state/useMovieStore";

export default function Discover() {
    const movies = useMovieStore((state) => state.movies);
    const setMovies = useMovieStore((state) => state.setMovies);

    useEffect(() => {
        if (movies.length > 0)
            return;
        fetch("/api/discover", {method: "GET"})
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                const {movies} = data;
                setMovies(movies);
            });
    }, [movies]);

    return (
        <>
            <h1>Discover</h1>
            <MovieSection title={"Recommended"}>
                {movies.map((movie, index) => (
                    <MoviePreview
                        key={index}
                        movie={movie}/>
                ))}
            </MovieSection>
        </>
    );
}