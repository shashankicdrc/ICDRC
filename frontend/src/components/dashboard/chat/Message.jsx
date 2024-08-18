import React from 'react';
import * as Avatar from '@radix-ui/react-avatar';
import dynamic from 'next/dynamic';
import getNameLetter from '../../../lib/getNameLetter';
const AttachmentView = dynamic(() => import('./AttachmentView'));

const Message = ({ message }) => {
    const isAdmin = message.authorType === 'admins';
    const date = new Date(message.createdAt).toLocaleString();

    return (
        <div className={`flex items-start space-x-4 p-4`}>
            <Avatar.Root
                className="inline-flex h-[45px] w-[45px] select-none
                 items-center justify-center overflow-hidden rounded-full align-middle"
            >
                <Avatar.Image
                    className="h-full w-full rounded-[inherit] object-cover"
                    src={isAdmin ? '/favicon.ico' : null}
                    alt="Avatar"
                />
                <Avatar.Fallback
                    className="leading-1 flex h-full w-full items-center justify-center bg-gray-200
                    text-[15px] font-medium uppercase"
                    delayMs={600}
                >
                    {isAdmin ? 'ID' : getNameLetter(message.authorId.name)}
                </Avatar.Fallback>
            </Avatar.Root>
            <div className={`max-w-xs p-3 rounded-lg shadow bg-background`}>
                <div className={`text-xs text-gray-400`}>
                    {message.authorId.name}
                </div>
                <div className="mt-1">
                    {message.text ?? (
                        <AttachmentView
                            media={message.attachment.media}
                            filename={message.attachment.attachment_name}
                        />
                    )}
                </div>
                <div className={`mt-1 text-xs text-gray-400`}> {date}</div>
            </div>
        </div>
    );
};

export default Message;
