import {faHeart} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import styles from "./WatchlistButton.module.css";

interface WatchlistButtonProps {
    isActive: boolean;
    onClick: () => void;
}

export const WatchlistButton = (props: WatchlistButtonProps) => {
    const {
        isActive = false,
        onClick,
    } = props;

    return (
        <button
            className={clsx(styles.button, isActive && styles.button__active)}
            aria-label={isActive ? "Remove from watchlist" : "Add to watchlist"}
            onClick={onClick}>
            <FontAwesomeIcon
                icon={faHeart}
                size={"lg"}/>
        </button>
    );
};