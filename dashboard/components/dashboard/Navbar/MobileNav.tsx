
"use client";
import React from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Icons } from "@/components/Icons";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export const MobileNav = () => {
    const [open, setopen] = React.useState<boolean>(false);
    const pathname = usePathname();

    return (
        <Sheet open={open} onOpenChange={setopen}>
            <SheetTrigger asChild>
                <Button size="icon" variant="outline" className="md:hidden">
                    <svg
                        strokeWidth="1.5"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                    >
                        <path
                            d="M3 5H11"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        ></path>
                        <path
                            d="M3 12H16"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        ></path>
                        <path
                            d="M3 19H21"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        ></path>
                    </svg>
                    <span className="sr-only">Toggle Menu</span>
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
                <nav className="grid gap-2 text-lg font-medium">
                    <Link
                        href="/dashboard"
                        onClick={() => setopen(!open)}
                        className="flex items-center gap-2  -mt-3 text-lg font-semibold"
                    >
                        <Icons.home />
                        <span>ICDRC</span>
                    </Link>
                    <Link
                        href="/dashboard"
                        onClick={() => setopen(!open)}
                        className={cn(
                            "mx-[-0.65rem] mt-5 flex items-center gap-4  px-3 py-2 text-muted-foreground hover:text-foreground",
                            pathname === "/dashboard"
                                ? "rounded-xl bg-muted text-foreground"
                                : null,
                        )}
                    >
                        <Icons.home className="h-5 w-5" />
                        Dashboard
                    </Link>
                    <Link
                        href="/dashboard/contacts"
                        onClick={() => setopen(!open)}
                        className={cn(
                            "mx-[-0.65rem] flex items-center gap-4  px-3 py-2 text-muted-foreground hover:text-foreground",
                            pathname === "/dashboard/contacts"
                                ? "rounded-xl bg-muted text-foreground"
                                : null,
                        )}
                    >
                        <Icons.contact className="h-5 w-5" />
                        Contacts
                    </Link>

                    <Link
                        href="/dashboard/admins"
                        onClick={() => setopen(!open)}
                        className={cn(
                            "mx-[-0.65rem] flex items-center gap-4  px-3 py-2 text-muted-foreground hover:text-foreground",
                            pathname.startsWith("/dashboard/admins")
                                ? "rounded-xl bg-muted text-foreground"
                                : null,
                        )}
                    >
                        <Icons.user className="h-5 w-5" />
                        Admins
                    </Link>
                    <Link
                        href="/dashboard/blogs"
                        onClick={() => setopen(!open)}
                        className={cn(
                            "mx-[-0.65rem] flex items-center gap-4  px-3 py-2 text-muted-foreground hover:text-foreground",
                            pathname.startsWith("/dashboard/blogs")
                                ? "rounded-xl bg-muted text-foreground"
                                : null,
                        )}
                    >
                        <Icons.blog className="h-5 w-5" />
                        Blogs
                    </Link>
                </nav>
            </SheetContent>
        </Sheet>
    );
};
