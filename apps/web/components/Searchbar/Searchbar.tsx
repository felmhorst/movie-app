"use client";

import {faTimesCircle, faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import styles from "./Searchbar.module.css";
import {ChangeEvent, useCallback, useMemo, useState} from "react";
import {useShowStore} from "@/state/useShowStore";
import debounce from "lodash.debounce";
import {Button} from "@/components/Button/Button";

export const Searchbar = () => {
    const {query, searchShows} = useShowStore();
    const [input, setInput] = useState<string>(query);

    const debounceSearchShows = useCallback(debounce((query: string) => searchShows(query), 200), [searchShows]);

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        const query = e.target.value;
        setInput(query);
    }

    return (
        <div className={styles.group}>
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
            <Button
                width={"hug"}
                onClick={() => debounceSearchShows(input)}>
                Search
            </Button>
        </div>
    );
}