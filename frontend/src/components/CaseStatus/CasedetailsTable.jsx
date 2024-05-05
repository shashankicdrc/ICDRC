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
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function CasedetailsTable() {
  const [caseData, setCaseData] = useState([]);
  const router = useRouter();

  useEffect(() => {
    if (window) {
      const sessionData = JSON.parse(sessionStorage.getItem("caseDetails"));
      if (!sessionData) {
        toast.error("You don't have any data.");
        router.push("/", { scroll: false });
        return;
      }
      setCaseData([sessionData.data]);
    }
  }, []);

  return (
    <Fragment>
      {!caseData.length ? (
        <div className="my-10">
          <p className="text-xl text-center my-3">
            Hold on we are loading your data
          </p>
        </div>
      ) : (
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
              {caseData.map((item) => (
                <Tr key={item._id}>
                  <Td>{item._id}</Td>
                  <Td>{item.email}</Td>
                  <Td>{item.mobile}</Td>
                  <Td>{item.status}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      )}
    </Fragment>
  );
}
