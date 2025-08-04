"use client";

import styles from "./MovieCard.module.css";
import {Button} from "@/components/Button/Button";
import Image from "next/image";
import {WatchlistButton} from "@/components/WatchlistButton/WatchlistButton";
import {faTimes} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useShowStore} from "@/state/useShowStore";

export const MovieCard = () => {
    const {selectedShow, isDetailsOpen, closeShowDetails, addToWatchlist, removeFromWatchlist} = useShowStore();

    function handleWatchlist() {
        if (selectedShow.isOnWatchlist)
            removeFromWatchlist(selectedShow);
        else
            addToWatchlist(selectedShow);
    }

    if (!selectedShow || !isDetailsOpen)
        return null;
    return (
        <section className={styles.container}>
            <div className={styles.card}>
                <div className={styles.imageContainer}>
                    {selectedShow.imageSet?.verticalPoster?.w360 ? <Image
                        className={styles.image}
                        src={selectedShow.imageSet?.verticalPoster?.w360}
                        alt={""}
                        fill={true}/> : selectedShow.title}
                </div>
                <div className={styles.detailsContainer}>
                    <button
                        className={styles.closeButton}
                        aria-label={"close"}
                        onClick={closeShowDetails}>
                        <FontAwesomeIcon
                            icon={faTimes}
                            size={"lg"}/>
                    </button>
                    <h1>{selectedShow.title}</h1>
                    <p>{selectedShow.overview}</p>
                    <Button>Ansehen</Button>
                    <WatchlistButton
                        isActive={selectedShow.isOnWatchlist}
                        onClick={handleWatchlist}/>
                </div>
            </div>
        </section>
    )
};