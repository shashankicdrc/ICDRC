'use client'

import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import Navbar from '../../components/navbar/page'
import { useEffect } from 'react';
import { useState } from 'react';
import { url } from '../../../api';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import TabSection from './tabsection';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  TableContainer,
} from '@chakra-ui/react';
import PageLoader from '../../components/pageloader/page';



const ContactMessages = () => {

  const router = useRouter();
  const admin = useSelector((state) => state.admin);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!admin._id) {
      router.push('/admin/login')
    }
  }, [router, admin])


  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])

  const getData = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${url}/api/organizationalcomplaint`, {
        headers: {
          Authorization: admin.token,
          'Content-Type': 'application/json',
        }
      })
      if (res.data.success) {
        setData(res.data.data);
      }
    }
    catch (err) {
      // console.log(err);
      if (err?.response?.data?.message) {
        toast.error(err?.response?.data?.message);
      }
    }
    setLoading(false);
  }


  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${url}/api/organizationalcomplaint`, {
          headers: {
            Authorization: admin.token,
            'Content-Type': 'application/json',
          }
        })
        if (res.data.success) {
          setData(res.data.data);
        }
      }
      catch (err) {
        // console.log(err);
        if (err?.response?.data?.message) {
          console.log(err?.response?.data?.message);
        }
      }
      setLoading(false);
    }
    getData();
  }, [admin.token])

  const deletebtn = async (id) => {
    try {
      const res = await axios.delete(`${url}/api/organizationalcomplaint${id}`, {
        headers: {
          Authorization: admin.token,
          'Content-Type': 'application/json',
        }
      })
      if (res.data.success) {
        toast.success(res.data.message);
        getData();
      }
    }
    catch (err) {
      toast.error(err.response.data.message)
      // console.log(err);
    }
  }


  return (
    <div className='bg-gradient-to-r from-orange-300 to-red-300 min-h-screen'>
      {loading && <PageLoader />}
     

      <div className="border-2 bg-white border-gray-400 my-4 mx-4  md:px-3 py-2 md:py-4 rounded-md" data-aos="zoom-in" data-aos-duration="2000">
        <div className='flex justify-between items-center'>
          <p className="text-md font-[Poppins] text-gray-700 md:text-xl font-medium pl-4 lg:pl-8">Total: {data?.length}</p>
        </div>
        <div className='mt-4 md:mt-6 lg:mt-8'>
          <TableContainer >
            <Table variant='striped' colorScheme='orange'>
              <Thead className="ml-2 ">
                <Tr>
                  <Th>S.No</Th>
                  <Th>Date</Th>
                  <Th>Name</Th>
                  <Th>Email Id</Th>
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
                {
                  data?.length > 0 ?
                    data?.map((item, index) => {
                      return (
                        <Message item={item} key={index} index={index} deletebtn={deletebtn} />
                      )
                    }) :
                    <Tr>
                      <Th>No Data found</Th>
                    </Tr>
                }
              </Tbody>
            </Table>
          </TableContainer>
        </div>
      </div >
    </div>
  )
}

export default ContactMessages
