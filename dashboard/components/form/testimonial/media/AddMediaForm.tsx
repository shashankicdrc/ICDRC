'use client'
import mediaSchema from '@/lib/validation/mediaSchema';
import { mediaType } from '@/types/columnsType'
import { zodResolver } from '@hookform/resolvers/zod';
import { useSession } from 'next-auth/react';
import React, { Fragment, useState } from 'react'
import { useForm } from 'react-hook-form';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { z } from 'zod';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Icons } from '@/components/Icons';
import { createMediaAction, updateMediaAction } from '@/action';
import { useParams } from 'next/navigation';


interface Props {
    action: 'edit' | "add"
    data?: mediaType
}

type mediaInputValues = z.infer<typeof mediaSchema>;

export default function AddMediaForm({ action, data }: Props) {
    const session = useSession();
    const token = session.data?.user.AccessToken as string;
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const form = useForm<mediaInputValues>({
        resolver: zodResolver(mediaSchema),
        defaultValues: {
            name: action === 'edit' ? data?.name : '',
            type: action === 'edit' ? data?.type : 'image',
            video: action === 'edit' ? data?.video : undefined,
            image: action === 'edit' ? data?.image : undefined,
        },
    });

    const params = useParams();

    const type = form.watch('type');

    const onSubmit = async (values: mediaInputValues) => {
        console.log('clicked')
        if (!token) return;
        setIsLoading((prevState) => !prevState);
        let error;
        let message;

        switch (action) {
            case 'add':
                const addResponse = await createMediaAction(token, values);
                if (addResponse.error) {
                    error = addResponse.error
                } else {
                    message = addResponse.data
                }
                break;
            case 'edit':
                const updateResponse = await updateMediaAction(token, { ...data, mediaId: params.id });
                if (updateResponse.error) {
                    error = updateResponse.error
                } else {
                    message = updateResponse.data
                }
                break;
            default:
                throw new Error('Invalid action')
        }
        setIsLoading((prevState) => !prevState);
        if (error) {
            return toast.error(error);
        }
        toast.success(message);
        form.reset();
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className={cn("grid item-start gap-4 my-5")}
            >
                <FormField control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter your title" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>What would you like to add?</FormLabel>
                            <FormControl>
                                <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    className="flex flex-col space-y-1"
                                >
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                            <RadioGroupItem value="image" />
                                        </FormControl>
                                        <FormLabel className="font-normal">
                                            Image
                                        </FormLabel>
                                    </FormItem>
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                            <RadioGroupItem value="video" />
                                        </FormControl>
                                        <FormLabel className="font-normal">
                                            Video
                                        </FormLabel>
                                    </FormItem>
                                </RadioGroup>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {type === 'image' ? <FormField control={form.control}
                    name="image"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Image Url</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter your image url" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                /> : <FormField control={form.control}
                    name="video"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Video Url</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter your youtube video url" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                }
                <Button type='submit' className="w-fit">
                    {isLoading ? (
                        <Fragment>
                            <Icons.loader className="mr-2 h-4 w-4 animate-spin" /> please
                            wait...
                        </Fragment>
                    ) : (
                        "Submit"
                    )}
                </Button>
            </form>
        </Form>
    )
}

