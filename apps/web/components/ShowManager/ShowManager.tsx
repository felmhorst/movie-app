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
    const [freeShows, setFreeShows] = useState([]);
    const [otherShows, setOtherShows] = useState([]);

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
        setFreeShows(freeShows);
        setOtherShows(shows.filter((show) => !freeShows.includes(show)));
    }, [shows, subscriptions]);

    return (
        <>
            <MovieSection title={"Free for you"}>
                {freeShows.map((show) => (
                    <MoviePreview
                        key={show.id}
                        movie={show}/>
                ))}
            </MovieSection>
            <MovieSection title={"Other Shows"}>
                {otherShows.map((show) => (
                    <MoviePreview
                        key={show.id}
                        movie={show}/>
                ))}
            </MovieSection>
        </>
    );
};