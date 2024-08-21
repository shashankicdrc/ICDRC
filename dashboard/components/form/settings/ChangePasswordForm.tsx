
"use client";
import { changePassword } from "@/externalAPI/adminService";
import PasswordSchema from "@/lib/validation/changePasswordSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Icons } from "@/components/Icons";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useSession } from "next-auth/react";
import React, { Fragment } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export type changePasswordInput = z.infer<typeof PasswordSchema>;

export default function ChangePassword() {
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const { data: session } = useSession();
    const token = session?.user.AccessToken as string;
    const form = useForm<changePasswordInput>({
        resolver: zodResolver(PasswordSchema),
        defaultValues: {
            password: "",
            newPassword: "",
            confirmPassword: "",
        },
        mode: "onChange",
    });

    async function onSubmit(values: changePasswordInput) {
        try {
            setIsLoading((prevState) => !prevState);
            const { message, error } = await changePassword(token, values);
            setIsLoading((prevState) => !prevState);
            if (error)
                return toast.error(error, {
                    duration: 3000,
                    action: {
                        label: "Undo",
                        onClick: () => console.log("Undo"),
                    },
                });
            toast.success(message, {
                duration: 3000,
                action: {
                    label: "Undo",
                    onClick: () => console.log("Undo"),
                },
            });
            form.reset();
        } catch (error: any) {
            setIsLoading(false);
            toast.error(error.messgae)
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Old Password</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter your old password" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="newPassword"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>New Password</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter your new password" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel> Confirm password</FormLabel>
                            <FormControl>
                                <Input placeholder="Confirm your password" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" disabled={isLoading}>
                    {isLoading ? (
                        <Fragment>
                            <Icons.loader className="animate-spin w-4 h-4 mr-2" />
                            please wait
                        </Fragment>
                    ) : (
                        "Change password"
                    )}
                </Button>
            </form>
        </Form>
    );
}
