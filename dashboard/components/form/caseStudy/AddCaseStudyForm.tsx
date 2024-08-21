'use client'
import { useSession } from "next-auth/react";
import { Fragment, useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import { createBlogSchema } from "@/lib/validation/createBlogSchema";
import { cn } from "@/lib/utils";
import { createCaseStudyAction, updateCaseStudyAction } from "@/action";
import { Icons } from "@/components/Icons";
import { Textarea } from "@/components/ui/textarea";
import dynamic from 'next/dynamic'
import { blogType } from "@/types/columnsType";
import { useParams, useRouter } from "next/navigation";

const JoditEditorComponent = dynamic(() => import("@/components/JodEditorComp"), { ssr: false })

type blogInputValues = z.infer<typeof createBlogSchema>;

interface Props {
    action: 'edit' | "add"
    data?: blogType
}

export function AddCaseStudyForm({ action, data }: Props) {
    const session = useSession();
    const token = session.data?.user.AccessToken as string;
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [content, setContent] = useState('')
    const router = useRouter()
    const params = useParams();

    const config = {
        readonly: false,
    };

    useEffect(() => {
        if (action === 'edit') {
            setContent(data?.content as string)

        }
    }, [action])

    const form = useForm<blogInputValues>({
        resolver: zodResolver(createBlogSchema),
        defaultValues: {
            name: action === 'edit' ? data?.name : '',
            description: action === 'edit' ? data?.description : '',
            image: action === 'edit' ? data?.image : '',
        },
    });

    const onSubmit = async (values: blogInputValues) => {
        if (!token) return;
        setIsLoading((prevState) => !prevState);
        const data = {
            ...values,
            content,
        }
        let error;
        let message;
        switch (action) {
            case 'add':
                const addResponse = await createCaseStudyAction(token, data);
                if (addResponse.error) {
                    error = addResponse.error
                } else {
                    message = addResponse.data
                }
                break;
            case 'edit':
                const updateResponse = await updateCaseStudyAction(token, { ...data, caseStudyId: params.id });
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
        setContent('')
        router.back()
    };


    const updateContent = (value: string) => setContent(value)

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
                                <Input placeholder="Battle between SQL and NOSQL" {...field} />
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
                                <Input placeholder="Enter your image url" {...field} />
                            </FormControl>
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
                                    placeholder="The Battle between SQL and NoSQL: Choosing the Right Database for Your Web Application."
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <JoditEditorComponent content={content} setContent={updateContent} config={config} />
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
