"use client"

import { Suspense } from "react";
import { CreatePost } from "../../component/CreatePost";

export default function Page() {
    return <Suspense fallback="loading"><CreatePost /></Suspense>
}
