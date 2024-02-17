import React from 'react';
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
  MDBProgress,
  MDBProgressBar,
  MDBIcon,
  MDBListGroup,
  MDBListGroupItem
} from 'mdb-react-ui-kit';



import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useState } from 'react';
import { url } from '../api';
import { toast } from 'react-hot-toast';
import axios from 'axios';

export default function ProfilePage() {


  const router = useRouter();
  const admin = useSelector((state) => state.admin);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])

  const getData = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${url}/api/handlecontact`, {
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
        const res = await axios.get(`${url}/api/handlecontact`, {
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





  return (
    <section className="w-full m-5 mx-auto
     align-middle items-center justify-center flex md:items-center border shadow-orange-400 rounded-lg ">
      <MDBContainer className="py-5">
        <MDBRow>
          <MDBCol>
            <MDBBreadcrumb className=" border-gray shandow-black rounded-3 p-3 mb-4">
              
              
              <MDBBreadcrumbItem className="bg-orange-200 pl-3 font-bold text-2xl rounded-md ml-3" active>User Profile</MDBBreadcrumbItem>
            </MDBBreadcrumb>
          </MDBCol>
        </MDBRow>

        <MDBRow>
          <MDBRow>
            <MDBCard className="mb-4">
              <MDBCardBody className="text-center">
                <MDBCardImage
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                  alt="avatar"
                  className="rounded-circle"
                  style={{ width: '150px' }}
                  fluid />
                <p className="text-muted mb-1">Full Stack Developer</p>
                <p className="text-muted mb-4">Bay Area, San Francisco, CA</p>
                <div className="d-flex justify-content-center mb-2">
                  <MDBBtn>Follow</MDBBtn>
                  <MDBBtn outline className="ms-1">Message</MDBBtn>
                </div>
              </MDBCardBody>
            </MDBCard>

            
          </MDBRow>
          <MDBCol lg="8" className="w-full mt-5">
            <MDBCard className="mb-4 w-full">
              <MDBCardBody className="w-full">
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Full Name</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">Johnatan Smith</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Email</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">example@example.com</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Phone</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">(097) 234-5678</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Mobile</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">(098) 765-4321</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Address</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">Bay Area, San Francisco, CA</MDBCardText>
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
            </MDBCard>

           
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
  );
}