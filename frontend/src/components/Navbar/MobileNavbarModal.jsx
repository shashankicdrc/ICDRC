import React from "react";
import RightMenu from "./RightMenu";
import Link from "next/link";
import { IoMdClose } from "react-icons/io";
import Image from "next/image";
import { navlinks } from "../../lib/constant";
import { usePathname } from "next/navigation";

export default function MobileNavbarModal({ isOpen, toggleModal }) {
  const pathname = usePathname();
  return (
    <div
      className={`fixed bg-opacity-30 inset-0 z-50 opacity-100 md:hidden
bg-black w-full overscroll-none ${isOpen ? "flex" : "hidden"}`}
    >
      <div className="bg-white w-3/4 h-screen px-5 py-5">
        <Link href="/">
          <Image
            src="/logo.png"
            alt="logo"
            className="md:cursor-pointer w-28 md:w-44"
            height={200}
            width={400}
          />
        </Link>
        <ul className="space-y-3 my-5">
          {navlinks.map((item) => (
            <li
              key={item.link}
              onClick={() => toggleModal(!isOpen)}
              className={`${pathname === item.link ? "text-orange-500" : ""}`}
            >
              <Link href={item.link}>{item.name}</Link>
            </li>
          ))}
          <div className="absolute bottom-5 left-2 flex flex-col space-y-2">
            <RightMenu />
          </div>
        </ul>
      </div>
      <div className="ml-20 mt-5 text-white cursor-pointer">
        <IoMdClose size={30} onClick={() => toggleModal(!isOpen)} />
      </div>
    </div>
  );
}
