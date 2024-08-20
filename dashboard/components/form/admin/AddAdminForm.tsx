
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
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { addAdminSchema } from "@/lib/validation/addAdminSchema";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { adminRoleEnum } from "@/lib/commonEnum";
import { addAdminAction } from "@/action";

type Inputs = z.infer<typeof addAdminSchema>;

interface Props {
    closeSheet: (value: boolean) => void;
}

export const AddAdminForm = ({ closeSheet }: Props) => {
    const [isLoading, setisLoading] = React.useState<boolean>(false);
    const form = useForm<Inputs>({
        resolver: zodResolver(addAdminSchema),
        defaultValues: {
            email: "",
            password: "",
            role: undefined,
            name: "",
            confirmPassword: "",
        },
    });

    const { data: session } = useSession();
    const token = session?.user.AccessToken as string;

    const onSubmit = async (values: Inputs) => {
        try {
            setisLoading((prevState) => !prevState);
            const { data, error } = await addAdminAction(token, values);
            setisLoading((prevState) => !prevState);

            if (error) {
                return toast.error(error, {
                    action: {
                        label: "Undo",
                        onClick: () => console.log("Undo"),
                    },
                });
            }
            toast.success(data, {
                action: {
                    label: "Undo",
                    onClick: () => console.log("Undo"),
                },
            });
            closeSheet(true);
        } catch (error: any) {
            setisLoading(false);
            throw new Error(error);
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-2 my-5">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter admin name" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />{" "}
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
                />
                <FormField
                    control={form.control}
                    name="role"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Role</FormLabel>
                            <Select
                                onValueChange={field.onChange}
                                value={field.value}
                                defaultValue={field.value}
                            >
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select admin role" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem
                                        value={adminRoleEnum.subadmin}
                                        className="capitalize"
                                    >
                                        {adminRoleEnum.subadmin}
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />
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
                <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Confirm Password</FormLabel>
                            <FormControl>
                                <Input placeholder="Re-Enter you password" {...field} />
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
                        <span>Save</span>
                    )}
                </Button>
            </form>
        </Form>
    );
};
