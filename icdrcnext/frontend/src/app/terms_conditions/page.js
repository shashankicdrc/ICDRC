"use client";
import { useEffect } from "react";
import HomeNav from "../../components/Navbar/page";
import Link from "next/link";
import Home7Contact from "./../../components/HomeComponents/Home7Contact";
import Footer from "../../components/footer/page";
import SocialIcons from "../../components/SocialIcons/page";


const Terms_Conditions = () => {
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

      <h1
        className="text-gray-900 text-3xl mt-6 md:mt-8 md:text-6xl font-[Roboto] font-bold text-center bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent px-8"
        data-aos="fade-up"
        data-aos-duration="1000"
      >
        Terms & Conditions
      </h1>
      <p
        className="text-gray-700 text-center font-medium text-md py-2  tracking-widest mx-auto px-8"
        data-aos="fade-up"
        data-aos-duration="1000"
      >
        Welcome to ICDRC Services Pt. Ltd.! <p>One Stop Solution For Insurance Claim Disputes. (ICDRC)</p>
      </p>

      <p
        className="text-gray-700 font-medium text-md py-4  tracking-widest mx-auto px-8"
        data-aos="fade-up"
        data-aos-duration="1000"
      >
        These terms and conditions outline the rules and regulations for the use of ICDRC Services Pt. Ltd.'s Website, located at https://icdrc.in.

By accessing this website we assume you accept these terms and conditions. Do not continue to use ICDRC Services Pt. Ltd. if you do not agree to take all of the terms and conditions stated on this page.
      </p>

      <p
        className="text-gray-700 font-medium text-md py-2  tracking-widest mx-auto px-8"
        data-aos="fade-up"
        data-aos-duration="1000"
      >
        The following terminology applies to these Terms and Conditions, Privacy Statement and Disclaimer Notice and all Agreements: "Client", "You" and "Your" refers to you, the person log on this website and compliant to the Company's terms and conditions. "The Company", "Ourselves", "We", "Our" and "Us", refers to our Company. "Party", "Parties", or "Us", refers to both the Client and ourselves. All terms refer to the offer, acceptance and consideration of payment necessary to undertake the process of our assistance to the Client in the most appropriate manner for the express purpose of meeting the Client's needs in respect of provision of the Company's stated services, in accordance with and subject to, prevailing law of in. Any use of the above terminology or other words in the singular, plural, capitalization and/or he/she or they, are taken as interchangeable and therefore as referring to same.
      </p>

      <h1 className="text-gray-700 font-2xl text-md py-2  tracking-widest mx-auto px-8">Cookies</h1>

      <p
        className="text-gray-700 font-medium text-md py-2  tracking-widest mx-auto px-8"
        data-aos="fade-up"
        data-aos-duration="1000"
      >
        We employ the use of cookies. By accessing ICDRC Services Pt. Ltd., you agreed to use cookies in agreement with the ICDRC Services Pt. Ltd.'s Privacy Policy.

Most interactive websites use cookies to let us retrieve the user's details for each visit. Cookies are used by our website to enable the functionality of certain areas to make it easier for people visiting our website. Some of our affiliate/advertising partners may also use cookies.
      </p>

      <h1 className="text-gray-700 font-medium text-md py-2  tracking-widest mx-auto px-8">License</h1>

      <p
        className="text-gray-700 font-medium text-md py-2  tracking-widest mx-auto px-8"
        data-aos="fade-up"
        data-aos-duration="1000"
      >
        Unless otherwise stated, ICDRC Services Pt. Ltd. and/or its licensors own the intellectual property rights for all material on ICDRC Services Pt. Ltd.. All intellectual property rights are reserved. You may access this from ICDRC Services Pt. Ltd. for your own personal use subjected to restrictions set in these terms and conditions.
      </p>
      <p
        className="text-gray-700 font-medium text-md py-2  tracking-widest mx-auto px-8"
        data-aos="fade-up"
        data-aos-duration="1000"
      >
        You must not:

<li>Republish material from ICDRC Services Pt. Ltd.</li>
<li>Sell, rent or sub-license material from ICDRC Services Pt. Ltd.</li>
<li>Reproduce, duplicate or copy material from ICDRC Services Pt. Ltd.</li>
<li>Redistribute content from ICDRC Services Pt. Ltd.</li>
<li>This Agreement shall begin on the date hereof. Our Terms and Conditions were created with the help of the Free Terms and Conditions Generator.</li>

Parts of this website offer an opportunity for users to post and exchange opinions and information in certain areas of the website. ICDRC Services Pt. Ltd. does not filter, edit, publish or review Comments prior to their presence on the website. Comments do not reflect the views and opinions of ICDRC Services Pt. Ltd.,its agents and/or affiliates. Comments reflect the views and opinions of the person who post their views and opinions. To the extent permitted by applicable laws, ICDRC Services Pt. Ltd. shall not be liable for the Comments or for any liability, damages or expenses caused and/or suffered as a result of any use of and/or posting of and/or appearance of the Comments on this website.
      </p>
      <p
        className="text-gray-700 font-medium text-md py-2  tracking-widest mx-auto px-8"
        data-aos="fade-up"
        data-aos-duration="1000"
      >
        ICDRC Services Pt. Ltd. reserves the right to monitor all Comments and to remove any Comments which can be considered inappropriate, offensive or causes breach of these Terms and Conditions.

<stong>You warrant and represent that:</stong>

You are entitled to post the Comments on our website and have all necessary licenses and consents to do so;
The Comments do not invade any intellectual property right, including without limitation copyright, patent or trademark of any third party;
The Comments do not contain any defamatory, libelous, offensive, indecent or otherwise unlawful material which is an invasion of privacy
The Comments will not be used to solicit or promote business or custom or present commercial activities or unlawful activity.
You hereby grant ICDRC Services Pt. Ltd. a non-exclusive license to use, reproduce, edit and authorize others to use, reproduce and edit any of your Comments in any and all forms, formats or media.
      </p>

      

      <h1 className="text-gray-700 font-bold text-md py-2  tracking-widest mx-auto px-8">  Hyperlinking to our Content</h1>
      <p
        className="text-gray-700 font-medium text-md py-2  tracking-widest mx-auto px-8"
        data-aos="fade-up"
        data-aos-duration="1000">
The following organizations may link to our Website without prior written approval:

Government agencies;
Search engines;
News organizations;
Online directory distributors may link to our Website in the same manner as they hyperlink to the Websites of other listed businesses; and
System wide Accredited Businesses except soliciting non-profit organizations, charity shopping malls, and charity fundraising groups which may not hyperlink to our Web site.
These organizations may link to our home page, to publications or to other Website information so long as the link: (a) is not in any way deceptive; (b) does not falsely imply sponsorship, endorsement or approval of the linking party and its products and/or services; and (c) fits within the context of the linking party's site.</p>
<p
        className="text-gray-700 font-medium text-md py-2  tracking-widest mx-auto px-8"
        data-aos="fade-up"
        data-aos-duration="1000">
We may consider and approve other link requests from the following types of organizations:





<p
        className="text-gray-700 font-medium text-md py-2  tracking-widest mx-auto px-8"
        data-aos="fade-up"
        data-aos-duration="1000">

Approved organizations may hyperlink to our Website as follows:

By use of our corporate name; or
By use of the uniform resource locator being linked to; or
By use of any other description of our Website being linked to that makes sense within the context and format of content on the linking party's site.
No use of ICDRC Services Pt. Ltd.'s logo or other artwork will be allowed for linking absent a trademark license agreement.

iFrames
Without prior approval and written permission, you may not create frames around our Webpages that alter in any way the visual presentation or appearance of our Website.

</p>

<h1 className="text-gray-700 font-blod text-md py-2  tracking-widest mx-auto px-8">Content Liability</h1>
<p
        className="text-gray-700 font-medium text-md py-2  tracking-widest mx-auto px-8"
        data-aos="fade-up"
        data-aos-duration="1000">
We shall not be hold responsible for any content that appears on your Website. You agree to protect and defend us against all claims that is rising on your Website. No link(s) should appear on any Website that may be interpreted as libelous, obscene or criminal, or which infringes, otherwise violates, or advocates the infringement or other violation of, any third party rights.</p>

<h1 className="text-gray-700 font-blod text-md py-2  tracking-widest mx-auto px-8">Reservation of Rights
</h1>
<p
        className="text-gray-700 font-medium text-md py-2  tracking-widest mx-auto px-8"
        data-aos="fade-up"
        data-aos-duration="1000">
  We reserve the right to request that you remove all links or any particular link to our Website. You approve to immediately remove all links to our Website upon request. We also reserve the right to amen these terms and conditions and it's linking policy at any time. By continuously linking to our Website, you agree to be bound to and follow these linking terms and conditions.</p>

  <p
        className="text-gray-700 font-medium text-md py-2  tracking-widest mx-auto px-8"
        data-aos="fade-up"
        data-aos-duration="1000">
We do not ensure that the information on this website is correct, we do not warrant its completeness or accuracy; nor do we promise to ensure that the website remains available or that the material on the website is kept up to date.</p>
</p>

<h1 className="text-gray-700 font-blod text-md py-2  tracking-widest mx-auto px-8">Disclaimer</h1>

<p
        className="text-gray-700 font-medium text-md py-2  tracking-widest mx-auto px-8"
        data-aos="fade-up"
        data-aos-duration="1000">
To the maximum extent permitted by applicable law, we exclude all representations, warranties and conditions relating to our website and the use of this website. Nothing in this disclaimer will:


<li>limit or exclude our or your liability for death or personal injury;</li>
<li>limit or exclude our or your liability for fraud or fraudulent misrepresentation;</li>
<li>limit any of our or your liabilities in any way that is not permitted under applicable law; or
exclude any of our or your liabilities that may not be excluded under applicable law.</li>
<li>The limitations and prohibitions of liability set in this Section and elsewhere in this disclaimer: (a) are subject to the preceding paragraph; and (b) govern all liabilities arising under the disclaimer, including liabilities arising in contract, in tort and for breach of statutory duty.</li>

<li>As long as the website and the information and services on the website are provided free of charge, we will not be liable for any loss or damage of any nature.</li>

</p>


      <Home7Contact />
      <Footer />
    </div>
  );
};

export default Terms_Conditions;
