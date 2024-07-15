import { BASE_URL } from "@/helper/url";

async function fetchIframe(channeldId: string) {
  const html = await fetch(
    `https://www.youtube.com/embed/live_stream?channel=${channeldId}`
  ).then((v) => v.text());
  const liveId = html.split('"VIDEO_ID":')[1].split('"')[1];
  return liveId;
}

export default async function Home({
  searchParams: { channel_id },
}: {
  searchParams: { channel_id: string };
}) {
  const liveId = await fetchIframe(channel_id);

  const { hostname } = new URL(BASE_URL);

  return (
    <iframe
      src={`https://www.youtube.com/live_chat?v=${liveId}&embed_domain=${hostname}`}
      style={{ width: "100%", height: "100%", border: "none" }}
    />
  );
}
