

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { getRecentMessage } from "@/externalAPI/chatService";
import { authOptions } from "@/lib/authOptions";
import getNameLetter from "@/lib/getNameLetter";
import { getServerSession } from "next-auth";
import { Button } from "../ui/button";
import Link from "next/link";

export default async function RecentMessages() {
    const session = await getServerSession(authOptions);
    const token = session?.user.AccessToken as string;
    const { data, error } = await getRecentMessage(token)
    if (error) {
        return <div className="mx-auto flex items-center justify-center">
            <p className="text-center">{error}</p>
        </div>

    }

    return (
        <Card className="my-5">
            <CardHeader>
                <CardTitle>Recent Message</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-8">
                {data.map((item: chatType) => (
                    <div className="flex items-center gap-4" key={item._id}>
                        <Avatar className="hidden h-9 w-9 sm:flex">
                            <AvatarImage src="/avatars/01.png" alt="Avatar" />
                            <AvatarFallback className="uppercase">{getNameLetter(item.authorId.name)}</AvatarFallback>
                        </Avatar>
                        <div className="grid gap-1">
                            <p className="text-sm font-medium leading-none">{item.authorId.name}</p>
                            <p className="text-sm text-muted-foreground">
                                New {item.attachment ? 'Attachment' : 'Message'}
                            </p>
                        </div>
                        <Button className="ml-auto" variant="outline" asChild>
                            <Link
                                href={`/dashboard/chats/${item.complaintId}?type=${item.complaintType === 'OrganizationComplaint' ? 'organizational' : 'individual'}`}>
                                view
                            </Link>
                        </Button>
                    </div>

                ))}

            </CardContent>
        </Card >
    )
}
