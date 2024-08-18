import React from 'react';
import {
    AlertDialog,
    AlertDialogTitle,
    AlertDialogTrigger,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogDescription,
} from '../../../../components/ui/alert-dialog';
import {
    Card,
    CardTitle,
    CardHeader,
    CardContent,
    CardDescription,
} from '../../../../components/ui/card';
import ResetPasswordform from '../../../../components/form/ResetPasswordForm';

export default function page({ searchParams }) {
    const { email } = searchParams;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return (
            <AlertDialog defaultOpen={true}>
                <AlertDialogTrigger></AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            Invalid Link or Broken Link
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            The link has been broken. Please check the link
                            agian or refresh the page.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                </AlertDialogContent>
            </AlertDialog>
        );
    }
    return (
        <main className="container flex items-center justify-center min-h-screen">
            <div className="w-full max-w-[400px] 2xl:max-w-md">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl">
                            Reset Your Password
                        </CardTitle>
                        <CardDescription>
                            Reset your password by filling the below details.
                            Click Submit when you are done.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-4">
                        <ResetPasswordform />
                    </CardContent>
                </Card>
            </div>
        </main>
    );
}
