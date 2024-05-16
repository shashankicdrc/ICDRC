import React from "react";
import { useForm } from "react-hook-form";
import { FiLoader } from "react-icons/fi";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { url } from "../../../api";

const ChangePassword = ({ closeModal }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      password: "",
      newpassword: "",
      confirmpassword: "",
    },
  });
  const admin = useSelector((state) => state.admin);
  const router = useRouter();

  React.useEffect(() => {
    if (!admin.token) return router.push("/admin/login");
  }, []);

  const [isloading, setIsloading] = React.useState(false);

  const onSubmit = async (value) => {
    try {
      setIsloading((prevState) => !prevState);
      const response = await fetch(`${url}/api/admins/change/password`, {
        method: "POST",
        body: JSON.stringify(value),
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${admin.token}`,
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
        <label htmlFor="password">Password</label>
        <input
          name="password"
          id="password"
          type="text"
          {...register("password", {
            required: "Current Password is required",
          })}
          placeholder="Enter your current password"
          className="text-sm border border-gray-300 focus:border-orange-500 outline-none
                    focus:outline-none rounded-md py-2 px-3 tracking-wide mt-1"
        />
        {errors.password && (
          <span className="text-red-600">{errors.password.message}</span>
        )}
      </div>
      <div className="flex space-y-2 flex-col">
        <label htmlFor="newpassword">New Password</label>
        <input
          name="newpassword"
          id="newpassword"
          type="password"
          {...register("newpassword", {
            required: "New Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          })}
          placeholder="Enter your new password"
          className="text-sm border border-gray-300 focus:border-orange-500 outline-none
                    focus:outline-none rounded-md py-2 px-3 tracking-wide mt-1"
        />
        {errors.newpassword && (
          <span className="text-red-600">{errors.newpassword.message}</span>
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

export default ChangePassword;
