import {auth} from "@/auth";

export function withAuth(
    handler: (request: Request, session: any) => Promise<Response>
) {
    return async function (request: Request): Promise<Response> {
        const session = await auth();
        if (!session)
            return Response.json({error: "Unauthorized"}, {status: 401});
        return handler(request, session);
    }
}