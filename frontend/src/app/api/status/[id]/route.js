import { NextResponse } from "next/server";
import sha256 from "crypto-js/sha256";
import axios from "axios";
import { url } from "../../../api";
import { furl } from "../../../api";

export async function POST(req, res) {
  try {
    const data = await req.formData();
    const { searchParams } = new URL(req.url);
    const caseId = searchParams.get("caseId");
    const caseType = searchParams.get("caseType");
    const merchantId = data.get("merchantId");
    const transactionId = data.get("transactionId");
    const st =
      `/pg/v1/status/${merchantId}/${transactionId}` +
      process.env.NEXT_PUBLIC_SALT_KEY;
    const dataSha256 = sha256(st);

    const checksum = dataSha256 + "###" + process.env.NEXT_PUBLIC_SALT_INDEX;

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

    const response = await axios.request(options);
    if (response.data.code === "PAYMENT_SUCCESS") {
      const res = await fetch(`${url}/api/casestatus/payment`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ caseId, caseType, isPay: true }),
      });
      const { data, error } = await res.json();
      const query = `amount=${response.data.data.amount}&transactionId=${response.data.data.transactionId}`;
      if (data) {
        return NextResponse.redirect(`${furl}/success?${query}`, {
          status: 301,
        });
      }
      return NextResponse.redirect(`${furl}/success?${query}&message=${error}`);
    }
    return NextResponse.redirect(
      `${furl}/failure?message=${response.data.message}`,
      { status: 301 },
    );
  } catch (error) {
    console.error("Error: catch ", error.message);
    return NextResponse.redirect(`${furl}/failure?message=${error.message}`, {
      status: 301,
    });
  }
}
