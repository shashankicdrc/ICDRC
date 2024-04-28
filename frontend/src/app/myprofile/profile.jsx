"use client";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useState } from "react";
import { url } from "../api";
import { toast } from "react-hot-toast";
import axios from "axios";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
} from "mdb-react-ui-kit";

export default function ProfilePage() {
  // const { status, data: session } = useSession();
  // const params = useParams();
  // const { id } = useParams();
  const router = useRouter();
  const user = useSelector((state) => state.user);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user._id) {
      router.push("/login");
    }
  }, [router, user]);
  //google auth routing

  //  useEffect(()=>{
  //     if (!status === "authenticated"){
  //       router.push('/login')
  //     }
  //   })

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch all individual complaints
        const response = await fetch(`${url}/api/individualcomplaint`, {
          headers: { token: user.token },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();

        // Filter the data based on the logged-in user's email ID
        // const filteredData = allData.filter(
        //   (item) => item.email === user.email
        // );

        // Update the state with the filtered data
        setData(data);
        // console.log("Filtered Data:", filteredData);
      } catch (error) {
        console.error(error);
        // setError("Failed to fetch data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  // console.log(session, user);

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

  // if (status === "authenticated"){

  return (
    <>
      <section
        className="w-full m-5 mx-auto
      border shadow-orange-400 rounded-lg "
      >
        <h1 className="font-bold text-orange-400 text-3xl font-[popins] m-4 p-2">
          Your Profile Details
        </h1>
        <div className="align-middle items-center justify-center flex md:items-center">
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
                        {/* <h2
                        className="mt-3 text-md font-semibold font-[Poppins]"
                        data-aos="fade-up"
                        data-aos-duration="2000"
                      >
                        Phone No.:{" "}
                        <span className="text-orange-500 font-[Signika+Negative] ml-3 md:ml-8">
                          +9187XXXXXX56
                        </span>
                      </h2> */}
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
                  <MDBCardBody className="w-full"></MDBCardBody>
                </MDBCard>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </div>
      </section>
    </>
  );
}
