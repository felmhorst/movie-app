import styles from "./Button.module.css";
import React from "react";

export const Button = ({
    children,
    ...rest
}: React.ButtonHTMLAttributes<HTMLButtonElement>) => {

    return (
        <button
            {...rest}
            className={styles.button}>
            {children}
        </button>
    );
};