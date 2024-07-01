import React from 'react';
import * as Avatar from '@radix-ui/react-avatar';
import dynamic from 'next/dynamic';
const AttachmentView = dynamic(() => import('../../../../../components/CaseStatus/attachment/ViewAttachment'))


const Comment = ({ comment }) => {
    const isAdmin = comment.authorType === 'icdrc';
    const date = new Date(comment.createdAt).toLocaleString();

    return (
        <div className={`flex items-start space-x-4 p-4`}>
            <Avatar.Root className="inline-flex h-[45px] w-[45px] select-none
                 items-center justify-center overflow-hidden rounded-full align-middle">
                <Avatar.Image
                    className="h-full w-full rounded-[inherit] object-cover"
                    src={isAdmin ? '/favicon.ico' : null}
                    alt="Avatar"
                />
                <Avatar.Fallback
                    className="leading-1 flex h-full w-full items-center justify-center bg-gray-200
                    text-[15px] font-medium"
                    delayMs={600}
                >
                    {isAdmin ? 'ID' : 'US'}
                </Avatar.Fallback>
            </Avatar.Root>
            <div className={`max-w-xs p-3 rounded-lg shadow ${isAdmin ? 'bg-white' : 'text-black'}`}>
                <div className={`text-xs text-gray-400`}>{comment.authorName}</div>
                <div className="mt-1">{comment.text ? comment.text : (
                    <AttachmentView media={comment.attachment.media} filename={comment.attachment.attachment_name} />
                )}</div>
                <div className={`mt-1 text-xs text-gray-400`} > {date}</div>
            </div>
        </div >
    );
};

export default Comment;
