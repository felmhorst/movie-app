"use client";

import {MovieThumbnail} from "../../../components/MovieThumbnail/MovieThumbnail";
import {MovieSection} from "../../../components/MovieSection/MovieSection";
import {useEffect, useState} from "react";
import {api} from "../../../utility/api";

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
                    <MovieThumbnail
                        key={index}
                        title={movie.title}
                        poster_path={movie.posterPath}/>
                ))}
            </MovieSection>
        </>
    );
}