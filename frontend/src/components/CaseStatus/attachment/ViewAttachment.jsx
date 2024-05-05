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

export default function ViewAttachment({ media }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();

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
          <DrawerHeader>View Attachment</DrawerHeader>
          <DrawerBody className="overflow-y-auto">
            <DocViewer documents={media} pluginRenderers={DocViewerRenderers} />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Fragment>
  );
}
