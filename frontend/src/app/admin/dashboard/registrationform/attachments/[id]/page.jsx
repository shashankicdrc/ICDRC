import React, { Fragment } from "react";
import {
    TableContainer,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
} from "@chakra-ui/react";
import AttachmentView from "../../../../../../components/CaseStatus/attachment/ViewAttachment";
import { url } from "../../../../../api";
import CommentSection from '../CommentSection'
import UploadDrawer from "../../../../../../components/CaseStatus/attachment/UploadDrawer";

const formatData = (arr) => {
    return arr.map((item) => ({
        ...item,
        media: item.media.map((media) => ({ ...media, uri: media.url })),
    }));
};

export default async function page({ params, searchParams }) {
    const response = await fetch(
        `${url}/api/casestatus/attachments?caseId=${params.id}&caseType=${searchParams.caseType}`,
        {
            method: "GET",
            cache: 'no-cache'
        }
    );
    const { data, error, message } = await response.json();
    if (response.status !== 200) {
        throw new Error(error ? error : message);
    }
    let attachmentData = [];
    if (data && data.attachments) {
        attachmentData = formatData(data.attachments);
    }

    return (
        <Fragment>
            <div>
                <div className="flex items-center justify-between">
                    <h3 className="text-4xl capitalize">All Attachments</h3>
                    <UploadDrawer type="admin" id={params.id} />
                </div>
                <span className="text-sm text-gray-500">
                    Note: If you are not seeing your attachments, please refresh the page.
                </span>
            </div>
            <div className="my-5 rounded-lg shadow-lg border border-gray-200">
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
                            {attachmentData.length ? (
                                attachmentData.map((attachment, key) => (
                                    <Tr key={attachment._id}>
                                        <Td>{key + 1}</Td>
                                        <Td>{attachment.attachment_name}</Td>
                                        <Td className="capitalize">{attachment.attachment_type}</Td>
                                        <Td>
                                            <AttachmentView media={attachment.media} filename={attachment.attachment_name} />
                                        </Td>
                                    </Tr>
                                ))
                            ) : (
                                <Tr>
                                    <Th>No, Attachment has found.</Th>
                                </Tr>
                            )}
                        </Tbody>
                    </Table>
                </TableContainer>
            </div>
            <h3 className="my-4 text-3xl">Comments</h3>

            <CommentSection
                caseId={params.id}
                caseType={searchParams.caseType}
                placed="dashboard"
            />
        </Fragment>
    );
}
