import "app/(lib)/styles/globals.css";

import type { Metadata, Viewport } from "next";

import { Backgrounds } from "app/(lib)/components/Backgrounds";
import { Header } from "app/(lib)/components/Header";

export const metadata: Metadata = {
  title: "Adam Drago",
  description: "A site about Adam Drago",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: React.PropsWithChildren) {
  return (
    <html lang="en">
      <body className="font-serif bg-white dark:bg-black transition-colors">
        <Backgrounds />
        <div
          className={`
            absolute left-0 right-0 top-2/3 print:top-0
            mx-auto px-8
            font-serif max-w-prose
            flex flex-col gap-2
          `}
        >
          <Header />
          {children}
        </div>
      </body>
    </html>
  );
}
