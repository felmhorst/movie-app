"use client";

import {useEffect} from "react";
import {MoviePreview} from "@/components/MoviePreview/MoviePreview";
import {MovieSection} from "@/components/MovieSection/MovieSection";
import {useMovieStore} from "@/state/useMovieStore";

export default function Discover() {
    const {recommendations, fetchRecommendations} = useMovieStore();

    useEffect(() => {
        fetchRecommendations();
    }, []);

    return (
        <>
            <h1>Discover</h1>
            <MovieSection title={"Recommended"}>
                {recommendations.map((movie, index) => (
                    <MoviePreview
                        key={index}
                        movie={movie}/>
                ))}
            </MovieSection>
        </>
    );
}