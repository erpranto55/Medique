"use client";

import Link from "next/link";

import {
    useContext,
    useState,
} from "react";

import {
    useRouter,
} from "next/navigation";

import {
    useForm,
} from "react-hook-form";

import {
    AuthContext,
} from "@/providers/AuthProvider";

import {
    FaEye,
    FaEyeSlash,
} from "react-icons/fa";

import {
    FcGoogle,
} from "react-icons/fc";

const RegisterPage = () => {

    const {
        createUser,
        googleLogin,
        updateUserProfile,
    } = useContext(AuthContext);

    const router = useRouter();

    const [showPassword, setShowPassword] =
        useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    // REGISTER
    const onSubmit = async (data) => {

        try {

            // CREATE USER
            const result =
                await createUser(
                    data.email,
                    data.password
                );

            // UPDATE PROFILE
            await updateUserProfile({

                displayName: data.name,

                photoURL: data.photo,
            });

            console.log(result.user);

            router.push("/");

        } catch (error) {

            console.log(error.message);
        }
    };

    // GOOGLE LOGIN
    const handleGoogleLogin =
        async () => {

            try {

                await googleLogin();

                router.push("/");

            } catch (error) {

                console.log(error.message);
            }
        };

    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-16">

            <div className="w-full max-w-xl bg-base-100 shadow-2xl rounded-3xl p-8 md:p-12 border border-base-300">

                {/* Heading */}
                <div className="text-center mb-10">

                    <h1 className="text-4xl font-bold">
                        Create Account
                    </h1>

                    <p className="text-base-content/70 mt-3">
                        Register and start your
                        tutoring journey with
                        MediQueue.
                    </p>

                </div>

                {/* FORM */}
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-6"
                >

                    {/* Name */}
                    <div>

                        <label className="label font-semibold">
                            Full Name
                        </label>

                        <input
                            type="text"
                            placeholder="Your Name"
                            className="input input-bordered w-full"
                            {...register("name", {
                                required:
                                    "Name is required",
                            })}
                        />

                        {
                            errors.name && (
                                <p className="text-error text-sm mt-1">
                                    {errors.name.message}
                                </p>
                            )
                        }

                    </div>

                    {/* Photo */}
                    <div>

                        <label className="label font-semibold">
                            Photo URL
                        </label>

                        <input
                            type="text"
                            placeholder="Photo URL"
                            className="input input-bordered w-full"
                            {...register("photo", {
                                required:
                                    "Photo URL is required",
                            })}
                        />

                        {
                            errors.photo && (
                                <p className="text-error text-sm mt-1">
                                    {errors.photo.message}
                                </p>
                            )
                        }

                    </div>

                    {/* Email */}
                    <div>

                        <label className="label font-semibold">
                            Email
                        </label>

                        <input
                            type="email"
                            placeholder="Email Address"
                            className="input input-bordered w-full"
                            {...register("email", {
                                required:
                                    "Email is required",
                            })}
                        />

                        {
                            errors.email && (
                                <p className="text-error text-sm mt-1">
                                    {errors.email.message}
                                </p>
                            )
                        }

                    </div>

                    {/* Password */}
                    <div>

                        <label className="label font-semibold">
                            Password
                        </label>

                        <div className="relative">

                            <input
                                type={
                                    showPassword
                                        ? "text"
                                        : "password"
                                }
                                placeholder="Password"
                                className="input input-bordered w-full"
                                {...register(
                                    "password",
                                    {
                                        required:
                                            "Password is required",

                                        minLength: {
                                            value: 6,

                                            message:
                                                "Password must be at least 6 characters",
                                        },

                                        validate: {

                                            uppercase: (
                                                value
                                            ) =>
                                                /[A-Z]/.test(
                                                    value
                                                ) ||

                                                "Must contain uppercase letter",

                                            lowercase: (
                                                value
                                            ) =>
                                                /[a-z]/.test(
                                                    value
                                                ) ||

                                                "Must contain lowercase letter",
                                        },
                                    }
                                )}
                            />

                            <button
                                type="button"
                                onClick={() =>
                                    setShowPassword(
                                        !showPassword
                                    )
                                }
                                className="absolute top-1/2 right-4 -translate-y-1/2"
                            >

                                {
                                    showPassword
                                        ? <FaEyeSlash />
                                        : <FaEye />
                                }

                            </button>

                        </div>

                        {
                            errors.password && (
                                <p className="text-error text-sm mt-1">
                                    {errors.password.message}
                                </p>
                            )
                        }

                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        className="btn btn-primary w-full"
                    >
                        Register
                    </button>

                </form>

                {/* Divider */}
                <div className="divider my-8">
                    OR
                </div>

                {/* Google */}
                <button
                    onClick={handleGoogleLogin}
                    className="btn btn-outline w-full"
                >

                    <FcGoogle className="text-2xl" />

                    Continue with Google

                </button>

                {/* Login */}
                <p className="text-center mt-8 text-base-content/70">

                    Already have an account?{" "}

                    <Link
                        href="/login"
                        className="text-primary font-semibold"
                    >
                        Login
                    </Link>

                </p>

            </div>
        </div>
    );
};

export default RegisterPage;