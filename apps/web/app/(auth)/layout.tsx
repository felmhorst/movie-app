import {PropsWithChildren} from "react";
import {auth} from "@/auth";
import {redirect} from "next/navigation";
import {PageContainer} from "@/components/PageContainer/PageContainer";

export default async function AuthLayout(props: PropsWithChildren) {
    const {children} = props;
    const session = await auth();

    if (session)
        redirect("/discover");
    return (
        <PageContainer>
            {children}
        </PageContainer>
    );
}