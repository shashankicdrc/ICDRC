'use client'
import { useSession } from "next-auth/react";
import { Fragment, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import { createBlogSchema } from "@/lib/validation/createBlogSchema";
import { cn } from "@/lib/utils";
import { addTeamAction, updateTeamAction } from "@/action";
import { Icons } from "@/components/Icons";
import { Textarea } from "@/components/ui/textarea";
import { useParams, useRouter } from "next/navigation";
import { teamType } from "@/types/teamType";


type teamValuesType = z.infer<typeof createBlogSchema>;

interface Props {
    action: 'edit' | "add"
    data?: teamType
}

export function AddTeamForm({ action, data }: Props) {
    const session = useSession();
    const token = session.data?.user.AccessToken as string;
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const router = useRouter()
    const params = useParams();

    const form = useForm<teamValuesType>({
        resolver: zodResolver(createBlogSchema),
        defaultValues: {
            name: action === 'edit' ? data?.name : '',
            description: action === 'edit' ? data?.description : '',
            image: action === 'edit' ? data?.image : '',
        },
    });

    const onSubmit = async (values: teamValuesType) => {
        if (!token) return;
        setIsLoading((prevState) => !prevState);
        const data = {
            ...values,
        }
        let error;
        let message;
        switch (action) {
            case 'add':
                const addResponse = await addTeamAction(token, data);
                if (addResponse.error) {
                    error = addResponse.error
                } else {
                    message = addResponse.data
                }
                break;
            case 'edit':
                const updateResponse = await updateTeamAction(token, { ...data, teamId: params.id });
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
        router.back()
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className={cn("grid item-start gap-4 my-5")}
            >
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter experts name" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="image"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Image Url</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter experts image url" {...field} />
                            </FormControl>
                            <FormDescription>Please provide image url into 400x400 px.</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Give a short description about experts."
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" disabled={isLoading} className="w-fit">
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
    );
}
