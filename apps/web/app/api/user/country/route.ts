import {withAuth} from "@/lib/withAuth";
import {USER_COLLECTION} from "@/lib/db";
import {ObjectId} from "mongodb";

export const POST = withAuth(async (request, session) => {
    const {country} = await request.json();
    const userId = await session.user.id;

    if (!country || typeof country !== "string")
        return Response.json({error: "Missing required field: country"}, {status: 400});
    if (!userId)
        return Response.json({error: "Missing session.user.id"}, {status: 400});

    const user = await USER_COLLECTION.updateOne(
        {_id: new ObjectId(userId)},
        {$set: {country}});
    return Response.json({message: "Success"}, {status: 201});
});