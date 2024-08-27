'use client';
import { Button } from '@chakra-ui/react';
import { signIn } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import React from 'react';

export default function AuthForm() {
    const searchParams = useSearchParams();
    const googleHandler = () => {
        const callbackUrl = decodeURIComponent(
            searchParams.get('url') || '/dashboard',
        );
        signIn('google', { callbackUrl });
    };

    return (
        <div className="flex items-center gap-5">
            <Button
                variant={'outline'}
                onClick={googleHandler}
                className="w-full"
            >
                <svg
                    aria-hidden="true"
                    focusable="false"
                    className="mr-2 h-4 w-4"
                    data-prefix="fab"
                    data-icon="google"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 488 512"
                >
                    <path
                        fill="currentColor"
                        d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
                    ></path>
                </svg>
                Google
            </Button>
            <Button
                variant={'outline'}
                onClick={googleHandler}
                className="w-full"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="mr-2 h-4 w-4"
                >
                    <path
                        d="M15.4977 12.8803L15.9326 10.1198H13.2539V8.32546C13.2539 7.57064 13.6278 6.83307 14.8237 6.83307H16.0587V4.48234C15.3395 4.36776 14.6128 4.30577 13.8844 4.29688C11.6797 4.29687 10.2403 5.62104 10.2403 8.0149V10.1198H7.79639V12.8803H10.2403V19.5572H13.2539V12.8803H15.4977Z"
                        fill="currentColor"
                    />
                </svg>
                Facebook
            </Button>
        </div>
    );
}
