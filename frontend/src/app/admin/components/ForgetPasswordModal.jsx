import React, { Fragment, useCallback } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import ForgetPasswordRequest from "./forms/ForgetPasswordRequest";

const ForgetPasswordModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const closeModal = useCallback(() => onClose(), []);

  return (
    <Fragment>
      <div className="flex my-2">
        <button
          onClick={onOpen}
          className="rounded-md border-orange-500 
                    hover:text-white hover:bg-orange-600 text-center
                    py-2 px-6 border w-full"
        >
          Forget Password?
        </button>
      </div>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Change Password</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <ForgetPasswordRequest closeModal={closeModal} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Fragment>
  );
};

export default ForgetPasswordModal;
