import React, { Fragment } from "react";
import Link from "next/link";
import { IoMdCloseCircle } from "react-icons/io";

const Failure = ({ searchParams }) => {
  const message = searchParams.message;
  return (
    <Fragment>
      <main className="flex mx-auto md:w-[40%] items-center justify-center mt-40">
        <div className="rounded-md shadow-md border border-gray-300 px-5 py-5 text-center">
          <div className="flex justify-center">
            <IoMdCloseCircle className="text-xl text-red-700" size={70} />
          </div>
          <div className="my-3 space-y-2">
            <h1 className="text-center text-3xl">Payment Failed!</h1>
            <p>{message}</p>
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

export default Failure;
