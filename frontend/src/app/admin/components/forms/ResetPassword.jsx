"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { FiLoader } from "react-icons/fi";
import toast from "react-hot-toast";
import { useRouter, useSearchParams } from "next/navigation";
import { url } from "../../../api";

const ResetPassword = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      password: "",
      confirmpassword: "",
    },
  });
  const router = useRouter();
  const [isloading, setIsloading] = React.useState(false);
  const searchParams = useSearchParams();

  const onSubmit = async (value) => {
    try {
      const token = searchParams.get("token");
      setIsloading((prevState) => !prevState);
      const response = await fetch(`${url}/api/admins/reset/password`, {
        method: "POST",
        body: JSON.stringify({ ...value, token }),
        headers: {
          "Content-type": "application/json",
        },
      });
      const { data, error } = await response.json();
      setIsloading((prevState) => !prevState);
      if (response.status !== 200) {
        return toast.error(error);
      }
      reset();
      toast.success(data);
      router.push("/admin/login");
    } catch (error) {
      setIsloading((prevState) => !prevState);
      console.error(error);
      toast.error(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex space-y-2 flex-col">
        <label htmlFor="password">New Password</label>
        <input
          name="password"
          id="password"
          type="password"
          {...register("password", {
            required: "Password is required",
          })}
          placeholder="Enter your password"
          className="text-sm border border-gray-300 focus:border-orange-500 outline-none
                    focus:outline-none rounded-md py-2 px-3 tracking-wide mt-1"
        />
        {errors.password && (
          <span className="text-red-600">{errors.password.message}</span>
        )}
      </div>

      <div className="flex space-y-2 flex-col">
        <label htmlFor="newpassword">Confirm Password</label>
        <input
          name="confirmpassword"
          id="confirmpassword"
          type="password"
          {...register("confirmpassword", {
            required: "Confirm Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          })}
          placeholder="Re-enter your password"
          className="text-sm border border-gray-300 focus:border-orange-500 outline-none
                    focus:outline-none rounded-md py-2 px-3 tracking-wide mt-1"
        />
        {errors.confirmpassword && (
          <span className="text-red-600">{errors.confirmpassword.message}</span>
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
  );
};

export default ResetPassword;
