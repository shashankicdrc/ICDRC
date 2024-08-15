'use client';
import React, { Fragment, useState } from 'react';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { useSession } from 'next-auth/react';
import toast from 'react-hot-toast';
import { Loader2 } from 'lucide-react';
import { updateProfile } from '../../../externalAPI/userService';

export default function ChangeName({ data }) {
    const [isLoading, setIsLoading] = React.useState(false);
    const { data: session, update } = useSession();
    const token = session?.user.AccessToken;
    const [name, setname] = useState(data.name);

    const onSubmit = async () => {
        try {
            setIsLoading((prevState) => !prevState);
            const { message, error, data } = await updateProfile(token, {
                name,
            });
            setIsLoading((prevState) => !prevState);
            if (error) return toast.error(error);
            toast.success(message);
            update({
                ...session,
                user: {
                    ...session?.user,
                    name: data.name,
                },
            });
        } catch (error) {
            setIsLoading(false);
            toast.error(error.message);
        }
    };

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                onSubmit();
            }}
            className="space-y-2"
        >
            <div className="space-y-1">
                <Label>Name</Label>
                <Input
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setname(e.target.value)}
                    required
                    minLength={4}
                />
            </div>
            <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                    <Fragment>
                        <Loader2 className="animate-spin w-4 h-4 mr-2" />
                        please wait
                    </Fragment>
                ) : (
                    'Save'
                )}
            </Button>
        </form>
    );
}
