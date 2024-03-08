import React from 'react'
import { BsPlay } from 'react-icons/bs'
import Image from 'next/image';

import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
} from '@chakra-ui/react'
import { RiDeleteBin3Line } from 'react-icons/ri'

const Item = ({ image, video, name, deleteId, deletebtn }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <>
            <div className="overflow-hidden border-2 border-orange-500 transition-shadow duration-300 bg-white rounded-2xl shadow-lg px-4 py-3" data-aos="zoom-in" data-aos-duration="1000">
                <div className='relative'>
                    {image && image?.length > 0 && <Image
                        src={image}
                        className="object-cover w-full h-40 md:h-60 rounded-2xl"
                        alt=""
                    />}
                    {video && video?.length > 0 && <div onClick={onOpen} className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 cursor-pointer border-2 rounded-full p-2 grid place-items-center text-4xl md:text-7xl bg-transparent text-orange-600 border-orange-600 ring
                            ring-orange-600 ring-inset-2 font-bold hover:bg-orange-600 hover:text-white hover:border-white 
                            hover:ring-white hover:ring-inset-2 transition-all duration-300 ease-in animate-pulse hover:animate-none'>
                        <BsPlay />
                    </div>}
                </div>
                {name && name.length > 0 && <div className="py-5">
                    <p className="text-2xl font-medium font-[Poppins] text-orange-600">{name}</p>
                </div>}
                {deleteId && deleteId.length > 0 && <div className="py-5 flex justify-center items-center">
                    <button onClick={() => deletebtn(deleteId)} className='text-red-500 text-xl'><RiDeleteBin3Line /></button>
                </div>}
            </div>
            {
                video && video?.length > 0 &&
                <Modal onClose={onClose} isOpen={isOpen} isCentered size="4xl">
                    <ModalOverlay />
                    <ModalContent bg='rgb(255 145 3 / 1%)' p='6' rounded='xl'>
                        <ModalCloseButton color='white' bg='orange.600' fontWeight="semibold" />
                        <ModalBody mx='auto' display="flex" alignItems="center" justifyContent="center">
                            <div className='hidden md:block'>
                                <iframe width="820" height="450" src={`https://www.youtube.com/embed/${video}?autoplay=1&mute=1&enablejsapi=1`} title="YouTube video player" frameborder="0" allowFullScreen style={{ borderRadius: "2rem" }}></iframe>
                            </div>
                            <div className='md:hidden'>
                                <iframe width="820" height="450" src={`https://www.youtube.com/embed/${video}?autoplay=1&mute=1&enablejsapi=1`} title="YouTube video player" frameborder="0" allowFullScreen style={{ borderRadius: "2rem" }}></iframe>
                            </div>
                        </ModalBody>
                    </ModalContent>
                </Modal>
            }
        </>
    )
}

export default Item