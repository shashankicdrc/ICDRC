import { BASE_URL } from "@/lib/constant";
import { useSession } from "next-auth/react";
import { useParams, useSearchParams } from "next/navigation";
import { Fragment, useEffect, useState } from "react";
import { toast } from "sonner";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet";
import Image from "next/image";
import { AspectRatio } from "../ui/aspect-ratio";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Icons } from "../Icons";
import { Send } from "lucide-react";
import { imagesType } from "./Chat";

interface Props {
    data: imagesType[],
    isImageloaded: boolean,
    setuploadImages: (value: any[]) => void
    setModalOpen: (value: boolean) => void
    setmessages: (value: chatType) => void
}


export default function AttachmentpreviewModal({
    data,
    isImageloaded,
    setuploadImages,
    setModalOpen,
    setmessages,
}: Props) {
    const [images, setimages] = useState<imagesType[]>([]);
    const [current_imageIndex, setcurrent_imageIndex] = useState(0);
    const [messgevalue, setmessgevalue] = useState('');
    const [isLoading, setisLoading] = useState(false);
    const [open, setopen] = useState<boolean>(false)

    const params = useParams();
    const searchParams = useSearchParams();
    const { data: session } = useSession();

    useEffect(() => {
        if (data.length > 0) {
            setopen(true)
            setcurrent_imageIndex(0);
            setimages(data);
        }
    }, [data]);

    const onSubmit = async () => {
        setisLoading(true);
        if (images.length < 1 || !messgevalue) {
            setisLoading(false);
            return;
        }
        const formData = new FormData();
        formData.set('attachment_name', messgevalue);
        formData.set(
            'complaintType',
            searchParams.get('type') === 'individual'
                ? 'IndividualComplaint'
                : 'OrganizationalComplaint',
        );
        formData.set('complaintId', params.id as string);
        formData.set('authorType', 'admins');
        formData.set('authorId', session?.user.id as string);

        formData.append('images', images[0].image_as_file);

        const response = await fetch(`${BASE_URL}/api/chats/attachment/`, {
            method: 'POST',
            body: formData,
        });

        setisLoading((prevState) => !prevState);
        const { data, error } = await response.json();
        if (response.status !== 200) {
            return toast.error(error);
        }
        toast.success('File has been uploaded succcessfully.');
        setuploadImages([]);
        setmessages(data);
        setModalOpen(false);
        setopen(false)
    };


    return (
        <Sheet open={open} onOpenChange={setopen}>
            <SheetTrigger></SheetTrigger>
            <SheetContent className="sm:max-w-full">
                <SheetHeader>
                    <SheetTitle>Attachment Preview</SheetTitle>
                </SheetHeader>
                {isImageloaded ? (
                    <div>Hold on we are loading ... </div>
                ) : !isImageloaded && images.length > 0 ? (
                    <Fragment>
                        <div className="px-10 my-2 flex items-center flex-1">
                            <AspectRatio
                                ratio={16 / 9}
                                className="my-0"
                            >
                                <Image
                                    src={
                                        images[current_imageIndex]
                                            ?.image_preview.url as string
                                    }
                                    alt="no image preview is available"
                                    fill
                                    className="rounded-md object-fill "
                                />
                            </AspectRatio>
                        </div>
                    </Fragment>
                ) : null}
                <div className="sticky">
                    <form
                        className="flex w-full items-center py-2 md:space-x-5 space-x-2"
                        onSubmit={(e) => {
                            e.preventDefault();
                            onSubmit();
                        }}
                    >
                        <Input
                            placeholder="Write your message here"
                            value={messgevalue}
                            onChange={(e) => setmessgevalue(e.target.value)}
                        />
                        <Button disabled={isLoading} type="submit">
                            {isLoading ? (
                                <Icons.loader size={18} className="animate-spin" />
                            ) : (
                                <Send size={18} />
                            )}
                        </Button>
                    </form>
                </div>
            </SheetContent>
        </Sheet>
    );
}
