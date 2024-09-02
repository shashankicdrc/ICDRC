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
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Icons } from "../Icons";
import { AlertDeleteMedia } from "./DeleteMedia";
import { mediaType } from "@/types/columnsType";

interface MediaItemProps {
    data: mediaType;
}

export default function MediaItem({ data }: MediaItemProps) {
    return (
        <Card>
            <CardHeader className="px-0 py-0">
                <div className="relative">
                    <Image
                        src={data?.image as string}
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
                                <DropdownMenuLabel>Media Actions</DropdownMenuLabel>
                                <DropdownMenuItem asChild>
                                    <Link href={`/dashboard/media/edit/${data._id}`}>Edit</Link>
                                </DropdownMenuItem>
                                <AlertDeleteMedia mediaIds={[data._id]} />
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
                <CardTitle className="text-center">{data.name}</CardTitle>
            </CardHeader>
        </Card>
    );
}
