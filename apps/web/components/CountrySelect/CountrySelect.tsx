"use client";

import {useUserStore} from "@/state/useUserStore";
import {ChangeEvent, useEffect} from "react";
import {useStreamingServiceStore} from "@/state/useStreamingServiceStore";

const COUNTRIES = [
    {
        id: "de",
        name: "Germany",
    }, {
        id: "us",
        name: "United States",
    }, {
        id: "gb",
        name: "United Kingdom",
    },
]

export const CountrySelect = () => {
    const {country, updateCountry, fetchUser} = useUserStore();
    const {fetchServices} = useStreamingServiceStore();

    useEffect(() => {
        fetchUser();
    }, []);

    async function handleChange(e: ChangeEvent<HTMLSelectElement>) {
        const country = e.target.value;
        await updateCountry(country);
        await fetchServices(true);
    }

    return (
        <select
            value={country}
            onChange={handleChange}>
            {COUNTRIES.map((country) => (
                <option
                    key={country.id}
                    value={country.id}>
                    {country.name}
                </option>
            ))}
        </select>
    );
};