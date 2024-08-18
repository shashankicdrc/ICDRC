import React from 'react';
import dynamic from 'next/dynamic';
const Message = dynamic(() => import('./Message'));

const ChatList = ({ chats, lastMessageRef }) => {
    return (
        <div className="space-y-2 overflow-y-auto">
            {!chats.length ? (
                <p className="font-bold text-xl text-center">
                    No Message found.
                </p>
            ) : (
                chats.map((chat, index) => (
                    <div
                        key={chat._id}
                        className={`flex w-max max-w-md md:max-w-lg flex-col gap-2 rounded-md text-sm  ${
                            chat.authorType === 'admins' ? 'ml-auto' : ''
                        }`}
                    >
                        <Message key={chat.id} message={chat} />
                        {index === chats.length - 1 && (
                            <div ref={lastMessageRef} />
                        )}
                    </div>
                ))
            )}
        </div>
    );
};

export default ChatList;
