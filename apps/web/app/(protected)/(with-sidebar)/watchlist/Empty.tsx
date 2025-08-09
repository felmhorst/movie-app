import {Button} from "@/components/Button/Button";
import {faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";
import {EmptyPageContainer} from "@/components/EmptyPageContainer/EmptyPageContainer";


export const Empty = () => {
    return (
        <EmptyPageContainer>
            <h2>You didn't add any movies to your watchlist yet</h2>
            <p>
                Add movies to your watchlist to see which ones of these are available in your subscriptions.
            </p>
            <Button
                elementType={"link"}
                href={"/discover"}
                theme={"secondary"}
                width={"hug"}
                icon={faMagnifyingGlass}>
                Discover movies
            </Button>
        </EmptyPageContainer>
    );
};