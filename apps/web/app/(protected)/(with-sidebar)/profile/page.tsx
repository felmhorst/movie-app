import {Button} from "@/components/Button/Button";
import {signOut} from "@/auth";
import {StreamingServiceSelection} from "@/components/StreamingServiceSelection/StreamingServiceSelection";
import {CountrySelect} from "@/components/CountrySelect/CountrySelect";
import {Card} from "@/components/Card/Card";

export default function Profile() {
    return <>
        <h1>Profile</h1>

        <Card>
            <Button
                theme={"secondary"}
                onClick={async() => {
                    "use server";
                    await signOut({redirectTo: "/sign-in"});
                }}>
                Sign out
            </Button>
        </Card>
        <Card>
            <h2>Country</h2>
            <p>
                We use this information to show you streaming-offers specific to your country.
            </p>
            <CountrySelect/>
        </Card>
        <Card>
            <h2>Streaming Services</h2>
            <p>
                Select the services you have subscribed to get personalized show recommendations.</p>
            <StreamingServiceSelection/>
        </Card>
    </>;
}