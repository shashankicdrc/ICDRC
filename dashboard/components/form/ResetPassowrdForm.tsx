
"use client";
import React, { Fragment, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { resetPasswordSchema } from "@/lib/validation/ResetPasswordSchema";
import { Icons } from "@/components/Icons";
import { toast } from "sonner";
import { resetPassword } from "@/externalAPI/adminService";

export type Inputs = z.infer<typeof resetPasswordSchema>;

export default function ResetPasswordform() {
    const [isLoading, setisLoading] = useState<boolean>(false);
    const searchParams = useSearchParams();
    const email = searchParams.get("email");
    const router = useRouter();

    const form = useForm<Inputs>({
        resolver: zodResolver(resetPasswordSchema),
        defaultValues: {
            confirmPassword: "",
            password: "",
            code: "",
        },
    });
    const onSubmit = async (values: Inputs) => {
        if (!email) return;
        setisLoading((prevState) => !prevState);
        const resetData = {
            email,
            ...values,
        };
        const { message, error } = await resetPassword(resetData);
        setisLoading((prevState) => !prevState);
        if (error) return toast.error(error);
        form.reset();
        toast.success(message);
        router.push("/auth/login");
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
                <FormField
                    control={form.control}
                    name="code"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Code</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Enter your password reset code"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>New password</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter your new password" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                ></FormField>
                <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Confirm password</FormLabel>
                            <FormControl>
                                <Input placeholder="Re-enter you password" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                ></FormField>
                <Button disabled={isLoading}>
                    {isLoading ? (
                        <Fragment>
                            <Icons.loader className="mr-2 h-4 w-4 animate-spin" />
                            <span>Please wait</span>
                        </Fragment>
                    ) : (
                        <span>Submit</span>
                    )}
                </Button>
            </form>
        </Form>
    );
}
