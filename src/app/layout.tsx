import type { Metadata } from "next";

import "@/shared/globals.css";

import { env } from "@/env";

import { Footer } from "@/widgets/footer";
import { Navbar } from "@/widgets/navbar";
import { SITE_CONFIG } from "@/shared/constants";
import { cn, fontHeading, fontSans, toAbsoluteUrl } from "@/shared/lib";
import { Toaster } from "@/shared/ui";

import { Providers } from "./_providers";

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: { default: SITE_CONFIG.name, template: `%s - ${SITE_CONFIG.name}` },
  description: SITE_CONFIG.description,
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
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.url,
    },
  ],
  openGraph: {
    type: "website",
    locale: "uk-UA",
    url: SITE_CONFIG.url,
    title: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
    siteName: SITE_CONFIG.name,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
    images: [`${SITE_CONFIG.url}/og.jpg`],
    creator: SITE_CONFIG.name,
  },
  manifest: toAbsoluteUrl("/site.webmanifest"),
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
          <Providers>
            <Navbar />
            <div className="flex-1 flex-grow">{children}</div>
            <Footer />
          </Providers>
          <Toaster visibleToasts={1} />
        </main>
      </body>
    </html>
  );
}
