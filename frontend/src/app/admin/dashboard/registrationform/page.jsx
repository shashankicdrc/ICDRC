"use client";

import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Navbar from "../../components/navbar/page";
import { useEffect } from "react";
import { useState } from "react";
import TabSection from "./tabsection";
import PageLoader from "../../components/pageloader/page";

const ContactMessages = () => {
  const router = useRouter();
  const admin = useSelector((state) => state.admin);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!admin._id) {
      router.push("/admin/login");
    }
  }, [admin]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-gradient-to-r from-orange-300 to-red-300 min-h-screen">
      {loading && <PageLoader />}
      <Navbar />

      <div
        className="relative overflow-hidden rounded-sm bg-cover bg-no-repeat p-12 text-center"
        style={{
          backgroundImage: `url(https://res.cloudinary.com/dl5hosmxb/image/upload/v1690779742/Register_page/bg1_phs9it.webp)`,
          height: "250px",
        }}
      >
        <div
          className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-fixed"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}
        >
          <div className="flex h-full items-center justify-end flex-col">
            <h2
              className=" mb-4 md:mb-8 text-white text-3xl text-center md:text-5xl font-semibold"
              data-aos="fade-up"
              data-aos-duration="2000"
            >
              All Registrated Forms
            </h2>
          </div>
        </div>
      </div>

      <h1
        className="text-gray-900 text-3xl mt-6 md:mt-8 md:text-6xl font-[Roboto] font-bold text-center bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent px-8"
        data-aos="fade-up"
        data-aos-duration="1000"
      >
        REGISTERED COMPLAINT
      </h1>
      <p
        className="text-gray-700 text-center font-medium text-md py-2  tracking-widest mx-auto px-8"
        data-aos="fade-up"
        data-aos-duration="1000"
      >
        All registered complain data individual and organizational details.
      </p>

      <TabSection />
    </div>
  );
};

export default ContactMessages;
