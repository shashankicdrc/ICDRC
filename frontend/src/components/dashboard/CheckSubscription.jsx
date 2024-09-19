'use client';
import { getUserSubscription } from '@/externalAPI/subscriptionService';
import {
    checkSubscriptionStatus,
    SubscriptionStatus,
} from '@/lib/subscription';
import { useSession } from 'next-auth/react';
import React, { useState, useEffect } from 'react';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '../ui/dialog';
import { Button } from '../ui/button';
import Link from 'next/link';

export default function CheckSubscription() {
    const [isIndSubscriptionActive, setisIndSubscriptionActive] =
        useState(false);
    const [isOrgSubscriptionActive, setisOrgSubscriptionActive] =
        useState(false);
    const { data: session, status } = useSession();
    const token = session?.user.AccessToken;
    const [isOpen, setisOpen] = useState(false);

    useEffect(() => {
        const getSubscription = async () => {
            const { data } = await getUserSubscription(token);
            const indSubscriptionStatus = checkSubscriptionStatus(
                data,
                'Individual',
            );
            const orgSubscriptionStatus = checkSubscriptionStatus(
                data,
                'Organisational',
            );
            if (indSubscriptionStatus === SubscriptionStatus.VALID) {
                setisIndSubscriptionActive(true);
            }

            if (orgSubscriptionStatus === SubscriptionStatus.VALID) {
                setisOrgSubscriptionActive(true);
            }
        };
        if (status === 'authenticated') {
            getSubscription();
        }
    }, [token, status]);

    useEffect(() => {
        if (!isIndSubscriptionActive && !isOrgSubscriptionActive) {
            setisOpen(true);
        }
    }, [isIndSubscriptionActive, isOrgSubscriptionActive]);

    return status === 'authenticated' ? (
        !isIndSubscriptionActive && !isOrgSubscriptionActive ? (
            <Dialog open={isOpen} onOpenChange={setisOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="text-center">
                            Alert!
                        </DialogTitle>
                    </DialogHeader>
                    <DialogDescription>
                        You have no active subscription. Subscribe now to avail
                        best benefits
                    </DialogDescription>
                    <DialogFooter>
                        <Button asChild>
                            <Link href="/dashboard/plan">Subscribe Now</Link>
                        </Button>
                        <DialogClose asChild>
                            <Button type="button" variant="secondary">
                                Close
                            </Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        ) : null
    ) : null;
}
