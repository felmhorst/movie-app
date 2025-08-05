import {Card} from "@/components/Card/Card";
import {signIn} from "@/auth";
import {Button} from "@/components/Button/Button";
import {oauthProviders} from "@/auth.config";
import {AuthError} from "next-auth";
import {redirect} from "next/navigation";
import styles from "./page.module.css";

interface SignInProps {
    params: {
        slug: string
    };
    searchParams: Promise<{
        [key: string]: string | string[] | undefined
    }>;
}

export default async function SignIn(props: SignInProps) {
    const {callbackUrl} = await props.searchParams;

    return (
        <>
            <Card>
                <h1>Sign in</h1>
                <p>Use one of the providers to sign in.</p>
                <div className={styles.button_container}>
                    {oauthProviders.map((provider) => (
                        <Button
                            key={provider.id}
                            theme={"secondary"}
                            customIconUrl={`/icons/${provider.id}.svg`}
                            onClick={async() => {
                                "use server";
                                try {
                                    await signIn(provider.id, {
                                        redirectTo: (typeof callbackUrl === "string" ? callbackUrl : callbackUrl?.[0])
                                            ?? "/discover",
                                    });
                                } catch (error) {
                                    if (error instanceof AuthError)
                                        return redirect(`/error?error=${error.type}`)
                                    throw error;
                                }
                            }}>
                            {provider.name}
                        </Button>
                    ))}
                </div>
            </Card>
        </>
    );
}