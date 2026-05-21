"use client";

import Link from "next/link";
import axios from "axios";

import {
    useContext,
    useState,
} from "react";

import {
    useRouter,
    useSearchParams,
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

const LoginPage = () => {

    const {
        signInUser,
        googleLogin,
    } = useContext(AuthContext);

    const router = useRouter();

    const searchParams =
        useSearchParams();

    const from =
        searchParams.get("redirect")
        || "/";

    const [showPassword, setShowPassword] =
        useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    // LOGIN
    const onSubmit = async (data) => {

        try {

            // LOGIN USER
            const result =
                await signInUser(
                    data.email,
                    data.password
                );

            // JWT TOKEN
            const userInfo = {

                email:
                    result.user.email,
            };

            const jwtRes =
                await axios.post(
                    "http://localhost:5000/jwt",
                    userInfo
                );

            localStorage.setItem(
                "access-token",
                jwtRes.data.token
            );

            toast.success(
                "Login Successful"
            );

            setTimeout(() => {

                router.push(from);

            }, 1500);

        } catch (error) {

            console.log(error.message);

            toast.error(
                "Invalid Email or Password"
            );
        }
    };

    // GOOGLE LOGIN
    const handleGoogleLogin =
        async () => {

            try {

                // GOOGLE LOGIN
                const result =
                    await googleLogin();

                // JWT TOKEN
                const userInfo = {

                    email:
                        result.user.email,
                };

                const jwtRes =
                    await axios.post(
                        "http://localhost:5000/jwt",
                        userInfo
                    );

                localStorage.setItem(
                    "access-token",
                    jwtRes.data.token
                );

                toast.success(
                    "Login Successful"
                );

                setTimeout(() => {

                    router.push(from);

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
                        Welcome Back
                    </h1>

                    <p className="text-base-content/70 mt-3">
                        Login to continue using
                        MediQueue.
                    </p>

                </div>

                {/* FORM */}
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-6"
                >

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
                        Login
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

                {/* REGISTER */}
                <p className="text-center mt-8 text-base-content/70">

                    Don&apos;t have an account?{" "}

                    <Link
                        href="/register"
                        className="text-primary font-semibold"
                    >
                        Register
                    </Link>

                </p>

            </div>

            {/* TOAST */}
            <ToastContainer position="top-center" />

        </div>
    );
};

export default LoginPage;