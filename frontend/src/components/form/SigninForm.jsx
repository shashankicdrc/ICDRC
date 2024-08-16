'use client';
import { useForm } from 'react-hook-form';
import Loader from '../Loader/page';
import { Fragment, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useRouter, useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';

const SigninForm = () => {
    const [isLoading, setIsLoading] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    const searchParams = useSearchParams();

    const onSubmit = async (values) => {
        try {
            setIsLoading((prevState) => !prevState);
            const result = await signIn('credentials', {
                redirect: false,
                email: values.email,
                password: values.password,
            });
            setIsLoading((prevState) => !prevState);
            if (result?.error) {
                toast.error(result.error);
                return;
            }
            reset();
            toast.success('You are successfully signin.');
            if (searchParams.has('url')) {
                location.href = decodeURIComponent(searchParams.get('url'));
            } else {
                location.href = '/dashboard';
            }
        } catch (error) {
            setIsLoading((prevState) => !prevState);
            toast.error(error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
            <div className="space-y-1">
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Email
                </label>
                <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    {...register('email', {
                        required: 'Email is required',
                        pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: 'Invalid email address',
                        },
                    })}
                />
                {errors.email && (
                    <p className="text-destructive">{errors.email.message}</p>
                )}
            </div>
            <div className="space-y-1">
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Password
                </label>
                <input
                    type="password"
                    placeholder="Enter your password"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    {...register('password', {
                        required: 'Password is required',
                        minLength: {
                            value: 6,
                            message: 'Password must be at least 6 characters',
                        },
                    })}
                />
                {errors.password && (
                    <p className="text-destructive">
                        {errors.password.message}
                    </p>
                )}
            </div>
            <button
                disabled={isLoading}
                type="submit"
                className=" inline-flex items-center h-10 py-1 justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90"
            >
                {isLoading ? (
                    <Fragment>
                        <Loader color="white" />
                        <span className="ml-2">Please wait</span>
                    </Fragment>
                ) : (
                    'Sign in'
                )}
            </button>
        </form>
    );
};

export default SigninForm;
