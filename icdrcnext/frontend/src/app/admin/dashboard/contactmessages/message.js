import React from 'react'
import {
    Tr,
    Td,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    useDisclosure
} from '@chakra-ui/react';
import { RiDeleteBin3Line } from 'react-icons/ri'

const Message = ({ item, index, deletebtn }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()

    const btnRef = React.useRef(null)

    const formatCreatedAtDate = (createdAt) => {
        const createdAtDate = new Date(createdAt);
        return createdAtDate.toLocaleDateString();
    };

    return (
        <>
            <Tr>
                <Td>{index + 1}</Td>
                <Td>{formatCreatedAtDate(item.createdAt)}</Td>
                <Td>{item.name}</Td>
                <Td>{item.email}</Td>
                <Td>{item.mobile}</Td>
                <Td>{item.whatsapp}</Td>
                <Td onClick={() => deletebtn(item._id)}>{<RiDeleteBin3Line className='text-xl text-red-600 cursor-pointer' />}</Td>
                <Td>
                    <Button colorScheme="whatsapp" size="sm" ref={btnRef} onClick={onOpen}>
                        View Message
                    </Button>
                </Td>
            </Tr>
            <Modal
                onClose={onClose}
                finalFocusRef={btnRef}
                isOpen={isOpen}
                scrollBehavior="outside"
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader><p className='font-[Caveat] text-center text-2xl'>Message from: {item.name}</p> </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <p className='font-[Poppins]'>{item.message}</p>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="red" size="sm" onClick={onClose}>Close</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default Message
