"use client";
import React, { Fragment, useRef, useState } from "react";
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
} from "@chakra-ui/react";

export default function UploadDrawer() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();
  const [isloading, setIsloading] = useState(false);

  const [file, setFile] = useState(null);

  const fileHandler = (e) => {
    if (!e.target.files) return;
    setFile(Array.from(e.target.files));
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFiles = e.dataTransfer.files;
    setFile(droppedFiles);
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
            <form action="">
              <div className="flex flex-col space-y-2">
                <label htmlFor="attachment_name">Attachment Name</label>
                <input
                  type="text"
                  name="attachment_name"
                  id="attachment_name"
                  placeholder="Enter your attachment name"
                  className="text-sm border border-gray-300 focus:border-orange-500 outline-none
                    focus:outline-none rounded-md py-2 px-3 tracking-wide mt-1"
                />
                {/* {errors.email && ( */}
                {/*   <span className="text-red-600"> */}
                {/*     Please provide valid email */}
                {/*   </span> */}
                {/* )} */}
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
                    multiple
                  />
                </label>
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
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Fragment>
  );
}
