'use client';
import { usePathname } from 'next/navigation';
import React from 'react';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '../../ui/breadcrumb';

export const DashboardBreadCrumb = () => {
    const pathname = usePathname();
    const pathSegments = pathname.split('/').filter(Boolean);
    return (
        <Breadcrumb className="hidden md:flex">
            <BreadcrumbList>
                {pathSegments.map((segment, index) => {
                    const href =
                        '/' + pathSegments.slice(0, index + 1).join('/');
                    const isLast = index === pathSegments.length - 1;
                    return !isLast ? (
                        <React.Fragment>
                            <BreadcrumbItem>
                                <BreadcrumbLink
                                    href={href}
                                    className="capitalize"
                                >
                                    {decodeURIComponent(segment)}
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                        </React.Fragment>
                    ) : (
                        <BreadcrumbItem>
                            <BreadcrumbPage className="capitalize">
                                {decodeURIComponent(segment)}
                            </BreadcrumbPage>
                        </BreadcrumbItem>
                    );
                })}
            </BreadcrumbList>
        </Breadcrumb>
    );
};
