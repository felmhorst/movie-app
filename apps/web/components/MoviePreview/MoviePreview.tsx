"use client";

import styles from "./MoviePreview.module.css";
import Image from "next/image";
import {useShowStore} from "@/state/useShowStore";
import type {Show} from "streaming-availability";

interface MoviePreviewProps {
    movie: Show;
}

export const MoviePreview = (props: MoviePreviewProps) => {
    const {movie} = props;
    const {openShowDetails} = useShowStore();

    return (
        <button
            className={styles.thumbnail}
            onClick={() => openShowDetails(movie)}>
            {movie.imageSet?.verticalPoster?.w360 ? <Image
                className={styles.image}
                src={movie.imageSet?.verticalPoster?.w360}
                alt={movie.title}
                fill={true}/> : movie.title}
        </button>
    );
};