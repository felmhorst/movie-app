"use client";

import {useEffect} from "react";
import {MoviePreview} from "@/components/MoviePreview/MoviePreview";
import {MovieSection} from "@/components/MovieSection/MovieSection";
import {useMovieStore} from "@/state/useMovieStore";
import {Searchbar} from "@/components/Searchbar/Searchbar";

export default function Discover() {
    const {recommendations, searchResults, fetchRecommendations} = useMovieStore();

    useEffect(() => {
        fetchRecommendations();
    }, []);

    console.log(searchResults);

    return (
        <>
            <Searchbar/>
            {searchResults.length > 0
                ? (
                    <MovieSection title={"Search Results"}>
                        {searchResults.map((movie, index) => (
                            <MoviePreview
                                key={index}
                                movie={movie}/>
                        ))}
                    </MovieSection>
                ) : (
                    <MovieSection title={"Recommended"}>
                        {recommendations.map((movie, index) => (
                            <MoviePreview
                                key={index}
                                movie={movie}/>
                        ))}
                    </MovieSection>
                )}
        </>
    );
}