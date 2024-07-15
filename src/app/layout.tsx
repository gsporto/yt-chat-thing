import type { Metadata } from "next";

import { GithubLink } from "@/components/GithubLink";

import "./globals.css";

export const metadata: Metadata = {
  title: "YoutubeChatThing",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
        <GithubLink />
      </body>
    </html>
  );
}
