import styles from "./FlexLayout.module.css";
import {PropsWithChildren} from "react";
import clsx from "clsx";

interface FlexLayoutProps extends PropsWithChildren {
    direction?: "row" | "column";
    justify?: "start" | "end" | "center";
    align?: "start" | "end" | "center";
}

export const FlexLayout = (props: FlexLayoutProps) => {
    const {
        direction = "row",
        justify = "center",
        align = "center",
        children
    } = props;

    return (
        <div className={clsx(
            styles.flex,
            direction === "row" && styles.__direction_row,
            direction === "column" && styles.__direction_column,
            justify === "start" && styles.__justify_start,
            justify === "end" && styles.__justify_end,
            justify === "center" && styles.__justify_center,
            align === "start" && styles.__align_start,
            align === "end" && styles.__align_end,
            align === "center" && styles.__align_center,
        )}>
            {children}
        </div>
    );
};