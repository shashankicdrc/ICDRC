
"use client";
import React, { Fragment } from "react";
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
import { Icons } from "@/components/Icons";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { authSchma } from "@/lib/validation/authSchema";
import { useSearchParams, useRouter } from "next/navigation";
import { toast } from "sonner";

type Inputs = z.infer<typeof authSchma>;

export const LoginForm = () => {
    const [isLoading, setisLoading] = React.useState<boolean>(false);

    const form = useForm<Inputs>({
        resolver: zodResolver(authSchma),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const router = useRouter();
    const searchParams = useSearchParams();

    const onSubmit = async (values: Inputs) => {
        try {
            setisLoading(true);
            const result = await signIn("credentials", {
                redirect: false,
                email: values.email,
                password: values.password,
            });

            if (result?.error) {
                toast.error(result.error, {
                    action: {
                        label: "Undo",
                        onClick: () => console.log("Undo"),
                    },
                });
                setisLoading(false);
            } else {
                setisLoading(false);
                toast.success("You are successfully signin", {
                    action: {
                        label: "Undo",
                        onClick: () => console.log("Undo"),
                    },
                });
                const url = searchParams.get("url") || "/dashboard";
                router.push(url);
            }
        } catch (error: any) {
            setisLoading(false);
            throw new Error(error);
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter you email" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                ></FormField>
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter you password" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button disabled={isLoading}>
                    {isLoading ? (
                        <Fragment>
                            <Icons.loader className="mr-2 h-4 w-4 animate-spin" />
                            <span>Please wait</span>
                        </Fragment>
                    ) : (
                        <span>Signin</span>
                    )}
                </Button>
            </form>
        </Form>
    );
};
