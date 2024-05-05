"use client";
import React, {
  Fragment,
  useEffect,
  useRef,
  useState,
  useCallback,
} from "react";
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import UploadedDataTable from "./UploadedDatatable";
import { FiLoader } from "react-icons/fi";
import { url } from "../../../app/api";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function UploadDrawer() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();
  const [isloading, setIsloading] = useState(false);
  const [files, setFiles] = useState([]);
  const [caseData, setCaseData] = useState([]);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const removeFile = useCallback(
    (name) => {
      const updatedFile = Array.from(files).filter(
        (item) => item.name !== name,
      );
      setFiles(updatedFile);
    },
    [files],
  );

  const fileHandler = (e) => {
    if (!e.target.files) return;
    setFiles(Array.from(e.target.files));
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFiles = e.dataTransfer.files;
    setFiles([droppedFiles[0]]);
  };

  useEffect(() => {
    if (window) {
      const caseData = JSON.parse(sessionStorage.getItem("caseDetails"));
      if (!caseData) {
        toast.error("You don't have any data.");
        router.push("/", { scroll: false });
        return;
      }

      setCaseData([caseData.data, caseData.case_type]);
    }
  }, []);

  const uploadHandler = async (value) => {
    try {
      setIsloading((prevState) => !prevState);
      const formData = new FormData();
      formData.set("attachment_name", value.attachment_name);
      formData.set("type", caseData[1]);
      formData.set("id", caseData[0]._id);
      if (!files.length) {
        setIsloading((prevState) => !prevState);
        return toast.error("please add a file");
      }
      formData.set("attachment_file", files[0]);

      const response = await fetch(`${url}/api/casestatus/uploads`, {
        method: "POST",
        body: formData,
      });

      setIsloading((prevState) => !prevState);
      const { data, error } = await response.json();
      if (response.status !== 200) {
        return toast.error(error);
      }
      toast.success("File has been uploaded succcessfully.");
      sessionStorage.setItem(
        "caseDetails",
        JSON.stringify({ data, case_type: caseData[1] }),
      );
      reset();
      setFiles([]);
      setTimeout(() => {
        onClose();
      }, 3000);
    } catch (error) {
      setIsloading((prevState) => !prevState);
      console.log(error);
    }
  };

  return (
    <Fragment>
      <button
        onClick={onOpen}
        ref={btnRef}
        className="text-white bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded-md"
      >
        Upload
      </button>
      <Drawer
        isOpen={isOpen}
        size={"lg"}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent className="w-1/3 overflow-y-auto">
          <DrawerCloseButton />
          <DrawerHeader>Upload a new attachments</DrawerHeader>;
          <DrawerBody className="overflow-y-auto">
            <form onSubmit={handleSubmit(uploadHandler)}>
              <div className="flex flex-col space-y-2">
                <label htmlFor="attachment_name">Attachment Name</label>
                <input
                  type="text"
                  name="attachment_name"
                  {...register("attachment_name", {
                    required: true,
                    minLength: 4,
                  })}
                  id="attachment_name"
                  placeholder="Enter your attachment name"
                  className="text-sm border border-gray-300 focus:border-orange-500 outline-none
                    focus:outline-none rounded-md py-2 px-3 tracking-wide mt-1"
                />
                {errors.attachment_name && (
                  <span className="text-red-600">
                    Attachment name should be at leas 4 character
                  </span>
                )}
              </div>

              <div
                className="flex items-center justify-center w-full my-3"
                onDragOver={(e) => {
                  e.preventDefault();
                }}
                onDrop={handleDrop}
              >
                <label
                  htmlFor="dropzone-file"
                  className="flex flex-col items-center justify-center w-full h-64 border-2 
                            border-dashed rounded-lg cursor-pointer bg-gray-100"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg
                      className="w-8 h-8 mb-4 text-gray-500 "
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 16"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                      />
                    </svg>
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                      <span className="font-semibold">Click to upload</span> or
                      drag and drop
                    </p>
                  </div>
                  <input
                    onChange={fileHandler}
                    id="dropzone-file"
                    type="file"
                    className="hidden"
                  />
                </label>
              </div>
              {files.length ? (
                <div className="my-5">
                  <UploadedDataTable
                    removeFile={removeFile}
                    fileData={Array.from(files)}
                  />
                </div>
              ) : null}
              <button
                disabled={isloading ? true : false}
                className="bg-orange-500 hover:bg-orange-600 px-4 py-2
                    rounded-md text-white w-fit inline-flex disabled:cursor-not-allowed"
              >
                {isloading ? (
                  <>
                    <FiLoader className="animate-spin mr-2" size={30} />
                    please wait ...
                  </>
                ) : (
                  "Submit"
                )}
              </button>
            </form>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Fragment>
  );
}
