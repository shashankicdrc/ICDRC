import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import React, { Fragment } from "react";
import { blogType } from "@/types/columnsType";
import { Icons } from "../Icons";
import { AlertDeleteBlog } from "./DeleteBlog";

interface BlogItemProps {
    data: blogType;
}

export default function BlogItem({ data }: BlogItemProps) {
    return (
        <Card>
            <CardHeader className="px-0 py-0">
                <div className="relative">
                    <Image
                        src={data.image}
                        className="w-full h-56  rounded-t-md"
                        width={400}
                        height={400}
                        alt="Card Image"
                    />
                    <div className="absolute top-2 right-2">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button size="icon" variant="outline">
                                    <Icons.verticalDot className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuLabel>Blog Actions</DropdownMenuLabel>
                                <DropdownMenuItem asChild>
                                    <Link href={`/dashboard/blogs/edit/${data._id}`}>Edit</Link>
                                </DropdownMenuItem>
                                <AlertDeleteBlog blogIds={[data._id]} />
                            </DropdownMenuContent>
                        </DropdownMenu>

                    </div>
                </div>
            </CardHeader>
            <CardContent className="mt-2 space-y-1.5">
                <CardTitle>{data.name}</CardTitle>
                <CardDescription>
                    {data.description.length > 200 ?
                        <Fragment> {data.description.slice(0, 200)}...</Fragment>
                        : data.description}
                </CardDescription>
            </CardContent>
        </Card>
    );
}
