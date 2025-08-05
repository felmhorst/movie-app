"use client";

import styles from "./error.module.css";
import {useEffect} from "react";

interface ErrorProps {
    error: Error & {digest?: string};
    reset: () => void;
}

export default function Error(props: ErrorProps) {
    const {error, reset} = props;

    useEffect(() => {
        console.error(error);
    }, [error])

    return (
        <div className={styles.page}>
            <div className={styles.container}>
                <h1>Whoops, something went wrong!</h1>
                <p>
                    An unexpected error occurred. Reload the page or try again later.
                </p>
            </div>
        </div>
    );
}