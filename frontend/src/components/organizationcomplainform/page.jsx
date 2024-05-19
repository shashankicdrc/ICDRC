"use client";

import { useEffect, Fragment } from "react";
import "../../styles/module.organizationcomplainform.css";
import { useState } from "react";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { State, City } from "country-state-city";
import { useRouter } from "next/navigation";
import { FiLoader } from "react-icons/fi";
import { toast } from "react-hot-toast";
import { url } from "../../app/api";
import { payment } from "../../../action/serverActions";
import { makeKeys, encryptData, decryptData } from "../../lib/Encryption";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import {
  insurance,
  PolicyType as InsurancePolicyType,
  problemOptions,
} from "../../lib/constant";

const OrganizationComplainForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [policyCompany, setPolicyCompany] = useState("");
  const [otherPolicyCompany, setOtherPolicyCompany] = useState("");
  const [policyType, setPolicyType] = useState("");
  const [otherPolicyType, setOtherPolicyType] = useState("");
  const [problem, setProblem] = useState("");
  const [otherProblem, setOtherProblem] = useState("");
  const [problemDetails, setProblemDetails] = useState("");

  const [mobile, setMobile] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const country = "India";

  const [cityData, setCityData] = useState();
  const router = useRouter();
  const states = State.getStatesOfCountry("IN");
  const [loading, setLoading] = useState(false);
  const [paymentLoading, setpaymentLoading] = useState(false);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [caseData, setCaseData] = useState([]);

  useEffect(() => {
    let db;

    const dbRequest = indexedDB.open("ICDRCDatabase", 1);

    dbRequest.onupgradeneeded = function (e) {
      console.log("upgrading...");
      db = e.target.result;

      db.onerror = (e) => {
        console.error("error happend", db.error);
      };

      // Create an objectStore for this database
      db.createObjectStore("organisational", {
        keyPath: "id",
      });
      db.createObjectStore("individual", {
        keyPath: "id",
      });
    };

    dbRequest.onerror = (event) => {
      console.log(`Error while loading`, dbRequest.error);
    };

    dbRequest.onsuccess = (e) => {
      console.log("sucessfully open");
      db = dbRequest.result;

      const objectStore = db
        .transaction("organisational", "readonly")
        .objectStore("organisational");
      const request = objectStore.get(1);

      request.onsuccess = async (e) => {
        console.log("success");
        const result = request.result;
        if (result) {
          const keys = result.keys;
          const encryptData = result.data;
          const decryptedData = await decryptData(encryptData, keys);
          const decryptedJSON = new TextDecoder().decode(decryptedData);
          const decryptedObject = JSON.parse(decryptedJSON);
          setCaseData([decryptedObject]);
        }
      };

      request.onerror = (e) => {
        console.error("Error fetching data from IndexedDB:", e.target.error);
      };
    };
  }, []);

  useEffect(() => {
    if (state?.length > 1) {
      let data = states.find((s) => s.name === state);
      data && setCityData(City.getCitiesOfState("IN", data?.isoCode));
      setCity("");
    }
    // eslint-disable-next-line
  }, [state]);

  function validateMobileNumber(number) {
    const pattern = /^\+\d{1,3}\d{5,15}$/;
    return pattern.test(number);
  }

  function validateEmailAddress(email) {
    const pattern = /^[a-z0-9._]+@[a-z]+\.[a-z]{2,6}$/;
    return pattern.test(email);
  }

  const updateDb = (data) => {
    // Access IndexedDB and put an object
    const dbRequest = indexedDB.open("ICDRCDatabase", 1);

    dbRequest.onsuccess = (event) => {
      const db = event.target.result;
      const trx = db.transaction(["organisational"], "readwrite");
      const store = trx.objectStore("organisational");
      store.put(data);
    };

    dbRequest.onerror = (event) => {
      console.error("Error opening IndexedDB:", dbRequest.error);
    };
  };

  const deleteObjectStore = () => {
    // Access IndexedDB and put an object
    const dbRequest = indexedDB.open("ICDRCDatabase", 1);

    dbRequest.onsuccess = (event) => {
      const db = event.target.result;
      const trx = db.transaction(["organisational"], "readwrite");
      const store = trx.objectStore("organisational");
      store.delete(1);
    };

    dbRequest.onerror = (event) => {
      console.error("Error opening IndexedDB:", dbRequest.error);
    };
  };

  const makePayment = async (e) => {
    e.preventDefault();
    setpaymentLoading((prevState) => !prevState);
    try {
      const formData = caseData[0];
      if (!formData) return setpaymentLoading((prevState) => !prevState);
      const { url: redirect } = await payment(formData);
      deleteObjectStore();
      setLoading((prevState) => !prevState);
      router.push(redirect);
    } catch (error) {
      console.error("Error while making payment:", error);
      setpaymentLoading((prevState) => !prevState);
      toast.error(error.message);
    }
  };

  // FORM SUBMIT HANDLER
  const SubmitHandler = async (e) => {
    e.preventDefault();
    try {
      if (!validateMobileNumber(mobile)) {
        toast.error("Enter valid mobile number");
        setLoading((prevState) => !prevState);
        return;
      }

      if (!validateEmailAddress(email)) {
        setLoading((prevState) => !prevState);
        toast.error("Enter valid email address");
        return;
      }

      const res = await fetch(`${url}/api/organizationalcomplaint`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          organization_name: name,
          mobile,
          email,
          country,
          state,
          city,
          address,
          policyType: policyType === "Other" ? otherPolicyType : policyType,
          policyCompany:
            policyCompany === "Other" ? otherPolicyCompany : policyCompany,
          otherPolicyType,
          problem,
          otherProblem,
          problemDetails,
          otherPolicyCompany,
        }),
      });
      setLoading((prevState) => !prevState);
      const { data, error, message } = await res.json();
      if (error) {
        setLoading((prevState) => !prevState);
        toast.error(message || error);
        return;
      }
      const plainObject = {
        caseId: data.caseId,
        caseType: "organisational",
        amount: 1 * 100,
      };
      setCaseData([plainObject]);
      const keys = await makeKeys();
      const encrypted = await encryptData(keys, JSON.stringify(plainObject));
      updateDb({ id: 1, keys: keys, data: encrypted });
      setLoading((prevState) => !prevState);
      return onOpen();
    } catch (error) {
      setLoading(false);
      console.log("error", error);
      toast.error(error.message);
    }
  };

  return (
    <Fragment>
      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Make Payment</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            Your case has been registered sucessfully and an email has been send
            regarding the case. For further processing your case plase make the
            payment.
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              disabled={paymentLoading}
              onClick={makePayment}
            >
              {paymentLoading ? (
                <>
                  <FiLoader className="animate-spin mr-2" size={30} />
                  please wait ...
                </>
              ) : (
                "Pay ₹5000"
              )}
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <div
        className="container flex justify-center items-center mx-auto w-screen py-8
         bg-gradient-to-r from-orange-300 to-orange-500 "
      >
        <div className="border-2 bg-white border-gray-500 p-4 rounded-2xl w-11/12 md:w-1/2 flex flex-col justify-center items-center">
          <h2
            data-aos="fade-up"
            data-aos-duration="1000"
            className="font-semibold underline text-center p-2 text-orange-600 font-[Poppins]"
          >
            Register as an Organization
          </h2>
          <h2
            data-aos="fade-up"
            data-aos-duration="1000"
            className="font-semibold text-center  text-orange-600 font-[Poppins]"
          >
            Registration Fee-5000₹
          </h2>
          <form
            className="my-6 w-full md:w-4/5 flex justify-center items-center flex-col gap-4"
            onSubmit={SubmitHandler}
            data-aos="fade-up"
            data-aos-duration="1000"
          >
            {/* Name */}
            <label
              htmlFor="organization"
              className="p-2 relative block rounded-md border border-gray-400 shadow-sm focus-within:border-orange-600 focus-within:ring-1 focus-within:ring-orange-600 w-11/12"
            >
              <input
                type="text"
                id="organization"
                className="peer border-none outline-none bg-white rounded px-1 placeholder-transparent focus:border-white focus:outline-none focus:ring-0 w-full text-gray-900 font-[Poppins] text-sm"
                placeholder="Organization Name"
                value={name}
                maxLength={50}
                required={true}
                onChange={(e) => setName(e.target.value)}
              />

              <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-900 font-[Poppins] transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">
                Organization Name
              </span>
            </label>

            {/* Phone Number */}
            <PhoneInput
              international
              countryCallingCodeEditable={false}
              placeholder="Enter phone number"
              defaultCountry="IN"
              value={mobile}
              maxLength={20}
              required={true}
              onChange={setMobile}
              style={{
                padding: "0.5rem",
                borderRadius: "0.375rem",
                borderWidth: "1px",
                borderColor: "#9ca3af",
                boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05),",
                color: "black",
              }}
              className="w-11/12 shadow-sm text-gray-900 font-[Poppins] text-sm focus-within:border-orange-600 focus-within:ring-1 focus-within:ring-orange-600"
            />

            {/* Email Id */}
            <label
              htmlFor="emailId"
              className="p-2 relative block rounded-md border border-gray-400 shadow-sm focus-within:border-orange-600 focus-within:ring-1 focus-within:ring-orange-600 w-11/12"
            >
              <input
                type="email"
                id="emailId"
                required={true}
                maxLength={50}
                className="peer border-none outline-none bg-white rounded px-1 w-full placeholder-transparent focus:border-white focus:outline-none focus:ring-0 text-gray-900 font-[Poppins] text-sm "
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-900 font-[Poppins] transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">
                Email
              </span>
            </label>

            {/* Country Select */}
            <label
              htmlFor="country"
              className="p-2 block rounded-md border border-gray-400 shadow-sm focus-within:border-orange-600 focus-within:ring-1 focus-within:ring-orange-600 w-11/12 text-sm"
            >
              <select
                name="country"
                className="peer border-gray-400  outline-none bg-white rounded px-1 w-full placeholder-transparent focus:border-white foucs:bg-white focus:outline-none focus:ring-0 text-gray-900 font-[Poppins]"
                id="country"
              >
                <option defaultValue={true}>India</option>
              </select>
            </label>

            {/* State Select */}
            {states?.length > 0 && (
              <label
                htmlFor="state"
                className="p-2 block rounded-md border border-gray-400 shadow-sm focus-within:border-orange-600 focus-within:ring-1 focus-within:ring-orange-600 w-11/12 text-sm"
              >
                <select
                  name="state"
                  className="peer border-gray-400 outline-none bg-white rounded px-1 w-full placeholder-transparent focus:border-white focus:outline-none focus:ring-0 text-gray-900 font-[Poppins]"
                  required={true}
                  id="state"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                >
                  <option value="" disabled hidden className="">
                    --- Select State ---
                  </option>
                  {states.map((state, index) => (
                    <option key={index} value={state.name}>
                      {state.name}
                    </option>
                  ))}
                </select>
              </label>
            )}

            {/* City Select */}
            {cityData?.length > 0 && state?.length > 0 && (
              <label
                htmlFor="city"
                className="p-2 block rounded-md border border-gray-400 shadow-sm focus-within:border-orange-600 focus-within:ring-1 focus-within:ring-orange-600 w-11/12 text-sm"
              >
                <select
                  name="city"
                  className="peer border-gray-400  outline-none bg-white rounded px-1 w-full placeholder-transparent focus:border-white focus:outline-none focus:ring-0 text-gray-900 font-[Poppins]"
                  required={true}
                  id="city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                >
                  <option value="" disabled hidden className="">
                    --- Select City ---
                  </option>
                  {cityData.map((city, index) => (
                    <option key={index} value={city.name}>
                      {city.name}
                    </option>
                  ))}
                </select>
              </label>
            )}

            {/* Address Input */}
            <label
              htmlFor="address"
              className="p-2 relative block rounded-md border border-gray-400 shadow-sm focus-within:border-orange-600 focus-within:ring-1 focus-within:ring-orange-600 w-11/12"
            >
              <input
                type="text"
                id="address"
                className="peer border-none outline-none bg-white rounded px-1 placeholder-transparent focus:border-white focus:outline-none focus:ring-0 w-full text-gray-900 font-[Poppins] text-sm"
                placeholder="Address"
                value={address}
                maxLength={200}
                required={true}
                onChange={(e) => setAddress(e.target.value)}
              />

              <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs  text-gray-900 font-[Poppins] transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">
                Address
              </span>
            </label>

            {/* Select Policy Company */}
            <label
              htmlFor="policyCompnay"
              className="p-2 block rounded-md border border-gray-400 shadow-sm focus-within:border-orange-600 focus-within:ring-1 focus-within:ring-orange-600 w-11/12 text-sm"
            >
              <select
                name="policyCompnay"
                className="peer border-gray-400 outline-none bg-white rounded px-1 w-full placeholder-transparent focus:border-white focus:outline-none focus:ring-0 text-gray-900 font-[Poppins]"
                required={true}
                id="policyCompnay"
                value={policyCompany}
                onChange={(e) => setPolicyCompany(e.target.value)}
              >
                <option value="" disabled hidden className="">
                  --- Select Policy Company ---
                </option>
                {insurance.sort().map((item, index) => (
                  <option value={item} key={index}>
                    {item}
                  </option>
                ))}
                <option value="Other">Other</option>
              </select>
            </label>
            {policyCompany === "Other" && (
              <label
                htmlFor="otherCompany"
                className="p-2 relative block rounded-md border border-gray-400 shadow-sm focus-within:border-orange-600 focus-within:ring-1 focus-within:ring-orange-600 w-11/12"
              >
                <input
                  id="otherCompany"
                  type="text"
                  className="peer border-none outline-none bg-white rounded px-1 placeholder-transparent focus:border-white focus:outline-none focus:ring-0 w-full text-gray-900 font-[Poppins] text-sm"
                  placeholder="Enter other company name"
                  value={otherPolicyCompany}
                  onChange={(e) => setOtherPolicyCompany(e.target.value)}
                />
                <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-900 font-[Poppins] transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">
                  Enter Other Company Name
                </span>
              </label>
            )}

            {/* Policy Type */}
            <label
              htmlFor="policyType"
              className="p-2 block rounded-md border border-gray-400 shadow-sm focus-within:border-orange-600 focus-within:ring-1 focus-within:ring-orange-600 w-11/12"
            >
              <select
                name="policyType"
                className="peer border-gray-400 outline-none bg-white rounded px-1 w-full placeholder-transparent focus:border-white text-sm focus:outline-none focus:ring-0 text-gray-900 font-[Poppins]"
                required={true}
                id="policyType"
                value={policyType}
                onChange={(e) => setPolicyType(e.target.value)}
              >
                <option value="" disabled hidden className="">
                  --- Select Policy Type ---
                </option>
                {InsurancePolicyType.sort().map((item, index) => (
                  <option value={item} key={index}>
                    {item}
                  </option>
                ))}
                <option value="Other">Other</option>
              </select>
            </label>
            {policyType === "Other" && (
              <label
                htmlFor="otherPolicyType"
                className="p-2 relative block rounded-md border border-gray-400 shadow-sm focus-within:border-orange-600 focus-within:ring-1 focus-within:ring-orange-600 w-11/12"
              >
                <input
                  placeholder="Enter other policy type"
                  id="otherPolicyType"
                  type="text"
                  className="peer border-none outline-none bg-white rounded px-1 placeholder-transparent focus:border-white focus:outline-none focus:ring-0 w-full text-gray-900 font-[Poppins] text-sm"
                  value={otherPolicyType}
                  onChange={(e) => setOtherPolicyType(e.target.value)}
                />
                <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-900 font-[Poppins] transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">
                  Enter Other Policy Category
                </span>
              </label>
            )}

            {/* Select Your Problem */}
            <label
              htmlFor="problem"
              className="p-2 text-sm block rounded-md border border-gray-400 shadow-sm focus-within:border-orange-600 focus-within:ring-1 focus-within:ring-orange-600 w-11/12"
            >
              <select
                name="problem"
                className="peer border-gray-400 outline-none bg-white rounded px-1 w-full placeholder-transparent focus:border-white focus:outline-none focus:ring-0 text-gray-900 font-[Poppins]"
                required={true}
                id="problem"
                value={problem}
                onChange={(e) => setProblem(e.target.value)}
              >
                <option value="" disabled hidden className="">
                  --- Select Your Problem---
                </option>
                {problemOptions.sort().map((item, index) => (
                  <option value={item} key={index}>
                    {item}
                  </option>
                ))}
                <option value="Other">Other</option>
              </select>
            </label>

            {/* Other Problem */}
            {problem === "Other" && (
              <label
                htmlFor="otherProblem"
                className="p-2 relative block rounded-md border border-gray-400 shadow-sm focus-within:border-orange-600 focus-within:ring-1 focus-within:ring-orange-600 w-11/12"
              >
                <input
                  type="text"
                  id="otherProblem"
                  className="peer border-none outline-none bg-white rounded px-1 placeholder-transparent focus:border-white focus:outline-none focus:ring-0 w-full text-gray-900 font-[Poppins] text-sm"
                  placeholder="Enter Your Problem"
                  value={otherProblem}
                  maxLength={500}
                  required={true}
                  onChange={(e) => setOtherProblem(e.target.value)}
                />

                <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-900 font-[Poppins] transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">
                  Enter Your Problem
                </span>
              </label>
            )}

            {/* Problem in Detail textbox */}
            <textarea
              type="text"
              id="problemDetails"
              rows="5"
              className="p-2 text-sm relative block rounded-md border border-gray-400 shadow-sm focus-within:border-orange-600 focus-within:ring-1 focus-within:ring-orange-600 w-11/12 outline-none text-gray-900 font-[Poppins]"
              placeholder="Enter Your Problem in Detail"
              value={problemDetails}
              maxLength={600}
              minLength={10}
              required={true}
              onChange={(e) => setProblemDetails(e.target.value)}
            />

            {/* Submit Btn */}
            <div
              className="text-center mt-4 md:mt-12"
              data-aos="fade-up"
              data-aos-duration="1000"
            >
              {!caseData.length ? (
                <button
                  className="border-2 inline-flex cursor-pointer border-orange-500 rounded px-6 py-2 text-orange-500 hover:bg-orange-500 hover:text-white transition-colors duration-300"
                  type="submit"
                  disabled={loading ? true : false}
                >
                  {loading ? (
                    <>
                      <FiLoader className="animate-spin mr-2" size={30} />
                      please wait ...
                    </>
                  ) : (
                    "Next"
                  )}
                </button>
              ) : (
                <button
                  onClick={onOpen}
                  className="inline-flex cursor-pointer px-4 py-2 border rounded-md hover:bg-orange-600
                 hover:text-white hover:border-orange-600"
                >
                  Pay ₹5000
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default OrganizationComplainForm;
