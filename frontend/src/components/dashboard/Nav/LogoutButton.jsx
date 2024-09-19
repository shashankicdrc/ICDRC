'use client';
import { DropdownMenuItem } from '../../ui/dropdown';
import { signOut } from 'next-auth/react';
import React from 'react';
import toast from 'react-hot-toast';

export default function LogoutButton() {
    const logout = () => {
        signOut({
            redirect: true,
            callbackUrl: '/auth/login',
        });
        toast.success('You have successfully logged out.');
    };

    return (
        <DropdownMenuItem className="cursor-pointer" onClick={logout}>
            Logout
        </DropdownMenuItem>
    );
}
