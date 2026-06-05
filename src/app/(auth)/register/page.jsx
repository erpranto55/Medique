"use client";

import Link from "next/link";
import axios from "axios";

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

            // USER DATA
            const userData = {

                name: data.name,

                email: data.email,

                photo: data.photo,

                role: "student",

                createdAt: new Date(),
            };

            // SAVE USER TO DATABASE
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

            // JWT TOKEN
            const jwtRes = await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}/jwt`,
                {
                    email: data.email,
                }
            );

            // SAVE TOKEN
            localStorage.setItem(
                "access-token",
                jwtRes.data.token
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

                // USER DATA
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

                // SAVE USER TO DATABASE
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

                // JWT TOKEN
                const jwtRes = await axios.post(
                    `${process.env.NEXT_PUBLIC_API_URL}/jwt`,
                    {
                        email: user.email,
                    }
                );

                // SAVE TOKEN
                localStorage.setItem(
                    "access-token",
                    jwtRes.data.token
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
                            gap-2
                            px-5
                            py-2
                            rounded-full
                            bg-primary/10
                            text-primary
                            font-semibold
                            mb-5
                        "
                    >
                        Join MediQueue
                    </div>

                    <h1 className="text-5xl font-black mb-3">
                        Create Account
                    </h1>

                    <p className="text-base-content/70 text-lg">
                        Register and start your tutoring journey today.
                    </p>

                </div>

                <div className="flex flex-wrap justify-center gap-3 mb-8">

                    <div className="badge badge-primary badge-lg">
                        Secure Account
                    </div>

                    <div className="badge badge-secondary badge-lg">
                        Free Registration
                    </div>

                    <div className="badge badge-accent badge-lg">
                        Start Learning
                    </div>

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
                            className="
                                input
                                input-bordered
                                w-full
                                h-14
                                rounded-2xl
                                border-base-300/40
                                focus:border-primary
                            "
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
                            className="
                                input
                                input-bordered
                                w-full
                                h-14
                                rounded-2xl
                                border-base-300/40
                                focus:border-primary
                            "
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
                                className="
                                    absolute
                                    top-1/2
                                    right-4
                                    -translate-y-1/2
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
                        Register
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

                {/* LOGIN */}
                <p className="text-center mt-8 text-base-content/70 text-base">

                    Already have an account?{" "}

                    <Link
                        href="/login"
                        className="
                            text-primary
                            font-semibold
                            hover:underline
                        "
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