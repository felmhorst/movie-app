import {create} from "zustand";
import {persist} from "zustand/middleware";
import {Service} from "streaming-availability";


interface ServiceStore {
    services: Service[];
    isServicesFetched: boolean;
    fetchServices: (force: boolean) => void;
}

export const useStreamingServiceStore = create<ServiceStore>()(
    persist((set, get) => (
        {
            services: [],
            isServicesFetched: false,

            async fetchServices(force = false) {
                if (!force && get().isServicesFetched)
                    return;
                await fetch("/api/services", {method: "GET"})
                    .then((response) => response.json())
                    .then((data) => {
                        const {services} = data;
                        set({services, isServicesFetched: true});
                    });
            },
        }
    ), {
        name: "service-store",
        partialize: (state) => ({
            services: state.services,
        })
    })
)