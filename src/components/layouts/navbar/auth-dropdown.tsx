"use client"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button, ButtonProps } from "@/components/ui/button";
import { Icons } from "@/components/icons";

import Link from "next/link";

import { Session } from "next-auth";
import { signOut } from "next-auth/react";

interface AuthDropdownProps 
  extends React.ComponentPropsWithRef<typeof DropdownMenuTrigger>,
    ButtonProps {
      user: Session | null;
    };

export function AuthDropdown({ className, user, ...props }: AuthDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="secondary"
          className="px-3"
          {...props}
        >
          <Icons.user className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel>
          <p className="text-xs leading-none text-muted-foreground">
            {user?.user?.email}
          </p>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href="/dashboard/news">
              <Icons.layoutGrid className="mr-2 size-4" />
              Дашбоард
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />

        <DropdownMenuItem 
          asChild 
          onClick={() => signOut()}
        >
          <div>
            <Icons.logOut className="mr-2 size-4" />
            Вихiд
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
} 