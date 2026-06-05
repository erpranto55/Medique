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
                    `${process.env.NEXT_PUBLIC_API_URL}/jwt`,
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
    const handleGoogleLogin = async () => {
        try {

            // GOOGLE LOGIN
            const result = await googleLogin();

            // SAVE USER TO DATABASE
            await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}/users`,
                {
                    name: result.user.displayName,
                    email: result.user.email,
                    photo: result.user.photoURL,
                    createdAt: new Date(),
                }
            );

            // JWT TOKEN
            const userInfo = {
                email: result.user.email,
            };

            const jwtRes = await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}/jwt`,
                userInfo
            );

            localStorage.setItem(
                "access-token",
                jwtRes.data.token
            );

            toast.success("Login Successful");

            setTimeout(() => {
                router.push(from);
            }, 1500);

        } catch (error) {

            console.log(error.message);

            toast.error(error.message);
        }
    };

    return (
        <div className="relative min-h-screen flex items-center justify-center px-4 py-16 overflow-hidden">

            <div className="absolute top-20 left-10 w-96 h-96 bg-primary/10 blur-3xl rounded-full" />
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/10 blur-3xl rounded-full" />

            <div
                className="
                    relative
                    z-10
                    w-full
                    max-w-xl
                    bg-base-100/80
                    backdrop-blur-xl
                    shadow-2xl
                    rounded-[36px]
                    p-8
                    md:p-12
                    border
                    border-base-300/30
                "
            >

                {/* HEADING */}
                <div className="text-center mb-10">

                    <div
                        className="
                            inline-flex
                            items-center
                            px-5
                            py-2
                            rounded-full
                            bg-primary/10
                            text-primary
                            font-semibold
                            mb-5
                        "
                    >
                        Welcome Back
                    </div>

                    <h1 className="text-5xl font-black mb-3">
                        Login
                    </h1>

                    <p className="text-base-content/70 text-lg">
                        Sign in to continue your learning journey.
                    </p>

                </div>

                <div className="flex flex-wrap justify-center gap-3 mb-8">

                    <div className="badge badge-primary badge-lg">
                        Secure Login
                    </div>

                    <div className="badge badge-secondary badge-lg">
                        Fast Access
                    </div>

                    <div className="badge badge-accent badge-lg">
                        Tutor Dashboard
                    </div>

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
                            className="
                                input
                                input-bordered
                                w-full
                                h-14
                                rounded-2xl
                                border-base-300/40
                                focus:border-primary
                            "
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
                                className="
                                    input
                                    input-bordered
                                    w-full
                                    h-14
                                    rounded-2xl
                                    border-base-300/40
                                    focus:border-primary
                                "
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
                                className="
                                    absolute
                                    top-1/2
                                    right-4
                                    -transform-y-1/2
                                    text-base-content/60
                                    hover:text-primary
                                    transition-colors
                                "
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

                        {/* FORGOT PASSWORD */}
                        <div className="text-right mt-2">

                            <Link
                                href="#"
                                className="text-primary text-sm hover:underline"
                            >

                                Forgot Password?

                            </Link>

                        </div>

                    </div>

                    {/* SUBMIT */}
                    <button
                        type="submit"
                        className="
                            btn
                            w-full
                            h-14
                            rounded-2xl
                            border-0
                            bg-linear-to-r
                            from-primary
                            to-secondary
                            text-white
                            font-semibold
                            shadow-lg
                            hover:shadow-xl
                            hover:scale-[1.01]
                            transition-all
                            duration-300
                        "
                    >
                        Login
                    </button>

                </form>

                {/* DIVIDER */}
                <div className="divider text-base-content/50 my-8">
                    OR
                </div>

                {/* GOOGLE */}
                <button
                    onClick={handleGoogleLogin}
                    className="
                        btn
                        btn-outline
                        w-full
                        h-14
                        rounded-2xl
                        hover:border-primary
                        hover:text-primary
                        transition-all
                    "
                >

                    <FcGoogle className="text-2xl" />

                    Continue with Google

                </button>

                {/* REGISTER */}
                <p className="text-center mt-8 text-base-content/70 text-base">

                    Don&apos;t have an account?{" "}

                    <Link
                        href="/register"
                        className="
                            text-primary
                            font-semibold
                            hover:underline
                        "
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