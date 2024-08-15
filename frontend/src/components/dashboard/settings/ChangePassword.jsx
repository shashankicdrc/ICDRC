'use client';

import { Loader2 } from 'lucide-react';
import { changePassword } from '../../../externalAPI/userService';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { signOut, useSession } from 'next-auth/react';
import React, { Fragment, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

export default function ChangePassword() {
    const [isLoading, setIsLoading] = useState(false);
    const { data: session } = useSession();
    const token = session?.user.AccessToken;

    const {
        handleSubmit,
        register,
        reset,
        watch,
        formState: { errors },
    } = useForm({
        defaultValues: {
            password: '',
            newPassword: '',
            confirmPassword: '',
        },
        mode: 'onChange',
    });

    const newPassword = watch('newPassword');

    async function onSubmit(values) {
        try {
            setIsLoading(true);
            const { message, error } = await changePassword(token, values);
            setIsLoading(false);
            if (error) {
                return toast.error(error, {
                    duration: 3000,
                    action: {
                        label: 'Undo',
                        onClick: () => console.log('Undo'),
                    },
                });
            }
            toast.success(message, {
                duration: 3000,
                action: {
                    label: 'Undo',
                    onClick: () => console.log('Undo'),
                },
            });
            reset();
            signOut({
                redirect: true,
                callbackUrl: '/auth/login',
            });
        } catch (error) {
            setIsLoading(false);
            toast.error(error.message);
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
            <div>
                <Label>Old Password</Label>
                <Input
                    placeholder="Enter your old password"
                    {...register('password', {
                        required: 'Old Password is required',
                    })}
                />
                {errors.password?.message && (
                    <p className="text-destructive">
                        {errors.password.message}
                    </p>
                )}
            </div>
            <div className="space-y-2">
                <Label>New Password</Label>
                <Input
                    placeholder="Enter your new password"
                    type="password"
                    {...register('newPassword', {
                        required: 'New Password is required',
                        minLength: {
                            value: 8,
                            message: 'Password must be at least 8 characters',
                        },
                    })}
                />
                {errors.newPassword?.message && (
                    <p className="text-destructive">
                        {errors.newPassword?.message}
                    </p>
                )}
            </div>
            <div className="space-y-2 ">
                <Label>Confirm Password</Label>
                <Input
                    placeholder="Confirm your password"
                    type="password"
                    {...register('confirmPassword', {
                        required: 'Confirm Password is required',
                        validate: (value) =>
                            value === newPassword || 'Passwords do not match',
                    })}
                />
                {errors.confirmPassword?.message && (
                    <p className="text-destructive">
                        {errors.confirmPassword.message}
                    </p>
                )}
            </div>
            <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                    <Fragment>
                        <Loader2 className="animate-spin w-4 h-4 mr-2" />
                        Please wait
                    </Fragment>
                ) : (
                    'Change Password'
                )}
            </Button>
        </form>
    );
}
