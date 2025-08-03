"use client";

import styles from "./StreamingServiceSelection.module.css";
import {ChangeEvent, PropsWithChildren, useEffect} from "react";
import {faCheckCircle} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useUserStore} from "@/state/useUserStore";
import {useStreamingServiceStore} from "@/state/useStreamingServiceStore";

export const StreamingServiceSelection = () => {
    const {streamingServices, updateStreamingServices, fetchUser} = useUserStore();
    const {services, fetchServices} = useStreamingServiceStore();

    useEffect(() => {
        fetchUser();
        fetchServices();
    }, []);

    function handleChange(serviceId: string, e: ChangeEvent<HTMLInputElement>) {
        const isChecked = e.target.checked;
        if (isChecked)
            updateStreamingServices([...streamingServices, serviceId]);
        else
            updateStreamingServices(streamingServices.filter((id) => id !== serviceId));
    }

    return (
        <div className={styles.container}>
            {services.map((service) => (
                <StreamingServiceCheckbox
                    key={service.id}
                    isChecked={streamingServices.includes(service.id)}
                    onChange={(e) => handleChange(service.id, e)}>
                    {service.name}
                </StreamingServiceCheckbox>
            ))}
        </div>
    );
};

interface StreamingServiceCheckboxProps extends PropsWithChildren{
    isChecked?: boolean;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const StreamingServiceCheckbox = (props: StreamingServiceCheckboxProps) => {
    const {
        children,
        onChange,
        isChecked = false,
    } = props;

    return (
        <label className={styles.option}>
            {children}
            <input
                type={"checkbox"}
                className={styles.checkbox}
                checked={isChecked}
                onChange={onChange}/>
            <div className={styles.checkmark}>
                <FontAwesomeIcon
                    icon={faCheckCircle}
                    size={"lg"}/>
            </div>
        </label>
    );
};