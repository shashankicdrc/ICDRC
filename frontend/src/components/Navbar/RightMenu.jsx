'use client';
import React, { Fragment } from 'react';
import Link from 'next/link';
import { Button } from '../ui/button';
import { useSession } from 'next-auth/react';

export default function RightMenu() {
    const { status } = useSession();
    return (
        <Fragment>
            {status !== 'authenticated' ? (
                <Button asChild>
                    <Link href="/auth/login">Login/Sign Up</Link>
                </Button>
            ) : (
                <Button asChild>
                    <Link href="/dashboard">Dashboard</Link>
                </Button>
            )}
            <Button asChild>
                <Link href="/dashboard/register">Register Complaints</Link>
            </Button>
        </Fragment>
    );
}
