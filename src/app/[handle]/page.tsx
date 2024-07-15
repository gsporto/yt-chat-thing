import { BASE_URL } from "@/helper/url";

async function getLiveId(handle: string) {
  const html = await fetch(`https://www.youtube.com/${handle}/live`).then((v) =>
    v.text()
  );
  return html
    .split('<link rel="canonical" href="https://www.youtube.com/watch?v=')[1]
    .split('"')[0];
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
