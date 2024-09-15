import { Avatar, AvatarFallback, AvatarImage } from '../../ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import getNameLetter from '../../../lib/getNameLetter';
import { Button } from '../../ui/button';
import Link from 'next/link';

export default async function RecentMessages({ chats }) {
    const { data, error } = chats;
    if (error) {
        return (
            <div className="mx-auto flex items-center justify-center">
                <p className="text-center">{error}</p>
            </div>
        );
    }
    return (
        <Card className="lg:col-span-2">
            <CardHeader>
                <CardTitle>Recent Message</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-8">
                {data.map((item) => (
                    <div className="flex items-center gap-4" key={item._id}>
                        <Avatar className="hidden h-9 w-9 sm:flex">
                            <AvatarImage src="/avatars/01.png" alt="Avatar" />
                            <AvatarFallback className="uppercase">
                                {getNameLetter(item.authorId.name)}
                            </AvatarFallback>
                        </Avatar>
                        <div className="grid gap-1">
                            <p className="text-sm font-medium leading-none">
                                {item.authorId.name}
                            </p>
                            <p className="text-sm text-muted-foreground">
                                New {item.attachment ? 'Attachment' : 'Message'}
                            </p>
                        </div>
                        <Button className="ml-auto" variant="outline" asChild>
                            <Link
                                href={`/dashboard/chat/${item.complaintId._id}?type=${item.complaintType === 'OrganizationComplaint' ? 'organizational' : 'individual'}&caseId=${item.complaintId.caseId}`}
                            >
                                view
                            </Link>
                        </Button>
                    </div>
                ))}
            </CardContent>
        </Card>
    );
}
