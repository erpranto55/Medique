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
    ToastContainer,
    toast,
} from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

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

            // SAVE USER TO DATABASE
            const userData = {

                name: data.name,

                email: data.email,

                photo: data.photo,

                role: "student",

                createdAt: new Date(),
            };

            await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/users`,
                {
                    method: "POST",

                    headers: {
                        "content-type":
                            "application/json",
                    },

                    body: JSON.stringify(
                        userData
                    ),
                }
            );

            console.log(result.user);

            toast.success(
                "Registration Successful"
            );

            setTimeout(() => {

                router.push("/");

            }, 1500);

        } catch (error) {

            console.log(error.message);

            toast.error(
                error.message
            );
        }
    };

    // GOOGLE LOGIN
    const handleGoogleLogin =
        async () => {

            try {

                const result =
                    await googleLogin();

                const user =
                    result.user;

                // SAVE GOOGLE USER
                const userData = {

                    name:
                        user.displayName,

                    email:
                        user.email,

                    photo:
                        user.photoURL,

                    role: "student",

                    createdAt:
                        new Date(),
                };

                await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/users`,
                    {
                        method: "POST",

                        headers: {
                            "content-type":
                                "application/json",
                        },

                        body: JSON.stringify(
                            userData
                        ),
                    }
                );

                toast.success(
                    "Login Successful"
                );

                setTimeout(() => {

                    router.push("/");

                }, 1500);

            } catch (error) {

                console.log(error.message);

                toast.error(
                    error.message
                );
            }
        };

    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-16">

            <div className="w-full max-w-xl bg-base-100 shadow-2xl rounded-3xl p-8 md:p-12 border border-base-300">

                {/* HEADING */}
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

                    {/* NAME */}
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

                    {/* PHOTO */}
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

                    {/* EMAIL */}
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

                    {/* PASSWORD */}
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

                    {/* SUBMIT */}
                    <button
                        type="submit"
                        className="btn btn-primary w-full"
                    >
                        Register
                    </button>

                </form>

                {/* DIVIDER */}
                <div className="divider my-8">
                    OR
                </div>

                {/* GOOGLE */}
                <button
                    onClick={handleGoogleLogin}
                    className="btn btn-outline w-full"
                >

                    <FcGoogle className="text-2xl" />

                    Continue with Google

                </button>

                {/* LOGIN */}
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

            {/* TOAST */}
            <ToastContainer position="top-center" />

        </div>
    );
};

export default RegisterPage;