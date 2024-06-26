import type { Metadata } from "next";

import "../styles/globals.css";

import { cn } from "@/lib/utils";
import { fontSans, fontHeading } from "@/lib/fonts";

import Navbar from "@/components/layouts/navbar";
import Footer from "@/components/layouts/footer";
import { Toaster } from "@/components/ui/toaster"

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
          <Toaster />
          <Footer />
        </main>
      </body>
    </html>
  );
}
