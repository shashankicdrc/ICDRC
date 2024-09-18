'use client';
import React from 'react';
import DashboardNav from './DashboardNav';
import { cn } from '../../../lib/utils';
import {
    TooltipProvider,
    Tooltip,
    TooltipTrigger,
    TooltipContent,
} from '../../ui/tooltip';
import { Settings } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

const AsideNavbar = ({ isCollapsed, setIsCollapsed }) => {
    const pathname = usePathname();
    return (
        <aside
            className={cn(
                'fixed inset-y-0 left-0 z-10 hidden  w-14 flex-col border-r bg-background md:flex',
                isCollapsed ? 'w-14' : 'w-60',
            )}
        >
            <nav className={cn('flex flex-col gap-3 px-2 py-5 items-center')}>
                <TooltipProvider>
                    {' '}
                    <Tooltip>
                        <button
                            className={cn(
                                'flex items-center gap-3 justify-between rounded-lg px-3 text-muted-foreground transition-all hover:text-primary',
                                isCollapsed ? 'w-fit' : 'w-full',
                            )}
                        >
                            {!isCollapsed && (
                                <Image
                                    src="/logo.png"
                                    width={120}
                                    height={120}
                                    alt="logo"
                                />
                            )}
                            {isCollapsed ? (
                                <svg
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    onClick={() => setIsCollapsed(!isCollapsed)}
                                >
                                    <path
                                        d="M1 12.9999V10.9999H15.4853L12.2427 7.75724L13.6569 6.34303L19.3137 11.9999L13.6569 17.6567L12.2427 16.2425L15.4853 12.9999H1Z"
                                        fill="currentColor"
                                    />
                                    <path
                                        d="M20.2877 6V18H22.2877V6H20.2877Z"
                                        fill="currentColor"
                                    />
                                </svg>
                            ) : (
                                <svg
                                    onClick={() => setIsCollapsed(!isCollapsed)}
                                    style={{
                                        minWidth: '24px',
                                        minHeight: '24px',
                                    }}
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M22.2877 11.0001V13.0001H7.80237L11.045 16.2428L9.63079 17.657L3.97394 12.0001L9.63079 6.34326L11.045 7.75748L7.80236 11.0001H22.2877Z"
                                        fill="currentColor"
                                    />
                                    <path
                                        d="M3 18V6H1V18H3Z"
                                        fill="currentColor"
                                    />
                                </svg>
                            )}
                        </button>
                    </Tooltip>{' '}
                </TooltipProvider>

                <DashboardNav isCollapsed={isCollapsed} />
            </nav>
            <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Link
                                href="/dashboard/settings"
                                className={cn(
                                    'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary',
                                    pathname === '/dashboard/settings'
                                        ? ' rounded-lg bg-muted text-primary'
                                        : null,
                                    isCollapsed ? 'w-fit' : 'w-full',
                                )}
                            >
                                <Settings className="h-5 w-5" />
                                {!isCollapsed && <span>Settings</span>}
                            </Link>
                        </TooltipTrigger>
                        {isCollapsed && (
                            <TooltipContent side="right">
                                Settings
                            </TooltipContent>
                        )}
                    </Tooltip>{' '}
                </TooltipProvider>
            </nav>
        </aside>
    );
};

export default AsideNavbar;
