
"use client";
import React from "react";
import { DashboardNav } from "./DashboardNav";
import { Icons } from "@/components/Icons";
import { cn } from "@/lib/utils";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface Props {
    isCollapsed: boolean;
    setIsCollapsed: (value: boolean) => void;
}

export const AsideNavbar = ({ isCollapsed, setIsCollapsed }: Props) => {
    const pathname = usePathname();
    return (
        <aside
            className={cn(
                "fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background md:flex",
                isCollapsed ? "w-14" : "w-52",
            )}
        >
            <nav className={cn("flex flex-col gap-3 px-2 py-5 items-center")}>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <button
                            className={cn(
                                "flex items-center gap-3 justify-between rounded-lg px-3 text-muted-foreground transition-all hover:text-primary",
                                isCollapsed ? "w-fit" : "w-full",
                            )}
                        >
                            {!isCollapsed && <span>ICDRC</span>}
                            {isCollapsed ? (
                                <Icons.asideOpen
                                    onClick={() => setIsCollapsed(!isCollapsed)}
                                    className="h-5 w-5"
                                />
                            ) : (
                                <Icons.asideClose
                                    onClick={() => setIsCollapsed(!isCollapsed)}
                                    className="h-5 w-5"
                                />
                            )}
                        </button>
                    </TooltipTrigger>
                    {isCollapsed && (
                        <TooltipContent className="z-50 bg-background" side="right">
                            Expand Side Bar
                        </TooltipContent>
                    )}
                </Tooltip>{" "}
                <DashboardNav isCollapsed={isCollapsed} />
            </nav>
            <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
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
            </nav>
        </aside>
    );
};
