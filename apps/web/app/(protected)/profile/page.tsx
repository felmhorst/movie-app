import {Button} from "@/components/Button/Button";
import {signOut} from "@/auth";
import {StreamingProviderSelection} from "@/components/StreamingProviderSelection/StreamingProviderSelection";

export default function Profile() {
    return <>
        <h1>Profile</h1>
        <Button onClick={async() => {
            "use server";
            await signOut({redirectTo: "/sign-in"});
        }}>
            Sign out
        </Button>

        <StreamingProviderSelection/>
    </>;
}