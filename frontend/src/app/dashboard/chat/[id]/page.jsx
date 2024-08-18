import React from 'react';
import Chat from '../../../../components/dashboard/chat/Chat';
import { getChats } from '../../.././../externalAPI/chatService';

export default async function page({ params, searchParams }) {
    const { type } = searchParams;
    const complaintArr = ['individual', 'organizational'];
    if (!complaintArr.includes(type)) {
        throw new Error('Invalid type');
    }
    const { data, error } = await getChats(params.id);
    if (error) {
        return (
            <div className="flex justify-center text-center mx-auto my-5">
                <p className="text-destructive">{error}</p>
            </div>
        );
    }
    return (
        <main className="flex flex-col flex-grow h-screen bg-background relative">
            <Chat chatData={data} />
        </main>
    );
}
