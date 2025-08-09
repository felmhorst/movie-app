import styles from "./Footer.module.css";
import Link from "next/link";

export const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.group}>
                <Link
                    className={styles.logo}
                    href={"/"}>
                    movie-shelf
                </Link>
            </div>
            <div className={styles.group}>
                <Link
                    className={styles.link}
                    href={"/imprint"}>
                    Imprint
                </Link>
                <Link
                    className={styles.link}
                    href={"/privacy-policy"}>
                    Privacy Policy
                </Link>
            </div>
        </footer>
    );
};