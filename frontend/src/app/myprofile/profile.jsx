'use client'


import 'mdb-react-ui-kit/dist/css/mdb.min.css';

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
            // headers: {
            //     Authorization: admin.token,
            //     'Content-Type': 'application/json',
            // }
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
                // headers: {
                //     Authorization: admin.token,
                //     'Content-Type': 'application/json',
                // }
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

// const deletebtn = async (id) => {
//     try {
//         const res = await axios.delete(`${url}/api/handlepartner/${id}`, {
//             headers: {
//                 Authorization: admin.token,
//                 'Content-Type': 'application/json',
//             }
//         })
//         if (res.data.success) {
//             toast.success(res.data.message);
//             getData();
//         }
//     }
//     catch (err) {
//         toast.error(err.response.data.message)
//         // console.log(err);
//     }
// }

// const formatCreatedAtDate = (createdAt) => {
//     const createdAtDate = new Date(createdAt);
//     return createdAtDate.toLocaleDateString();
// };



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
                <p className="text-muted mb-1">Name:  {admin?.name}</p>
                <p className="text-muted mb-4">Email: {admin?.emailId}</p>
                <div className="d-flex justify-content-center mb-2">

                {
                                    data?.length > 0 ?
                                        data?.map((item, index) => {
                                            return (
                                                <p key={item._id}>
                                                    <p>{index + 1}</p>
                                                    <p>{formatCreatedAtDate(item.createdAt)}</p>
                                                    <p>name: {item.name}</p>
                                                    <p>Email: {item.email}</p>
                                                    <p>Mobile: {item.mobile}</p>
                                                    <p>Company: {item.company}</p>
                                                   
                                                </p>
                                            )
                                        }) :
                                        
                                            <p>No Data found</p>
                                        
                                }

                  <MDBBtn>Follow</MDBBtn>
                  <MDBBtn outline className="ms-1">email</MDBBtn>
                </div>
              </MDBCardBody>
            </MDBCard>

            
          </MDBRow>
          <MDBCol lg="8" className="w-full mt-5">
            <MDBCard className="mb-4 w-full">
              <MDBCardBody className="w-full">
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>{admin?.Name}</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{admin?.emailId}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Email</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{admin?.emailId}</MDBCardText>
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