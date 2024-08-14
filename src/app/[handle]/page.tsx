import { BASE_URL } from "@/helper/url";
import dynamic from "next/dynamic";
import { cookies } from "next/headers";
import { parse } from "node-html-parser";

const YoutubeIframe = dynamic(
  () => import("./components/youtube-iframe").then((mod) => mod.YoutubeIframe),
  {
    ssr: false,
  }
);

export const runtime = "edge";

async function getLiveId(handle: string, debug: boolean) {
  const html = await fetch(`https://www.youtube.com/${handle}/live`, {
    cache: "no-store",
  }).then((v) => v.text());

  if (debug) {
    return { html };
  }

  const doc = parse(html);

  const linkElement = doc.querySelector('link[rel="canonical"]');
  if (!linkElement) return;

  const url = linkElement.getAttribute("href");
  if (!url) return;

  const videoIdMatch = url.match(/v=([^&]+)/);
  if (!videoIdMatch?.[1]) return;

  return { liveId: videoIdMatch[1], html: debug ? html : "" };
}

export default async function Home({
  params: { handle },
  searchParams: { debug },
}: {
  params: { handle: string };
  searchParams: { debug: string };
}) {
  if (!handle) {
    return (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontFamily: "sans-serif",
          color: "white",
        }}
      >
        <h1>No handle provided</h1>
      </div>
    );
  }

  const { liveId, html } = (await getLiveId(handle, debug === "true")) ?? {};

  const { hostname } = new URL(BASE_URL);

  const theme = cookies().get("theme")?.value ?? "dark";

  if (!liveId) {
    return (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontFamily: "sans-serif",
          color: "white",
        }}
      >
        <h1>No Live Found</h1>
        <pre style={{ display: "none" }}>{html}</pre>
        <pre style={{ display: "none" }}>{handle}</pre>
      </div>
    );
  }

  return <YoutubeIframe liveId={liveId} theme={theme} />;
}
