"use client";

import styles from "./MoviePreview.module.css";
import Image from "next/image";
import {Movie} from "@/constants/types";
import {useMovieStore} from "@/state/useMovieStore";

interface MoviePreviewProps {
    movie: Movie;
}

export const MoviePreview = (props: MoviePreviewProps) => {
    const {movie} = props;
    const {openMovieDetails} = useMovieStore();

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