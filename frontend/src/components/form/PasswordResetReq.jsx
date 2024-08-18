'use client';
import React, { Fragment, useState } from 'react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Loader2 } from 'lucide-react';
import { resetPasswordReq } from '../../externalAPI/userService';

export default function PasswordResetrequest() {
    const {
        register,
        reset,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            email: '',
        },
    });
    const [isLoading, setisLoading] = useState(false);

    const onSubmit = async (values) => {
        try {
            setisLoading((prevState) => !prevState);
            const { message, error } = await resetPasswordReq(values);
            setisLoading((prevState) => !prevState);
            if (error) {
                return toast.error(error);
            }
            toast.success(message);
            reset();
        } catch (error) {
            setisLoading(false);
            toast.error(error.message);
        }
    };
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-6">
            <div className="space-y-2">
                <Label>Email</Label>
                <Input
                    type="email"
                    placeholder="Enter your current email"
                    {...register('email', {
                        required: 'Email is required',
                    })}
                    className="w-full"
                />
                {errors.email && (
                    <p className="text-destructive">{errors.email.message}</p>
                )}
            </div>
            <Button type="submit" className="w-full">
                {isLoading ? (
                    <Fragment>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        please wait...
                    </Fragment>
                ) : (
                    'Submit'
                )}
            </Button>
        </form>
    );
}
