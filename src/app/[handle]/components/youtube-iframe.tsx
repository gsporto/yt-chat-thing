"use client";

export function YoutubeIframe({
  liveId,
  theme,
}: {
  liveId: string;
  theme: string;
}) {
  const hostname = window.location.hostname;
  return (
    <iframe
      src={`https://www.youtube.com/live_chat?is_popout=1&v=${liveId}&embed_domain=${hostname}&theme=${theme}`}
      style={{ width: "100%", height: "100%", border: "none" }}
    />
  );
}
