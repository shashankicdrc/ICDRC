"use client";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
// import Navbar from "../../components/Navbar/page";
import { useEffect } from "react";
import { useState } from "react";
import { url } from "../api";
import { toast } from "react-hot-toast";
//import { RiDeleteBin3Line } from 'react-icons/ri'
import axios from "axios";
import { useParams } from "next/navigation";

// import 'mdb-react-ui-kit/dist/css/mdb.min.css';

import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
  MDBBreadcrumb,
  MDBBreadcrumbItem,
} from "mdb-react-ui-kit";

export default function ProfilePage() {
  const params = useParams();
  const { id } = useParams();
  const router = useRouter();
  const user = useSelector((state) => state.user);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user._id) {
      router.push("/login");
    }
  }, [router, user]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const getData = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${url}/api/handlepartner`, {
        headers: {
          Authorization: admin.token,
          "Content-Type": "application/json",
        },
      });
      if (res.data.success) {
        setData(res.data.data);
      }
    } catch (err) {
      // console.log(err);
      if (err?.response?.data?.message) {
        toast.error(err?.response?.data?.message);
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${url}/api/individualcomplaint`, {
          headers: {
            Authorization: admin.token,
            "Content-Type": "application/json",
          },
        });
        if (res.data.success) {
          setData(res.data.data);
        }
      } catch (err) {
        // console.log(err);
        if (err?.response?.data?.message) {
          console.log(err?.response?.data?.message);
        }
      }
      setLoading(false);
    };
    getData();
  }, [user.token]);

  const deletebtn = async (id) => {
    try {
      const res = await axios.delete(`${url}/api/individualcomplaint/${id}`, {
        headers: {
          Authorization: admin.token,
          "Content-Type": "application/json",
        },
      });
      if (res.data.success) {
        toast.success(res.data.message);
        getData();
      }
    } catch (err) {
      toast.error(err.response.data.message);
      // console.log(err);
    }
  };

  const formatCreatedAtDate = (createdAt) => {
    const createdAtDate = new Date(createdAt);
    return createdAtDate.toLocaleDateString();
  };

  return (
    <>
      <div className=" items-center justify-center flex border-orange-400 shadow-lg rounded-md">
        <h1 className="font-bold text-orange-400 text-3xl font-[popins] m-4 p-2">
          Your Profile Details
        </h1>
        <div></div>
      </div>

      <section
        className="w-full m-5 mx-auto
     align-middle items-center justify-center flex md:items-center border shadow-orange-400 rounded-lg "
      >
        <MDBContainer className="py-5">
          <MDBRow>
            <MDBRow>
              <MDBCard className="mb-4">
                <MDBCardBody className="flex justify-evenly">
                  <MDBCardImage
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                    alt="avatar"
                    className="rounded-circle max-w-36 max-h-36 my-2 px-3 py-2"
                    fluid
                  />

                  <div className="mb-2">
                    <div className="bg-white w-full  border-gray-400 mx-auto px-3 rounded-xl">
                      
                      <h2
                        className="mt-8 text-md font-semibold font-[Poppins]"
                        data-aos="fade-up"
                        data-aos-duration="2000"
                      >
                        Name :{" "}
                        <span className="text-orange-500 font-[Signika+Negative] ml-3 md:ml-8">
                          {user?.name}
                        </span>
                      </h2>
                      <h2
                        className="mt-3 text-md font-semibold font-[Poppins]"
                        data-aos="fade-up"
                        data-aos-duration="2000"
                      >
                        Email Id :{" "}
                        <span className="text-orange-500 font-[Signika+Negative] ml-3 md:ml-8">
                          {user?.emailId}
                        </span>
                      </h2>
                      <h2
                        className="mt-3 text-md font-semibold font-[Poppins]"
                        data-aos="fade-up"
                        data-aos-duration="2000"
                      >
                        Phone No.:{" "}
                        <span className="text-orange-500 font-[Signika+Negative] ml-3 md:ml-8">
                          +9187XXXXXX56
                        </span>
                      </h2>
                      <div
                        className="grid place-items-center"
                        data-aos="fade-up"
                        data-aos-duration="2000"
                      ></div>
                    </div>

                   
                   
                  </div>
                </MDBCardBody>
              </MDBCard>
            </MDBRow>
            <MDBCol lg="8" className="w-full ml-5">
              <MDBCard className="mb-4 w-full">
                <MDBCardBody className="w-full">
                
                  <MDBRow>
                    
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted pt-2 pb-2">
                       Name:  {user?.emailId}
                      </MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  
                  <MDBRow>
                    
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted pt-2 pb-2">
                       Email:  {user?.emailId}
                      </MDBCardText>
                    </MDBCol>
                  </MDBRow>
                 
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>
    </>
  );
}
