import ActivityDetailPage from "./ActivityDetailPage";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <ActivityDetailPage slug={slug} />;
}
