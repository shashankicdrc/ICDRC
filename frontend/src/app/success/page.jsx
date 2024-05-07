// export default Success
import React, { Fragment } from "react";
import Link from "next/link";
import { FaCheckCircle } from "react-icons/fa";
import { MdCurrencyRupee } from "react-icons/md";

const page = ({ searchParams }) => {
  const message = searchParams.message;
  const transactionId = searchParams.transactionId;
  const amount = searchParams.amount;
  return (
    <Fragment>
      <main className="flex mx-auto md:w-[40%] items-center justify-center mt-40">
        <div className="rounded-md shadow-md border px-5 py-5 text-center">
          <div className="flex justify-center">
            <FaCheckCircle className="text-xl text-green-700" size={70} />
          </div>
          <div className="my-3 space-y-2 text-center">
            <h2 className="text-2xl font-bold justify-center flex space-x-1 items-center">
              <MdCurrencyRupee size={20} />
              <span> {amount}</span>
            </h2>
            <div className="space-y-2">
              <h1 className="text-3xl">Payment sucessfull!</h1>
              {message ? (
                <p>
                  Your payment is successfull but an error "{message}" occured
                  during process.Please contact site owner.
                </p>
              ) : null}
              <p className="text-gray-500">
                Your transactionId: {transactionId}
              </p>
            </div>
          </div>

          <Link
            href="/"
            className="px-4 w-full py-3 my-2 rounded-md bg-orange-500
                        hover:bg-orange-600 text-white"
          >
            Go to Home
          </Link>
        </div>
      </main>
    </Fragment>
  );
};

export default page;
