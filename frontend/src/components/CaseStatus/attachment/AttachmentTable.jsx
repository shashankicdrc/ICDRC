"use client";
import React, { useState, useEffect, Fragment } from "react";
import {
    TableContainer,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
} from "@chakra-ui/react";
import AttachmentView from "../attachment/ViewAttachment";
import { url } from "../../../app/api";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function AttachmentTable() {
    const [attachmentData, setAttachmentData] = useState([]);
    const router = useRouter();

    const formatData = (arr) => {
        return arr.map((item) => ({
            ...item,
            media: item.media.map((media) => ({ ...media, uri: media.url })),
        }));
    };

    useEffect(() => {
        const attachments = async (id, case_type) => {
            const query = `caseId=${id}&caseType=${case_type}`;
            const response = await fetch(
                `${url}/api/casestatus/attachments?${query}`,
            );
            const { data, error } = await response.json();
            if (response.status !== 200) {
                return toast.error(error);
            }
            setAttachmentData(formatData(data.attachments));
        };

        if (window) {
            const caseData = JSON.parse(sessionStorage.getItem("caseDetails"));
            if (!caseData) {
                toast.error("You don't have any data.");
                router.push("/", { scroll: false });
                return;
            }

            attachments(caseData.data._id, caseData.case_type);
        }
    }, []);

    return (
        <Fragment>
            {!attachmentData.length ? (
                <div className="my-10">
                    <p className="text-xl text-center my-3">
                        Hold on we are loading your data
                    </p>
                </div>
            ) : (
                <TableContainer>
                    <Table>
                        <Thead className="py-3">
                            <Tr>
                                <Th>S No.</Th>
                                <Th>Name</Th>
                                <Th>Uploaded By</Th>
                                <Th>View</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {attachmentData.map((attachment, key) => (
                                <Tr key={attachment._id}>
                                    <Td>{key + 1}</Td>
                                    <Td>{attachment.attachment_name}</Td>
                                    <Td className="capitalize">{attachment.attachment_type}</Td>
                                    <Td>
                                        <AttachmentView media={attachment.media} />
                                    </Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                </TableContainer>
            )}
        </Fragment>
    );
}
