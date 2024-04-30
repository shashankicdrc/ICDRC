"use client";
import React from "react";
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

export default function AttachmentTable() {
  return (
    <TableContainer>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Total attachment</Th>
            <Th>View</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>Adhar Card</Td>
            <Td>5</Td>
            <Td>
              <AttachmentView />{" "}
            </Td>
          </Tr>
          <Tr>
            <Td>Insurance copy</Td>
            <Td>2</Td>
            <Td>
              <AttachmentView />
            </Td>
          </Tr>
        </Tbody>
      </Table>
    </TableContainer>
  );
}
