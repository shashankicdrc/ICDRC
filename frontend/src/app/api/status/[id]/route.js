import { NextResponse } from "next/server";
import sha256 from "crypto-js/sha256";
import axios from "axios";
// delete require.cache[require.resolve('../../../../../models/Payment')];
import paymentModel from '../../../../../models/Payment'

export async function POST(req, res) {
  const data = await req.formData();
  const deta= await req.body;
  console.log(data);
  console.log(deta);
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

  // CHECK PAYMENT STATUS
  const response = await axios.request(options);
  console.log("r===", response.data.code);


  if (response.data.code == "PAYMENT_SUCCESS"){

  //   const updatedPayment = await paymentModel.findOneAndUpdate(
  //     { merchantTransactionId: transactionId, status: 'pending' }, // Find the document with the given transactionId and pending status
  //     { $set: { status: 'successful' } }, // Update the status to 'successful'
  //     { new: true } // Return the modified document
  // );

  // if (updatedPayment) {
    return NextResponse.redirect("https://icdrc.in/success",{
      status: 301,
    });
// } else {
//     // Handle the case where the document was not found or not updated
//     console.error('Payment document not found or not updated');
// }
}

else {


// const updatePayment = await paymentModel.findOneAndUpdate(
//   { merchantTransactionId: transactionId, status: 'pending' }, // Find the document with the given transactionId and pending status
//   { $set: { status: 'failed' } }, // Update the status to 'successful'
//   { new: true } // Return the modified document
// );
// if (updatePayment) {
  return NextResponse.redirect("https://icdrc.in/failure",{
  // a 301 status is required to redirect from a POST to a GET route
  status: 301,
});
}
// }

}
