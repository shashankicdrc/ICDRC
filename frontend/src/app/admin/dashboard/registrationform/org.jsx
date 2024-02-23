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
// import Message from './message';


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
      const res = await axios.get(`${url}/api/individualcomplaint`, {
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
        const res = await axios.get(`${url}/api/individualcomplaint`, {
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
      const res = await axios.delete(`${url}/api/individualcomplaint${id}`, {
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
      <Navbar />

      <div
        className="relative overflow-hidden rounded-sm bg-cover bg-no-repeat p-12 text-center"
        style={{ backgroundImage: `url(https://res.cloudinary.com/dl5hosmxb/image/upload/v1690779742/Register_page/bg1_phs9it.webp)`, height: '250px' }}>
        <div
          className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-fixed"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}>
          <div className="flex h-full items-center justify-end flex-col">
            <h2 className=" mb-4 md:mb-8 text-white text-3xl text-center md:text-5xl font-semibold" data-aos="fade-up" data-aos-duration="2000">
              All Registrated Forms
            </h2>
          </div>
        </div>
      </div>

      <h1 className='text-gray-900 text-3xl mt-6 md:mt-8 md:text-6xl font-[Roboto] font-bold text-center bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent px-8' data-aos="fade-up" data-aos-duration="1000">
                REGISTERED COMPLAINT
            </h1>
            <p className='text-gray-700 text-center font-medium text-md py-2  tracking-widest mx-auto px-8' data-aos="fade-up" data-aos-duration="1000">
                All registered complain data individual and organizational details.
            </p>

            {/* <ComplainForm /> */}
            <TabSection />

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
