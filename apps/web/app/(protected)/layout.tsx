import {PropsWithChildren} from "react";
import {auth} from "@/auth";
import {headers} from "next/headers";
import {redirect} from "next/navigation";


export default async function ProtectedLayout(props: PropsWithChildren) {
    const {children} = props;
    const session = await auth();

    if (!session) {
        const headersList = await headers();
        const host = headersList.get('host');
        const protocol = headersList.get('x-forwarded-proto') || 'https';
        const path = headersList.get('x-next-url') || '/'; // e.g. /dashboard
        const callbackUrl = `${protocol}://${host}${path}`;

        redirect(`/sign-in?callbackUrl=${encodeURIComponent(callbackUrl)}`);
        return null;
    }

    return children;
}