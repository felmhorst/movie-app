"use client";

import {useEffect} from "react";
import {useShowStore} from "@/state/useShowStore";
import {ShowManager} from "@/components/ShowManager/ShowManager";
import {Empty} from "./Empty";
import {LoadingIndicator} from "@/components/LoadingIndicator/LoadingIndicator";
import {EmptyPageContainer} from "@/components/EmptyPageContainer/EmptyPageContainer";

export default function Watchlist() {
    const {watchlist, isWatchlistFetched, fetchWatchlist} = useShowStore();

    useEffect(() => {
        fetchWatchlist();
    }, []);


    return (
        <>
            <h1>Watchlist</h1>
            {!isWatchlistFetched
                ? <EmptyPageContainer>
                    <LoadingIndicator/>
                </EmptyPageContainer>
                : watchlist.length === 0
                    ? <Empty/>
                    : <ShowManager shows={watchlist}/>}
        </>
    );
}