import {PropsWithChildren} from "react";
import styles from "./MovieSection.module.css";

interface MovieSectionProps extends PropsWithChildren {
    title: string;
}

export const MovieSection = ({
    title,
    children,
 }: MovieSectionProps) => {

    return (
        <section className={styles.section}>
            <h2 className={styles.title}>
                {title}
            </h2>
            <div className={styles.content}>
                {children}
            </div>
        </section>
    )
}