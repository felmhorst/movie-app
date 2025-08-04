"use client";

import {useEffect} from "react";
import {useShowStore} from "@/state/useShowStore";
import {ShowManager} from "@/components/ShowManager/ShowManager";

export default function Watchlist() {
    const {watchlist, fetchWatchlist} = useShowStore();

    useEffect(() => {
        fetchWatchlist();
    }, []);


    return (
        <>
            <h1>Watchlist</h1>
            <ShowManager shows={watchlist}/>
        </>
    );
}