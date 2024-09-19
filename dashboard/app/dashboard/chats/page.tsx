import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { getAllChats } from '@/externalAPI/chatService';
import React from 'react'
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import getNameLetter from '@/lib/getNameLetter';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';

export default async function page() {
    const session = await getServerSession(authOptions);
    const token = session?.user.AccessToken;
    const { data, error } = await getAllChats(token as string)
    if (error) {
        return <div className="mx-auto flex items-center justify-center">
            <p className="text-center">{error}</p>
        </div>
    }
    return (
        <main className="flex flex-col flex-grow h-screen relative" >
            <Card className="my-5 mx-5">
                <CardHeader>
                    <CardTitle
                    >All Messages</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-8">
                    {data.map((item: chatType) => (
                        <div className="flex items-center gap-4" key={item._id}>
                            <Avatar className="hidden h-9 w-9 sm:flex">
                                <AvatarImage src="/avatars/01.png" alt="Avatar" />
                                <AvatarFallback className="uppercase">{getNameLetter(item.authorId.name)}</AvatarFallback>
                            </Avatar>
                            <div className="grid gap-1">
                                <p className="text-sm font-medium leading-none capitalize">{item.authorId.name}</p>
                                <p className="text-sm text-muted-foreground">
                                    {item.complaintId.caseId}
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
            </Card>
        </main>
    )
}

