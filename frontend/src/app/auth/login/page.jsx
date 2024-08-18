'use client';
import React, { Suspense } from 'react';
import SigninForm from '../../../components/form/SigninForm';
import AuthForm from '../../../components/form/AuthForm';
import Link from 'next/link';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogTitle,
    DialogTrigger,
} from '../../../components/ui/dialog';
import { Button } from '../../../components/ui/button';
import dynamic from 'next/dynamic';

const PasswordResetReq = dynamic(
    () => import('../../../components/form/PasswordResetReq'),
);

export default function page() {
    return (
        <section className="border max-w-lg w-full px-5 py-5 rounded-md my-5">
            <div className="space-y-1">
                <h2 className="text-2xl font-bold">Login</h2>
            </div>
            <div className="grid gap-4 my-5">
                <AuthForm />
                <div className="single-signin relative">
                    <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-background px-2 text-muted-foreground">
                            Or continue with
                        </span>
                    </div>
                </div>
                <Suspense>
                    <SigninForm />
                </Suspense>
            </div>
            <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="text-sm text-muted-foreground">
                    <span className="mr-1 hidden sm:inline-block">
                        Don&apos;t have an account?
                    </span>
                    <Link
                        aria-label="Sign up"
                        href="/auth/signup"
                        className="text-primary underline-offset-4 transition-colors hover:underline"
                    >
                        Sign up
                    </Link>
                </div>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button aria-label="Reset password" variant="link">
                            Reset password
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogTitle>Reset password request</DialogTitle>
                        <DialogDescription>
                            We will send a verification email to your existing
                            email. Please ensure that you have type correct
                            email.
                        </DialogDescription>
                        <PasswordResetReq />
                    </DialogContent>
                </Dialog>
            </div>{' '}
        </section>
    );
}
