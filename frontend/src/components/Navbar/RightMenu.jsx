'use client';
import React, { Fragment } from 'react';
import Link from 'next/link';
import { Button } from '../ui/button';

export default function RightMenu() {
    return (
        <Fragment>
            <Button asChild>
                <Link href="/dashboard/mediation">Refer for Mediation</Link>
            </Button>
            <Button asChild>
                <Link href="/become-mediator">Become a Mediator</Link>
            </Button>
        </Fragment>
    );
}
