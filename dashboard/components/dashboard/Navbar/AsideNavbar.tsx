
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
import { ScrollArea } from "@/components/ui/scroll-area";

interface Props {
    isCollapsed: boolean;
    setIsCollapsed: (value: boolean) => void;
}

export const AsideNavbar = ({ isCollapsed, setIsCollapsed }: Props) => {
    return (
        <aside
            className={cn(
                "fixed inset-y-0 left-0 z-10 hidden  w-14 flex-col border-r bg-background md:flex",
                isCollapsed ? "w-14" : "w-60",
            )}
        >
            <nav className={cn("flex flex-col gap-2 px-2 w-full py-5 items-center")}>
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
                <ScrollArea className="h-[calc(100vh-3.5rem)] shrink-0 px-0">
                    <DashboardNav isCollapsed={isCollapsed} />
                </ScrollArea>
            </nav>
        </aside>

    );
};
