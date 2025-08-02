import {withAuth} from "@/lib/withAuth";


export const GET = withAuth(async (request, session) => {
    console.log("API: GET /services");
    const userId = await session.user.id;
});