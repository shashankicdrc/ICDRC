"use client";
import React, { useState, Fragment } from "react";
import { useForm } from "react-hook-form";
import { FiLoader } from "react-icons/fi";
import { url } from "../../app/api";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";

const CaseStatus = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      caseid: "",
    },
  });

  const [isloading, setIsloading] = useState(false);

  const submit = async (data) => {
    try {
      setIsloading(!isloading);
      const response = await fetch(`${url}/case/status/id`, {
        method: POST,
        body: JSON.stringify({ ...data }),
      });
      const { data, error } = await response.json();
      console.log(data, error);
    } catch (error) {
      setIsloading(!isloading);
    }
  };

  return (
    <Fragment>
      <button
        onClick={onOpen}
        className="text-white bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded-md"
      >
        Case status{" "}
      </button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Check your case status</ModalHeader>
          <ModalCloseButton />
          <ModalBody className="mb-5">
            <form onSubmit={handleSubmit(submit)} className="grid gap-3">
              <div className="flex space-y-2 flex-col">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  {...register("email", { required: true })}
                  placeholder="Email"
                  className="text-sm border border-gray-300 focus:border-orange-500 outline-none
                    focus:outline-none rounded-md py-2 px-3 tracking-wide mt-1"
                />
                {errors.email && (
                  <span className="text-red-600">
                    Please provide valid email
                  </span>
                )}
              </div>
              <div className="flex space-y-2 flex-col">
                <label htmlFor="caseid">Case Id</label>
                <input
                  {...register("caseid", { required: true, minLength: 3 })}
                  className="text-sm border border-gray-300 focus:border-orange-500 outline-none
                    focus:outline-none rounded-md py-2 px-3 tracking-wide mt-1"
                  spellCheck={false}
                  type="text"
                  name="caseid"
                  placeholder="Enter your case id"
                />
                {errors.caseid && (
                  <span className="text-red-600">
                    Please provide valid case id.
                  </span>
                )}
              </div>

              <button
                className="bg-orange-500 hover:bg-orange-600 px-4 py-2
                    rounded-md text-white w-fit inline-flex"
              >
                {isloading ? (
                  <>
                    <FiLoader className="animate-spin mr-2" size={30} />
                    please wait ...
                  </>
                ) : (
                  "Case status"
                )}
              </button>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Fragment>
  );
};

export default CaseStatus;
