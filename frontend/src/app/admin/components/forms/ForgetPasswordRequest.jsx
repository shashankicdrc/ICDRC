import React from "react";
import { useForm } from "react-hook-form";
import { FiLoader } from "react-icons/fi";
import toast from "react-hot-toast";
import { url } from "../../../api";

const ForgetPassword = ({ closeModal }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
    },
  });

  const [isloading, setIsloading] = React.useState(false);

  const onSubmit = async (value) => {
    try {
      setIsloading((prevState) => !prevState);
      const response = await fetch(`${url}/api/admins/reset/password/request`, {
        method: "POST",
        body: JSON.stringify(value),
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
      closeModal();
      toast.success(data);
    } catch (error) {
      setIsloading((prevState) => !prevState);
      console.error(error);
      toast.error(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex space-y-2 flex-col">
        <label htmlFor="email">Email</label>
        <input
          name="email"
          id="email"
          type="email"
          {...register("email", {
            required: "Email is required",
          })}
          placeholder="Enter your email "
          className="text-sm border border-gray-300 focus:border-orange-500 outline-none
                    focus:outline-none rounded-md py-2 px-3 tracking-wide mt-1"
        />
        {errors.email && (
          <span className="text-red-600">{errors.email.message}</span>
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

export default ForgetPassword;
