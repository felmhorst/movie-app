import {withAuth} from "@/lib/withAuth";
import {USER_COLLECTION} from "@/lib/db";
import {ObjectId} from "mongodb";

export const GET = withAuth(async (request, session) => {
    const userId = await session.user.id;

    if (!userId)
        return Response.json({error: "Missing session.user.id"}, {status: 400});

    const user = await USER_COLLECTION.findOne(
        {_id: new ObjectId(userId)});
    return Response.json({user}, {status: 200});
});