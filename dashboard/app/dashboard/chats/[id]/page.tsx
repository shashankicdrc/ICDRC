import Chat from "@/components/chats/Chat";
import { getChats } from "@/externalAPI/chatService";

interface Props {
    params: {
        id: string
    },
    searchParams: {
        type: string
    }
}

export default async function page({ params, searchParams }: Props) {
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
        <main className="flex flex-col flex-grow h-screen relative">
            <Chat chatData={data} />
        </main>
    );
}
