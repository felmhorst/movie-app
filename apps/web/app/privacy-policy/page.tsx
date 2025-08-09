import {PageContainer} from "@/components/PageContainer/PageContainer";
import styles from "./page.module.css";

export default function PrivacyPolicy() {
    return (
        <PageContainer>
            <div
                className={styles.container}
                data-nosnippet={true}>
                <h1>Privacy Policy</h1>
                <p><i>Last updated August 09, 2025</i></p>

                <section className={styles.section}>
                    <h2>What information we collect</h2>
                    <p>
                        We collect personal information that you voluntarily provide to us when you register on the
                        services, express an interest in obtaining information about us or our products and services,
                        when you participate in activities on the services, or otherwise when you contact us.
                    </p>
                    <p>
                        <b>Personal Information provided by you.</b> The personal information that we collect depends
                        on the context...
                    </p>
                </section>

                <section className={styles.section}>
                    <h2>How we use your information</h2>
                    <p>...</p>
                </section>

                <section className={styles.section}>
                    <h2>How we keep your information safe</h2>
                    <p>...</p>
                </section>

                <section className={styles.section}>
                    <h2>Protection of personal information</h2>
                    <p>...</p>
                </section>
            </div>
        </PageContainer>
    )
}