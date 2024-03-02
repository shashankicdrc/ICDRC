"use client";
import { useEffect } from "react";
import HomeNav from "../../components/Navbar/page";
import Link from "next/link";
import Home7Contact from "./../../components/HomeComponents/Home7Contact";
import Footer from "../../components/footer/page";
import SocialIcons from "../../components/SocialIcons/page";


const Refund_policy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <SocialIcons />
      <HomeNav /> 


      <>
        {/* <Helmet>
        <meta charSet="utf-8" />
        <title>ICDRC: About</title>
        <link rel="canonical" href="" />
        <meta
          name="description"
          content="Insurance Claims and Dispute Resolution Center (ICDRC). ICDRC is a company that specializes in helping people get the money they deserve from their insurance companies."
        />
        <meta
          name="keywords"
          content="Insurance claim, About ICDRC, ICDRC, Insurance recovery, ICDRC official Claim advocates, Fast insurance settlements, InsuranceSamadhan Alternative"
        />
      </Helmet> */}
      </>




      <div
        className="relative overflow-hidden rounded-sm bg-cover bg-no-repeat p-12 text-center"
        style={{
          backgroundImage: `url(https://res.cloudinary.com/dl5hosmxb/image/upload/v1690779742/Register_page/bg1_phs9it.webp)`,
          height: "500px",
        }}
      >
        <div
          className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-fixed"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}
        >
          <div className="mt-6 md:mt-10 flex h-full items-center justify-start md:ml-12 ml-3">
            <div className="text-white flex justify-start flex-col">
              <h2
                className="mb-4 text-3xl md:text-5xl font-semibold text-start px-4 md:px-4"
                data-aos="fade-up"
                data-aos-duration="2000"
              >
                India’s most reliable and single
                <br /> window solution platform.
              </h2>
              <Link
                href="/register"
                data-aos="fade-up"
                data-aos-duration="2000"
                className="relative max-w-max ml-4 mt-4 inline-flex items-center px-12 py-3 overflow-hidden text-lg text-orange-500 font-bold border-2 border-orange-500 rounded-full hover:text-white group hover:bg-gray-50"
              >
                <span className="absolute left-0 block w-full h-0 transition-all bg-orange-400 opacity-100 group-hover:h-full top-1/2 group-hover:top-0 duration-400 ease"></span>
                <span className="absolute right-0 flex items-center justify-start w-10 h-10 duration-300 transform translate-x-full group-hover:translate-x-0 ease">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    ></path>
                  </svg>
                </span>
                <span className="relative">Register Complaint</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 pt-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">

      <h1
        className="text-gray-900 text-3xl mt-6 md:mt-8 md:text-6xl font-[Roboto] font-bold text-center bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent px-8"
        data-aos="fade-up"
        data-aos-duration="1000"
      >
        Refund Policy
      </h1>
      <p
        className="text-gray-700 text-center font-medium text-md py-2  tracking-widest mx-auto px-8"
        data-aos="fade-up"
        data-aos-duration="1000"
      >
        One Stop Solution For Insurance Claim Disputes. (ICDRC)
      </p>

      <p
        className="text-gray-700 font-medium text-md py-4  tracking-widest mx-auto px-8"
        data-aos="fade-up"
        data-aos-duration="1000"
      >
1. At ICDRC we are committed to providing quality to our valued customers. As part of our commitment to transparency and customer satisfaction, we have established a Zero Refund Policy to outline the terms and conditions regarding refunds for appointment fees made through our platform.      </p>

      <p
        className="text-gray-700 font-medium text-md py-2  tracking-widest mx-auto px-8"
        data-aos="fade-up"
        data-aos-duration="1000"
      >
2. Thank you for choosing ICDRC for your consultation needs. Please read this refund policy carefully before making an appointment payment. This policy outlines the terms and conditions under which ICDRC, referred to as "we" or "us," will not provide refunds for appointment fees.

