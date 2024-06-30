import React, { Fragment, useEffect, useState } from 'react';
import Image from 'next/image';
import * as AspectRatio from '@radix-ui/react-aspect-ratio';
import { IoSendSharp } from "react-icons/io5";
import { PiSpinner } from "react-icons/pi";
import { Button, Input } from '@chakra-ui/react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure
} from '@chakra-ui/react'
import { useSearchParams, useRouter } from 'next/navigation';
import toast from "react-hot-toast";
import { url } from '../../../app/api';


export default function AttachmentpreviewModal(
    {
        data,
        isImageloaded,
        setuploadImages,
        setModalOpen,
        setmessages,
        type,
        id
    }
) {
    const [images, setimages] = useState([]);
    const [current_imageIndex, setcurrent_imageIndex] = useState(0);
    const [messgevalue, setmessgevalue] = useState('');
    const [isLoading, setisLoading] = useState(false);
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [caseType, setcaseType] = useState('')
    const [caseId, setcaseId] = useState('')
    const [caseData, setCaseData] = useState([]);
    const searchParams = useSearchParams()
    const router = useRouter();


    // for admin side
    useEffect(() => {
        if (type === 'admin' && id.length) {
            const case_type = searchParams.get('caseType')
            setcaseType(case_type)
            setcaseId(id)
        }
    }, [searchParams, type, caseId])


    // for user side
    useEffect(() => {
        if (window && type !== 'admin') {
            const caseData = JSON.parse(sessionStorage.getItem("caseDetails"));
            if (!caseData) {
                toast.error("You don't have any data.");
                router.push("/", { scroll: false });
                return;
            }

            setCaseData([caseData.data, caseData.case_type]);
        }
    }, []);


    useEffect(() => {
        if (data.length > 0) {
            onOpen()
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
        formData.set("attachment_name", messgevalue);
        formData.set("caseType", type === 'admin' ? caseType : caseData[1]);
        formData.set("id", type === 'admin' ? caseId : caseData[0]._id);
        formData.set("authorType", type === 'admin' ? 'icdrc' : "user")
        formData.set("authorName", type === 'admin' ? 'icdrc' : caseData[0].email)

        formData.append('images', images[0].image_as_file)

        const response = await fetch(`${url}/api/casestatus/uploads`, {
            method: "POST",
            body: formData,
        });

        setisLoading((prevState) => !prevState);
        const { data, error } = await response.json();
        if (response.status !== 200) {
            return toast.error(error);
        }
        toast.success("File has been uploaded succcessfully.");
        setuploadImages([]);
        setmessages(data)
        setModalOpen(false);
        onClose()
    };

    function closeModal() {
        setuploadImages([])
        onClose()
    }

    return (
        <Modal isOpen={isOpen} size={"full"} onClose={closeModal}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Attachment Preview </ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    {isImageloaded ? (
                        <div>Hold on we are loading ... </div>
                    ) : !isImageloaded && images.length > 0 ? (
                        <Fragment>
                            <div className="px-10 my-2 flex items-center flex-1">
                                <AspectRatio.Root ratio={10 / 4} className="my-0">
                                    <Image
                                        src={images[current_imageIndex].image_preview.url}
                                        alt="no image preview is available"
                                        fill
                                        className="rounded-md object-fill "
                                    />
                                </AspectRatio.Root>
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
    )
}

