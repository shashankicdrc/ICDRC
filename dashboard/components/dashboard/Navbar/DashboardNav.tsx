
"use client";
import { Icons } from "@/components/Icons";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

interface Props {
    isCollapsed: boolean;
}

export const DashboardNav = ({ isCollapsed }: Props) => {
    const pathname = usePathname();
    return (
        <React.Fragment>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Link
                        href="/dashboard"
                        className={cn(
                            "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                            pathname === "/dashboard"
                                ? " rounded-lg bg-muted text-primary"
                                : null,
                            isCollapsed ? "w-fit" : "w-full",
                        )}
                    >
                        <Icons.home className="h-5 w-5" />
                        {!isCollapsed && <span>Dashboard</span>}
                    </Link>
                </TooltipTrigger>
                {isCollapsed && <TooltipContent side="right">Dashboard</TooltipContent>}
            </Tooltip>{" "}
            <Tooltip>
                <TooltipTrigger asChild>
                    <Link
                        href="/dashboard/contacts"
                        className={cn(
                            "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                            pathname.startsWith("/dashboard/contacts")
                                ? " rounded-lg bg-muted text-primary"
                                : null,
                            isCollapsed ? "w-fit" : "w-full",
                        )}
                    >
                        <Icons.contact className="h-5 w-5" />
                        {!isCollapsed && <span>Contacts</span>}
                    </Link>
                </TooltipTrigger>
                {isCollapsed && <TooltipContent side="right">Contacts</TooltipContent>}
            </Tooltip>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Link
                        href="/dashboard/admins"
                        className={cn(
                            "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                            pathname.startsWith("/dashboard/admins")
                                ? " rounded-lg bg-muted text-primary"
                                : null,
                            isCollapsed ? "w-fit" : "w-full",
                        )}
                    >
                        <Icons.user className="h-5 w-5" />
                        {!isCollapsed && <span>Admins</span>}
                    </Link>
                </TooltipTrigger>
                {isCollapsed && <TooltipContent side="right">Admins</TooltipContent>}
            </Tooltip>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Link
                        href="/dashboard/blogs"
                        className={cn(
                            "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                            pathname.startsWith("/dashboard/blogs")
                                ? " rounded-lg bg-muted text-primary"
                                : null,
                            isCollapsed ? "w-fit" : "w-full",
                        )}
                    >
                        <Icons.blog className="h-5 w-5" />
                        {!isCollapsed && <span>Blogs</span>}
                    </Link>
                </TooltipTrigger>
                {isCollapsed && <TooltipContent side="right">Blogs</TooltipContent>}
            </Tooltip>
        </React.Fragment>
    );
};