</p>

      <p
        className="text-gray-700 font-medium text-md py-2  tracking-widest mx-auto px-8"
        data-aos="fade-up"
        data-aos-duration="1000"
      >
        3. Zero Percent Refund Policy:
ICDRC operates under a unique business model that prioritizes client satisfaction and successful claim resolution. As such, our refund policy is designed as a zero percent refund. This means that once you have booked an appointment and made the requisite fees, no refunds will be provided for the appointment fees.
      </p>

      <p
        className="text-gray-700 font-medium text-md py-2  tracking-widest mx-auto px-8"
        data-aos="fade-up"
        data-aos-duration="1000"
      >
      4.  Our commitment to delivering results and dedicating resources to each case from the moment of initiation is the driving force behind our zero percent refund policy. This policy is in place to underscore our confidence in the expertise of our team and the efficacy of our claims resolution process. We invest time, effort, and resources into comprehensively addressing your insurance claim dispute, and our commitment remains unwavering until a resolution is achieved.
      </p>
      <p
        className="text-gray-700 font-medium text-md py-2  tracking-widest mx-auto px-8"
        data-aos="fade-up"
        data-aos-duration="1000"
      >
        5. ICDRC places great emphasis on transparent communication. Before engaging our app, we encourage potential clients to thoroughly review our terms and conditions. Our team is available to address any queries or concerns regarding the policy to ensure complete understanding before proceeding with our appointment fees.
      </p>
      <p
        className="text-gray-700 font-medium text-md py-2  tracking-widest mx-auto px-8"
        data-aos="fade-up"
        data-aos-duration="1000"
      >
        6. Clients engaging ICDRC services are responsible for providing accurate and truthful information related to their insurance claim dispute. Any misrepresentation or failure to disclose relevant details may impact the progress of the case and is not grounds for a refund under our policy.
      </p>

      <p
        className="text-gray-700 font-medium text-md py-2  tracking-widest mx-auto px-8"
        data-aos="fade-up"
        data-aos-duration="1000"
      >
        7. Clients have the no option to cancel our appointment. However, it's crucial to note that the zero percent refund policy remains applicable, and no refunds will be processed.
      </p>
      <p
        className="text-gray-700 font-medium text-md py-2  tracking-widest mx-auto px-8"
        data-aos="fade-up"
        data-aos-duration="1000"
      >
       8. Non-Refundable Appointment Fees:
All appointment fees collected by ICDRC are non-refundable. Once a payment is made for an appointment, it is considered final, and no refunds will be provided, irrespective of the circumstances leading to the cancellation or rescheduling of the appointment.

      </p>

      <p
        className="text-gray-700 font-medium text-md py-2  tracking-widest mx-auto px-8"
        data-aos="fade-up"
        data-aos-duration="1000"
      >
       9. Cancellation or Rescheduling:
In the event that you need to cancel or reschedule your appointment, please note that the appointment fees are non-refundable. However, we understand that unforeseen circumstances may arise. In such cases, we encourage you to contact our customer support team as soon as possible to discuss possible alternatives.

      </p>
      <p
        className="text-gray-700 font-medium text-md py-2  tracking-widest mx-auto px-8"
        data-aos="fade-up"
        data-aos-duration="1000"
      >
        10.  Customer Responsibility:
We encourage our customers to exercise due diligence before submitting  fees . This includes carefully reviewing product descriptions, specifications, and terms of service to ensure that the product or service meets their requirements and expectations.

      </p>
      <p
        className="text-gray-700 font-medium text-md py-2  tracking-widest mx-auto px-8"
        data-aos="fade-up"
        data-aos-duration="1000"
      >
11. Contact Us:
If you have any questions or concerns regarding our Zero Refund Policy, please do not hesitate to contact our customer support team. We are here to assist you and address any issues you may encounter during your shopping experience with us.

      </p>

      

      </div>

      <Home7Contact />
      <Footer />
    </div>
  );
};

export default Refund_policy;