"use client";

import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useState } from "react";
import { url } from "../../../api";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";
import PageLoader from "../../components/pageloader/page";
import Menu from "../../components/CaseStatus/Menu";

const ContactMessages = () => {
  const [error, setError] = useState("");
  const router = useRouter();
  const admin = useSelector((state) => state.admin);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!admin._id) {
      router.push("/admin/login");
    }
  }, [router, admin]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${url}/api/organizationalcomplaint/all`);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const jsonData = await response.json();
        console.log("API Response:", jsonData); // Log API response
        // Check if the data is not an array
        if (!Array.isArray(jsonData)) {
          // If it's not an array, convert it to an array with a single item
          setData([jsonData]);
        } else {
          setData(jsonData);
        }
      } catch (error) {
        console.error(error);
        setError("Failed to fetch data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [admin.token]);

  const formatCreatedAtDate = (createdAt) => {
    const createdAtDate = new Date(createdAt);
    return createdAtDate.toLocaleDateString();
  };

  return (
    <div className="bg-gradient-to-r from-orange-300 to-red-300 min-h-screen">
      {loading && <PageLoader />}

      <div
        className="border-2 bg-white border-gray-400 my-4 mx-4  md:px-3 py-2 md:py-4 rounded-md"
        data-aos="zoom-in"
        data-aos-duration="2000"
      >
        <div className="flex justify-between items-center">
          <p className="text-md font-[Poppins] text-gray-700 md:text-xl font-medium pl-4 lg:pl-8">
            Total: {data?.length}
          </p>
        </div>
        <div className="mt-4 md:mt-6 lg:mt-8">
          <TableContainer>
            <Table variant="striped" colorScheme="orange">
              <Thead>
                <Tr>
                  <Th>S.No</Th>
                  <Th>Date</Th>
                  <Th>Name</Th>
                  <Th>Status</Th>
                  <Th>Email</Th>
                  <Th>Payment</Th>
                  <Th>Mobile</Th>
                  <Th>Country</Th>
                  <Th>State</Th>
                  <Th>Address</Th>
                  <Th>Language</Th>
                  <Th>Policy Company</Th>
                  <Th>Policy Type</Th>
                  <Th>Problem</Th>
                  <Th>Details</Th>
                  <Th>Menu</Th>
                </Tr>
              </Thead>
              <Tbody>
                {data?.length > 0 ? (
                  data?.map((item, index) => {
                    return (
                      <Tr className="cursor-pointer">
                        <Td>{index + 1}</Td>
                        <Td>{formatCreatedAtDate(item.createdAt)}</Td>
                        <Td>{item.organization_name}</Td>
                        <Td className="capitalize">{item.status}</Td>
                        <Td>{item.email}</Td>
                        <Td className="capitalize">
                          {item.isPay ? "Done" : "Pending"}
                        </Td>
                        <Td>{item.mobile}</Td>
                        <Td>{item.country}</Td>
                        <Td className="capitalize">{item.state}</Td>
                        <Td>{item.address}</Td>
                        <Td>{item.language}</Td>
                        <Td>{item.policyCompany}</Td>
                        <Td>{item.policyType}</Td>
                        <Td>{item.problem}</Td>
                        <Td>{item.problemDetails}</Td>
                        <Td>
                          <Menu caseType={"organisational"} caseId={item._id} />
                        </Td>
                      </Tr>
                    );
                  })
                ) : (
                  <Tr>
                    <Th>No Data found</Th>
                  </Tr>
                )}
              </Tbody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </div>
  );
};

export default ContactMessages;
