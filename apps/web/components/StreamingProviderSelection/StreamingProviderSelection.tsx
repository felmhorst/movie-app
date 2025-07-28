import styles from "./StreamingProviderSelection.module.css";
import {PropsWithChildren} from "react";
import {faCheckCircle} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const STREAMING_PROVIDERS = [
    {
        name: "Netflix",
        id: "netflix"
    }, {
        name: "Prime Video",
        id: "prime-video"
    }, {
        name: "Disney+",
        id: "disney"
    }, {
        name: "Joyn",
        id: "joyn"
    }, {
        name: "RTL+",
        id: "rtl"
    }
]

export const StreamingProviderSelection = () => {
    return (
        <div className={styles.container}>
            {STREAMING_PROVIDERS.map((provider) => (
                <StreamingProviderCheckbox key={provider.id}>
                    {provider.name}
                </StreamingProviderCheckbox>
            ))}
        </div>
    );
};

export const StreamingProviderCheckbox = (props: PropsWithChildren) => {
    const {
        children
    } = props;

    return (
        <label className={styles.option}>
            {children}
            <input
                type={"checkbox"}
                className={styles.checkbox}/>
            <div className={styles.checkmark}>
                <FontAwesomeIcon
                    icon={faCheckCircle}
                    size={"lg"}/>
            </div>
        </label>
    );
};