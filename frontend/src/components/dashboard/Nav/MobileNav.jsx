'use client';
import React from 'react';
import { Sheet, SheetContent, SheetTrigger } from '../../ui/sheet';
import { Button } from '../../ui/button';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '../../../lib/utils';
import { CiEdit, CiHome } from 'react-icons/ci';
import { MdPayment } from 'react-icons/md';
import { Settings, ShieldQuestion } from 'lucide-react';
import { GoProjectRoadmap } from 'react-icons/go';

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
                            'mx-[-0.65rem] mt-5 flex items-center gap-4  px-3 py-2 text-muted-foreground hover:text-foreground',
                            pathname === '/dashboard'
                                ? 'rounded-xl bg-muted text-primary'
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
                            'mx-[-0.65rem] flex items-center gap-4  px-3 py-2 text-muted-foreground hover:text-foreground',
                            pathname === '/dashboard/register'
                                ? 'rounded-xl bg-muted text-primary'
                                : null,
                        )}
                    >
                        <CiEdit className="h-5 w-5" />
                        Register Complaints
                    </Link>
                    <Link
                        href="/dashboard/complaints/individual"
                        onClick={() => setopen(!open)}
                        className={cn(
                            'mx-[-0.65rem] flex items-center gap-4  px-3 py-2 text-muted-foreground hover:text-foreground',
                            pathname === '/dashboard/complaints/individual'
                                ? 'rounded-xl bg-muted text-primary'
                                : null,
                        )}
                    >
                        <GoProjectRoadmap className="h-5 w-5" />
                        Individual Case
                    </Link>
                    <Link
                        href="/dashboard/complaints/organisational"
                        onClick={() => setopen(!open)}
                        className={cn(
                            'mx-[-0.65rem] flex items-center gap-4  px-3 py-2 text-muted-foreground hover:text-foreground',
                            pathname === '/dashboard/complaints/organisational'
                                ? 'rounded-xl bg-muted text-primary'
                                : null,
                        )}
                    >
                        <ShieldQuestion className="h-5 w-5" />
                        Organizational Case{' '}
                    </Link>
                    <Link
                        href="/dashboard/payment/history"
                        onClick={() => setopen(!open)}
                        className={cn(
                            'mx-[-0.65rem] flex items-center gap-4  px-3 py-2 text-muted-foreground hover:text-foreground',
                            pathname === '/dashboard/payment/history'
                                ? 'rounded-xl bg-muted text-primary'
                                : null,
                        )}
                    >
                        <MdPayment className="h-5 w-5" />
                        Payment History{' '}
                    </Link>
                    <Link
                        href="/dashboard/settings"
                        onClick={() => setopen(!open)}
                        className={cn(
                            'mx-[-0.65rem] flex items-center gap-4  px-3 py-2 text-muted-foreground hover:text-foreground',
                            pathname === '/dashboard/settings'
                                ? 'rounded-xl bg-muted text-primary'
                                : null,
                        )}
                    >
                        <Settings className="h-5 w-5" />
                        Settings{' '}
                    </Link>
                </nav>
            </SheetContent>
        </Sheet>
    );
};

export default MobileNav;
