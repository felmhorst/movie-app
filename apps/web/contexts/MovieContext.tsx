"use client";

import {createContext, PropsWithChildren, useCallback, useState} from "react";
import {Movie} from "@/constants/types";

interface MovieContextProps {
    movie: Movie | null;
    isOpen: boolean;
    openMovieDetails: (movie: Movie) => void;
    closeMovieDetails: () => void;
}

export const MovieContext = createContext<MovieContextProps>({
    movie: null,
    isOpen: false,
    openMovieDetails: (movie: Movie) => {},
    closeMovieDetails: () => {},
});

export const MovieContextProvider = (props: PropsWithChildren) => {
    const {children} = props;
    const [movie, setMovie] = useState<Movie|null>(null);
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const openMovieDetails = useCallback((movie: Movie) => {
        setMovie(movie);
        setIsOpen(true);
    }, []);

    const closeMovieDetails = useCallback(() => {
        setIsOpen(false);
    }, []);

    return (
        <MovieContext.Provider value={{
            movie,
            isOpen,
            openMovieDetails,
            closeMovieDetails
        }}>
            {children}
        </MovieContext.Provider>
    );
};