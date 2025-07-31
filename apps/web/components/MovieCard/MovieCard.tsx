"use client";

import styles from "./MovieCard.module.css";
import {Button} from "@/components/Button/Button";
import Image from "next/image";
import {WatchlistButton} from "@/components/WatchlistButton/WatchlistButton";
import {faTimes} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useMovieStore} from "@/state/useMovieStore";

export const MovieCard = () => {
    const {selectedMovie, isDetailsOpen, closeMovieDetails, addToWatchlist, removeFromWatchlist} = useMovieStore();

    function handleWatchlist() {
        if (selectedMovie.isOnWatchlist)
            removeFromWatchlist(selectedMovie);
        else
            addToWatchlist(selectedMovie);
    }

    if (!selectedMovie || !isDetailsOpen)
        return null;
    return (
        <section className={styles.container}>
            <div className={styles.card}>
                <div className={styles.imageContainer}>
                    {selectedMovie.posterPath ? <Image
                        className={styles.image}
                        src={selectedMovie.posterPath}
                        alt={""}
                        fill={true}/> : selectedMovie.title}
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
                    <h1>{selectedMovie.title}</h1>
                    <p>{selectedMovie.summary}</p>
                    <Button>Ansehen</Button>
                    <WatchlistButton
                        isActive={selectedMovie.isOnWatchlist}
                        onClick={handleWatchlist}/>
                </div>
            </div>
        </section>
    )
};