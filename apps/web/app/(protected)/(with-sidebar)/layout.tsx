import {PropsWithChildren} from "react";
import styles from "./layout.module.css";
import {Sidebar} from "@/components/Sidebar/Sidebar";
import {MovieCard} from "@/components/MovieCard/MovieCard";
import {Footer} from "@/components/Footer/Footer";

export default function WithSidebarLayout(props: PropsWithChildren) {
    const {children} = props;

    return (
        <div className={styles.page}>
            <Sidebar/>
            <main className={styles.main}>
                <MovieCard/>
                {children}
            </main>
        </div>
    );
}