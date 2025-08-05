import styles from "./Button.module.css";
import React from "react";
import clsx from "clsx";
import type {IconDefinition} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Image from "next/image";
import type {LinkProps} from "next/link";
import Link from "next/link";

interface BaseProps {
    theme?: "primary" | "secondary";
    width?: "fill" | "hug";
    icon?: IconDefinition;
    customIconUrl?: string;
}

interface DefaultButtonProps extends BaseProps, React.ButtonHTMLAttributes<HTMLButtonElement> {
    elementType?: "button";
}

interface LinkButtonProps extends BaseProps, LinkProps {
    elementType?: "link";
}

interface InputButtonProps extends BaseProps, React.InputHTMLAttributes<HTMLInputElement> {
    elementType?: "input";
}

type ButtonProps = DefaultButtonProps | LinkButtonProps | InputButtonProps;

export const Button = (props: ButtonProps) => {
    const {
        theme = "primary",
        elementType = "button",
        width = "fill",
        icon,
        customIconUrl,
        children,
        ...rest
    } = props;

    const Wrapper = ({children, ...rest}) => {
        if (elementType === "link")
            return <Link {...rest}>{children}</Link>;
        if (elementType === "input")
            return <input {...rest}/>;
        return <button {...rest}>{children}</button>;
    }

    return (
        <Wrapper
            {...rest}
            className={clsx(
                styles.button,
                theme === "secondary" && styles.button__theme_secondary,
                width === "hug" && styles.button__width_hug
            )}>
            {(icon || customIconUrl) && <span className={styles.icon}>
                {icon && <FontAwesomeIcon
                    icon={icon}
                    size={"lg"}/>}
                {customIconUrl && <Image
                    src={customIconUrl}
                    alt={""}
                    width={24}
                    height={24}/>}
            </span>}
            {children}
        </Wrapper>
    );
};