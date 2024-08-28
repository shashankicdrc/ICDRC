import React, { Fragment, useEffect, useState } from 'react';
import Image from 'next/image';
import { IoSendSharp } from 'react-icons/io5';
import { PiSpinner } from 'react-icons/pi';
import { Button, Input } from '@chakra-ui/react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
} from '@chakra-ui/react';
import { useParams, useSearchParams } from 'next/navigation';
import toast from 'react-hot-toast';
import { useSession } from 'next-auth/react';
import { BASE_URL } from '../../../lib/constant';

export default function AttachmentpreviewModal({
    data,
    isImageloaded,
    setuploadImages,
    setModalOpen,
    setmessages,
}) {
    const [images, setimages] = useState([]);
    const [current_imageIndex, setcurrent_imageIndex] = useState(0);
    const [messgevalue, setmessgevalue] = useState('');
    const [isLoading, setisLoading] = useState(false);
    const { isOpen, onOpen, onClose } = useDisclosure();

    const params = useParams();
    const searchParams = useSearchParams();
    const { data: session } = useSession();

    useEffect(() => {
        if (data.length > 0) {
            onOpen();
            setcurrent_imageIndex(0);
            setimages(data);
        }
    }, [data]);

    const onSubmit = async () => {
        setisLoading(true);
        if (images.length < 1 || !messgevalue) {
            setisLoading(false);
            toast.error('Please provide a messsage.');
            return;
        }
        const formData = new FormData();
        formData.set('attachment_name', messgevalue);
        formData.set(
            'complaintType',
            searchParams.get('type') === 'individual'
                ? 'IndividualComplaint'
                : 'OrganizationComplaint',
        );
        formData.set('complaintId', params.id);
        formData.set('authorType', 'user');
        formData.set('authorId', session.user.id);

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
        onClose();
    };

    function closeModal() {
        setuploadImages([]);
        onClose();
    }

    return (
        <Modal isOpen={isOpen} size={'full'} onClose={closeModal}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Attachment Preview </ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    {isImageloaded ? (
                        <div>Hold on we are loading ... </div>
                    ) : !isImageloaded && images.length > 0 ? (
                        <Fragment>
                            <div className="px-10 my-2 flex items-center justify-center flex-1">
                                <Image
                                    src={
                                        images[current_imageIndex].image_preview
                                            .url
                                    }
                                    width={400}
                                    height={400}
                                    alt="no image preview is available"
                                    className="rounded-md"
                                />
                            </div>
                        </Fragment>
                    ) : null}
                </ModalBody>
                <ModalFooter className="w-full justify-start">
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
                                <PiSpinner size={18} className="animate-spin" />
                            ) : (
                                <IoSendSharp size={18} />
                            )}
                        </Button>
                    </form>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}
