'use client'
import { useSession } from "next-auth/react";
import { Fragment, useCallback, useEffect, useState } from "react";
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
import { createBlogAction, updateBlogAction } from "@/action";
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

interface tagsObject {
    id: string;
    name: string;
}

function generateId() {
    return Math.floor(100 + Math.random() * 900).toString();
}

export function AddBlogForm({ action, data }: Props) {
    const session = useSession();
    const token = session.data?.user.AccessToken as string;
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [tags, settags] = useState<string>("");
    const [tagsArray, setTagsArray] = useState<tagsObject[]>([]);
    const [content, setContent] = useState('')
    const router = useRouter()
    const params = useParams();

    const config = {
        readonly: false,
    };

    useEffect(() => {
        if (action === 'edit') {
            setContent(data?.content as string)
            if (data?.keywords) {
                setTagsArray(data?.keywords.map(item => ({ id: generateId(), name: item })));
            }
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
        if (tagsArray.length < 5) {
            return toast.info("Please add atleast 5 tags");
        }
        const keywords = tagsArray.map(item => item.name)
        setIsLoading((prevState) => !prevState);
        const data = {
            ...values,
            content,
            keywords
        }
        let error;
        let message;
        switch (action) {
            case 'add':
                const addResponse = await createBlogAction(token, data);
                if (addResponse.error) {
                    error = addResponse.error
                } else {
                    message = addResponse.data
                }
                break;
            case 'edit':
                const updateResponse = await updateBlogAction(token, { ...data, blogId: params.id });
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
        setTagsArray([])
        setContent('')
        router.back()
    };

    const handleChangeTags = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        settags(value);
    };

    const handleKeyDown = async (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && tags.trim()) {
            e.preventDefault();
            handleAddTag(generateId(), tags,);
        }
    };


    const handleAddTag = useCallback(
        async (id: string, name: string) => {
            const isTagExist = tagsArray.some((item) => item.id === id);
            if (isTagExist) {
                return toast(`${name} already exists.`);
            }
            setTagsArray((prevState) => [...prevState, { id, name }]);
            settags("");
        },
        [tagsArray, token],
    );

    const handleRemoveTags = useCallback((id: string) => {
        setTagsArray((prevState) => prevState.filter((item) => item.id !== id));
    }, []);

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
                            <FormLabel>Title</FormLabel>
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
                <div className="relative">
                    <div
                        className={cn(
                            "border bg-accent rounded-md border-input flex flex-wrap items-center px-2 py-1 space-y-1",
                        )}
                    >
                        <div className="flex flex-wrap gap-1 items-center">
                            {tagsArray.map((item) => (
                                <Button
                                    type="button"
                                    key={item.id}
                                    size="sm"
                                    variant="outline"
                                    className="h-6 font-medium space-x-1"
                                >
                                    <span className="capitalize">{item.name}</span>
                                    <Icons.close
                                        onClick={() => handleRemoveTags(item.id)}
                                        size={14}
                                    />
                                </Button>
                            ))}
                        </div>
                        <input
                            type="text"
                            className="outline-none px-1.5 py-2 h-10 my-1 text-sm bg-transparent w-full placeholder:text-muted-foreground placeholder:text-sm"
                            placeholder="Add blog keywords"
                            value={tags}
                            disabled={tagsArray.length >= 15}
                            onChange={handleChangeTags}
                            onKeyDown={handleKeyDown}
                        />
                    </div>
                </div>
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
