"use client";

import {redirect} from "next/navigation";

export default function Onboarding() {
    redirect("/onboarding/country");
    return null;
}