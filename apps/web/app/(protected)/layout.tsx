import {PropsWithChildren} from "react";
import styles from "./layout.module.css";
import {Sidebar} from "@/components/Sidebar/Sidebar";
import {MovieCard} from "@/components/MovieCard/MovieCard";
import {auth} from "@/auth";

export default async function AppLayout(props: PropsWithChildren) {
    const {children} = props;
    const session = await auth();

    if (!session)
        return <h1>not authenticated</h1>
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