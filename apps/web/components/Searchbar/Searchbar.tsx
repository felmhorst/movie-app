"use client";

import {faTimesCircle, faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import styles from "./Searchbar.module.css";
import {ChangeEvent, useCallback, useMemo, useState} from "react";
import {useShowStore} from "@/state/useShowStore";
import debounce from "lodash.debounce";

export const Searchbar = () => {
    const {query, searchShows} = useShowStore();
    const [input, setInput] = useState<string>(query);

    const debounceSearchShows = useCallback(debounce((query: string) => searchShows(query), 1000), [searchShows]);

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        const query = e.target.value;
        setInput(query);
        debounceSearchShows(query);
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