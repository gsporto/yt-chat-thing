import type { Metadata } from "next";
import { IconBar } from "@/components/icon-bar";

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
        <IconBar />
      </body>
    </html>
  );
}
