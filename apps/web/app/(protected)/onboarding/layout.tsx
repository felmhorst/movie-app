import {PropsWithChildren} from "react";
import {PageContainer} from "@/components/PageContainer/PageContainer";

export default function OnboardingLayout(props: PropsWithChildren) {
    const {children} = props;

    return (
        <PageContainer>
            {children}
        </PageContainer>
    );
}