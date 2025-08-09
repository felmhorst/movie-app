import {PropsWithChildren} from "react";
import styles from "./EmptyPageContainer.module.css";

export const EmptyPageContainer = (props: PropsWithChildren) => {
    const {children} = props;

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                {children}
            </div>
        </div>
    );
};