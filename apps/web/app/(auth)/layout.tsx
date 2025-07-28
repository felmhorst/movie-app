import {PropsWithChildren} from "react";
import styles from "./layout.module.css";
import {Sidebar} from "@/components/Sidebar/Sidebar";
import {MovieContextProvider} from "@/contexts/MovieContext";
import {MovieCard} from "@/components/MovieCard/MovieCard";

export default function AppLayout({
    children
}: PropsWithChildren) {
    return (
        <MovieContextProvider>
            <div className={styles.page}>
                <Sidebar/>
                <main className={styles.main}>
                    <MovieCard/>
                    {children}
                </main>
            </div>
        </MovieContextProvider>
    );
}