'use client';
import React, { Fragment, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Button } from '../../components/ui/button';
import { useRouter, useSearchParams } from 'next/navigation';
import { resetPassword } from '../../externalAPI/userService';
import toast from 'react-hot-toast';
import { Loader2 } from 'lucide-react';

export default function ResetPasswordform() {
    const [isLoading, setisLoading] = useState(false);
    const searchParams = useSearchParams();
    const email = searchParams.get('email');
    const router = useRouter();
    const [passwordFocused, setPasswordFocused] = useState(false);

    const {
        formState: { errors },
        register,
        reset,
        watch,
        handleSubmit,
    } = useForm({
        defaultValues: {
            confirmPassword: '',
            password: '',
            code: '',
        },
    });

    const passwordValue = watch('password');

    // Password validation rules
    const passwordRules = [
        {
            id: 1,
            text: 'At least 8 characters',
            meets: passwordValue?.length >= 8,
        },
        {
            id: 2,
            text: 'Contains at least one uppercase letter',
            meets: /[A-Z]/.test(passwordValue),
        },
        {
            id: 3,
            text: 'Contains at least one lowercase letter',
            meets: /[a-z]/.test(passwordValue),
        },
        {
            id: 4,
            text: 'Contains at least one number',
            meets: /[0-9]/.test(passwordValue),
        },
        {
            id: 5,
            text: 'Contains at least one special character',
            meets: /[!@#$%^&*(),.?":{}|<>]/.test(passwordValue),
        },
    ];

    const allRulesMet = passwordRules.every((rule) => rule.meets);

    const onSubmit = async (values) => {
        if (!email) return;
        setisLoading((prevState) => !prevState);
        const resetData = {
            email,
            ...values,
        };
        const { message, error } = await resetPassword(resetData);
        setisLoading((prevState) => !prevState);
        if (error) return toast.error(error);
        reset();
        toast.success(message);
        router.push('/auth/login');
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
            <div className="space-y-2">
                <Label>Code</Label>
                <Input
                    placeholder="Enter your password reset code"
                    {...register('code', {
                        required: 'Code is required',
                        minLength: {
                            value: 6,
                            message: 'Code must be 6 characters long',
                        },
                        maxLength: {
                            value: 6,
                            message: 'Code must be 6 characters long',
                        },
                    })}
                />
                {errors.code && (
                    <p className="text-destructive text-sm">
                        {errors.code.message}
                    </p>
                )}
            </div>
            <div className="space-y-2">
                <Label>New password</Label>
                <Input
                    placeholder="Enter your new password"
                    {...register('password', {
                        required: 'Password is required',
                        minLength: {
                            value: 8,
                            message:
                                'Password must be at least 8 characters long',
                        },
                        validate: {
                            hasUpperCase: (value) =>
                                /[A-Z]/.test(value) ||
                                'Password must contain at least one uppercase letter',
                            hasLowerCase: (value) =>
                                /[a-z]/.test(value) ||
                                'Password must contain at least one lowercase letter',
                            hasNumber: (value) =>
                                /[0-9]/.test(value) ||
                                'Password must contain at least one number',
                            hasSpecialChar: (value) =>
                                /[!@#$%^&*(),.?":{}|<>]/.test(value) ||
                                'Password must contain at least one special character',
                        },
                    })}
                    onFocus={() => setPasswordFocused(true)}
                    onBlur={() => setPasswordFocused(false)}
                />
                {/* Password Rules Display */}
                {passwordFocused && (
                    <div className="mt-4 p-3">
                        <p className="text-sm font-medium mb-2">
                            Password must contain:
                        </p>
                        <ul className="space-y-1">
                            {passwordRules.map((rule) => (
                                <li
                                    key={rule.id}
                                    className="flex items-center text-sm"
                                >
                                    <span
                                        className={`inline-block text-center w-5 h-5 mr-2 rounded-full ${rule.meets ? 'bg-green-500 text-white' : 'bg-gray-300'}`}
                                    >
                                        {rule.meets ? '✓' : ''}
                                    </span>
                                    <span
                                        className={
                                            rule.meets
                                                ? 'text-green-700'
                                                : 'text-gray-600'
                                        }
                                    >
                                        {rule.text}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {errors.password && (
                    <p className="text-destructive text-sm">
                        {errors.password.message}
                    </p>
                )}
            </div>
            <div className="space-y-2">
                <Label>Confirm password</Label>
                <Input
                    placeholder="Re-enter your password"
                    {...register('confirmPassword', {
                        required: 'Please confirm your password',
                        validate: (value) =>
                            value === watch('password') ||
                            'Passwords do not match',
                    })}
                />
                {errors.confirmPassword && (
                    <p className="text-destructive text-sm">
                        {errors.confirmPassword.message}
                    </p>
                )}
            </div>
            <Button disabled={isLoading}>
                {isLoading ? (
                    <Fragment>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        <span>Please wait</span>
                    </Fragment>
                ) : (
                    <span>Submit</span>
                )}
            </Button>
        </form>
    );
}
