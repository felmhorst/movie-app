"use client";

import {useEffect, useState} from "react";
import {api} from "../../../utility/api";
import {MovieThumbnail} from "../../../components/MovieThumbnail/MovieThumbnail";
import {MovieSection} from "../../../components/MovieSection/MovieSection";
import moment from "moment";

export default function History() {
    const [moviesByMonth, setMoviesByMonth] = useState([]);

    useEffect(() => {
        api.get("/history")
            .then((e) => {
                const movies = e.data;
                const moviesSortedByWatchDate = movies.sort((a, b) => a.watchDate - b.watchDate);

                const startDate = moment(moviesSortedByWatchDate[0].watchDate).startOf("month");
                const endDate = moment(moviesSortedByWatchDate[moviesSortedByWatchDate.length - 1].watchDate).startOf("month");

                let startOfCurrentMonth = startDate;
                let moviesByMonth = [];
                while (startOfCurrentMonth <= endDate) {
                    const startOfNextMonth = startOfCurrentMonth.clone().add(1, "month");
                    const moviesInMonth = movies.filter((movie) => startOfCurrentMonth <= movie.watchDate &&  movie.watchDate < startOfNextMonth);
                    const title =  startOfCurrentMonth.format("MMMM YYYY");
                    if (moviesInMonth.length > 0)
                        moviesByMonth.push({
                            title,
                            movies: moviesInMonth,
                        });
                    startOfCurrentMonth = startOfNextMonth;
                }
                setMoviesByMonth(moviesByMonth.reverse());
            });
    }, []);

    return (
        <>
            <h1>History</h1>
            {moviesByMonth.map((section, i) => (
                <MovieSection
                    key={i}
                    title={section.title}>
                    {section.movies.map((movie, j) => (
                        <MovieThumbnail
                            key={j}
                            poster_path={movie.posterPath}
                            title={movie.title}/>
                    ))}
                </MovieSection>
            ))}
        </>
    );
}