import {faTimesCircle, faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";


export const Searchbar = () => {
    return (
        <div>
            <FontAwesomeIcon
                icon={faMagnifyingGlass}
                size={"lg"}/>
            <input/>
            <button aria-label={"clear input"}>
                <FontAwesomeIcon
                    icon={faTimesCircle}
                    size={"lg"}/>
            </button>
        </div>
    );
}