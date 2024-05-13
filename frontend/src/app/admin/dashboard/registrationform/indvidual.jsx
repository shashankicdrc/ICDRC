import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { url } from "../../../api";
import { toast } from "react-hot-toast";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";
import Menu from "../../components/CaseStatus/Menu";

const Indvidual = () => {
  const router = useRouter();
  const admin = useSelector((state) => state.admin);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!admin._id) {
      router.push("/admin/login");
    }
  }, [admin]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${url}/api/individualcomplaint/all`, {
          headers: {
            Authorization: `Bearer ${admin._id}`,
          },
        });
        const { error, data } = await response.json();
        if (error) {
          return toast.error(error);
        }
        setData(data);
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
              </Tr>
            </Thead>
            <Tbody>
              {data?.length > 0 ? (
                data?.map((item, index) => {
                  return (
                    <Tr key={item._id}>
                      <Td>{index + 1}</Td>

                      <Td>{formatCreatedAtDate(item.createdAt)}</Td>
                      <Td>{item.name}</Td>
                      <Td>{item.status}</Td>
                      <Td>{item.email}</Td>
                      <Td>{item.isPay ? "Done" : "Pending"}</Td>
                      <Td>{item.mobile}</Td>
                      <Td>{item.country}</Td>
                      <Td>{item.state}</Td>
                      <Td>{item.address}</Td>
                      <Td>{item.language}</Td>
                      <Td>{item.policyCompany}</Td>
                      <Td>{item.policyType}</Td>
                      <Td>{item.problem}</Td>
                      <Td>{item.problemDetails}</Td>
                      <Td>
                        <Menu caseType={"individual"} caseId={item._id} />
                      </Td>
                    </Tr>
                  );
                })
              ) : (
                <Tr>
                  <Th className="text-xl text-center">
                    {loading
                      ? "Hold on we are loading your data. Please wait ... "
                      : "No data found"}
                  </Th>
                </Tr>
              )}
            </Tbody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default Indvidual;
