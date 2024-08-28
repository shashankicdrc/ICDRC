import React, { Fragment } from 'react';
import Link from 'next/link';
import { Button } from '../ui/button';

export default function RightMenu() {
    return (
        <Fragment>
            <Button asChild>
                <Link href="/auth/login">Login</Link>
            </Button>
            <Button asChild>
                <Link href="/dashboard/register">Register complaint</Link>
            </Button>
        </Fragment>
    );
}
