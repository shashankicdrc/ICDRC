
"use client";
import React, { Fragment } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { z } from "zod";
import { Icons } from "@/components/Icons";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { createTestimonialAction, updateTestimonialAction } from "@/action";
import addTestimonialSchema from "@/lib/validation/addTestimonialSchema";
import { Textarea } from "@/components/ui/textarea";

type testimonialInputType = z.infer<typeof addTestimonialSchema>;

interface Props {
    closeSheet: (value: boolean) => void;
    action: "add" | "edit";
    data?: any;
}

export const AddTestimonialForm = ({ closeSheet, data, action }: Props) => {
    console.log('get', data, action)
    const form = useForm<testimonialInputType>({
        resolver: zodResolver(addTestimonialSchema),
        defaultValues: {
            name: action === "edit" ? data.name ?? "" : "",
            review: action === "edit" ? data.review ?? "" : "",
            stars: action === "edit" ? data.stars ?? "" : "",
            designation: action === "edit" ? data.designation ?? "" : "",
        },
    });

    const { data: session } = useSession();
    const token = session?.user.AccessToken as string;
    const [isLoading, setisLoading] = React.useState<boolean>(false);

    async function onSubmit(values: testimonialInputType) {
        try {
            setisLoading((prevState) => !prevState);
            let message = "";
            let error = "";
            switch (action) {
                case "add":
                    const addResponse = await createTestimonialAction(token, values);
                    if (addResponse.error) {
                        error = addResponse.error;
                    } else {
                        message = addResponse.data as string;
                    }
                    break;
                case "edit":
                    const editResponse = await updateTestimonialAction(token, {
                        ...values,
                        testimonialId: data._id,
                    });
                    if (editResponse.error) {
                        error = editResponse.error;
                    } else {
                        message = editResponse.data as string;
                    }
                    break;
            }
            if (error) {
                toast.error(error, {
                    action: {
                        label: "Undo",
                        onClick: () => console.log("Undo"),
                    },
                });
                setisLoading((prevState) => !prevState);
            } else {
                setisLoading((prevState) => !prevState);
                toast.success(message, {
                    action: {
                        label: "Undo",
                        onClick: () => console.log("Undo"),
                    },
                });
                closeSheet(false);
            }
        } catch (error: any) {
            setisLoading(false);
            throw new Error(error);
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 my-5">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Enter person name"
                                    {...field}
                                    onKeyDown={(e) => {
                                        console.log(e.code);
                                    }}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="designation"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Designation</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Enter designation of the person"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="stars"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Stars</FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    placeholder="Enter stars value"
                                    min={1}
                                    max={5}
                                    {...field}
                                    onChange={(e) => field.onChange(e.target.valueAsNumber)}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="review"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Review</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Write a review" {...field} />
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
                        <span>Submit</span>
                    )}
                </Button>
            </form>
        </Form>
    );
};
