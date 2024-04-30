"use client";
import React, { Fragment, useRef } from "react";
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";

export default function ViewAttachment() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();

  const docs = [
    { uri: "http://localhost:3000/logo.png" }, // Remote file
    { uri: "http://localhost:3000/home7.png" }, // Remote file
    {
      uri: "https://images.unsplash.com/photo-1484509831184-71bac0c48248?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHNvbWV8ZW58MHx8MHx8fDA%3D",
    }, // Remote file
    { uri: "http://localhost:3000/vd.mp4" }, // Remote file
  ];

  return (
    <Fragment>
      <button
        onClick={onOpen}
        ref={btnRef}
        className="hover:bg-gray-100 px-2 py-2 rounded-md 
                                "
      >
        view attachment
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
          <DrawerHeader>View your attachments</DrawerHeader>;
          <DrawerBody className="overflow-y-auto">
            <DocViewer documents={docs} pluginRenderers={DocViewerRenderers} />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Fragment>
  );
}
