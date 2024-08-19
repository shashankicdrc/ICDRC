
"use client";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { signOut } from "next-auth/react";
import React from "react";
import { toast } from "sonner";

export default function LogoutButton() {
    const logout = () => {
        signOut({
            redirect: true,
            callbackUrl: "/auth/login",
        });
        toast.info("You are logout successfully.", {
            action: {
                label: "Undo",
                onClick: () => console.log("undo"),
            },
        });
    };

    return (
        <DropdownMenuItem className="cursor-pointer" onClick={logout}>
            Logout
        </DropdownMenuItem>
    );
}
