"use client";
import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { payment } from "../../../action/serverActions";
import HomeNav from "../Navbar/page";
import { FiLoader } from "react-icons/fi";
import toast from "react-hot-toast";

const Pay = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    amount: "100",
    caseId: searchParams.get("caseId"),
    caseType: searchParams.get("caseType"),
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const makePayment = async (e) => {
    e.preventDefault();
    setLoading((prevState) => !prevState);
    try {
      const { url: redirect } = await payment(formData);
      setLoading((prevState) => !prevState);
      router.push(redirect);
    } catch (error) {
      console.error("Error while making payment:", error);
      setLoading((prevState) => !prevState);
      toast.error(error.message);
    }
  };

  return (
    <>
      <HomeNav />

      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 ">
        <div className="mt-16 sm:mx-auto sm:w-full sm:max-w-sm ">
          <h1 className="text-xl my-5">Please Enter your Payment Details</h1>
          <form className="space-y-6" onSubmit={makePayment}>
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Name
              </label>
              <div className="mt-2">
                <input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  type="text"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  type="email"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="Mobile"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Mobile
              </label>
              <div className="mt-2">
                <input
                  id="Mobile"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleInputChange}
                  required
                  type="number"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="Amount"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Amount
              </label>
              <div className="mt-2">
                <input
                  id="Amount"
                  name="amount"
                  value={formData.amount}
                  autoComplete="Amount"
                  disabled // Disable the inpu
                  required=""
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <button
                disabled={loading ? true : false}
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {loading ? (
                  <>
                    <FiLoader className="animate-spin mr-2" size={30} />
                    please wait ...
                  </>
                ) : (
                  "Pay"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Pay;
