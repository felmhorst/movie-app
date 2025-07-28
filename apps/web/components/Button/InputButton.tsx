import React from "react";
import styles from "./Button.module.css";

export const InputButton = ({
   children,
   ...rest
}: React.InputHTMLAttributes<HTMLInputElement>) => {

    return (
        <input
            {...rest}
            className={styles.button}/>
    );
};