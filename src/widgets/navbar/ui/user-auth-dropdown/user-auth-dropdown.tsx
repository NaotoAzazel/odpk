"use client";

import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import Link from "next/link";

import { DASHBOARD_SIDEBAR_BUTTONS } from "@/widgets/dashboard-sidebar";
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Icons,
} from "@/shared/ui";

interface UserAuthDropdownProps {
  user: Session;
}

export function UserAuthDropdown({ user }: UserAuthDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" className="px-3">
          <Icons.user className="size-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel>
          <p className="text-xs leading-none text-muted-foreground">
            {user.user.email}
          </p>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          {DASHBOARD_SIDEBAR_BUTTONS.map((button, index) => {
            const Icon = Icons[button.icon];

            return (
              <DropdownMenuItem asChild key={index}>
                <Link href={button.href}>
                  <Icon className="mr-2 size-4" />
                  <span className="font-sans font-medium">{button.title}</span>
                </Link>
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />

        <DropdownMenuItem asChild onClick={() => signOut()}>
          <div>
            <Icons.logOut className="mr-2 size-4" />
            <span className="font-sans font-medium">Вихiд</span>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
