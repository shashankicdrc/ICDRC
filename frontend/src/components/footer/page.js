import React from "react";
import { BsLinkedin } from "react-icons/bs";
import { GrInstagram } from "react-icons/gr";
import { BsYoutube } from "react-icons/bs";
import { ImLocation2 } from "react-icons/im";
import Link from "next/link";
import { FaSquareXTwitter } from "react-icons/fa6";
import { AiFillFacebook } from "react-icons/ai";
import Image from "next/image";
import Separator from "../../components/ui/separator";

export default function Footer() {
  return (
    <footer className="border-t">
      <div className="max-w-screen-xl px-4 pt-20 mx-auto sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
          <div>
            <Link
              href="/"
              aria-label="Go home"
              title="Company"
              className="inline-flex items-center"
            >
              <Image
                src="https://res.cloudinary.com/dl5hosmxb/image/upload/v1692866749/Logo/Copy_of_ICDRC_912_273_px_rwkrry.png"
                alt="logo"
                className="md:cursor-pointer h-24"
                width={300}
                height={200}
              />
            </Link>
            <p className="max-w-xs mt-4 text-sm text-gray-600">
              Your Trusted Insurance Claims and Dispute Resolution Partner!
              Looking for expert guidance with insurance claims or dispute
              resolution? Partner with us for a seamless experience. Our team of
              seasoned professionals is here to support you at every step.
            </p>
            <div className="flex mt-8 space-x-6 text-gray-600">
              <a
                className="hover:opacity-75"
                href="https://www.linkedin.com/company/icdrcofficial"
                target="_blank"
                rel="noreferrer"
              >
                <span className="sr-only"> Linkedin </span>
                <BsLinkedin size={20} />
              </a>
              <a
                className="hover:opacity-75"
                href="https://www.instagram.com/icdrc2024"
                target="_blank"
                rel="noreferrer"
              >
                <span className="sr-only"> Instagram </span>
                <GrInstagram size={20} />{" "}
              </a>

              <a className="hover:opacity-75" target="_blank" rel="noreferrer">
                <span className="sr-only"> Twitter </span>
                <FaSquareXTwitter size={20} />
              </a>
              <a
                className="hover:opacity-75"
                href="https://www.facebook.com/ICDRCOfficial/"
                target="_blank"
                rel="noreferrer"
              >
                <span className="sr-only"> Facebook </span>
                <AiFillFacebook size={20} />{" "}
              </a>
              <a
                className="hover:opacity-75"
                href="https://www.youtube.com/@ICDRC_Official"
                target="_blank"
                rel="noreferrer"
              >
                <span className="sr-only"> Youtube </span>
                <BsYoutube size={20} />{" "}
              </a>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:col-span-2 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <p className="font-medium">Company</p>
              <nav className="flex flex-col mt-4 space-y-2 text-sm text-gray-500">
                <Link className="hover:opacity-75" href="/about">
                  About{" "}
                </Link>
                <Link className="hover:opacity-75" href="/casestudies">
                  Case Studies
                </Link>
                <Link className="hover:opacity-75" href="/gallery">
                  Gallery
                </Link>
                <Link className="hover:opacity-75" href="/blogs">
                  Blogs
                </Link>
              </nav>
            </div>

            <div>
              <p className="font-medium">Helpful Links</p>
              <nav className="flex flex-col mt-4 space-y-2 text-sm text-gray-500">
                <a className="hover:opacity-75" href="/casestatus">
                  Case status
                </a>

                <a className="hover:opacity-75" href="/admin/login">
                  Admin login
                </a>
                <a className="hover:opacity-75" href="/contact">
                  Contact{" "}
                </a>
                <a className="hover:opacity-75" href="/register">
                  Register complaints
                </a>
              </nav>
            </div>
            <div className="col-span-2">
              <p className="font-medium">Address</p>
              <div>
                <div>
                  <p className="text-[14px]">Registered Office:</p>
                  <p className="p-2 text-gray-500 flex gap-2">
                    <ImLocation2 className="text-orange-500 text-2xl md:text-4xl" />
                    <span className="text-sm">
                      A-62, BASEMENT, DDA SHED INDUSTRIAL AREA PHASE II Okhla
                      Industrial Estate New Delhi - 110020 India
                    </span>
                  </p>
                </div>

                <div>
                  <p className="text-[14px]"> Corporate office:</p>
                  <p className="p-2 text-gray-500 flex gap-2">
                    <ImLocation2 className="text-orange-500 text-2xl md:text-4xl" />{" "}
                    <span className="text-sm">
                      6th Floor, Sanatan Building, Opposite CAG Office,
                      Deendayal Upadhyay Marg, New Delhi
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Separator />
        <div className="flex flex-col py-2 justify-center mt-2 sm:flex-row">
          <p className="text-sm">
            Copyrights Reserved © 2024{" "}
            <span className="text-orange-600 font-bold text-xl">
              <a
                href="https://www.icdrc.in"
                target="_blank"
                rel="noreferrer"
                className="font-bold text-orange-600 text-xl"
              >
                ICDRC Services Pvt. Ltd.
              </a>
            </span>{" "}
            | All rights reserved | Designed, developed and maintained by{" "}
            <a
              href="https://www.webdesys.com"
              target="_blank"
              rel="noreferrer"
              className="font-bold text-orange-600 text-xl"
            >
              WebDesys
            </a>
            .
          </p>
        </div>
        <div className="flex items-center justify-center mx-auto mt-1 pb-10 space-x-4 sm:mt-0">
          <a className="hover:opacity-75" href="/privacy_policy">
            Privacy Policy{" "}
          </a>
          <a className="hover:opacity-75" href="/terms_conditions">
            Terms &amp; Conditions{" "}
          </a>
          <a className="hover:opacity-75" href="/refund_policy">
            Returns Policy{" "}
          </a>
          <a className="hover:opacity-75" href="/partner">
            Partner with us
          </a>
        </div>
      </div>
    </footer>
  );
}
