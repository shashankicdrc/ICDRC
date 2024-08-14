'use client'
import { useForm } from "react-hook-form";
import Loader from "../Loader/page";
import { Fragment, useState } from "react";

const SignupForm = () => {
    const [isLoading, setIsLoading] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        reset,
    } = useForm();

    const onSubmit = () => { }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
            <div className="space-y-1">
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Name</label>
                <input
                    type="text"
                    placeholder="Enter your name"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    {...register("name", { required: "Name is required" })}
                />
                {errors.name && <p className="text-destructive">{errors.name.message}</p>}
            </div>
            <div className="space-y-1">
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Email</label>
                <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    {...register("email", {
                        required: "Email is required",
                        pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: "Invalid email address",
                        },
                    })}
                />
                {errors.email && <p className="text-destructive">{errors.email.message}</p>}
            </div>
            <div className="space-y-1">
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Password</label>
                <input
                    type="password"
                    placeholder="Enter your password"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"



                    {...register("password", {
                        required: "Password is required",
                        minLength: {
                            value: 6,
                            message: "Password must be at least 6 characters",
                        },
                    })}
                />
                {errors.password && <p className="text-destructive">{errors.password.message}</p>}
            </div>
            <div className="space-y-1">
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Confirm Password</label>
                <input
                    type="password"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Re-enter your password"
                    {...register("confirmPassword", {
                        required: "Please confirm your password",
                        validate: (value) =>
                            value === watch("password") || "Passwords do not match",
                    })}
                />
                {errors.confirmPassword && <p className="text-destructive">{errors.confirmPassword.message}</p>}
            </div>
            <button disabled={isLoading} type="submit" className="h-10 w-full rounded-md bg-orange-500 px-3 py-1 text-white focus:bg-orange-700 focus:outline-none"
            >
                {isLoading ? <Fragment>
                    <Loader
                        color="white"
                    />
                    Please wait
                </Fragment>
                    :
                    "Register"
                }
            </button>
        </form>)
}

export default SignupForm;
