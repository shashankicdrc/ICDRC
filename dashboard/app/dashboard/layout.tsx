
"use client";
import Link from "next/link";
import React from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MobileNav } from "@/components/dashboard/Navbar/MobileNav";
import DashboardBreadCrumb from "@/components/dashboard/Navbar/BreadCrumb";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import getNameLetter from "@/lib/getNameLetter";
import LogoutButton from "@/components/dashboard/Navbar/LogoutButton";
import { AsideNavbar } from "@/components/dashboard/Navbar/AsideNavbar";
import { useSession } from "next-auth/react";
import { cn } from "@/lib/utils";

interface Props {
    children: React.ReactNode;
}

export default function layout({ children }: Props) {
    const [isCollapsed, setIsCollapsed] = React.useState(true);
    const { data: session } = useSession();
    return (
        <div className="flex min-h-screen w-full flex-col bg-muted/40">
            <AsideNavbar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
            <div
                className={cn(
                    "flex flex-col md:py-4",
                    isCollapsed ? 'md:pl-[3.5rem]' : 'pl-[15rem]')}
            >
                <header className="sticky top-0 z-30 flex justify-between h-14 items-center gap-4 border-b bg-background px-4 md:static md:h-auto md:border-0 md:bg-transparent md:px-6">
                    <DashboardBreadCrumb />
                    <MobileNav />
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Avatar className="cursor-pointer">
                                <AvatarImage src={session?.user.image as string} />
                                <AvatarFallback className="uppercase">
                                    {session?.user.name
                                        ? getNameLetter(session?.user.name as string)
                                        : "DS"}
                                </AvatarFallback>
                            </Avatar>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="cursor-pointer" asChild>
                                <Link href="/dashboard/settings">Settings</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer">
                                Support
                            </DropdownMenuItem>
                            <LogoutButton />
                            <DropdownMenuSeparator />
                        </DropdownMenuContent>
                    </DropdownMenu>
                </header>
                {children}
            </div>
        </div>
    );
}
