"use client";

import styles from "./MovieCard.module.css";
import {Button} from "@/components/Button/Button";
import Image from "next/image";
import {WatchlistButton} from "@/components/WatchlistButton/WatchlistButton";
import {faTimes} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useContext} from "react";
import {MovieContext} from "@/contexts/MovieContext";

export const MovieCard = () => {
    const {
        movie,
        isOpen,
        closeMovieDetails
    } = useContext(MovieContext);

    if (!movie || !isOpen)
        return null;
    return (
        <section className={styles.container}>
            <div className={styles.card}>
                <div className={styles.imageContainer}>
                    <Image
                        className={styles.image}
                        src={movie.posterPath}
                        alt={""}
                        fill={true}/>
                </div>
                <div className={styles.detailsContainer}>
                    <button
                        className={styles.closeButton}
                        aria-label={"close"}
                        onClick={closeMovieDetails}>
                        <FontAwesomeIcon
                            icon={faTimes}
                            size={"lg"}/>
                    </button>
                    <h1>{movie.title}</h1>
                    <p>{movie.overview}</p>
                    <Button>Ansehen</Button>
                    <WatchlistButton isActive={false}/>
                </div>
            </div>
        </section>
    )
};