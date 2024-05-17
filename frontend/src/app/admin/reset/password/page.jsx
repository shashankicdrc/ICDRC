import React from "react";
import Link from "next/link";
import Image from "next/image";
import ResetPassword from "../../components/forms/ResetPassword";

const page = ({ searchParams }) => {
  if (!searchParams.token) {
    return (
      <div className="mx-5 my-5 space-y-3">
        <h2 className="text-3xl">It seems like you have broken url.</h2>
        <p>Kindly check your url.</p>
        <Link href="/admin/dashboard">
          <button className="px-5 py-2 rounded-md bg-orange-500 text-white my-2">
            Go to Home
          </button>
        </Link>
      </div>
    );
  }
  return (
    <div>
      <div className="overflow-hidden">
        <div
          className=""
          style={{
            backgroundImage: `url(https://res.cloudinary.com/dl5hosmxb/image/upload/v1690784022/Home_page/Home1/homeslider2_zzybpj.webp)`,
          }}
        >
          <div className="fixed bg-gray-900 px-3 py-2 rounded-2xl top-4 left-4">
            <Link href="/admin/dashboard">
              <Image
                src="https://res.cloudinary.com/dl5hosmxb/image/upload/v1692866749/Logo/Copy_of_ICDRC_912_273_px_rwkrry.png"
                alt="logo"
                className="md:cursor-pointer w-28 md:w-44"
                width={200}
                height={80}
              />
            </Link>
          </div>
          <div
            className="flex bg-cover bg-no-repeat justify-center items-center h-screen w-screen px-4 md:px-0"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.4)" }}
          >
            <div className=" rounded-xl relative mx-auto w-full max-w-md bg-white px-6 pt-10 mt-12 pb-8 shadow-xl ring-1 ring-gray-900/5 sm:rounded-xl sm:px-10">
              <div className="w-full">
                <div className="text-center">
                  <h1
                    className="text-3xl font-semibold text-gray-900"
                    data-aos="fade-up"
                    data-aos-duration="1000"
                  >
                    Reset your password
                  </h1>
                </div>
                <div
                  className="mt-5"
                  data-aos="fade-up"
                  data-aos-duration="1000"
                >
                  <ResetPassword />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
