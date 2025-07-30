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

    function addToWatchlist() {
        fetch("/api/watchlist", {
            method: "PUT",
            body: JSON.stringify({movieId: movie._id})
        })
            .then((response) => response.json())
            .then((data) => console.log(data));
    }

    function removeFromWatchlist() {
        fetch("/api/watchlist", {
            method: "DELETE",
            body: JSON.stringify({movieId: movie._id})
        })
            .then((response) => response.json())
            .then((data) => console.log(data));
    }

    function handleWatchlist() {
        if (movie.isOnWatchlist)
            removeFromWatchlist();
        else
            addToWatchlist();
    }

    if (!movie || !isOpen)
        return null;
    return (
        <section className={styles.container}>
            <div className={styles.card}>
                <div className={styles.imageContainer}>
                    {movie.posterPath ? <Image
                        className={styles.image}
                        src={movie.posterPath}
                        alt={""}
                        fill={true}/> : movie.title}
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
                    <p>{movie.summary}</p>
                    <Button>Ansehen</Button>
                    <WatchlistButton
                        isActive={movie.isOnWatchlist}
                        onClick={handleWatchlist}/>
                </div>
            </div>
        </section>
    )
};