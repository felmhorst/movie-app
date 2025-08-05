import {PropsWithChildren} from "react";
import {FlexLayout} from "@/components/FlexLayout/FlexLayout";


export default function OnboardingLayout(props: PropsWithChildren) {
    const {children} = props;

    return (
        <FlexLayout>
            {children}
        </FlexLayout>
    );
}