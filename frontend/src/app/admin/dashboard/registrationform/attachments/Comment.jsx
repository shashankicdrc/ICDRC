
import React from 'react';
import * as Avatar from '@radix-ui/react-avatar';

const Comment = ({ comment }) => {
    const isAdmin = comment.authorType === 'icdrc';
    const date = new Date(comment.createdAt).toLocaleString();

    return (
        <div className="flex items-start space-x-4 p-4 border-b border-gray-200">
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
            <div>
                <div className="text-sm font-semibold">{comment.authorName}</div>
                <div className="mt-1 text-sm text-gray-500">{date}</div>
                <div className="mt-2 text-sm text-gray-700">{comment.text}</div>
            </div>
        </div>
    );
};

export default Comment;
