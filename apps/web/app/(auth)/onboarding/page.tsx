"use client";

import {Card} from "@/components/Card/Card";
import {InputButton} from "@/components/Button/InputButton";
import {Form} from "@/components/Form/Form";
import {StreamingServiceSelection} from "@/components/StreamingServiceSelection/StreamingServiceSelection";
import {useRouter} from "next/navigation";

export default function Onboarding() {
    const router = useRouter();

    function submitStreamingServices() {
        router.push("/discover");
    }

    return (
        <>
            <Card>
                <h1>Which Streaming Providers do you have?</h1>
                <p>
                    Select the streaming providers where you have an account to get personalized movie recommendations.
                    You can change your selection at any time in your settings.
                </p>
                <Form
                    name={"select-streaming-providers"}
                    autoCapitalize={"none"}
                    onSubmit={submitStreamingServices}>
                    <StreamingServiceSelection/>
                    <InputButton
                        type={"submit"}
                        value={"Continue"}/>
                </Form>
            </Card>
        </>
    );
}