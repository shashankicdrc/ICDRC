"use client";
import React, { Fragment, useCallback } from "react";
import ChangePassword from "./forms/ChangePassword";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";

const PasswordModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const closeModal = useCallback(() => onClose(), []);

  return (
    <Fragment>
      <button
        onClick={onOpen}
        className="mt-8 text-center text-sm font-semibold border-2
                border-orange-500 px-2 py-1 rounded-xl cursor-pointer 
                text-orange-500 hover:text-white hover:bg-orange-500 
                transition-all ease-in-out duration-300"
      >
        Change Password
      </button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Change Password</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <ChangePassword closeModal={closeModal} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Fragment>
  );
};

export default PasswordModal;
