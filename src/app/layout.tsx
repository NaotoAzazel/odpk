import type { Metadata } from "next";

import "../styles/globals.css";

import { env } from "@/env";

import { siteConfig } from "@/config/site";
import { fontHeading, fontSans } from "@/lib/fonts";
import { absoluteUrl, cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";
import Footer from "@/components/layouts/footer/footer";
import Navbar from "@/components/layouts/navbar/navbar";
import { SessionCheckServer } from "@/components/session-check/session-check-server";

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: { default: siteConfig.name, template: `%s - ${siteConfig.name}` },
  description: siteConfig.description,
  keywords: [
    "ОДПК",
    "ODPK",
    "Олександрійський політехнічний фаховий коледж",
    "Oleksandry Polytechnic Fach College",
  ],
  icons: {
    icon: "/icon.jpg",
  },
  authors: [
    {
      name: siteConfig.name,
      url: siteConfig.url,
    },
  ],
  openGraph: {
    type: "website",
    locale: "uk-UA",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [`${siteConfig.url}/og.jpg`],
    creator: siteConfig.name,
  },
  manifest: absoluteUrl("/site.webmanifest"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "relative h-full font-sans antialiased",
          fontHeading.variable,
          fontSans.variable,
        )}
      >
        <main className="relative flex min-h-screen flex-col">
          <Navbar />
          <div className="flex-1 flex-grow">{children}</div>
          <Toaster />
          <SessionCheckServer />
          <Footer />
        </main>
      </body>
    </html>
  );
}
