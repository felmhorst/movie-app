import {faHeart} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import styles from "./WatchlistButton.module.css";

interface WatchlistButtonProps {
    isActive: boolean;
}

export const WatchlistButton = (props: WatchlistButtonProps) => {
    const {
        isActive = false
    } = props;

    return (
        <button
            className={clsx(styles.button, isActive && styles.button__active)}
            aria-label={isActive ? "Remove from watchlist" : "Add to watchlist"}>
            <FontAwesomeIcon
                icon={faHeart}
                size={"lg"}/>
        </button>
    );
};