import {Card} from "@/components/Card/Card";
import {InputField} from "@/components/InputField/InputField";
import Link from "next/link";
import styles from "./page.module.css";
import {InputButton} from "@/components/Button/InputButton";
import {Form} from "@/components/Form/Form";
import {signIn} from "@/auth";
import {Button} from "@/components/Button/Button";

// todo: https://authjs.dev/guides/pages/signin
export default function SignIn() {

    return (
        <div className={styles.page}>
            <Card>
                <h1>Sign in</h1>
                <Button onClick={async() => {
                    "use server";
                    await signIn("github", {redirectTo: "/discover"});
                }}>
                    Sign in with GitHub
                </Button>
            </Card>
            <Link href={"/register"}>
                Register
            </Link>
        </div>
    );
}