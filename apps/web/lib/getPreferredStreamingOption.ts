import {StreamingOption} from "streaming-availability";

const STREAMING_TYPE_PRIORITY = {
    free: 0,
    subscription: 1,
    addon: 2,
    rent: 3,
    buy: 4,
}

function sortStreamingOptions(options: StreamingOption[], subscriptions: string[]): StreamingOption[] {
    return options.sort((optionA, optionB) => {
        const optionASubscribed = subscriptions.includes(optionA.service.id);
        const optionBSubscribed = subscriptions.includes(optionB.service.id);
        if (optionASubscribed && !optionBSubscribed)
            return -1;
        if (!optionASubscribed && optionBSubscribed)
            return 1;
        return STREAMING_TYPE_PRIORITY[optionA.type] - STREAMING_TYPE_PRIORITY[optionB.type];
    });
}


export function getPreferredStreamingOption(options: StreamingOption[], subscriptions: string[]): StreamingOption | null {
    if (options.length === 0)
        return null;
    if (options.length === 1)
        return options[0];
    const sorted = sortStreamingOptions(options, subscriptions);
    return sorted[0];
}