"use client";

import styles from "./MoviePreview.module.css";
import Image from "next/image";
import {useMovieStore} from "@/state/useMovieStore";
import type {Show} from "streaming-availability";
import type {Movie} from "@/constants/types";

interface MoviePreviewProps {
    movie: Show;
}

export const MoviePreview = (props: MoviePreviewProps) => {
    const {movie} = props;
    const {openMovieDetails} = useMovieStore();

    // movie.imageSet?.verticalPoster?.w240

    return (
        <button
            className={styles.thumbnail}
            onClick={() => openMovieDetails(movie)}>
            {movie.imageSet?.verticalPoster?.w360 ? <Image
                className={styles.image}
                src={movie.imageSet?.verticalPoster?.w360}
                alt={movie.title}
                fill={true}/> : movie.title}
        </button>
    );
};