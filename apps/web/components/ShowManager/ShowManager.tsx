import {Show} from "streaming-availability";
import {MovieSection} from "@/components/MovieSection/MovieSection";
import {useEffect, useState} from "react";
import {useUserStore} from "@/state/useUserStore";
import {MoviePreview} from "@/components/MoviePreview/MoviePreview";

interface ShowManagerProps {
    shows: Show[]
}

export const ShowManager = (props: ShowManagerProps) => {
    const {shows} = props;
    const {country, fetchUser, streamingServices: subscriptions} = useUserStore();
    const [freeShows, setFreeShows] = useState<Show[]>([]);
    const [purchasableShows, setPurchasableShows] = useState<Show[]>([]);
    const [otherShows, setOtherShows] = useState<Show[]>([]);

    useEffect(() => {
        fetchUser();
    }, [])

    useEffect(() => {
        const freeShows = shows.filter((show) => {
            const streamingOptions = show.streamingOptions[country];
            return streamingOptions.some((option) => (
                subscriptions.includes(option.service.id)
                && option.type === "subscription"
            ));
        });
        const purchasableShows = shows.filter((show) => {
            if (freeShows.includes(show))
                return false;
            const streamingOptions = show.streamingOptions[country];
            return streamingOptions.some((option) => (
                subscriptions.includes(option.service.id)
                && option.type !== "subscription"
            ));
        });
        setFreeShows(freeShows);
        setPurchasableShows(purchasableShows);
        setOtherShows(shows.filter((show) => (
            !freeShows.includes(show) && !purchasableShows.includes(show)
        )));
    }, [shows, subscriptions]);

    return (
        <>
            {freeShows.length > 0 && <MovieSection title={"Free with your subscriptions"}>
                {freeShows.map((show) => (
                    <MoviePreview
                        key={show.id}
                        movie={show}/>
                ))}
            </MovieSection>}
            {purchasableShows.length > 0 && <MovieSection title={"To buy or rent with your subscriptions"}>
                {purchasableShows.map((show) => (
                    <MoviePreview
                        key={show.id}
                        movie={show}/>
                ))}
            </MovieSection>}
            {otherShows.length > 0 && <MovieSection title={"Available on other services"}>
                {otherShows.map((show) => (
                    <MoviePreview
                        key={show.id}
                        movie={show}/>
                ))}
            </MovieSection>}
        </>
    );
};