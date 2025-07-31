import styles from "./Button.module.css";
import React from "react";
import clsx from "clsx";
import type {IconDefinition} from "@fortawesome/free-solid-svg-icons";
import {faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    theme?: "primary" | "secondary";
    width?: "fill" | "hug";
    icon?: IconDefinition;
}

export const Button = (props: ButtonProps) => {
    const {
        theme = "primary",
        width = "fill",
        icon,
        children,
        ...rest
    } = props;

    return (
        <button
            {...rest}
            className={clsx(
                styles.button,
                theme === "secondary" && styles.button__theme_secondary,
                width === "hug" && styles.button__width_hug
            )}>
            {icon && <span className={styles.icon}>
                <FontAwesomeIcon
                    icon={icon}
                    size={"lg"}/>
            </span>}
            {children}
        </button>
    );
};