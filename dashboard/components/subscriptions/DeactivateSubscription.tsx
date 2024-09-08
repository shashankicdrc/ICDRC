
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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { subscriptionType } from "@/types/columnsType";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/Icons";
import { deactivateSubscriptionAction } from "@/action";
import { toast } from "sonner";

interface Props {
    subscription: subscriptionType;
}

const formSchema = z.object({
    isDeleted: z.boolean({ message: "Please choose yes or no" }),
});

type formInputType = z.infer<typeof formSchema>;

export const DeactivateSubscriptionForm = ({ subscription }: Props) => {
    const [open, setopen] = React.useState<boolean>(false);
    const { data: session } = useSession();
    const isDisabled = session?.user.role !== "admin";
    const [isLoading, setisLoading] = React.useState<boolean>(false);
    const token = session?.user.AccessToken as string;

    const form = useForm<formInputType>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            isDeleted: subscription.isDeleted
        }
    });

    async function onSubmit(values: formInputType) {
        try {
            if (!token) return;
            setisLoading((prevState) => !prevState);
            const Data = {
                subscriptionId: subscription._id,
                ...values,
            };
            const { message, error } = await deactivateSubscriptionAction(token, Data);
            setisLoading((prevState) => !prevState);
            if (error) {
                return toast.error(error);
            }
            toast.success(message);
            form.reset();
            setopen(false);

        } catch (error: any) {
            toast.error(error.message);
            setisLoading(false)
        }
    }

    return (
        <Popover open={open} onOpenChange={setopen} >
            <PopoverTrigger
                disabled={isDisabled}
                className="py-1.5 text-sm bg-accent rounded-sm flex px-2 cursor-pointer w-full disabled:cursor-not-allowed"
            >
                Deactivate
            </PopoverTrigger>
            < PopoverContent side="left" align="start" >
                <Form {...form} >
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" >
                        <FormField
                            control={form.control}
                            name="isDeleted"
                            render={({ field }) => (
                                <FormItem className="space-y-3" >
                                    <FormLabel>Would you like to deactivate the subscription? </FormLabel>
                                    <FormControl >
                                        <RadioGroup
                                            onValueChange={(value) => field.onChange(value === "true")}
                                            defaultValue={field.value ? "true" : "false"} className="flex flex-col space-y-1"
                                        >
                                            {
                                                [{ label: "Yes", value: true }, { label: "No", value: false }].map((item) => (
                                                    <FormItem key={item.label} className="flex items-center space-x-3 space-y-0" >
                                                        <FormControl>
                                                            <RadioGroupItem value={item.value ? "true" : "false"} />
                                                        </FormControl>
                                                        < FormLabel className="font-normal capitalize" >
                                                            {item.label}
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
