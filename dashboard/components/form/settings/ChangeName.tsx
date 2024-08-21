
"use client";
import React, { Fragment } from "react";
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
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import changeNameSchema from "@/lib/validation/changeNameSchema";
import type { User } from "next-auth";
import { updateProfile } from "@/externalAPI/adminService";

type ChangeNameInput = z.infer<typeof changeNameSchema>;

interface Props {
    data: User;
}

export default function ChangeName({ data }: Props) {
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const { data: session, update } = useSession();
    const token = session?.user.AccessToken as string;
    const form = useForm<ChangeNameInput>({
        resolver: zodResolver(changeNameSchema),
        defaultValues: {
            name: data.name || "",
        },
        mode: "onChange",
    });

    const onSubmit = async (values: ChangeNameInput) => {
        try {
            setIsLoading((prevState) => !prevState);
            const { message, error, data } = await updateProfile(token, values);
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
            await update({
                ...session,
                user: {
                    ...session?.user,
                    name: data.name,
                },
            });
        } catch (error: any) {
            setIsLoading(false);
            throw new Error(error);
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter your name" {...field} />
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
                        "Save"
                    )}
                </Button>
            </form>
        </Form>
    );
}
