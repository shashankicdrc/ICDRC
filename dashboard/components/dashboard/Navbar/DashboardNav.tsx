
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
                        {!isCollapsed && <span>Individual Cases</span>}
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
                        {!isCollapsed && <span>Organizational Cases</span>}
                    </Link>
                </TooltipTrigger>
                {isCollapsed && <TooltipContent side="right">Organizational Complaints</TooltipContent>}
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
            <Separator />
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
                        href="/dashboard/chats"
                        className={cn(
                            "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                            pathname.startsWith("/dashboard/chats")
                                ? " rounded-lg bg-muted text-primary"
                                : null,
                            isCollapsed ? "w-fit" : "w-full",
                        )}
                    >
                        <Icons.chat className="h-5 w-5" />
                        {!isCollapsed && <span>Messages</span>}
                    </Link>
                </TooltipTrigger>
                {isCollapsed && <TooltipContent side="right">Messages</TooltipContent>}
            </Tooltip>

            <Separator />
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
                        {!isCollapsed && <span>Contact Requests</span>}
                    </Link>
                </TooltipTrigger>
                {isCollapsed && <TooltipContent side="right">Contact Requests</TooltipContent>}
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
                        {!isCollapsed && <span>Partner Requests</span>}
                    </Link>
                </TooltipTrigger>
                {isCollapsed && <TooltipContent side="right">Partner Requests</TooltipContent>}
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
                        {!isCollapsed && <span>Chat Bot Requests</span>}
                    </Link>
                </TooltipTrigger>
                {isCollapsed && <TooltipContent side="right">Chat Bot Requests</TooltipContent>}
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
                        href="/dashboard/media"
                        className={cn(
                            "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                            pathname.startsWith("/dashboard/media")
                                ? " rounded-lg bg-muted text-primary"
                                : null,
                            isCollapsed ? "w-fit" : "w-full",
                        )}
                    >
                        <Icons.media className="h-5 w-5" />
                        {!isCollapsed && <span>Media</span>}
                    </Link>
                </TooltipTrigger>
                {isCollapsed && <TooltipContent side="right">Case Study</TooltipContent>}
            </Tooltip>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Link
                        href="/dashboard/testimonials"
                        className={cn(
                            "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                            pathname.startsWith("/dashboard/testimonials")
                                ? " rounded-lg bg-muted text-primary"
                                : null,
                            isCollapsed ? "w-fit" : "w-full",
                        )}
                    >
                        <Icons.testimonial className="h-5 w-5" />
                        {!isCollapsed && <span>Testimonials</span>}
                    </Link>
                </TooltipTrigger>
                {isCollapsed && <TooltipContent side="right">Testimonials</TooltipContent>}
            </Tooltip>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Link
                        href="/dashboard/teams"
                        className={cn(
                            "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                            pathname === "/dashboard/teams"
                                ? " rounded-lg bg-muted text-primary"
                                : null,
                            isCollapsed ? "w-fit" : "w-full",
                        )}
                    >
                        <Icons.team className="h-5 w-5" />
                        {!isCollapsed && <span>Experts</span>}
                    </Link>
                </TooltipTrigger>
                {isCollapsed && <TooltipContent side="right">Experts</TooltipContent>}
            </Tooltip>{" "}

        </div>
    );
};
