import {PageContainer} from "@/components/PageContainer/PageContainer";
import styles from "./page.module.css";

export default function Imprint() {
    return (
        <PageContainer>
            <section
                className={styles.container}
                data-nosnippet={true}>
                <h1>Imprint</h1>
                <p>Angaben gemäß §5 TMG:</p>
                <p>
                    <b>Kontakt</b><br/>
                    <span>Florian Elmhorst</span>
                </p>
                <p>
                    <b>Email</b><br/>
                    <a href={"mailto:florian.elmhorst@gmail.com"}>florian.elmhorst@gmail.com</a>
                </p>
            </section>
        </PageContainer>
    )
}