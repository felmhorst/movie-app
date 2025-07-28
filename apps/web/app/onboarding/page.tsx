"use client";

import {Card} from "@/components/Card/Card";
import styles from "./page.module.css";
import {InputButton} from "@/components/Button/InputButton";
import {Form} from "@/components/Form/Form";
import {StreamingProviderSelection} from "@/components/StreamingProviderSelection/StreamingProviderSelection";
import {useRouter} from "next/navigation";

export default function Onboarding() {
    const router = useRouter();

    function submitStreamingProviders() {
        router.push("/discover");
    }

    return (
        <div className={styles.page}>
            <Card>
                <h1>Which Streaming Providers do you have?</h1>
                <p>
                    Select the streaming providers where you have an account to get personalized movie recommendations.
                    You can change your selection at any time in your settings.
                </p>
                <Form
                    name={"select-streaming-providers"}
                    autoCapitalize={"none"}
                    onSubmit={submitStreamingProviders}>
                    <StreamingProviderSelection/>
                    <InputButton
                        type={"submit"}
                        value={"Continue"}/>
                </Form>
            </Card>
        </div>
    );
}