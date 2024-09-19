import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { getAllChats } from '@/externalAPI/chatService';
import React from 'react'
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import getNameLetter from '@/lib/getNameLetter';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import { BASE_URL } from '@/lib/constant';
import PaginationComponent from '@/components/PaginationController';
import SearchChat from '@/components/chats/SearchChat';

interface Props {
    searchParams: { [key: string]: string };
}

export default async function page({ searchParams }: Props) {
    const session = await getServerSession(authOptions);
    const token = session?.user.AccessToken;
    let page = Number(searchParams.page) || 1;
    let perRow = Number(searchParams.perRow || 20);

    let caseId = searchParams.caseId;
    if (caseId && caseId.length) {
        caseId = `&caseId=${caseId}`
    } else {
        caseId = ''
    }
    const url = `${BASE_URL}/api/admin/chats?page=${page}&perRow=${perRow}${caseId}`;
    console.log('url', url)
    const { data, error } = await getAllChats(token as string, url)
    if (error) {
        return <div className="mx-auto flex items-center justify-center">
            <p className="text-center">{error}</p>
        </div>
    }
    return (
        <main className="flex flex-col flex-grow h-screen relative" >
            <Card className="my-5 mx-5">
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle>All Messages</CardTitle>
                        <SearchChat />
                    </div>
                </CardHeader>
                <CardContent className="grid gap-8">
                    {data.chats.map((item: chatType) => (
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
                                    href={`/dashboard/chats/${item.complaintId._id}?type=${item.complaintType === 'OrganizationComplaint' ? 'organizational' : 'individual'}`}>
                                    view
                                </Link>
                            </Button>
                        </div>
                    ))}
                    <div className="flex items-center justify-end">
                        {data.totalCount > perRow && (
                            <div>
                                <PaginationComponent totalResults={data.totalCount} />
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>
        </main>
    )
}

