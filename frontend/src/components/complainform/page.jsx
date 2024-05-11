"use client";
import { useEffect, useState, Fragment } from "react";
import "react-phone-number-input/style.css";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import { State, City } from "country-state-city";
import { url } from "../../app/api";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { FiLoader } from "react-icons/fi";
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
import { payment } from "../../../action/serverActions";
import { makeKeys, encryptData, decryptData } from "../../lib/Encryption";

const ComplainForm = () => {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const country = "India";
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [language, setLanguage] = useState("");
  const [policyCompany, setPolicyCompany] = useState("");
  const [policyType, setPolicyType] = useState("");
  const [otherPolicyType, setOtherPolicyType] = useState("");
  const [problem, setProblem] = useState("");
  const [problemDetails, setProblemDetails] = useState("");

  const [otherPolicyCompany, setOtherPolicyCompany] = useState("");
  const [otherProblem, setOtherProblem] = useState("");

  const [loading, setLoading] = useState(false);
  const [paymentLoading, setpaymentLoading] = useState(false);

  const [cityData, setCityData] = useState();

  const states = State.getStatesOfCountry("IN");

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [caseData, setCaseData] = useState([]);

  const router = useRouter();

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
      db.createObjectStore("individual", {
        keyPath: "id",
      });
      db.createObjectStore("organisational", {
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
        .transaction("individual", "readonly")
        .objectStore("individual");
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

  useEffect(() => {
    if (policyType !== "Other") {
      setOtherPolicyType("");
    }
    if (problem !== "Other") {
      setOtherProblem("");
    }
    if (policyCompany !== "Other") {
      setOtherPolicyCompany("");
    }
  }, [policyType, problem, policyCompany]);

  function validateEmailAddress(email) {
    const pattern = /^[a-z0-9]+@[a-z]+\.[a-z]{2,6}$/;
    return pattern.test(email);
  }

  const updateDb = (data) => {
    // Access IndexedDB and put an object
    const dbRequest = indexedDB.open("ICDRCDatabase", 1);

    dbRequest.onsuccess = (event) => {
      const db = event.target.result;
      const trx = db.transaction(["individual"], "readwrite");
      const store = trx.objectStore("individual");
      store.put(data);
    };

    dbRequest.onerror = (event) => {
      console.error("Error opening IndexedDB:", dbRequest.error);
    };
  };

  const SubmitHandler = async (e) => {
    setLoading((prevState) => !prevState);
    e.preventDefault();
    try {
      if (!isValidPhoneNumber(mobile)) {
        toast.error("Enter a valid mobile number");
        setLoading((prevState) => !prevState);
        return;
      }

      if (!validateEmailAddress(email)) {
        setLoading((prevState) => !prevState);
        toast.error("Enter valid email address");
        return;
      }

      const res = await fetch(`${url}/api/individualcomplaint`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          mobile,
          email,
          country,
          state,
          city,
          address,
          language,
          policyType,
          otherPolicyType,
          problem,
          otherProblem,
          problemDetails,
          policyCompany,
          otherPolicyCompany,
        }),
      });
      const { data, error } = await res.json();
      if (error) {
        setLoading((prevState) => !prevState);
        toast.error(error);
        return;
      }
      const plainObject = {
        caseId: data._id,
        caseType: "individual",
        amount: 1 * 100,
      };
      setCaseData([plainObject]);
      const keys = await makeKeys();
      const encrypted = await encryptData(keys, JSON.stringify(plainObject));
      updateDb({ id: 1, keys: keys, data: encrypted });
      setLoading((prevState) => !prevState);
      return onOpen();
      // return router.push(`/payment?caseId=${data._id}&caseType=individual`);
    } catch (error) {
      setLoading(false);
      console.log("error", error);
      toast.error(error.message);
    }
  };

  const deleteObjectStore = () => {
    // Access IndexedDB and put an object
    const dbRequest = indexedDB.open("ICDRCDatabase", 1);

    dbRequest.onsuccess = (event) => {
      const db = event.target.result;
      const trx = db.transaction(["individual"], "readwrite");
      const store = trx.objectStore("individual");
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
                "Pay ₹500"
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
            className="font-semibold text-center underline p-2 text-orange-500 font-[Poppins]"
          >
            Register as an Individual
          </h2>
          <h2
            data-aos="fade-up"
            data-aos-duration="1000"
            className="font-semibold text-center  text-orange-600 font-[Poppins]"
          >
            Registration Fee-500₹
          </h2>
          <form
            className="my-6 w-full md:w-4/5 flex justify-center items-center flex-col gap-4"
            onSubmit={SubmitHandler}
            data-aos="fade-up"
            data-aos-duration="1000"
          >
            {/* Name */}
            <label
              htmlFor="name"
              className="p-2 relative block rounded-md border border-gray-400 shadow-sm focus-within:border-orange-600 focus-within:ring-1 focus-within:ring-orange-600 w-11/12"
            >
              <input
                type="text"
                id="name"
                className="peer border-none outline-none bg-white rounded px-1 placeholder-transparent focus:border-white focus:outline-none focus:ring-0 w-full text-gray-900 font-[Poppins] text-sm "
                placeholder="Name"
                value={name}
                maxLength={50}
                required={true}
                onChange={(e) => setName(e.target.value)}
              />

              <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-900 font-[Poppins] transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">
                Name
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

            {/* Language Select */}
            <label
              htmlFor="language"
              className="p-2 block rounded-md border border-gray-400 shadow-sm focus-within:border-orange-600 focus-within:ring-1 focus-within:ring-orange-600 w-11/12 text-sm"
            >
              <select
                name="language"
                className="peer border-gray-400 outline-none bg-white rounded px-1 w-full placeholder-transparent focus:border-white focus:outline-none focus:ring-0 text-gray-900 font-[Poppins]"
                required={true}
                id="language"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
              >
                <option value="" disabled hidden className="">
                  --- Select Language ---
                </option>
                <option value="English">English</option>
                <option value="Hindi">Hindi</option>
              </select>
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
                <option value="Life Insurance Corporation of India (LIC)">
                  Life Insurance Corporation of India (LIC)
                </option>
                <option value="HDFC Life Insurance">HDFC Life Insurance</option>
                <option value="ICICI Prudential Life Insurance">
                  ICICI Prudential Life Insurance
                </option>
                <option value="SBI Life Insurance">SBI Life Insurance</option>
                <option value="Max Life Insurance">Max Life Insurance</option>
                <option value="Bajaj Allianz Life Insurance">
                  Bajaj Allianz Life Insurance
                </option>
                <option value="Kotak Mahindra Life Insurance">
                  Kotak Mahindra Life Insurance
                </option>
                <option value="Aditya Birla Sun Life Insurance">
                  Aditya Birla Sun Life Insurance
                </option>
                <option value="Tata AIA Life Insurance">
                  Tata AIA Life Insurance
                </option>
                <option value="Reliance Nippon Life Insurance">
                  Reliance Nippon Life Insurance
                </option>
                <option value="Bharti AXA Life Insurance">
                  Bharti AXA Life Insurance
                </option>
                <option value="PNB MetLife India Insurance">
                  PNB MetLife India Insurance
                </option>
                <option value="Exide Life Insurance">
                  Exide Life Insurance
                </option>
                <option value="Canara HSBC Oriental Bank of Commerce Life Insurance">
                  Canara HSBC Oriental Bank of Commerce Life Insurance
                </option>
                <option value="IDBI Federal Life Insurance">
                  IDBI Federal Life Insurance
                </option>
                <option value="IndiaFirst Life Insurance">
                  IndiaFirst Life Insurance
                </option>
                <option value="Star Union Dai-ichi Life Insurance">
                  Star Union Dai-ichi Life Insurance
                </option>
                <option value="Aviva Life Insurance">
                  Aviva Life Insurance
                </option>
                <option value="Edelweiss Tokio Life Insurance">
                  Edelweiss Tokio Life Insurance
                </option>
                <option value="Future Generali India Life Insurance">
                  Future Generali India Life Insurance
                </option>
                <option value="Other">Other</option>
              </select>
            </label>

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
                <option value="Life Insurance">Life Insurance</option>
                <option value="Health Insurance">Health Insurance</option>
                <option value="Motor Insurance">Motor Insurance</option>
                <option value="Travel Insurance">Travel Insurance</option>
                <option value="Agriculture Insurance">
                  Agriculture Insurance
                </option>
                <option value="Fire Insurance">Fire Insurance</option>
                <option value="Marine Insurance">Marine Insurance</option>
                <option value="Liability Insurance">Liability Insurance</option>
                <option value="Cyber Insurance">Cyber Insurance</option>
                <option value="Personal Accident Insurance">
                  Personal Accident Insurance
                </option>
                <option value="Property Insurance">Property Insurance</option>
                <option value="Other">Other</option>
              </select>
            </label>

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
                <option value="Claim is denied/Repudiated">
                  Claim is denied/Repudiated
                </option>
                <option value="Short payment/less payment ">
                  Short payment/less payment{" "}
                </option>
                <option value="Claim is delayed/No progress">
                  Claim is delayed/No progress
                </option>
                <option value="No survey/Surveyor is nor appointed">
                  No survey/Surveyor is nor appointed
                </option>
                <option value="Fraud">Fraud</option>
                <option value="Mis-selling of policy">
                  Mis-selling of policy
                </option>
                <option value="Policy document not received">
                  Policy document not received
                </option>
                <option value="No Claim Bonus related issue">
                  No Claim Bonus related issue
                </option>
                <option value="Other">Other</option>
              </select>
            </label>

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
              className="text-center mt-4 md:mt-12 flex space-x-3"
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
                  Pay ₹500
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default ComplainForm;
