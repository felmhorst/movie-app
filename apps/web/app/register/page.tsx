"use client";

import {Card} from "@/components/Card/Card";
import {InputField} from "@/components/InputField/InputField";
import Link from "next/link";
import styles from "./page.module.css";
import {InputButton} from "@/components/Button/InputButton";
import {Form} from "@/components/Form/Form";
import {useRouter} from "next/navigation";

export default function Register() {
    const router = useRouter();

    function register() {
        router.push("/onboarding");
    }

    return (
        <div className={styles.page}>
            <Card>
                <h1>Register</h1>
                <Form
                    name={"register"}
                    autoCapitalize={"none"}
                    onSubmit={register}>
                    <InputField placeholder={"Email"}/>
                    <InputField placeholder={"Password"}/>
                    <InputField placeholder={"Repeat Password"}/>
                    <InputButton type={"submit"} value={"Register"}/>
                </Form>
            </Card>
            <Link href={"/sign-in"}>
                Sign in
            </Link>
        </div>
    );
}