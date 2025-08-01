import {PropsWithChildren} from "react";
import styles from "./layout.module.css";

export default async function AuthLayout(props: PropsWithChildren) {
    const {children} = props;

    return (
        <div className={styles.page}>
            {children}
        </div>
    );
}