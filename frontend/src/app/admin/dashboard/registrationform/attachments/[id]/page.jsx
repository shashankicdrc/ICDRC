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

const formatData = (arr) => {
  return arr.map((item) => ({
    ...item,
    media: item.media.map((media) => ({ ...media, uri: media.url })),
  }));
};

export default async function page({ params, searchParams }) {
  console.log(searchParams.caseType);
  const response = await fetch(
    `${url}/api/casestatus/attachments?caseId=${params.id}&caseType=${searchParams.caseType}`,
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
      <div className="my-5 rounded-lg shadow-lg border border-gray-200">
        <TableContainer>
          <Table>
            <Thead className="py-3">
              <Tr>
                <Th>S No.</Th>
                <Th>Name</Th>
                <Th>View</Th>
              </Tr>
            </Thead>
            <Tbody>
              {attachmentData.length ? (
                attachmentData.map((attachment, key) => (
                  <Tr key={attachment._id}>
                    <Td>{key + 1}</Td>
                    <Td>{attachment.attachment_name}</Td>
                    <Td>
                      <AttachmentView media={attachment.media} />
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
    </Fragment>
  );
}
