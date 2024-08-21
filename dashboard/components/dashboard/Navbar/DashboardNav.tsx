
"use client";
import { Icons } from "@/components/Icons";
import { Separator } from "@/components/ui/separator";
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
        <div className="flex flex-col gap-3">
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
            <Separator />
            <Tooltip>
                <TooltipTrigger asChild>
                    <Link
                        href="/dashboard/individual"
                        className={cn(
                            "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                            pathname.startsWith("/dashboard/individual")
                                ? " rounded-lg bg-muted text-primary"
                                : null,
                            isCollapsed ? "w-fit" : "w-full",
                        )}
                    >
                        <Icons.individual className="h-5 w-5" />
                        {!isCollapsed && <span>Individual Case</span>}
                    </Link>
                </TooltipTrigger>
                {isCollapsed && <TooltipContent side="right">Individual Complaints</TooltipContent>}
            </Tooltip>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Link
                        href="/dashboard/organisational"
                        className={cn(
                            "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                            pathname.startsWith("/dashboard/organisational")
                                ? " rounded-lg bg-muted text-primary"
                                : null,
                            isCollapsed ? "w-fit" : "w-full",
                        )}
                    >
                        <Icons.organisational className="h-5 w-5" />
                        {!isCollapsed && <span>Organisational Case</span>}
                    </Link>
                </TooltipTrigger>
                {isCollapsed && <TooltipContent side="right">Organisational Complaints</TooltipContent>}
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
                        href="/dashboard/payments"
                        className={cn(
                            "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                            pathname.startsWith("/dashboard/payments")
                                ? " rounded-lg bg-muted text-primary"
                                : null,
                            isCollapsed ? "w-fit" : "w-full",
                        )}
                    >
                        <Icons.payment className="h-5 w-5" />
                        {!isCollapsed && <span>Payments</span>}
                    </Link>
                </TooltipTrigger>
                {isCollapsed && <TooltipContent side="right">Payments</TooltipContent>}
            </Tooltip>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Link
                        href="/dashboard/subscriptions"
                        className={cn(
                            "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                            pathname.startsWith("/dashboard/subscriptions")
                                ? " rounded-lg bg-muted text-primary"
                                : null,
                            isCollapsed ? "w-fit" : "w-full",
                        )}
                    >
                        <Icons.subscription className="h-5 w-5" />
                        {!isCollapsed && <span>Subscriptions</span>}
                    </Link>
                </TooltipTrigger>
                {isCollapsed && <TooltipContent side="right">Subscriptions</TooltipContent>}
            </Tooltip>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Link
                        href="/dashboard/partners"
                        className={cn(
                            "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                            pathname.startsWith("/dashboard/partners")
                                ? " rounded-lg bg-muted text-primary"
                                : null,
                            isCollapsed ? "w-fit" : "w-full",
                        )}
                    >
                        <Icons.partner className="h-5 w-5" />
                        {!isCollapsed && <span>Partners</span>}
                    </Link>
                </TooltipTrigger>
                {isCollapsed && <TooltipContent side="right">Partners</TooltipContent>}
            </Tooltip>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Link
                        href="/dashboard/chatbot"
                        className={cn(
                            "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                            pathname.startsWith("/dashboard/chatbot")
                                ? " rounded-lg bg-muted text-primary"
                                : null,
                            isCollapsed ? "w-fit" : "w-full",
                        )}
                    >
                        <Icons.bot className="h-5 w-5" />
                        {!isCollapsed && <span>Chat Bot</span>}
                    </Link>
                </TooltipTrigger>
                {isCollapsed && <TooltipContent side="right">Chat Bot</TooltipContent>}
            </Tooltip>
            <Separator />
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
            <Tooltip>
                <TooltipTrigger asChild>
                    <Link
                        href="/dashboard/case-study"
                        className={cn(
                            "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                            pathname.startsWith("/dashboard/case-study")
                                ? " rounded-lg bg-muted text-primary"
                                : null,
                            isCollapsed ? "w-fit" : "w-full",
                        )}
                    >
                        <Icons.caseStudy className="h-5 w-5" />
                        {!isCollapsed && <span>Case Study</span>}
                    </Link>
                </TooltipTrigger>
                {isCollapsed && <TooltipContent side="right">Case Study</TooltipContent>}
            </Tooltip>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Link
                        href="/dashboard/settings"
                        className={cn(
                            "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                            pathname === "/dashboard/settings"
                                ? " rounded-lg bg-muted text-primary"
                                : null,
                            isCollapsed ? "w-fit" : "w-full",
                        )}
                    >
                        <Icons.settings className="h-5 w-5" />
                        {!isCollapsed && <span>Settings</span>}
                    </Link>
                </TooltipTrigger>
                {isCollapsed && <TooltipContent side="right">Settings</TooltipContent>}
            </Tooltip>{" "}

        </div>
    );
};
