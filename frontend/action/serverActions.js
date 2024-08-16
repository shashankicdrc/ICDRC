'use server';
import { v4 as uuidv4 } from 'uuid';
import sha256 from 'crypto-js/sha256';
import axios from 'axios';
import { furl } from '../src/app/api';

export async function payment(formData) {
    console.log('hii', formData);
    const transactionid = 'Tr-' + uuidv4().toString(36).slice(-6);
    const { name, email, mobile, amount, caseId, caseType } = formData;

    const payload = {
        name,
        amount,
        email,
        mobile,
        merchantId: process.env.NEXT_PUBLIC_MERCHANT_ID,
        merchantTransactionId: transactionid,
        merchantUserId: 'MUID-' + uuidv4().toString(36).slice(-6),
        redirectUrl: `${furl}/api/status/${transactionid}?caseId=${caseId}&caseType=${caseType}`,
        redirectMode: 'POST',
        callbackUrl: `${furl}/api/status/${transactionid}?caseId=${caseId}&caseType=${caseType}`,
        paymentInstrument: {
            type: 'PAY_PAGE',
        },
    };

    const dataPayload = JSON.stringify(payload);
    console.log(dataPayload);

    const dataBase64 = Buffer.from(dataPayload).toString('base64');
    console.log(dataBase64);

    const fullURL =
        dataBase64 + '/pg/v1/pay' + process.env.NEXT_PUBLIC_SALT_KEY;
    const dataSha256 = sha256(fullURL);

    const checksum = dataSha256 + '###' + process.env.NEXT_PUBLIC_SALT_INDEX;
    console.log('c====', checksum);

    const details = {
        name,
        email,
        mobile,
        amount,
        merchantTransactionId: transactionid,
        merchantUserId: 'MUID-' + uuidv4().toString(36).slice(-6),
    };
    //  paymentModel.create(details);
    const UAT_PAY_API_URL = 'https://api.phonepe.com/apis/hermes/pg/v1/pay';

    const response = await axios.post(
        UAT_PAY_API_URL,
        {
            request: dataBase64,
        },
        {
            headers: {
                accept: 'application/json',
                'Content-Type': 'application/json',
                'X-VERIFY': checksum,
            },
        },
    );

    const redirect = response.data.data.instrumentResponse.redirectInfo.url;
    console.log('1', redirect);
    return { url: redirect };
}
