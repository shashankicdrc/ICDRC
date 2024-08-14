"use client";
import React from "react";
import { Sheet, SheetContent, SheetTrigger } from "../../ui/sheet";
import { Button } from "../../ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "../../../lib/utils";
import { CiEdit, CiHome } from "react-icons/ci";

const MobileNav = () => {
    const [open, setopen] = React.useState(false);
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
                        <CiHome />
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
                        <CiHome className="h-5 w-5" />
                        Dashboard
                    </Link>
                    <Link
                        href="/dashboard/register"
                        onClick={() => setopen(!open)}
                        className={cn(
                            "mx-[-0.65rem] flex items-center gap-4  px-3 py-2 text-muted-foreground hover:text-foreground",
                            pathname === "/dashboard/register"
                                ? "rounded-xl bg-muted text-foreground"
                                : null,
                        )}
                    >
                        <CiEdit className="h-5 w-5" />
                        Regist Complaint
                    </Link>
                </nav>
            </SheetContent>
        </Sheet>
    );
};

export default MobileNav;
