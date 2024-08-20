
"use client";
import React, { Fragment } from "react";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { useSession } from "next-auth/react";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { z } from "zod";
import { adminRoleEnum } from "@/lib/commonEnum";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { adminType } from "@/types/columnsType";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/Icons";
import { changeRoleAction } from "@/action";
import { toast } from "sonner";

interface Props {
    admin: adminType;
}

const formSchema = z.object({
    role: z.nativeEnum(adminRoleEnum, { message: "Role cannot be empty." }),
});

type roleInputType = z.infer<typeof formSchema>;

export const ChangeRoleForm = ({ admin }: Props) => {
    const [open, setopen] = React.useState<boolean>(false);
    const { data: session } = useSession();
    const isDisabled = session?.user.role !== "admin";
    const [isLoading, setisLoading] = React.useState<boolean>(false);
    const token = session?.user.AccessToken as string;

    const form = useForm<roleInputType>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            role: admin.role as adminRoleEnum,
        },
    });

    async function onSubmit(values: roleInputType) {
        if (!token) return;
        setisLoading((prevState) => !prevState);
        const changeRoleData = {
            adminId: admin._id,
            ...values,
        };
        const { message, error } = await changeRoleAction(token, changeRoleData);
        setisLoading((prevState) => !prevState);
        if (error) {
            return toast.error(error);
        }
        toast.success(message);
        form.reset();
        setopen(false);
    }

    return (
        <Popover open={open} onOpenChange={setopen} >
            <PopoverTrigger
                disabled={isDisabled}
                className="py-1.5 text-sm bg-accent rounded-sm flex px-2 cursor-pointer w-full disabled:cursor-not-allowed"
            >
                Change Role
            </PopoverTrigger>
            < PopoverContent side="left" align="start" >
                <Form {...form} >
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" >
                        <FormField
                            control={form.control}
                            name="role"
                            render={({ field }) => (
                                <FormItem className="space-y-3" >
                                    <FormLabel>Change Role </FormLabel>
                                    < FormControl >
                                        <RadioGroup
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                            className="flex flex-col space-y-1"
                                        >
                                            {
                                                Object.values(adminRoleEnum).map((item) => (
                                                    <FormItem className="flex items-center space-x-3 space-y-0" >
                                                        <FormControl>
                                                            <RadioGroupItem value={item} />
                                                        </FormControl>
                                                        < FormLabel className="font-normal capitalize" >
                                                            {item}
                                                        </FormLabel>
                                                    </FormItem>
                                                ))
                                            }
                                        </RadioGroup>
                                    </FormControl>
                                    < FormMessage />
                                </FormItem>
                            )}
                        />{" "}
                        < Button type="submit" disabled={isLoading} >
                            {
                                isLoading ? (
                                    <Fragment>
                                        <Icons.loader className="mr-2 h-4 w-4 animate-spin" />
                                        Please wait...
                                    </Fragment>
                                ) : (
                                    "Submit"
                                )}
                        </Button>
                    </form>
                </Form>
            </PopoverContent>
        </Popover>
    );
};
