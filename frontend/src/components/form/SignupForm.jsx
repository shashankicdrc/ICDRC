'use client';
import { useForm } from 'react-hook-form';
import Loader from '../Loader/page';
import { Fragment, useState } from 'react';
import toast from 'react-hot-toast';
import { signup } from '../../externalAPI/userService';
import { useRouter } from 'next/navigation';
import { Button } from '.././ui/button';
import { Eye, EyeOff } from 'lucide-react';

const SignupForm = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [passwordFocused, setPasswordFocused] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        reset,
    } = useForm();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setshowConfirmPassword] = useState(false);
    const router = useRouter();
    const passwordValue = watch('password');

    const onSubmit = async (values) => {
        try {
            setIsLoading(true);
            const { message, error } = await signup({
                ...values,
                provider: 'credential',
            });
            setIsLoading(false);
            if (error) {
                return toast.error(error);
            }
            toast.success(message);
            reset();
            router.push('/auth/login');
        } catch (error) {
            setIsLoading(false);
            toast.error(error.message);
        }
    };

    // Password validation rules
    const passwordRules = [
        {
            id: 1,
            text: 'At least 8 characters',
            meets: passwordValue?.length >= 8,
        },
        {
            id: 2,
            text: 'Contains at least one uppercase letter',
            meets: /[A-Z]/.test(passwordValue),
        },
        {
            id: 3,
            text: 'Contains at least one lowercase letter',
            meets: /[a-z]/.test(passwordValue),
        },
        {
            id: 4,
            text: 'Contains at least one number',
            meets: /[0-9]/.test(passwordValue),
        },
        {
            id: 5,
            text: 'Contains at least one special character',
            meets: /[!@#$%^&*(),.?":{}|<>]/.test(passwordValue),
        },
    ];

    const allRulesMet = passwordRules.every((rule) => rule.meets);

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-2">
            <div className="space-y-1">
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Name
                </label>
                <input
                    type="text"
                    placeholder="Enter your name"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    {...register('name', { required: 'Name is required' })}
                />
                {errors.name && (
                    <p className="text-destructive text-sm mt-1">
                        {errors.name.message}
                    </p>
                )}
            </div>
            <div className="space-y-1">
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Email
                </label>
                <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    {...register('email', {
                        required: 'Email is required',
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: 'Invalid email address',
                        },
                    })}
                />
                {errors.email && (
                    <p className="text-destructive text-sm mt-1">
                        {errors.email.message}
                    </p>
                )}
            </div>
            <div className="space-y-1 relative">
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Password
                </label>
                <div className="relative">
                    <input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Enter your password"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 pr-10"
                        {...register('password', {
                            required: 'Password is required',
                            minLength: {
                                value: 8,
                                message:
                                    'Password must be at least 8 characters',
                            },
                            validate: {
                                hasUpperCase: (value) =>
                                    /[A-Z]/.test(value) ||
                                    'Password must contain at least one uppercase letter',
                                hasLowerCase: (value) =>
                                    /[a-z]/.test(value) ||
                                    'Password must contain at least one lowercase letter',
                                hasNumber: (value) =>
                                    /[0-9]/.test(value) ||
                                    'Password must contain at least one number',
                                hasSpecialChar: (value) =>
                                    /[!@#$%^&*(),.?":{}|<>]/.test(value) ||
                                    'Password must contain at least one special character',
                            },
                        })}
                        onFocus={() => setPasswordFocused(true)}
                        onBlur={() => setPasswordFocused(false)}
                    />
                    <button
                        type="button"
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                        onClick={() => setShowPassword(!showPassword)}
                        aria-label={
                            showPassword ? 'Hide password' : 'Show password'
                        }
                    >
                        {showPassword ? (
                            <EyeOff className="h-4 w-4" />
                        ) : (
                            <Eye className="h-4 w-4" />
                        )}
                    </button>
                </div>
                {/* Password Rules Display */}
                {passwordFocused && (
                    <div className="mt-4 p-3">
                        <p className="text-sm font-medium mb-2">
                            Password must contain:
                        </p>
                        <ul className="space-y-1">
                            {passwordRules.map((rule) => (
                                <li
                                    key={rule.id}
                                    className="flex items-center text-sm"
                                >
                                    <span
                                        className={`inline-block text-center w-5 h-5 mr-2 rounded-full ${rule.meets ? 'bg-green-500 text-white' : 'bg-gray-300'}`}
                                    >
                                        {rule.meets ? '✓' : ''}
                                    </span>
                                    <span
                                        className={
                                            rule.meets
                                                ? 'text-green-700'
                                                : 'text-gray-600'
                                        }
                                    >
                                        {rule.text}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {errors.password && (
                    <p className="text-destructive text-sm mt-1">
                        {errors.password.message}
                    </p>
                )}
            </div>
            <div className="space-y-1">
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Confirm Password
                </label>
                <div className="relative">
                    <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        placeholder="Re-enter your password"
                        {...register('confirmPassword', {
                            required: 'Please confirm your password',
                            validate: (value) =>
                                value === watch('password') ||
                                'Passwords do not match',
                        })}
                    />
                    <button
                        type="button"
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                        onClick={() =>
                            setshowConfirmPassword(!showConfirmPassword)
                        }
                        aria-label={
                            showConfirmPassword
                                ? 'Hide password'
                                : 'Show password'
                        }
                    >
                        {showConfirmPassword ? (
                            <EyeOff className="h-4 w-4" />
                        ) : (
                            <Eye className="h-4 w-4" />
                        )}
                    </button>
                </div>
                {errors.confirmPassword && (
                    <p className="text-destructive text-sm mt-1">
                        {errors.confirmPassword.message}
                    </p>
                )}
            </div>
            <Button disabled={isLoading || !allRulesMet} className="mt-4">
                {isLoading ? (
                    <Fragment>
                        <Loader color="white" />
                        Please wait
                    </Fragment>
                ) : (
                    'Create Account'
                )}
            </Button>
        </form>
    );
};

export default SignupForm;
