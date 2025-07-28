import styles from "./InputField.module.css";
import React from "react";

export const InputField = (props: React.InputHTMLAttributes<HTMLInputElement>) => {
    return (
        <input
            {...props}
            className={styles.input}/>
    );
};