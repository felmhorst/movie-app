"use client";

import {faTimesCircle, faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import styles from "./Searchbar.module.css";
import {ChangeEvent, useCallback, useMemo, useState} from "react";
import {useMovieStore} from "@/state/useMovieStore";
import debounce from "lodash.debounce";

export const Searchbar = () => {
    const {query, searchMovies} = useMovieStore();
    const [input, setInput] = useState<string>(query);

    const debounceSearchMovies = useCallback(
        debounce((query: string) => searchMovies(query), 1000)
    , [searchMovies]);

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        const query = e.target.value;
        console.log("handleChange")
        setInput(query);
        debounceSearchMovies(query);
    }

    return (
        <div className={styles.container}>
            <span className={styles.icon}>
                <FontAwesomeIcon
                    icon={faMagnifyingGlass}
                    size={"lg"}/>
            </span>
            <input
                className={styles.input}
                placeholder={"Search..."}
                value={input}
                onChange={handleChange}/>
            <button
                className={styles.clear_button}
                aria-label={"clear input"}>
                <FontAwesomeIcon
                    icon={faTimesCircle}
                    size={"lg"}/>
            </button>
        </div>
    );
}