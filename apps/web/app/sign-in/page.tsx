"use client";

import {Card} from "@/components/Card/Card";
import {InputField} from "@/components/InputField/InputField";
import Link from "next/link";
import styles from "./page.module.css";
import {InputButton} from "@/components/Button/InputButton";
import {Form} from "@/components/Form/Form";
import {useRouter} from "next/navigation";

export default function SignIn() {
    const router = useRouter();

    function signIn() {
        router.push("/discover");
    }

    return (
        <div className={styles.page}>
            <Card>
                <h1>Sign in</h1>
                <Form
                    name={"sign-in"}
                    autoCapitalize={"none"}
                    onSubmit={signIn}>
                    <InputField placeholder={"Email"}/>
                    <InputField placeholder={"Password"}/>
                    <InputButton type={"submit"} value={"Sign in"}/>
                </Form>
            </Card>
            <Link href={"/register"}>
                Register
            </Link>
        </div>
    );
}