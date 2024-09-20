"use client"

import { Suspense } from "react";
import { PostDeatil } from "../../component/PostDetail";

export default function Page() {
    return <Suspense fallback="loading"><PostDeatil /></Suspense>
}
