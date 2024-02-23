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
        Welcome to ICDRC Services Pt. Ltd.!{" "}
        <p>One Stop Solution For Insurance Claim Disputes. (ICDRC)</p>
      </p>

      <p
        className="text-gray-700 font-medium text-md py-4  tracking-widest mx-auto px-8"
        data-aos="fade-up"
        data-aos-duration="1000"
      >
        The terms and conditions set forth below (“Terms of Use”) and the
        Privacy Policy constitute a legally-binding agreement between Insurance
        Claims Dispute Redressal Company Private Limited (hereinafter “ICDRC/the
        Company”), and you. These Terms of Use contain provisions that define
        your limits, legal rights and obligations with respect to your use of
        and participation 
      </p>

      <p
        className="text-gray-700 font-medium text-md py-2  tracking-widest mx-auto px-8"
        data-aos="fade-up"
        data-aos-duration="1000"
      >
        TBy accessing this websites/App/wallet (all together referred to as the
        "ICDRC Website’ and using its content, you acknowledge and expressly
        agree that you have read and understood the following terms of use
        [“Terms of use”] and you agree to be bound by Terms of Use. Do not use
        the ICDRC Website, if you do not agree with these Terms of Use.
      </p>

      <h1 className="text-gray-700 font-2xl text-md py-2 font-bold  tracking-widest mx-auto px-8">
        Use of Content
      </h1>

      <p
        className="text-gray-700 font-medium text-md py-2  tracking-widest mx-auto px-8"
        data-aos="fade-up"
        data-aos-duration="1000"
      >
        The content/information/blogs/facilitation services are available only
        for informational purposes. The posting/display of
        content/blogs/opinions/expressions/ notes/comments/criticism on/at ICDRC
        Website are only informative and personal to respective author/s and is
        not necessarily the opinion and recommendation of ICDRC and access to
        this ICDRC Website and reading of content/blogs/opinions/expressions
        on/at ICDRC Website does not in any way render and bind ICDRC for such
        posting/display of content/blogs/opinions/expressions/
        notes/comments/criticism and also same shall not be taken as to render,
        either explicitly or implicitly, any provision of services or products
        by us.
      </p>

      <h1 className="text-gray-700  text-md py-2 font-bold tracking-widest mx-auto px-8">
        Add on facilities/value added services to benefit you:
      </h1>

      <p
        className="text-gray-700 font-medium text-md py-2  tracking-widest mx-auto px-8"
        data-aos="fade-up"
        data-aos-duration="1000"
      >
        ICDRC do NOT operate in any insurance selling business and is neither
        associated with nor offering/selling/providing any services/products any
        insurance products and as the offers/discounts/coupons/services/products
        are solely and independently offered by respective
        companies/entities/service providers and ICDRC is only a mere
        facilitator to help and support you for various
        offers/discounts/coupons/ services/products offered/provided by
        respective companies/entities/service providers to you upon your
        accessing the ICDRC website. ICDRC does not represent, assure or endorse
        the accuracy, completeness, reliability or the quality of the
        offers/discounts/coupons/ services/products of respective
        companies/entities/service providers and shall not be in any way liable
        or responsible for any deficiency of services or non-providing the
        services or losses or damages or withdrawal of discounts/coupons/not
        honouring the coupons, if any, incurred/experienced by you as a result
        of your availing or subscribing to the
        offers/discounts/coupons/services/products of respective
        companies/entities/ service providers. Decision to avail and reliance
        upon the offers/discounts/ coupons/services/products of respective
        companies/entities/service providers shall be taken by you after careful
        and independent sole decision of you at your own risk and ICDRC is not
        in any way be responsible/liable for the same. Even if
        offers/services/products by respective companies/entities/ service
        providers are made available to you through API integration of ICDRC
        Website with website of respective companies/entities/ service
        providers, ICDRC shall no way be responsible and liable to you either
        for deficiency, non-provision, delay in providing the services or any
        other issues of whatsoever and same shall be sole responsibility and
        liability of respective companies/entities/ service providers.
      </p>
      <h3 className="text-gray-700 text-md py-2 font-bold tracking-widest mx-auto px-8">
        No Offer:
      </h3>
      <p
        className="text-gray-700 font-medium text-md py-2  tracking-widest mx-auto px-8"
        data-aos="fade-up"
        data-aos-duration="1000"
      >
        The information on the ICDRC Website is or should neither be interpreted
        as an offer nor a solicitation for an offer, nor as investment, legal,
        tax or other advice of ICDRC. You shall take advise/opinion of your
        expert adviser and accordingly you shall take your voluntarily and
        independent decision to avail any of the consultancy service/any service
        of ICDRC. Therefore, the content/blogs/opinions/expressions on/at ICDRC
        Website shall not be solely relied for your availing service of ICDRC.
      </p>

      <h3 className="text-gray-700 font-bold text-md py-2  tracking-widest mx-auto px-8">
        No Duty to update:
      </h3>
      <p
        className="text-gray-700 font-medium text-md py-2  tracking-widest mx-auto px-8"
        data-aos="fade-up"
        data-aos-duration="1000"
      >
        All content on the ICDRC Website is published as of its date only. We
        assume no responsibility to update or amend. Any modifications/changes
        to these Terms and Conditions shall be automatically part and parcel of
        these Terms and Use and you shall accordingly bound by these Terms and
        Use read with modifications/changes, from time to time.
      </p>

      <h1 className="text-gray-700 font-bold text-md py-2 text-2xl  tracking-widest mx-auto px-8">
        {" "}
        Disclaimer:
      </h1>
     
      <p
        className="text-gray-700 font-medium text-md py-2  tracking-widest mx-auto px-8"
        data-aos="fade-up"
        data-aos-duration="1000"
      >
        TO THE FULLEST EXTENT PERMISSIBLE PURSUANT TO APPLICABLE LAW, THE MATERIALS ON THIS WEBSITE ARE PROVIDED "AS IS" AND WITHOUT WARRANTIES OF ANY KIND EITHER EXPRESSED OR IMPLIED, FOR ITS SERVICES AND OR THE ADD ON/VALUE ADDED SERVICES OF RESPECTIVE COMPANIES/ENTITIES/SERVICE PROVIDERS AND ICDRC, DISCLAIM ALL WARRANTIES, EXPRESSED OR IMPLIED, INCLUDING, BUT NOT LIMITED TO, IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE OR NON-INFRINGEMENT.  ICDRC does not warrant or make any representations
        regarding the accuracy, reliability, correctness, or any other aspect of
        the use or results of the materials on the ICDRC website. Please note
        that the information and descriptions provided on this website are not
        intended to be comprehensive explanations of all terms, exclusions, and
        conditions that apply to the products and services. They are solely
        provided for general informational purposes.
        <h1 className="text-gray-700 font-bold text-md py-2 text-2xl  tracking-widest mx-auto px-8">
          {" "}
          Copyright:
        </h1>
        <p
          className="text-gray-700 font-medium text-md py-2  tracking-widest mx-auto px-8"
          data-aos="fade-up"
          data-aos-duration="1000"
        >
          All content of the ICDRC Website is protected by copyright and
          Intellectual Property Rights [IPR] with all rights reserved with
          ICDRC. All rights in the pages, site content and arrangement are owned
          by ICDRC. You are expressly prohibited from copying, modifying,
          displaying, distributing, transmitting, redelivering through the use
          of "framing" technology or otherwise, publishing, selling, licensing,
          creating derivative works or using any site content for any purpose
          without the prior written approval of ICDRC. While on/in/using the
          ICDRC Website you are bound by the Privacy Policy of ICDRC which is
          published/displayed in/on ICDRC Website
        </p>
        <h1 className="text-gray-700 font-bold text-md py-2  tracking-widest mx-auto px-8">
          Trademarks, Service Marks and Logos ("Marks"):
        </h1>
        <p
          className="text-gray-700 font-medium text-md py-2  tracking-widest mx-auto px-8"
          data-aos="fade-up"
          data-aos-duration="1000"
        >
          The trademarks/trade names/logos appearing on the ICDRC Website
          /App/wallet are the property of ICDRC. You are not allowed to copy,
          use or adopt any of the same for whatsoever purpose.
        </p>
        <h1 className="text-gray-700 font-bold text-md py-2  tracking-widest mx-auto px-8">
          No Warranty:
        </h1>
        <p
          className="text-gray-700 font-medium text-md py-2  tracking-widest mx-auto px-8"
          data-aos="fade-up"
          data-aos-duration="1000"
        >
          All content on the ICDRC Website, including but not limited to
          graphics, text and hyperlinks or references to other sites, is
          provided "as is" basis without warranty of any kind, express or
          implied, including, but not limited to, implied warranties of
          merchantability, fitness for a particular purpose, non-infringement
          and free from computer viruses or other harmful components. We do not
          warrant the adequacy, accuracy, reliability or completeness of any
          information on the ICDRC Website and expressly disclaim any liability
          for errors or omissions therein. We do not warrant that the functions
          of the ICDRC Website will be uninterrupted and/or error-free, that
          defects will be corrected or that the ICDRC Website or the server that
          makes it available are free from computer viruses or other harmful
          components.
        </p>
        <h1 className="text-gray-700 font-bold text-md py-2  tracking-widest mx-auto px-8">
          Limitation of Liability:
        </h1>
        <p
          className="text-gray-700 font-medium text-md py-2  tracking-widest mx-auto px-8"
          data-aos="fade-up"
          data-aos-duration="1000"
        >
          We expressly disclaim any liability, whether in contract, tort, strict
          liability or otherwise, for any direct, indirect, incidental,
          consequential, punitive or special damages, loss of goodwill, loss of
          profit etc., arising out of or in any way connected with your access
          or use or inability to access or use the ICDRC Website or reliance on
          its content, or any failure of performance, interruption, defect,
          delay in transmission, computer viruses or other harmful components,
          or line or system failure associated with the ICDRC Website,
          regardless of our knowledge thereof.
        </p>
      </p>

      <h1 className="text-gray-700 font-bold text-md py-2 text-2xl  tracking-widest mx-auto px-8">
        Membership Eligibility Criteria:
      </h1>

      <p
        className="text-gray-700 font-medium text-md py-2  tracking-widest mx-auto px-8"
        data-aos="fade-up"
        data-aos-duration="1000"
      >
        Use of the Website is available only to individuals who are at least 18
        years old and can form legally binding contracts under applicable law.
        You represent, acknowledge and agree that you are at least 18 years of
        age, and that: (a) all registration information that you submit is
        truthful and accurate, (b) you will maintain the accuracy of such
        information, and (c) your use of the Website and Services offered
        through this Website do not violate any applicable law or regulation.
        Your Account (defined below) may be terminated without warning if we at
        our discretion, believe that you are under the age of 18 or that you are
        not complying with any applicable laws, rules or regulations.
      </p>

      <h1 className="text-gray-700 font-bold text-md py-2  tracking-widest mx-auto px-8">
        Hyperlinked and Referenced Websites/App/wallet :
      </h1>

      <p
        className="text-gray-700 font-medium text-md py-2  tracking-widest mx-auto px-8"
        data-aos="fade-up"
        data-aos-duration="1000"
      >
        Certain hyperlinks or referenced websites/App/wallet on the ICDRC
        Website may for your convenience forward you to third partie’s
        websites/App/wallet, which generally are recognized by their top level
        domain name. Their content has not been investigated or analyzed by us,
        and we do not warrant the adequacy, accuracy, reliability or
        completeness of any information on hyperlinked or referenced
        websites/App/wallet and expressly disclaim any liability for any and all
        of their content. By accessing the ICDRC Website, you also agree to
        abide by the proprietary guidelines set forth at any website accessed or
        hyperlinked to through the ICDRC Website
      </p>

      <h1 className="text-gray-700 font-bold text-md py-2  tracking-widest mx-auto px-8">
        Local Legal Restrictions:
      </h1>

      <p
        className="text-gray-700 font-medium text-md py-2  tracking-widest mx-auto px-8"
        data-aos="fade-up"
        data-aos-duration="1000"
      >
        The ICDRC Website is not directed to any person in any jurisdiction
        where (by reason of that person's nationality, residence or otherwise)
        the publication or availability of the ICDRC Website is prohibited.
        Persons in respect of whom such prohibitions apply or country in which
        it is prohibited, if any, must not access the ICDRC Website.
      </p>

      <h1 className="text-gray-700 font-bold text-md py-2 text-2xl  tracking-widest mx-auto px-8">
        Force Majeure:
      </h1>

      <p
        className="text-gray-700 font-medium text-md py-2  tracking-widest mx-auto px-8"
        data-aos="fade-up"
        data-aos-duration="1000"
      >
        We shall not be liable if the service is delayed due to any force
        majeure event, arising out of any enforceable circumstances and beyond
        our reach, including but not limited to fire, flood, earthquakes,
        strikes, unavailability of necessary utilities, black-out, acts of God,
        acts of declared or undeclared war, acts of regulatory agencies, or
        natural disaster, time consumption during court procedural/regulatory
        compliances/rule compliance etc.
      </p>

      <h1 className="text-gray-700 font-bold text-md py-2  tracking-widest mx-auto px-8">
        Reservation of Rights:
      </h1>

      <p
        className="text-gray-700 font-medium text-md py-2  tracking-widest mx-auto px-8"
        data-aos="fade-up"
        data-aos-duration="1000"
      >
        We reserve the right to change, modify, add to, or remove portions of
        these Terms of Use at any time and accordingly these Terms of Use is
        liable to be changed at any time at the sole discretion of BAGIC and the
        changed/revised Terms of Use shall be automatically be applicable to you
        and you shall be bound by the same and comply with it.
      </p>

      <h1 className="text-gray-700 font-bold text-md py-2  tracking-widest mx-auto px-8">
        Prohibition of you and Miscellaneous Provisions:
      </h1>

      <p
        className="text-gray-700 font-medium text-md py-2  tracking-widest mx-auto px-8"
        data-aos="fade-up"
        data-aos-duration="1000"
      >
        On surfing/accessing and while in/at/on ICDRC Website, you are expressly
        prohibited and you shall not (i) upload any of the
        photos/videos/music/pictures/ screenshots/graphs/tables/any other
        material/contents/documents of whatsoever nature through electronic or
        any other mode, (ii) put any URL links/weblinks/ hyperlinks in ICDRC
        Website, and (iii) shall not put/write/post/comment of whatsoever which
        is of defamatory to ICDRC and or any other persons/party/government/s.
        ICDRC shall not be in any way be responsible for the above prohibited
        acts and also reserves to take suitable actions against you for the
        same. You are responsible for the content you post – ICDRC Website can
        be used only for information purpose by you. Keep in mind that you
        remain solely responsible for the content that you post, including any
        photos/videos/music/pictures/ screenshots/graphs/tables/any other
        material/contents/documents of whatsoever nature through electronic or
        any other mode You cannot post/type/keep private or confidential
        information or do anything that violates intellectual property rights of
        any third party.
      </p>
      <h1 className="text-gray-700 font-bold text-md py-2  tracking-widest mx-auto px-8">
        Content removal:
      </h1>

      <p
        className="text-gray-700 font-medium text-md py-2  tracking-widest mx-auto px-8"
        data-aos="fade-up"
        data-aos-duration="1000"
      >
        We shall reserve a right to remove any content or information you post
        on ICDRC Website if we believe it violates our Terms of Use, our
        policies or if that content is anyway not allowed to post as per
        applicable laws in India or infringes copy right/IPR rights of any third
        party in any manner.
      </p>

      <h1 className="text-gray-700 font-bold text-md py-2  tracking-widest mx-auto px-8">
        Jurisdiction, Severability:
      </h1>

      <p
        className="text-gray-700 font-medium text-md py-2  tracking-widest mx-auto px-8"
        data-aos="fade-up"
        data-aos-duration="1000"
      >
        Any action arising out of these terms or this ICDRC Website shall be
        exclusively governed by applicable Indian Laws, and the courts located
        in Pune, India shall have exclusive jurisdiction, and you agree to
        submit to and bound by the applicable Indian Laws and exclusive
        jurisdiction of Pune courts and also further agree that they are a
        convenient forum for you. In the event that any provision of these terms
        is held unenforceable, the validity or enforceability of the remaining
        provisions will not be affected, and the unenforceable provision will be
        replaced with an enforceable provision that comes close to the intention
        underlying the unenforceable provision.
      </p>

      <Home7Contact />
      <Footer />
    </div>
  );
};

export default Terms_Conditions;
