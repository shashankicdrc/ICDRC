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
import { IoIosClose } from "react-icons/io";

export default function UploadedDatatable({ fileData, removeFile }) {
  return (
    <TableContainer>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Size</Th>
            <Th>type</Th>
            <Th>Remove</Th>
          </Tr>
        </Thead>
        <Tbody>
          {fileData.map((file) => (
            <Tr key={file.name}>
              <Td>{file.name}</Td>
              <Td>{Math.floor(file.size / 100)} kb </Td>
              <Td>{file.type}</Td>
              <Td className="cursor-pointer">
                <IoIosClose size={30} onClick={() => removeFile(file.name)} />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}
