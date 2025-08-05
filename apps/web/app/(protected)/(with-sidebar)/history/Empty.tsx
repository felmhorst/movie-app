import {Button} from "@/components/Button/Button";
import {faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";


export const Empty = () => {
    return (
        <div>
            <h1>You didn't add any movies to your watchlist yet</h1>
            <p>
                Add movies to your watchlist to see which ones of these are available in your streaming providers
            </p>
            <Button
                elementType={"link"}
                href={"/discover"}
                theme={"secondary"}
                width={"hug"}
                icon={faMagnifyingGlass}>
                Discover movies
            </Button>
        </div>
    );
};