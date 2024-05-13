"use client";
import React, { useState, useEffect } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";
import { url } from "../../../api";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import DeleteAccount from "./DeleteAdmin";
import RolePopover from "./RolePopover";

const TableItems = () => {
  const [adminData, setAdminData] = useState([]);
  const admin = useSelector((state) => state.admin);
  const [isloading, setIsloading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!admin._id) {
      router.push("/admin/login");
    }
  }, [admin]);

  useEffect(() => {
    const getAdmins = async () => {
      setIsloading((prevSt) => !prevSt);
      const response = await fetch(`${url}/api/admins`, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${admin.token}`,
        },
      });
      setIsloading((prevSt) => !prevSt);
      const { data, error } = await response.json();
      if (data) {
        setAdminData(data);
      }
    };
    if (!admin.token) return router.push("/admin/login");
    getAdmins();
  }, []);

  return (
    <TableContainer>
      <Table mt="8" variant="striped" colorScheme="orange">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Email</Th>
            <Th>Role</Th>
            <Th>Change role</Th>
            <Th>Delete</Th>
          </Tr>
        </Thead>
        <Tbody>
          {adminData.length > 0 ? (
            adminData.map((user) => (
              <Tr key={user._id}>
                <Td>{user.name}</Td>
                <Td>{user.emailId}</Td>
                <Td>{user.role}</Td>
                <Td>
                  <RolePopover id={user._id} role={user.role} />
                </Td>
                <Td>
                  <DeleteAccount id={user._id} />
                </Td>
              </Tr>
            ))
          ) : (
            <Tr>
              <Th>{isloading ? "Data is loading..." : "No Data found"}</Th>
            </Tr>
          )}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default TableItems;
