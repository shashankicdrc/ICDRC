'use client';
import React, { Fragment, useEffect, useRef, useState } from 'react';
import ChatList from './ChatList';
import { createPortal } from 'react-dom';
import { MdAttachFile } from 'react-icons/md';
import { Input } from '../../../components/ui/input';
import { Button } from '../../../components/ui/button';
import { useSession } from 'next-auth/react';
import { useParams, useSearchParams } from 'next/navigation';
import { addMessage } from '../../../externalAPI/chatService';
import toast from 'react-hot-toast';
import { ScrollArea } from '../../../components/ui/scrollarea';
import AttachmentPreviewModal from './AttachmentPreviewModal';

export default function Chat({ chatData }) {
    const [chats, setchats] = useState(chatData);
    const [text, setText] = useState('');
    const lastMessageRef = useRef();
    const [uploadedImages, setuploadedImages] = useState([]);
    const [attachmentPreviewModal, setAttachmentPreviewModal] = useState();
    const [attchementloading, setattchementloading] = useState(false);
    const { data: session } = useSession();
    const searchParams = useSearchParams();
    const params = useParams();

    const updateMessage = (data) => {
        setchats((prevState) => [...prevState, data]);
    };

    useEffect(() => {
        setchats(chatData);
    }, [chatData]);

    useEffect(() => {
        if (!lastMessageRef.current) return;
        lastMessageRef.current.scrollIntoView({ behavior: 'smooth' });
    }, [chats]);

    const fileChangeHandler = (e) => {
        e.preventDefault();
        setAttachmentPreviewModal(true);
        const files = e.target.files;

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
                            url: event.target.result,
                            id: Date.now().toString(),
                        },
                    },
                ]);
            };
            fileReader.readAsDataURL(file);
            return fileReader;
        });
    };

    const handleAddComment = async (e) => {
        try {
            if (!text.length) return;
            e.preventDefault();
            const chatData = {
                text,
                authorType: 'user',
                authorId: session.user.id,
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
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <Fragment>
            {attachmentPreviewModal
                ? createPortal(
                      <AttachmentPreviewModal
                          isImageloaded={attchementloading}
                          data={uploadedImages}
                          setuploadImages={setuploadedImages}
                          setmessages={updateMessage}
                          setModalOpen={setAttachmentPreviewModal}
                      />,
                      document.body,
                  )
                : null}
            <p className="bg-muted/40 text-center py-2">
                You are chating for case: <b>{searchParams.get('caseId')}</b>
            </p>
            <ScrollArea className="px-3 md:px-5 lg:px-10 py-3 flex-1 bg-muted/40">
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
                                <MdAttachFile size={20} />
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
    );
}
