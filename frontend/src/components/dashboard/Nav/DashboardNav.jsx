'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '../../../lib/utils';
import { CiHome } from 'react-icons/ci';
import {
    Tooltip,
    TooltipProvider,
    TooltipTrigger,
    TooltipContent,
} from '../../ui/tooltip';
import { MdPayment } from 'react-icons/md';
import { NotebookPen, PackageSearch, UserSearch, Handshake } from 'lucide-react';


const DashboardNav = ({ isCollapsed }) => {
    const pathname = usePathname();
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Link
                        href="/dashboard"
                        className={cn(
                            'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary',
                            pathname === '/dashboard'
                                ? ' rounded-lg bg-muted text-primary'
                                : null,
                            isCollapsed ? 'w-fit' : 'w-full',
                        )}
                    >
                        <CiHome className="h-5 w-5" />
                        {!isCollapsed && <span>Dashboard</span>}
                    </Link>
                </TooltipTrigger>
                {isCollapsed && (
                    <TooltipContent side="right">Dashboard</TooltipContent>
                )}
            </Tooltip>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Link
                        href="/dashboard/register"
                        className={cn(
                            'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary',
                            pathname === '/dashboard/registers'
                                ? ' rounded-lg bg-muted text-primary'
                                : null,
                            isCollapsed ? 'w-fit' : 'w-full',
                        )}
                    >
                        <NotebookPen className="h-5 w-5" />
                        {!isCollapsed && <span>Register a Complaint</span>}
                    </Link>
                </TooltipTrigger>
                {isCollapsed && (
                    <TooltipContent side="right">
                        Register a Complaint
                    </TooltipContent>
                )}
            </Tooltip>

            <Tooltip>
                <TooltipTrigger asChild>
                    <Link
                        href="/dashboard/complaints/individual"
                        className={cn(
                            'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary',
                            pathname === '/dashboard/complaints/individual'
                                ? ' rounded-lg bg-muted text-primary'
                                : null,
                            isCollapsed ? 'w-fit' : 'w-full',
                        )}
                    >
                        <UserSearch className="h-5 w-5" />
                        {!isCollapsed && <span>Individual Cases</span>}
                    </Link>
                </TooltipTrigger>
                {isCollapsed && (
                    <TooltipContent side="right">
                        Individual Cases
                    </TooltipContent>
                )}
            </Tooltip>

            <Tooltip>
                <TooltipTrigger asChild>
                    <Link
                        href="/dashboard/complaints/organisational"
                        className={cn(
                            'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary',
                            pathname === '/dashboard/complaints/organisational'
                                ? ' rounded-lg bg-muted text-primary'
                                : null,
                            isCollapsed ? 'w-fit' : 'w-full',
                        )}
                    >
                        <PackageSearch className="h-5 w-5" />
                        {!isCollapsed && <span>Organizational Cases</span>}
                    </Link>
                </TooltipTrigger>
                {isCollapsed && (
                    <TooltipContent side="right">
                        Organisational Cases
                    </TooltipContent>
                )}
            </Tooltip>

            <Tooltip>
                <TooltipTrigger asChild>
                    <Link
                        href="/dashboard/payment/history"
                        className={cn(
                            'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary',
                            pathname === '/dashboard/payment/history'
                                ? ' rounded-lg bg-muted text-primary'
                                : null,
                            isCollapsed ? 'w-fit' : 'w-full',
                        )}
                    >
                        <MdPayment className="h-5 w-5" />
                        {!isCollapsed && <span>Payment History</span>}
                    </Link>
                </TooltipTrigger>
                {isCollapsed && (
                    <TooltipContent side="right">
                        Payment History
                    </TooltipContent>
                )}
            </Tooltip>

            {/* Mediation  */}
            <Tooltip>
                <TooltipTrigger asChild>
                    <Link
                        href="/dashboard/mediation"
                        className={cn(
                            'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary',
                            pathname === '/dashboard/mediation'
                                ? ' rounded-lg bg-muted text-primary'
                                : null,
                            isCollapsed ? 'w-fit' : 'w-full',
                        )}
                    >
                        <Handshake className="h-5 w-5" />
                        {!isCollapsed && <span>Mediation</span>}
                    </Link>
                </TooltipTrigger>
                {isCollapsed && (
                    <TooltipContent side="right">
                        Mediation
                    </TooltipContent>
                )}
            </Tooltip>

        </TooltipProvider>
    );
};

export default DashboardNav;
