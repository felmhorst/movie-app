"use client";

import {useEffect} from "react";
import {MoviePreview} from "@/components/MoviePreview/MoviePreview";
import {MovieSection} from "@/components/MovieSection/MovieSection";
import {useShowStore} from "@/state/useShowStore";
import {Searchbar} from "@/components/Searchbar/Searchbar";
import {ShowManager} from "@/components/ShowManager/ShowManager";

export default function Discover() {
    const {recommendations, searchResults, fetchRecommendations} = useShowStore();

    useEffect(() => {
        fetchRecommendations();
    }, []);

    return (
        <>
            <Searchbar/>
            {searchResults.length > 0
                ? (
                    <MovieSection title={"Search Results"}>
                        {searchResults.map((show) => (
                            <MoviePreview
                                key={show.id}
                                movie={show}/>
                        ))}
                    </MovieSection>
                ) : (
                    <ShowManager shows={recommendations}/>
                )}
        </>
    );
}