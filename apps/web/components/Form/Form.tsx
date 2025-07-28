import React from "react";
import styles from "./Form.module.css";

export const Form = (props: React.FormHTMLAttributes<HTMLFormElement>) => {
    const {
        children,
        ...rest
    } = props;

    return (
        <form
            {...rest}
            className={styles.form}>
            {children}
        </form>
    );
};