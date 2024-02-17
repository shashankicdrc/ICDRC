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
        At ICDRC (Insurance Claim Dispute Resolution Center), we strive to provide unparalleled services in securing rightful financial compensation from insurance providers. Our commitment to transparency and customer satisfaction is at the forefront of our operations. This refund policy elucidates the terms and conditions associated with seeking a refund for our services.
      </p>

      <p
        className="text-gray-700 font-medium text-md py-2  tracking-widest mx-auto px-8"
        data-aos="fade-up"
        data-aos-duration="1000"
      >
        This policy applies exclusively to the services offered by ICDRC in the domain of insurance claim dispute resolution. It is important to note that ICDRC specializes in providing expert assistance to individuals navigating the complexities of insurance claims, and this policy is tailored to address any concerns related to the payment for these specific services.
      </p>

      <p
        className="text-gray-700 font-medium text-md py-2  tracking-widest mx-auto px-8"
        data-aos="fade-up"
        data-aos-duration="1000"
      >
        Zero Percent Services Refund Policy:
ICDRC operates under a unique business model that prioritizes client satisfaction and successful claim resolution. As such, our refund policy is designed as a zero percent services refund policy. This means that once you have engaged our services and made the requisite payment, no refunds will be provided for the services rendered.
      </p>

      <p
        className="text-gray-700 font-medium text-md py-2  tracking-widest mx-auto px-8"
        data-aos="fade-up"
        data-aos-duration="1000"
      >
        Our commitment to delivering results and dedicating resources to each case from the moment of initiation is the driving force behind our zero percent refund policy. This policy is in place to underscore our confidence in the expertise of our team and the efficacy of our claims resolution process. We invest time, effort, and resources into comprehensively addressing your insurance claim dispute, and our commitment remains unwavering until a resolution is achieved.
      </p>
      <p
        className="text-gray-700 font-medium text-md py-2  tracking-widest mx-auto px-8"
        data-aos="fade-up"
        data-aos-duration="1000"
      >
        o ICDRC places great emphasis on transparent communication. Before engaging our services, we encourage potential clients to thoroughly review our terms and conditions, including this refund policy. Our team is available to address any queries or concerns regarding the policy to ensure complete understanding before proceeding with our services.
      </p>
      <p
        className="text-gray-700 font-medium text-md py-2  tracking-widest mx-auto px-8"
        data-aos="fade-up"
        data-aos-duration="1000"
      >
        o Clients engaging ICDRC services are responsible for providing accurate and truthful information related to their insurance claim dispute. Any misrepresentation or failure to disclose relevant details may impact the progress of the case and is not grounds for a refund under our policy.
      </p>

      <p
        className="text-gray-700 font-medium text-md py-2  tracking-widest mx-auto px-8"
        data-aos="fade-up"
        data-aos-duration="1000"
      >
        o Clients have the option to cancel our services at any point. However, it's crucial to note that the zero percent refund policy remains applicable, and no refunds will be processed, irrespective of the stage of the case at the time of cancellation.
      </p>

      <p
        className="text-gray-700 font-medium text-md py-2  tracking-widest mx-auto px-8"
        data-aos="fade-up"
        data-aos-duration="1000"
      >
        o Continuous Support:
Even though refunds are not applicable under our policy, ICDRC remains committed to providing continuous support and transparent communication throughout the duration of the case. Our goal is to ensure that clients are well-informed and confident in the progression of their insurance claim dispute.
      </p>

      <p
        className="text-gray-700 font-medium text-md py-2  tracking-widest mx-auto px-8"
        data-aos="fade-up"
        data-aos-duration="1000"
      >
        o Contacting ICDRC:
For any inquiries or clarification regarding our refund policy, clients can reach out to our customer support team. We are dedicated to addressing concerns promptly and maintaining open lines of communication.
      </p>

      </div>

      <Home7Contact />
      <Footer />
    </div>
  );
};

export default Refund_policy;
