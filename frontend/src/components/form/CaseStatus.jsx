"use client";
import React, { useState, Fragment, useEffect } from "react";
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
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const CaseStatus = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const caseType = ["individual", "organisational"];
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      caseid: "",
      type: "",
    },
  });

  const [isloading, setIsloading] = useState(false);

  const submit = async (value) => {
    try {
      setIsloading((prevState) => !prevState);
      const query = `email=${value.email}&type=${value.type}&id=${value.caseid}`;
      const response = await fetch(`${url}/api/casestatus?${query}`, {
        method: "GET",
        cache: "no-cache",
      });
      const { data, error } = await response.json();
      setIsloading((prevState) => !prevState);
      if (response.status !== 200) {
        return toast.error(error);
      }
      toast.success("Case details has been fetched successfully.");
      sessionStorage.setItem(
        "caseDetails",
        JSON.stringify({ data, case_type: value.type }),
      );
      onClose();
      router.push(`/casestatus`);
    } catch (error) {
      console.log(error);
      setIsloading((prevState) => !prevState);
    }
  };

  useEffect(() => {
    return () => {
      reset();
    };
  }, []);

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
        <ModalContent className="h-fit">
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
              <div className="flex space-y-2 flex-col">
                <label htmlFor="type">Case Type</label>
                <select
                  {...register("type", { required: true })}
                  className="text-sm border border-gray-300 focus:border-orange-500 outline-none
                    focus:outline-none rounded-md py-2 px-3 tracking-wide mt-1"
                  type="text"
                  name="type"
                >
                  <option defaultValue={caseType[0]}>{caseType[0]}</option>
                  <option value={caseType[1]}>{caseType[1]}</option>
                </select>
                {errors.type && (
                  <span className="text-red-600">Pleae select case type</span>
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
