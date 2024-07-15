import { BASE_URL } from "@/helper/url";
import { DOMParser } from "@litejs/dom";

export const runtime = "edge";

async function getLiveId(handle: string) {
  const html = await fetch(`https://www.youtube.com/${handle}/live`).then((v) =>
    v.text()
  );

  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");

  const linkElement = doc.querySelector('link[rel="canonical"]');
  if (!linkElement) return;

  const url = linkElement.getAttribute("href");
  if (!url) return;

  const videoIdMatch = url.match(/v=([^&]+)/);
  if (!videoIdMatch?.[1]) return;

  return videoIdMatch[1];
}

export default async function Home({
  params: { handle },
}: {
  params: { handle: string };
}) {
  const liveId = await getLiveId(handle);

  const { hostname } = new URL(BASE_URL);

  return (
    <iframe
      src={`https://www.youtube.com/live_chat?v=${liveId}&embed_domain=${hostname}`}
      style={{ width: "100%", height: "100%", border: "none" }}
    />
  );
}
