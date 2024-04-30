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

export default function CasedetailsTable() {
  return (
    <TableContainer>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Id</Th>
            <Th>Email</Th>
            <Th>Mobile No.</Th>
            <Th>Status</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>01</Td>
            <Td>dummy@gamil..com</Td>
            <Td>098743552</Td>
            <Td>Pending</Td>
          </Tr>
        </Tbody>
      </Table>
    </TableContainer>
  );
}
