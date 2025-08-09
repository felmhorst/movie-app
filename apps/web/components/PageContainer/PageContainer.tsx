import {Footer} from "@/components/Footer/Footer";
import {PropsWithChildren} from "react";
import styles from "./PageContainer.module.css";

export const PageContainer = (props: PropsWithChildren) => {
    const {children} = props;

    return (
        <div className={styles.page}>
            <main className={styles.main}>
                {children}
            </main>
            <Footer/>
        </div>
    )
};