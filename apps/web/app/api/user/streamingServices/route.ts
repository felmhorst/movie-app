import {withAuth} from "@/lib/withAuth";
import {USER_COLLECTION} from "@/lib/db";
import {ObjectId} from "mongodb";

export const POST = withAuth(async (request, session) => {
    const {streamingServices} = await request.json();
    const userId = await session.user.id;

    if (!streamingServices || !Array.isArray(streamingServices))
        return Response.json({error: "Missing required field: streamingServices"}, {status: 400});
    if (!userId)
        return Response.json({error: "Missing session.user.id"}, {status: 400});

    await USER_COLLECTION.updateOne(
        {_id: new ObjectId(userId)},
        {$set: {streamingServices}});
    return Response.json({message: "Success"}, {status: 201});
});