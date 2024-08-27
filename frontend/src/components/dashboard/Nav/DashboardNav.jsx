'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '../../../lib/utils';
import { CiEdit, CiHome } from 'react-icons/ci';
import { GoProjectRoadmap } from 'react-icons/go';
import {
    Tooltip,
    TooltipProvider,
    TooltipTrigger,
    TooltipContent,
} from '../../ui/tooltip';
import { MdPayment } from 'react-icons/md';
import { ShieldQuestion } from 'lucide-react';

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
                        <CiEdit className="h-5 w-5" />
                        {!isCollapsed && <span>Register</span>}
                    </Link>
                </TooltipTrigger>
                {isCollapsed && (
                    <TooltipContent side="right">
                        Registers Complaints
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
                        <GoProjectRoadmap className="h-5 w-5" />
                        {!isCollapsed && <span>Individual Case</span>}
                    </Link>
                </TooltipTrigger>
                {isCollapsed && (
                    <TooltipContent side="right">
                        Individual Complaints
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
                        <ShieldQuestion className="h-5 w-5" />
                        {!isCollapsed && <span>Organizational Case</span>}
                    </Link>
                </TooltipTrigger>
                {isCollapsed && (
                    <TooltipContent side="right">
                        Organisational Complaints
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
        </TooltipProvider>
    );
};

export default DashboardNav;
