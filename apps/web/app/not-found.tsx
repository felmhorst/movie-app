import styles from "./not-found.module.css";

export default function NotFound() {
    return (
        <div className={styles.page}>
            <div className={styles.container}>
                <h1>Page not found</h1>
                <p>
                    The page you are looking for could not be found. Try going back to the previous page or click one of
                    the links on the left.
                </p>
            </div>
        </div>
    )
}