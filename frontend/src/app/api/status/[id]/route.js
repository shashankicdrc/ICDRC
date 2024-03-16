import { NextResponse } from "next/server";
import sha256 from "crypto-js/sha256";
import axios from "axios";
import {url} from '../../../api'
import {furl} from '../../../api'

export async function POST(req, res) {
  try {
  const data = await req.formData();
  const status = data.get("code");
  const merchantId = data.get("merchantId");
  const transactionId = data.get("merchantTransactionId");
  const st =
    `/pg/v1/status/${merchantId}/${transactionId}` +
    process.env.NEXT_PUBLIC_SALT_KEY;
  // console.log(st)
  const dataSha256 = sha256(st);

  const checksum = dataSha256 + "###" + process.env.NEXT_PUBLIC_SALT_INDEX;
  console.log(checksum);

  const options = {
    method: "GET",
    url: `https://api.phonepe.com/apis/hermes/pg/v1/status/${merchantId}/${transactionId}`,
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
      "X-VERIFY": checksum,
      "X-MERCHANT-ID": `${merchantId}`,
    },
  };


  // const submitFormDataWithTransactionId = async (transactionId, complaintFormData) => {
  //   try {
  //     // Add transactionId to the complaintFormData
  //     complaintFormData.transactionId = transactionId;
  
  //     // Submit the complaint form data to the server
  //     const res = await axios.post(`${url}/api/individualcomplaint`, complaintFormData);
  
  //     // Check if the submission was successful
  //     if (res.data.success) {
  //       // Handle success, for example, show success message or redirect to another page
  //     }
  //   } catch (err) {
  //     // Handle error
  //   }
  // };
  // CHECK PAYMENT STATUS
  const response = await axios.request(options);
  console.log("r===", response.data.code);


//   if (response.data.code == "PAYMENT_SUCCESS"){

//     return NextResponse.redirect("https://icdrc.in/success",{
//       status: 301,
//     });
// }

// else {

//   return NextResponse.redirect("https://icdrc.in/failure",{
//   // a 301 status is required to redirect from a POST to a GET route
//   status: 301,
// });
// }

if (response.data.code === "PAYMENT_SUCCESS") {
  // Retrieve complaint form data from local storage
  const storedFormData = JSON.parse(localStorage.getItem("complaintFormData"));
  const storedFormDataOrg = JSON.parse(localStorage.getItem("complaintFormDataOrg"));
  console.log("formdata",storedFormData)
  console.log("formdataor",storedFormDataOrg)

  if (storedFormData) {
    // Add new data to the stored form data
    storedFormData.transactionId = transactionId;
    

    // Submit the updated form data to the server
    const submitResponse = await axios.post(`${url}/api/individualcomplaint`, storedFormData);
    console.log("Form Submission Response:", submitResponse.data);

    // Redirect to the success page
    return NextResponse.redirect(`${furl}/success`, { status: 301 });
  } 
  else if(storedFormDataOrg){
    storedFormDataOrg.transactionId = transactionId;
    

    // Submit the updated form data to the server
    const submitResponse = await axios.post(`${url}/api/organizationalcomplaint`, storedFormDataOrg);
    console.log("Form Submission Response:", submitResponse.data);

    // Redirect to the success page
    return NextResponse.redirect(`${furl}/success`, { status: 301 });
  }
  else {
    console.error("No complaint form data found in local storage.");
    // Redirect to the failure page if form data is not found
    return NextResponse.redirect(`${furl}/failure`, { status: 301 });
  }
} else {
  // Redirect to the failure page if payment was not successful
  const storedFormData = JSON.parse(localStorage.getItem("complaintFormData"));
  const storedFormDataOrg = JSON.parse(localStorage.getItem("complaintFormDataOrg"));
  console.log("formdata",storedFormData)
  console.log("formdataor",storedFormDataOrg)
  return NextResponse.redirect(`${furl}/failure`, { status: 301 });
}
} catch (error) {
console.error("Error:", error.message);
// Redirect to the failure page if an error occurs
return NextResponse.redirect(`${furl}/failure`, { status: 301 });
}
}