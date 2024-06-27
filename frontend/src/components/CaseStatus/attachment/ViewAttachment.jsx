"use client";
import React, { Fragment, useEffect, useRef, useState } from "react";
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


export default function ViewAttachment({ media, filename }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const btnRef = useRef();
    const [url, seturl] = useState('')
    const baseUrl = `https://res.cloudinary.com/dl5hosmxb/image/upload`

    useEffect(() => {
        const orginalFilename = media[0].url.split('/')
        const newUrl = `${baseUrl}/f_auto/fl_attachment:${filename}/v1719401983/${orginalFilename[orginalFilename.length - 1]}`
        seturl(newUrl)
    }, [media])

    return (
        <Fragment>
            <button
                onClick={onOpen}
                ref={btnRef}
                className="hover:bg-gray-100 px-2 py-2 rounded-md"
            >
                View Attachment
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
                    <DrawerHeader>
                        <a
                            className="cursor-pointer underline text-blue-600"
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            download
                        >
                            Click here to download
                        </a >
                    </DrawerHeader >
                    <DrawerBody className="overflow-y-auto">
                        <DocViewer documents={media} pluginRenderers={DocViewerRenderers} />
                    </DrawerBody>
                </DrawerContent >
            </Drawer >
        </Fragment >
    );
}

