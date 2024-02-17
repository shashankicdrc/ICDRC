"use client";
import { useEffect } from "react";
import HomeNav from "../../components/Navbar/page";
import Link from "next/link";
import Home7Contact from "../../components/HomeComponents/Home7Contact";
import Footer from "../../components/footer/page";
import SocialIcons from "../../components/SocialIcons/page";
import "./privacy.css";

const Policy = () => {
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
        PRIVACY POLICY
      </h1>
      <p
        className="text-gray-700 text-center font-medium text-md py-2  tracking-widest mx-auto px-8"
        data-aos="fade-up"
        data-aos-duration="1000"
      >
        One Stop Solution For Insurance Claim Disputes. (ICDRC)
      </p>
      <div className="px-4 pt-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 text-gray-700 font-medium text-md  tracking-widest ">
        <h1 className="text-gray-700 font-2xl text-md py-2 font-bold  tracking-widest mx-auto px-8">
          1. Introduction
        </h1>

        <ul>
          <li
            className="text-gray-700 font-medium text-md py-2  tracking-widest mx-auto px-8"
            data-aos="fade-up"
            data-aos-duration="1000"
          >
            1.1. At Insurance Claim Dispute Redressal Company Private Limited
            (ICDRC) we value your trust and respect your privacy. This Privacy
            Policy provides you with details about the way your data is
            collected, stored, and used by us. You are advised to read this
            Privacy Policy carefully. You must be at least 18 years old and
            possess the legal authority to form legally binding contracts under
            applicable law to use this Site and the services provided on it. By
            visiting ICDRCs website you expressly give us consent to use and
            disclose your personal information in accordance with this Privacy
            Policy. If you do not agree to the terms of the policy, please do
            not use or access ICDRC Website.
          </li>
          <li
            className="text-gray-700 font-medium text-md py-2  tracking-widest mx-auto px-8"
            data-aos="fade-up"
            data-aos-duration="1000"
          >
            1.2. We recognize the privacy requirements of individuals and treat
            this information with utmost respect and care. The personal data
            ("Personal Information" includes sensitive personal information)
            that we collect from you (our customer, their employees, channel
            partners, potential and prospective customers) is important to us
            for the fulfilment of various requirements and necessary safeguards
            are put in place to ensure that the privacy and security of the
            collected data are met.
          </li>
          <li
            className="text-gray-700 font-medium text-md py-2  tracking-widest mx-auto px-8"
            data-aos="fade-up"
            data-aos-duration="1000"
          >
            1.3. This Privacy Policy is applicable to the insurance services
            that we provide to our customers and their employees, and to those
            who are not our customers but interact with us as part of running
            our business such as:
            </li>
            <li
              className="text-gray-700 font-medium text-md py-2  tracking-widest mx-auto px-8"
              data-aos="fade-up"
              data-aos-duration="1000"
            >
              1.3.1. Availing our services – paid for by someone else;
            </li>
            <li
              className="text-gray-700 font-medium text-md py-2  tracking-widest mx-auto px-8"
              data-aos="fade-up"
              data-aos-duration="1000"
            >
              1.3.2. Taking part in a survey or trial or wellness program
            </li>
            <li
              className="text-gray-700 font-medium text-md py-2  tracking-widest mx-auto px-8"
              data-aos="fade-up"
              data-aos-duration="1000"
            >
              1.3.3. Entering a promotional event/activity
            </li>
            <li
              className="text-gray-700 font-medium text-md py-2  tracking-widest mx-auto px-8"
              data-aos="fade-up"
              data-aos-duration="1000"
            >
              1.3.4. Reaching out to our helpdesk
            </li>
            <li
              className="text-gray-700 font-medium text-md py-2  tracking-widest mx-auto px-8"
              data-aos="fade-up"
              data-aos-duration="1000"
            >
              1.3.5. Generally enquiring about our services
            </li>
            <li
              className="text-gray-700 font-medium text-md py-2  tracking-widest mx-auto px-8"
              data-aos="fade-up"
              data-aos-duration="1000"
            >
              1.3.6. Prospective customers with whom discussions are ongoing and
              who might wish to engage our services in future.
            </li>
            <li
              className="text-gray-700 font-medium text-md py-2  tracking-widest mx-auto px-8"
              data-aos="fade-up"
              data-aos-duration="1000"
            >
              1.3.7. Availing any services, either paid for by us or any other
              person, which requires sharing of personal information with us.
            </li>
          

          <li
            className="text-gray-700 font-medium text-md py-2  tracking-widest mx-auto px-8"
            data-aos="fade-up"
            data-aos-duration="1000"
          >
            1.4. This privacy policy will also apply, if you need to give us
            personal information about someone else in relation to our products
            and services. And if we need the permission of the other person to
            use that information, we will assume that you have obtained their
            permission before sharing a third party's personal information with
            us.
          </li>

          <li
            className="text-gray-700 font-medium text-md py-2  tracking-widest mx-auto px-8"
            data-aos="fade-up"
            data-aos-duration="1000"
          >
            1.5. This Privacy Policy provides you with details about the manner
            in which your data is collected, stored, processed, transferred and
            / or used by ICDRC You are advised to read this Privacy Policy
            carefully.
          </li>
        </ul>

        <h1 className="text-gray-700 font-2xl text-md py-2 font-bold  tracking-widest mx-auto px-8">
          2. Why Do We Have A Privacy Policy?
        </h1>

        <li
          className="text-gray-700 font-medium text-md py-2  tracking-widest mx-auto px-8"
          data-aos="fade-up"
          data-aos-duration="1000"
        >
          2.1. We are under a legal obligation to let you know what personal
          information we collect about you, what we use it for and to explain to
          you your rights in relation to that information. You have the right to
          know what information we hold about you and to have a copy of it, and
          you can ask us to change or sometimes delete it. This has been written
          in line with our obligations under the Information Technology Act 2000
          and its amendments and the rules thereunder, as they apply in India.
        </li>
        <li
          className="text-gray-700 font-medium text-md py-2  tracking-widest mx-auto px-8"
          data-aos="fade-up"
          data-aos-duration="1000"
        >
          2.2. The reasons we collect information are set out in this privacy
          policy. As an insurance claims-related consultancy service and other
          added servies service provider, most of what we do – from
          liaison/discussion/mediation/negotiation with insurers and third-party
          administrators to developing and promoting our services – involves
          using personal information. And we believe that it is very important
          for our customers to trust us with that information. We want you to be
          confident that we will keep it secure and use it both lawfully and
          ethically, respecting your privacy.
        </li>
        <li
          className="text-gray-700 font-medium text-md py-2  tracking-widest mx-auto px-8"
          data-aos="fade-up"
          data-aos-duration="1000"
        >
          2.3. Our support for the right to privacy, as part of our broader
          commitment to good corporate citizenship is stated in our privacy by
          design framework. And our privacy policy explains in detail how we use
          your personal information. It describes what we do (or what we may do)
          from the moment you ask for a service from us, when we may use your
          information for checking best available insurance claims-related
          solutions, through to providing and billing for that service. It also
          applies to marketing other products that we think will interest you.
        </li>
        <li
          className="text-gray-700 font-medium text-md py-2  tracking-widest mx-auto px-8"
          data-aos="fade-up"
          data-aos-duration="1000"
        >
          2.4. But whatever we do with your information, we need a legal basis
          for doing it. We generally rely on one of three grounds (reasons) for
          our business processing. Firstly, if you have ordered or take a
          service from us, we are entitled to process your information so that
          we can provide that service to you and bill you or the insurer for it
          as the case may be.
        </li>

        <li
          className="text-gray-700 font-medium text-md py-2  tracking-widest mx-auto px-8"
          data-aos="fade-up"
          data-aos-duration="1000"
        >
          2.5. Secondly, You are also free to withdraw your permission at any
          time. We tend to need permission when what is proposed is more
          intrusive (for example, sharing your contact details with other
          organizations so they can market their own products and services to
          you).
        </li>

        <li
          className="text-gray-700 font-medium text-md py-2  tracking-widest mx-auto px-8"
          data-aos="fade-up"
          data-aos-duration="1000"
        >
          2.6. But we do not always need permission. In some cases, having
          assessed whether our use would be fair and not override your right to
          privacy, we may come to the view that it falls within the third ground
          – our ‘legitimate interests’ to use the information in a particular
          way without your permission (for example, to protect our network
          against cyber-attacks). But when we do this, we must tell you as you
          may have a right to object. And if you object specifically to us
          sending you marketing material, or to ‘profiling you’ for marketing
          purposes, we must then stop.
        </li>

        <li
          className="text-gray-700 font-medium text-md py-2  tracking-widest mx-auto px-8"
          data-aos="fade-up"
          data-aos-duration="1000"
        >
          2.7. This is all set out in detail in this policy, which focuses more
          on those items that we think are likely to be of most interest to you.
          As well as covering processing for business purposes, we give you
          information on circumstances in which we may have to, or can choose
          to, share your information.
        </li>

        <li
          className="text-gray-700 font-medium text-md py-2  tracking-widest mx-auto px-8"
          data-aos="fade-up"
          data-aos-duration="1000"
        >
          2.8. The term “Process/Processing” and other variations of the word
          include ‘to collect, record, organize, structure, adapt, alter,
          retrieve, use, process, store, transfer, align, combine, index, and
          disclose (by transmission, dissemination or otherwise), make
          available, restrict, erase or destroy’
        </li>

        <li
          className="text-gray-700 font-medium text-md py-2  tracking-widest mx-auto px-8"
          data-aos="fade-up"
          data-aos-duration="1000"
        >
          2.9. This policy doesn’t apply to information about our employees or
          shareholders. It also doesn’t cover other companies or organizations
          (which advertise our products and services and use cookies, tags and
          other technology) collecting and using your personal information to
          offer relevant online advertisements to you.
        </li>

        <li
          className="text-gray-700 font-medium text-md py-2  tracking-widest mx-auto px-8"
          data-aos="fade-up"
          data-aos-duration="1000"
        >
          2.10. If you link to other organizations’ websites, apps, products,
          services and social media from our websites, this privacy policy
          doesn’t apply to how those other organizations use your personal
          information.
        </li>

        <li
          className="text-gray-700 font-medium text-md py-2  tracking-widest mx-auto px-8"
          data-aos="fade-up"
          data-aos-duration="1000"
        >
          2.11. You should review their privacy policies before giving them your
          personal information.
        </li>

        <h1 className="text-gray-700 font-2xl text-md py-2 font-bold  tracking-widest mx-auto px-8">
          3. What Information We Collect and What We Use It For?
        </h1>

        <li
          className="text-gray-700 font-medium text-md py-2  tracking-widest mx-auto px-8"
          data-aos="fade-up"
          data-aos-duration="1000"
        >
          3.1. The personal information we collect depends on the products and
          services you have and how you use them. We’ve explained the different
          ways we use your personal information.
        </li>

        <li
          className="text-gray-700 font-medium text-md py-2  tracking-widest mx-auto px-8"
          data-aos="fade-up"
          data-aos-duration="1000"
        >
          3.2. We’ll use your personal information to provide you our services.
          This applies when you register for service from us. Or if you register
          for a wellness program with us or download and register on one of our
          apps.
        </li>

       <p> 3.3. This means we will:</p>

        <li
          className="text-gray-700 font-medium text-md py-2  tracking-widest mx-auto px-8"
          data-aos="fade-up"
          data-aos-duration="1000"
        >
          3.3.1. record details about the services you use or structure through
          us;
          <li
            className="text-gray-700 font-medium text-md py-2  tracking-widest mx-auto px-8"
            data-aos="fade-up"
            data-aos-duration="1000"
          >
            3.3.2. send you service-information messages (we will send you
            messages to confirm your order and tell you about any changes that
            might affect your service, like when we have infrastructure work
            planned or need to fix something);
          </li>
          <li
            className="text-gray-700 font-medium text-md py-2  tracking-widest mx-auto px-8"
            data-aos="fade-up"
            data-aos-duration="1000"
          >
            3.3.3. update you on when we’ll deliver the services;
          </li>
          <li
            className="text-gray-700 font-medium text-md py-2  tracking-widest mx-auto px-8"
            data-aos="fade-up"
            data-aos-duration="1000"
          >
            3.3.4. let you create and log in to the online accounts we run;
          </li>
          <li
            className="text-gray-700 font-medium text-md py-2  tracking-widest mx-auto px-8"
            data-aos="fade-up"
            data-aos-duration="1000"
          >
            3.3.5. charge you and make sure your payment reaches us where
            applicable;
          </li>
          <li
            className="text-gray-700 font-medium text-md py-2  tracking-widest mx-auto px-8"
            data-aos="fade-up"
            data-aos-duration="1000"
          >
            3.3.6. filter any content you ask us to (any content our partners
            ask us to, such as your medical history for a wellness program);
          </li>
          <li
            className="text-gray-700 font-medium text-md py-2  tracking-widest mx-auto px-8"
            data-aos="fade-up"
            data-aos-duration="1000"
          >
            3.3.7. give information to someone else (if we need to for the
            service you’ve registered to avail) or to the insurer or a
            third-party administrator during a claim.
          </li>
        </li>

        <li
          className="text-gray-700 font-medium text-md py-2  tracking-widest mx-auto px-8"
          data-aos="fade-up"
          data-aos-duration="1000"
        >
          3.4. We use the following to provide services and manage your account.
          <li
            className="text-gray-700 font-medium text-md py-2  tracking-widest mx-auto px-8"
            data-aos="fade-up"
            data-aos-duration="1000"
          >
            3.4.1. Your contact details and other information to confirm your
            identity and your communications with us. This includes your name,
            gender, address, phone number, date of birth, email address,
            passwords, and credentials (such as the security questions and
            answers we have on your account).
          </li>
          <li
            className="text-gray-700 font-medium text-md py-2  tracking-widest mx-auto px-8"
            data-aos="fade-up"
            data-aos-duration="1000"
          >
            3.4.2. Your health and financial information.
          </li>
          <li
            className="text-gray-700 font-medium text-md py-2  tracking-widest mx-auto px-8"
            data-aos="fade-up"
            data-aos-duration="1000"
          >
            3.4.3. Your communications with us, including emails, webchats, and
            phone calls. We’ll also keep records of any settings or
            communication preferences you choose.
          </li>
          <li
            className="text-gray-700 font-medium text-md py-2  tracking-widest mx-auto px-8"
            data-aos="fade-up"
            data-aos-duration="1000"
          >
            3.4.4. Details of the services you have registered to avail with us,
            how they are performing and how you use them – including your policy
            structuring and claims records.
          </li>
          <li
            className="text-gray-700 font-medium text-md py-2  tracking-widest mx-auto px-8"
            data-aos="fade-up"
            data-aos-duration="1000"
          >
            3.4.5. Information from cookies placed on your connected devices
            that we need so we can provide a service.
          </li>
        </li>

        <li
          className="text-gray-700 font-medium text-md py-2  tracking-widest mx-auto px-8"
          data-aos="fade-up"
          data-aos-duration="1000"
        >
          3.5. We use this information to carry out our contract (or to prepare
          a contract) and provide services to you. If you don’t give us the
          correct information or ask us to delete it, we might not be able to
          provide you with the service you requested from us.
        </li>

        <li
          className="text-gray-700 font-medium text-md py-2  tracking-widest mx-auto px-8"
          data-aos="fade-up"
          data-aos-duration="1000"
        >
          3.6. We’ll use your personal information if we consider it is in our
          legitimate business interests so that we can operate as an efficient
          and effective business. We use your information to:
          <li
            className="text-gray-700 font-medium text-md py-2  tracking-widest mx-auto px-8"
            data-aos="fade-up"
            data-aos-duration="1000"
          >
            3.6.1. Identify, and let you know about services that interest you;
          </li>
          <li
            className="text-gray-700 font-medium text-md py-2  tracking-widest mx-auto px-8"
            data-aos="fade-up"
            data-aos-duration="1000"
          >
            3.6.2. share within ICDRC for administrative purposes and to tailor
            the information we provide to you and inform you about products that
            may be of interest to you;
          </li>
          <li
            className="text-gray-700 font-medium text-md py-2  tracking-widest mx-auto px-8"
            data-aos="fade-up"
            data-aos-duration="1000"
          >
            3.6.3. create aggregated and anonymized information for further use;
          </li>
          <li
            className="text-gray-700 font-medium text-md py-2  tracking-widest mx-auto px-8"
            data-aos="fade-up"
            data-aos-duration="1000"
          >
            3.6.4. detect and prevent fraud including sharing with identified
            agencies/ law enforcement bodies so they can protect you against
            fraud and maintain accurate records; and secure and protect our
            network.
          </li>
        </li>

        <li
          className="text-gray-700 font-medium text-md py-2  tracking-widest mx-auto px-8"
          data-aos="fade-up"
          data-aos-duration="1000"
        >
          3.7. To market to you and to identify permissible products and
          services that interest you, we will use your personal information to
          send you direct marketing and to better identify permissible services
          that interest you. We do that if you’re one of our customers or if
          you’ve been in touch with us another way (such as entering a wellness
          program, prize promotion or competition).
        </li>

        <li
          className="text-gray-700 font-medium text-md py-2  tracking-widest mx-auto px-8"
          data-aos="fade-up"
          data-aos-duration="1000"
        >
          3.8. This means we’ll:
          <li
            className="text-gray-700 font-medium text-md py-2  tracking-widest mx-auto px-8"
            data-aos="fade-up"
            data-aos-duration="1000"
          >
            3.8.1. create a profile about you to better understand you as a
            customer and tailor the communications we send you (including our
            mailing and marketing messages);
          </li>
          <li
            className="text-gray-700 font-medium text-md py-2  tracking-widest mx-auto px-8"
            data-aos="fade-up"
            data-aos-duration="1000"
          >
            3.8.2. tell you about other products and services you might be
            interested in;
          </li>
          <li
            className="text-gray-700 font-medium text-md py-2  tracking-widest mx-auto px-8"
            data-aos="fade-up"
            data-aos-duration="1000"
          >
            3.8.3. recommend better ways to manage what you spend with us, like
            suggesting a more suitable product based on what you use;
          </li>
          <li
            className="text-gray-700 font-medium text-md py-2  tracking-widest mx-auto px-8"
            data-aos="fade-up"
            data-aos-duration="1000"
          >
            3.8.4. try to identify products and services you’re interested in;
            and show you more relevant content (both on our and other parties’
            apps and sites) and work with other well-known brands to make theirs
            more suitable too.
          </li>
        </li>

        <li
          className="text-gray-700 font-medium text-md py-2  tracking-widest mx-auto px-8"
          data-aos="fade-up"
          data-aos-duration="1000"
        >
          3.9. We use the following for marketing and to identify the products
          and services you’re interested in, where applicable.
          <li
            className="text-gray-700 font-medium text-md py-2  tracking-widest mx-auto px-8"
            data-aos="fade-up"
            data-aos-duration="1000"
          >
            3.9.1. Your contact details. This includes your name, gender,
            address, phone number, date of birth and email address.
          </li>
          <li
            className="text-gray-700 font-medium text-md py-2  tracking-widest mx-auto px-8"
            data-aos="fade-up"
            data-aos-duration="1000"
          >
            3.9.2. Your health and financial information.
          </li>
          <li
            className="text-gray-700 font-medium text-md py-2  tracking-widest mx-auto px-8"
            data-aos="fade-up"
            data-aos-duration="1000"
          >
            3.9.3. Information from cookies and tags placed on your connected
            devices.
          </li>
          <li
            className="text-gray-700 font-medium text-md py-2  tracking-widest mx-auto px-8"
            data-aos="fade-up"
            data-aos-duration="1000"
          >
            3.9.4. Information from other organizations such as aggregated
            demographic data, data brokers (such as DnB), our partners and
            publicly available sources like the LinkedIn and business
            directories.
          </li>
          <li
            className="text-gray-700 font-medium text-md py-2  tracking-widest mx-auto px-8"
            data-aos="fade-up"
            data-aos-duration="1000"
          >
            3.9.5. Details of the products and services you have bought with
            PIBL and how you use them – including your insurance policy
            structure and claims records.
          </li>
        </li>

        <p>
          3.10. We’ll send you information (about the services we provide) by
          phone, post, email, text message, online banner advertising or a
          notice using our apps. We also use the information we have about you
          to personalize these messages wherever we can as we believe it is
          important to make them relevant to you. We do this because we have a
          legitimate business interest in keeping you up to date with our
          products and services, making them relevant to you and making sure you
          manage your spending with us. We also check that you are happy for us
          to send you marketing messages by text or email before we do so. In
          each message we send, you also have the option to opt out.
        </p>

        <p>
          {" "}
          3.11. We’ll only market other organizations’ products and services if
          you have said it is OK for us to do so and it is permitted under
          applicable laws and IRDA regulations.
        </p>

        <p>
          3.12. You can ask us to stop sending you marketing information or
          withdraw your permission at any time, as set out above.
        </p>

        <p>3.13. Read Section 4 for more details on how we use cookies.</p>

        <p>
          3.14. To create aggregated and anonymized data, we will use your
          personal information to create aggregated and anonymized information.
          Nobody can identify you from that information and we’ll use it to:{" "}
        </p>

        <li
          className="text-gray-700 font-medium text-md py-2  tracking-widest mx-auto px-8"
          data-aos="fade-up"
          data-aos-duration="1000"
        >
          3.14.1. make sure our services are working properly and continuously
          improve and develop our services for our customers;
        </li>

        <li
          className="text-gray-700 font-medium text-md py-2  tracking-widest mx-auto px-8"
          data-aos="fade-up"
          data-aos-duration="1000"
        >
          3.14.2. run management and corporate reporting, research and
          analytics, and to improve the business; and provide other
          organizations with aggregated and anonymous reports where required
        </li>

        <p>
          3.15. We may have a legitimate interest in generating insights that
          will help us operate our network and business or would be useful to
          other organizations.
        </p>
        <p>
          3.16. To develop our business and build a better understanding of what
          our customers want
        </p>
        <p>3.17. This means we’ll:</p>

        <li
          className="text-gray-700 font-medium text-md py-2  tracking-widest mx-auto px-8"
          data-aos="fade-up"
          data-aos-duration="1000"
        >
          3.17.1. maintain, develop and test our services, to provide you with a
          better service;
        </li>
        <li
          className="text-gray-700 font-medium text-md py-2  tracking-widest mx-auto px-8"
          data-aos="fade-up"
          data-aos-duration="1000"
        >
          3.17.2. train our people and suppliers to provide you with services
          (but we make the information anonymous beforehand wherever possible);
        </li>
        <li
          className="text-gray-700 font-medium text-md py-2  tracking-widest mx-auto px-8"
          data-aos="fade-up"
          data-aos-duration="1000"
        >
          3.17.3. create a profile about you to better understand you as our
          customer;
        </li>
        <li
          className="text-gray-700 font-medium text-md py-2  tracking-widest mx-auto px-8"
          data-aos="fade-up"
          data-aos-duration="1000"
        >
          3.17.4. share personal information within PIBL for administrative
          purposes, such as sharing contact details so we can get in touch with
          you and details of what you buy from different verticals within ICDRC;
          and
        </li>
        <li
          className="text-gray-700 font-medium text-md py-2  tracking-widest mx-auto px-8"
          data-aos="fade-up"
          data-aos-duration="1000"
        >
          3.17.5. make and defend claims to protect our business interests.
        </li>
        <li
          className="text-gray-700 font-medium text-md py-2  tracking-widest mx-auto px-8"
          data-aos="fade-up"
          data-aos-duration="1000"
        >
          3.17.6. run surveys and market research about our services.
        </li>

        <p>
          3.18. If we use this information for market research, training,
          testing, development purposes, defend or bring claims, or to create a
          profile about you, we do so because it is in our legitimate business
          interests of running an efficient and effective business which can
          adapt to meet our customers’ needs.
        </p>

        <p>
          3.19. We create a profile about you based on what you have registered
          to avail from us and how you use our services. This helps us tailor
          the offers we share with you. You can ask us to stop profiling you for
          marketing purposes at any time, as set out above.
        </p>

        <div>
          <h1 className="text-gray-700 font-2xl text-md py-2 font-bold  tracking-widest mx-auto px-8">
            4. Cookies and Tracking Technology
          </h1>
          <p>
            A cookie is a small data file that certain Web sites write to your
            hard drive when you visit them. A cookie file can contain
            information such as a user ID that the site uses to track the pages
            you've visited, but the only personal information a cookie can
            contain is information you supply yourself. A cookie can't read data
            off your hard disk or read cookie files created by other sites.
            Cookies save you time, for example, if you personalize a web page,
            or navigate within a Site; a cookie recalls your specific
            information on subsequent visits. www.prudentbrokers.com also uses
            cookies to track user traffic patterns. We do this to determine the
            usefulness of our website information to our users and to see how
            effective our navigational structure is in helping users find the
            information on our site. Most web browsers automatically accept
            cookies; however, you can modify your browser setting to decline
            cookies.
          </p>
          <p>
            In addition to cookies, our site uses a variety of technical methods
            for tracking purposes, which may include web beacons. Web beacons
            are small pieces of data that are embedded in images on the pages of
            web sites. www.prudentbrokers.com also uses these technical methods
            to analyze the traffic patterns on our web site, such as the
            frequency with which our users visit various parts of our web site.
          </p>
        </div>

        <div>
          <h1 className="text-gray-700 font-2xl text-md py-2 font-bold  tracking-widest mx-auto px-8">
            5. Who Do We Share Your Information With?
          </h1>

          <p>
            5.1. Being an insurance Consultant and claims dispute redressal
            service provider requires us to liaise with our customer, the
            insurance company and appointed third party administrators and
            surveyors. To fulfill our role and to provide you with the
            contracted services, we will share your information with:
          </p>
          <ul>
            <li
              className="text-gray-700 font-medium text-md py-2  tracking-widest mx-auto px-8"
              data-aos="fade-up"
              data-aos-duration="1000"
            >
              5.1.1Identified personnel from your organization
            </li>
            <li
              className="text-gray-700 font-medium text-md py-2  tracking-widest mx-auto px-8"
              data-aos="fade-up"
              data-aos-duration="1000"
            >
              5.1.2Insurance Company
            </li>
            <li
              className="text-gray-700 font-medium text-md py-2  tracking-widest mx-auto px-8"
              data-aos="fade-up"
              data-aos-duration="1000"
            >
              5.1.3Third Party Administrator
            </li>
            <li
              className="text-gray-700 font-medium text-md py-2  tracking-widest mx-auto px-8"
              data-aos="fade-up"
              data-aos-duration="1000"
            >
              5.1.4Insurance Surveyors and Valuers
            </li>
            <li
              className="text-gray-700 font-medium text-md py-2  tracking-widest mx-auto px-8"
              data-aos="fade-up"
              data-aos-duration="1000"
            >
              5.1.5Partnered agencies offering value-added services like
              Wellness
            </li>
            <li
              className="text-gray-700 font-medium text-md py-2  tracking-widest mx-auto px-8"
              data-aos="fade-up"
              data-aos-duration="1000"
            >
              5.1.6Third Party service providers providing services to us
            </li>
          </ul>
          <p>
            5.2 We might have to release personal information about you to meet
            our legal and regulatory obligations.
          </p>
          <p>
            5.3 With law enforcement agencies, for the investigatory powers
            conferred to them under various laws, we might have to share
            personal information about you to government and law-enforcement
            agencies, such as the police, to help detect and stop crime,
            prosecute offenders, and protect national security. They might ask
            for the following details:
          </p>
          <ul>
            <li
              className="text-gray-700 font-medium text-md py-2  tracking-widest mx-auto px-8"
              data-aos="fade-up"
              data-aos-duration="1000"
            >
              5.3.1 Your contact details. This includes your name, gender,
              address, phone number, date of birth, email address, passwords,
              and credentials (such as your security questions and answers)
              needed to confirm your identity and your communications with us.
            </li>
            <li
              className="text-gray-700 font-medium text-md py-2  tracking-widest mx-auto px-8"
              data-aos="fade-up"
              data-aos-duration="1000"
            >
              5.3.2 Your communications with us, such as calls, emails, texts,
              chats, and webchats.
            </li>
            <li
              className="text-gray-700 font-medium text-md py-2  tracking-widest mx-auto px-8"
              data-aos="fade-up"
              data-aos-duration="1000"
            >
              5.3.3 Your health and financial information.
            </li>
            <li
              className="text-gray-700 font-medium text-md py-2  tracking-widest mx-auto px-8"
              data-aos="fade-up"
              data-aos-duration="1000"
            >
              5.3.4 Details of the services you have availed and how you use
              them – including your policy and claims records.
            </li>
          </ul>
          <p>
            5.4 The balance between privacy and investigatory powers is
            challenging. We share your personal information when the law says we
            have to, but we have strong oversight of what we do and get expert
            advice to make sure we’re doing the right thing to protect your
            right to privacy.
          </p>
          <p>
            5.5 We’ll also share personal information about you where we have to
            legally share it with another person. That might be when a law says
            we have to share that information or because of a court order.
          </p>
          <p>
            5.6 In limited circumstances, we may also share your information
            with other public authorities. However, we would need to be
            satisfied that a request for information is lawful and proportionate
            (in other words, appropriate to the request).
          </p>
          <p>
            5.7 We will be required to share information with regulators like
            IRDAI when called upon and store all such collected information for
            a period as prescribed from time to time.
          </p>
        </div>

        <div>
          <h1 className="text-gray-700 font-2xl text-md py-2 font-bold  tracking-widest mx-auto px-8">
            {" "}
            6. Security of Your Information
          </h1>
          <p>
            We have strict security measures to protect your personal
            information. We check your identity when you get in touch with us,
            and we follow our security procedures and apply suitable technical
            measures, such as encryption, to protect your information.
          </p>
        </div>

        <div>
          <h1 className="text-gray-700 font-2xl text-md py-2 font-bold  tracking-widest mx-auto px-8">
            7. How Long Do We Retain Your Information
          </h1>
          <p>
            We retain information for the following time period unless a longer
            retention duration is prescribed under applicable law or pursuant to
            an order of a court or authority:
          </p>
          <p>
            Notification of Changes to the Privacy Policy PIBL reserves the
            right to revise this Privacy Policy from time to time as per
            organization needs or to abide by new regulations, by posting notice
            of the amendment as appropriate. To the extent permitted by
            applicable law, such changes will be applicable from the time they
            are posted.
          </p>
        </div>
      </div>

      <Home7Contact />
      <Footer />
    </div>
  );
};

export default Policy;
