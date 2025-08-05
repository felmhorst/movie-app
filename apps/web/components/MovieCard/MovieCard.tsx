"use client";

import styles from "./MovieCard.module.css";
import {Button} from "@/components/Button/Button";
import Image from "next/image";
import {WatchlistButton} from "@/components/WatchlistButton/WatchlistButton";
import {faPlay, faTimes} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useShowStore} from "@/state/useShowStore";
import {useUserStore} from "@/state/useUserStore";
import {getPreferredStreamingOption} from "@/lib/getPreferredStreamingOption";
import Link from "next/link";

export const MovieCard = () => {
    const {country, streamingServices: subscriptions} = useUserStore();
    const {selectedShow, isDetailsOpen, closeShowDetails, addToWatchlist, removeFromWatchlist} = useShowStore();

    function handleWatchlist() {
        if (selectedShow.isOnWatchlist)
            removeFromWatchlist(selectedShow);
        else
            addToWatchlist(selectedShow);
    }

    const preferredStreamingOption = getPreferredStreamingOption(
        selectedShow?.streamingOptions?.[country] ?? [],
        subscriptions
    );
    console.log(preferredStreamingOption);

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

                    {preferredStreamingOption && <Button
                        elementType={"link"}
                        href={preferredStreamingOption.link}
                        icon={faPlay}>
                        {preferredStreamingOption.type === "rent"
                            ? "Rent"
                            : preferredStreamingOption.type === "buy"
                                ? "Buy"
                                : "Watch"} on {preferredStreamingOption.service.name}
                    </Button>}

                    <WatchlistButton
                        isActive={selectedShow.isOnWatchlist}
                        onClick={handleWatchlist}/>
                </div>
            </div>
        </section>
    )
};