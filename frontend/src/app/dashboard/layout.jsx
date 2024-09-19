'use client';
import React from 'react';
import { useSession } from 'next-auth/react';
import { cn } from '../../lib/utils';
import getNameLetter from '../../lib/getNameLetter';
import AsideNavbar from '../../components/dashboard/Nav/AsideNavbar';
import MobileNavbar from '../../components/dashboard/Nav/MobileNav';
import LogoutButton from '../../components/dashboard/Nav/LogoutButton';
import {
    Avatar,
    AvatarImage,
    AvatarFallback,
} from '../../components/ui/avatar';
import {
    DropdownMenu,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '../../components/ui/dropdown';
import Link from 'next/link';
import { DashboardBreadCrumb } from '.././../components/dashboard/Nav/DashboardBreadCrumb';
import CheckSubscriptionActive from '@/components/dashboard/Nav/Subscription';

export default function layout({ children }) {
    const [isCollapsed, setIsCollapsed] = React.useState(false);
    const { data: session } = useSession();
    return (
        <div className="flex min-h-screen w-full flex-col bg-muted/40">
            <AsideNavbar
                isCollapsed={isCollapsed}
                setIsCollapsed={setIsCollapsed}
            />
            <div
                className={cn(
                    'flex flex-col md:py-4',
                    isCollapsed ? 'md:pl-[3.5rem]' : 'md:pl-[15rem]',
                )}
            >
                <header className="sticky top-0 z-30 flex justify-between h-14 items-center gap-4 border-b bg-background px-4 md:static md:h-auto md:border-0 md:bg-transparent md:px-6">
                    <MobileNavbar />
                    <DashboardBreadCrumb />
                    <div className="flex items-center space-x-4">
                        <div className="hidden md:flex md:items-center md:space-x-2">
                            <CheckSubscriptionActive type="Individual" />
                            <CheckSubscriptionActive type="Organisational" />
                        </div>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <div className="flex items-center space-x-2">
                                    <Avatar className="cursor-pointer">
                                        <AvatarImage
                                            src={session?.user.image}
                                        />
                                        <AvatarFallback className="uppercase">
                                            {session?.user.name
                                                ? getNameLetter(
                                                      session?.user.name,
                                                  )
                                                : 'DS'}
                                        </AvatarFallback>
                                    </Avatar>
                                </div>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuLabel>
                                    My Account
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                    className="cursor-pointer"
                                    asChild
                                >
                                    <Link href="/dashboard/settings">
                                        Settings
                                    </Link>
                                </DropdownMenuItem>
                                <LogoutButton />
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </header>
                {children}
            </div>
        </div>
    );
}
