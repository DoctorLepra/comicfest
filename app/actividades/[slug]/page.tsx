import { use } from "react";
import { ACTIVITIES } from "@/lib/constants";
import ActivityDetailPage from "./ActivityDetailPage";

export function generateStaticParams() {
    return ACTIVITIES.map((a) => ({ slug: a.slug }));
}

export default function Page({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = use(params);
    return <ActivityDetailPage slug={slug} />;
}
