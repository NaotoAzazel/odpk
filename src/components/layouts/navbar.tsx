"use client"

import Link from "next/link";

import MainNav from "@/components/layouts/main-nav";
import MobileNav from "@/components/layouts/mobile-nav";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import { Icons } from "@/components/icons";

import { siteConfig } from "@/config/site";
import { navConfig } from "@/config/nav";

import { useMediaQuery } from "@/hooks/use-media-query";

export default function Navbar() {
  const isDesktop = useMediaQuery("(min-width: 975px)");

  return (
    <div className="sticky z-50 top-0 inset-x-0 h-16">
      <header className="relative border-b bg-background">
        <MaxWidthWrapper>
          <div className="flex h-16 items-center">
            <Link href="/" className="items-center space-x-2 flex">
              <Icons.graduationCap />
              <span className="font-heading font-bold text-xl">{siteConfig.name}</span>
            </Link>

            {isDesktop ? (
              <MainNav items={navConfig.mainNav} />
            ) : ( 
              <MobileNav items={navConfig.mainNav} />
            )}
          </div>
        </MaxWidthWrapper>
      </header>
    </div>
  )
}