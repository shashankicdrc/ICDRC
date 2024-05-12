"use client";
import React, { Fragment, useState, useRef, useEffect } from "react";
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { FiLoader } from "react-icons/fi";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { url } from "../../../api";

const Createadmin = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: "subadmin",
    },
  });
  const [isloading, setIsloading] = useState(false);
  const admin = useSelector((state) => state.admin);
  const router = useRouter();

  useEffect(() => {
    if (!admin.token) return router.push("/admin/login");
  }, []);

  const onSubmit = async (value) => {
    try {
      setIsloading((prevState) => !prevState);
      const response = await fetch(`${url}/api/registeradmin`, {
        method: "POST",
        body: JSON.stringify({ ...value, emailId: value.email }),
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${admin.token}`,
        },
      });
      const { success, message } = await response.json();
      setIsloading((prevState) => !prevState);
      if (!success) {
        return toast.error(message);
      }
      reset();
      toast.success("Subadmin created successfully.");
      onClose();
    } catch (error) {
      console.log(error);
      toast.error(error.message);
      setIsloading((prevState) => !prevState);
    }
  };

  return (
    <Fragment>
      <button
        onClick={onOpen}
        ref={btnRef}
        className="text-white bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded-md"
      >
        create admin
      </button>
      <Drawer
        isOpen={isOpen}
        size={"lg"}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent className="w-1/3 overflow-y-auto">
          <DrawerCloseButton />
          <DrawerHeader>Create a sub admin</DrawerHeader>
          <DrawerBody className="overflow-y-auto">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex space-y-2 flex-col">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  {...register("name", { required: true })}
                  placeholder="Enter your name"
                  className="text-sm border border-gray-300 focus:border-orange-500 outline-none
                    focus:outline-none rounded-md py-2 px-3 tracking-wide mt-1"
                />
                {errors.name && (
                  <span className="text-red-600">
                    Please provide valid name
                  </span>
                )}
              </div>

              <div className="flex space-y-2 flex-col">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  {...register("email", { required: true })}
                  placeholder="Email"
                  className="text-sm border border-gray-300 focus:border-orange-500 outline-none
                    focus:outline-none rounded-md py-2 px-3 tracking-wide mt-1"
                />
                {errors.email && (
                  <span className="text-red-600">
                    Please provide valid email
                  </span>
                )}
              </div>
              <div className="flex space-y-2 flex-col">
                <label htmlFor="password">Password</label>
                <input
                  type="text"
                  name="password"
                  id="password"
                  {...register("password", { required: true })}
                  placeholder="Enter your password"
                  className="text-sm border border-gray-300 focus:border-orange-500 outline-none
                    focus:outline-none rounded-md py-2 px-3 tracking-wide mt-1"
                />
                {errors.password && (
                  <span className="text-red-600">
                    Please provide valid password
                  </span>
                )}
              </div>

              <button
                className="bg-orange-500 hover:bg-orange-600 px-4  my-5 py-2
                    rounded-md text-white w-fit inline-flex"
              >
                {isloading ? (
                  <>
                    <FiLoader className="animate-spin mr-2" size={30} />
                    please wait ...
                  </>
                ) : (
                  "Submit"
                )}
              </button>
            </form>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Fragment>
  );
};

export default Createadmin;
