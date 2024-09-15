'use client'
import { useSession } from 'next-auth/react';
import { useParams, useSearchParams } from 'next/navigation';
import React, { Fragment, useEffect, useRef, useState } from 'react'
import { toast } from 'sonner';
import { ScrollArea } from '../ui/scroll-area';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Paperclip } from 'lucide-react';
import ChatList from './ChatList';
import { addMessage } from '@/externalAPI/chatService';
import AttachmentpreviewModal from './AttachmentPreviewModal';

interface Props {
    chatData: chatType[]
}

export interface imagesType {
    image_as_file: File,
    image_preview: {
        id: string,
        url: ArrayBuffer | string | null | undefined
    }
}

export default function Chat({ chatData }: Props) {
    const [chats, setchats] = useState(chatData);
    const [text, setText] = useState('');
    const lastMessageRef = useRef<HTMLDivElement>(null);
    const [uploadedImages, setuploadedImages] = useState<imagesType[]>([]);
    const [attachmentPreviewModal, setAttachmentPreviewModal] = useState<boolean>(false);
    const [attchementloading, setattchementloading] = useState(false);
    const { data: session } = useSession();
    const searchParams = useSearchParams();
    const params = useParams();

    const updateMessage = (data: chatType) => {
        setchats((prevState) => [...prevState, data]);
    };

    useEffect(() => {
        setchats(chatData);
    }, [chatData]);

    useEffect(() => {
        if (!lastMessageRef.current) return;
        lastMessageRef.current.scrollIntoView({ behavior: 'smooth' });
    }, [chats]);

    const fileChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setAttachmentPreviewModal(true);
        const files = e.target.files;
        if (!files) return;

        Array.from(files).forEach((file) => {
            const fileReader = new FileReader();

            fileReader.onloadstart = () => {
                setattchementloading(true);
            };

            fileReader.onloadend = () => {
                setattchementloading(false);
            };

            fileReader.onload = (event) => {
                setuploadedImages((prevState) => [
                    ...prevState,
                    {
                        image_as_file: file,
                        image_preview: {
                            url: event.target?.result,
                            id: Date.now().toString(),
                        },
                    },
                ]);
            };
            fileReader.readAsDataURL(file);
            return fileReader;
        });
    };

    const handleAddComment = async (e: React.FormEvent<HTMLFormElement>) => {
        try {
            if (!text.length) return;
            if (!session?.user.id) return;
            e.preventDefault();
            const chatData = {
                text,
                authorType: 'admins',
                authorId: session?.user.id,
                complaintType:
                    searchParams.get('type') === 'individual'
                        ? 'IndividualComplaint'
                        : 'OrganizationComplaint',
                complaintId: params.id,
            };
            const { data, error } = await addMessage(chatData);
            if (error) {
                return toast.error(error);
            }
            updateMessage(data);
            setText('');
        } catch (error: any) {
            toast.error(error.message);
        }
    };
    return (
        <Fragment>
            {attachmentPreviewModal
                ?
                <AttachmentpreviewModal
                    isImageloaded={attchementloading}
                    data={uploadedImages}
                    setuploadImages={setuploadedImages}
                    setmessages={updateMessage}
                    setModalOpen={setAttachmentPreviewModal}
                />
                : null}
            <ScrollArea className="px-3 md:px-5 lg:px-10 py-3 flex-1 h-[calc(100vh-5rem)] shrink-0">
                <ChatList chats={chats} lastMessageRef={lastMessageRef} />
            </ScrollArea>
            <footer className="bg-background border-t sticky bottom-0 z-30  flex items-center h-20 px-2 md:px-5 py-2">
                <form className="flex-1" onSubmit={handleAddComment}>
                    <div className="flex items-center space-x-2">
                        <div>
                            <input
                                onChange={fileChangeHandler}
                                type="file"
                                className="hidden"
                                id="attachment"
                                multiple
                                accept="image/*, video/*,.doc,.docx,application/msword,
                                    application/vnd.openxmlformats-officedocument.wordprocessingml.document,.pdf"
                            />
                            <label
                                htmlFor="attachment"
                                className="rounded-full h-10 w-10 cursor-pointer"
                            >
                                <Paperclip size={20} />
                            </label>
                        </div>
                        <Input
                            type="text"
                            placeholder="Your comment"
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            required
                        />
                        <Button>Send</Button>
                    </div>
                </form>
            </footer>
        </Fragment>
    )
}

