import {PropsWithChildren} from "react";
import styles from "./layout.module.css";
import {Sidebar} from "@/components/Sidebar/Sidebar";

export default function AppLayout({
    children
}: PropsWithChildren) {
    return (
        <div className={styles.page}>
            <Sidebar/>
            <main className={styles.main}>
                {children}
            </main>
        </div>
    );
}