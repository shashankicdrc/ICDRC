'use client';
import React, { Fragment, useEffect, useState } from 'react';
import DocViewer, { DocViewerRenderers } from '@cyntler/react-doc-viewer';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '../ui/sheet';
import { Button } from '../ui/button';

interface Props {
    media: [
        {
            url: string,
            _id: string
        }
    ],
    filename: string
}

export default function ViewAttachment({ media, filename }: Props) {
    const [open, setopen] = useState<boolean>(false)
    const [url, seturl] = useState('');
    const baseUrl = `https://res.cloudinary.com/dl5hosmxb/image/upload`;
    const [docViewerMedia, setdocViewerMedia] = useState<{ uri: string }[]>([]);

    useEffect(() => {
        const orginalFilename = media[0].url.split('/');

        const newUrl = `${baseUrl}/f_auto/fl_attachment:${filename}/v1719401983/${orginalFilename[orginalFilename.length - 1]}`;
        seturl(newUrl);

        setdocViewerMedia(
            media.map((item: any) => {
                return { uri: item.url };
            }),
        );
    }, [media]);

    return (
        <Fragment>
            <Sheet open={open} onOpenChange={setopen}>
                <SheetTrigger asChild>
                    <Button variant="link" className="px-0 text-blue-600 underline">
                        {filename}
                    </Button>
                </SheetTrigger>
                <SheetContent >
                    <SheetHeader>
                        <SheetTitle>
                            <a
                                className="cursor-pointer underline text-blue-600"
                                href={url}
                                target="_blank"
                                rel="noopener noreferrer"
                                download
                            >
                                Click here to download
                            </a>
                        </SheetTitle>

                    </SheetHeader>
                    <DocViewer
                        documents={docViewerMedia}
                        pluginRenderers={DocViewerRenderers}
                    />
                </SheetContent>
            </Sheet>
        </Fragment>
    );
}
