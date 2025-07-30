"use client";

import styles from "./MoviePreview.module.css";
import Image from "next/image";
import {useContext} from "react";
import {MovieContext} from "@/contexts/MovieContext";
import {Movie} from "@/constants/types";

interface MoviePreviewProps {
    movie: Movie;
}

export const MoviePreview = (props: MoviePreviewProps) => {
    const {movie} = props;
    const {openMovieDetails} = useContext(MovieContext);

    return (
        <button
            className={styles.thumbnail}
            onClick={() => openMovieDetails(movie)}>
            {movie.posterPath ? <Image
                className={styles.image}
                src={movie.posterPath}
                alt={movie.title}
                fill={true}/> : movie.title}
        </button>
    );
};