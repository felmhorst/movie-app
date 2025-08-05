import {create} from "zustand";
import {persist} from "zustand/middleware";
import {DEFAULT_COUNTRY} from "@/constants";

interface UserStore {
    country: string;
    streamingServices: string[];
    isUserFetched: false,
    fetchUser: () => void;
    updateCountry: (country: string) => void;
    updateStreamingServices: (streamingServices: string[]) => void;
}

export const useUserStore = create<UserStore>()(
    persist((set, get) => (
        {
            country: DEFAULT_COUNTRY,
            streamingServices: [],
            isUserFetched: false,

            async fetchUser() {
                if (get().isUserFetched)
                    return;
                await fetch("/api/user", {method: "GET"})
                    .then((response) => response.json())
                    .then((data) => {
                        const {user} = data;
                        const {country, streamingServices} = user;
                        set({
                            country, streamingServices, isUserFetched: true
                        });
                    });
            },

            async updateCountry(country: string) {
                await fetch("/api/user/country", {
                    method: "POST",
                    body: JSON.stringify({country}),
                    headers: {"Content-Type": "application/json"}
                })
                    .then(() => {
                        set(() => ({country}));
                    });
            },

            async updateStreamingServices(streamingServices: string[]) {
                await fetch("/api/user/streamingServices", {
                    method: "POST",
                    body: JSON.stringify({streamingServices}),
                    headers: {"Content-Type": "application/json"}
                })
                    .then(() => {
                        set(() => ({streamingServices}));
                    });
            },
        }
    ), {
        name: "user-store",
        partialize: (state) => ({
            country: state.country,
            streamingServices: state.streamingServices,
        })
    })
)