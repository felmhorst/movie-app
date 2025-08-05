"use client";

import {Card} from "@/components/Card/Card";
import {Form} from "@/components/Form/Form";
import {useRouter} from "next/navigation";
import {Button} from "@/components/Button/Button";
import {CountrySelect} from "@/components/CountrySelect/CountrySelect";

export default function OnboardingCountry() {
    const router = useRouter();

    function submitCountry() {
        router.push("/onboarding/subscriptions");
    }

    return (
        <>
            <Card>
                <h1>Which country are you currently in?</h1>
                <p>
                    We use this information to show you streaming-offers specific to your country.
                </p>
                <Form
                    name={"select-country"}
                    autoCapitalize={"none"}
                    autoComplete={"off"}
                    onSubmit={submitCountry}>
                    <CountrySelect/>
                    <Button
                        elementType={"input"}
                        type={"submit"}
                        value={"Continue"}/>
                </Form>
            </Card>
        </>
    );
}