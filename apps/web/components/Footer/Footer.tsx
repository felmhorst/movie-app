import styles from "./Footer.module.css";
import Link from "next/link";

export const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.group}>
                <Link
                    className={styles.logo}
                    href={"/"}>
                    movie-app
                </Link>
                <span>Version 1.0.0</span>
            </div>
            <div className={styles.group}>
                <Link href={"/imprint"}>Impressum</Link>
                <Link href={"/privacy"}>Datenschutz</Link>
            </div>
        </footer>
    );
};