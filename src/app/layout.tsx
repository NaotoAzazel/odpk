import type { Metadata } from "next";

import "../styles/globals.css";

import { cn } from "@/lib/utils";
import { fontSans, fontHeading } from "@/lib/fonts";

import Navbar from "@/components/layouts/navbar";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: `Головна - ${siteConfig.name}`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(
        "relative h-full font-sans antialiased", 
        fontHeading.variable, 
        fontSans.variable
      )}>
        <main className="relative flex flex-col min-h-screen">
          <Navbar />
          <div className="flex-grow flex-1">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
