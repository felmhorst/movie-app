import {LoadingSpinner} from "@/components/LoadingSpinner/LoadingSpinner";
import styles from "./LoadingIndicator.module.css";

export const LoadingIndicator = () => {
    return (
        <div className={styles.container}>
            <LoadingSpinner/>
            <h2 className={styles.text}>Loading...</h2>
        </div>
    );
};