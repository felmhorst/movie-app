import {Card} from "@/components/Card/Card";
import Link from "next/link";
import {signIn} from "@/auth";
import {Button} from "@/components/Button/Button";
import {oauthProviders} from "@/auth.config";
import {AuthError} from "next-auth";
import {redirect} from "next/navigation";

interface SignInProps {
    searchParams: {
        callbackUrl: string | undefined;
    };
}

export default function SignIn(props: SignInProps) {
    const {searchParams} = props;

    return (
        <>
            <Card>
                <h1>Sign in</h1>
                {oauthProviders.map((provider) => (
                    <Button
                        key={provider.id}
                        onClick={async() => {
                            "use server";
                            try {
                                await signIn(provider.id, {
                                    redirectTo: searchParams?.callbackUrl ?? "/discover",
                                });
                            } catch (error) {
                                if (error instanceof AuthError)
                                    return redirect(`/error?error=${error.type}`)
                                throw error;
                            }
                        }}>
                        Sign in with {provider.name}
                    </Button>
                ))}
            </Card>
            <Link href={"/register"}>
                Register
            </Link>
        </>
    );
}