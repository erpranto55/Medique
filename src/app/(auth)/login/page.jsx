"use client";

import Link from "next/link";

import {
    useContext,
    useState,
} from "react";

import {
    AuthContext,
} from "@/providers/AuthProvider";

import {
    toast,
    ToastContainer,
} from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import {
    useRouter,
    useSearchParams,
} from "next/navigation";

const LoginPage = () => {

    const {
        signInUser,
        googleLogin,
    } = useContext(AuthContext);

    const router = useRouter();

    const searchParams =
        useSearchParams();

    const redirect =
        searchParams.get("redirect") || "/";

    const [error, setError] =
        useState("");

    // LOGIN
    const handleLogin = async (e) => {

        e.preventDefault();

        setError("");

        const form = e.target;

        const email =
            form.email.value;

        const password =
            form.password.value;

        try {

            await signInUser(
                email,
                password
            );

            toast.success(
                "Login Successful"
            );

            setTimeout(() => {

                router.push(redirect);

            }, 1500);

        } catch (error) {

            console.log(error);

            setError(
                "Invalid Email or Password"
            );

            toast.error(
                "Login Failed"
            );
        }
    };

    // GOOGLE LOGIN
    const handleGoogleLogin =
        async () => {

            try {

                await googleLogin();

                toast.success(
                    "Login Successful"
                );

                setTimeout(() => {

                    router.push("/");

                }, 1500);

            } catch (error) {

                console.log(error);

                toast.error(
                    "Google Login Failed"
                );
            }
        };

    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-10">

            <div className="w-full max-w-md bg-base-100 shadow-2xl rounded-3xl border border-base-300 p-8">

                {/* HEADING */}
                <div className="text-center mb-8">

                    <h1 className="text-4xl font-bold">
                        Welcome Back
                    </h1>

                    <p className="text-base-content/70 mt-3">
                        Login to continue.
                    </p>

                </div>

                {/* FORM */}
                <form
                    onSubmit={handleLogin}
                    className="space-y-5"
                >

                    {/* EMAIL */}
                    <div>

                        <label className="label">
                            Email
                        </label>

                        <input
                            type="email"
                            name="email"
                            required
                            placeholder="Enter email"
                            className="input input-bordered w-full"
                        />

                    </div>

                    {/* PASSWORD */}
                    <div>

                        <label className="label">
                            Password
                        </label>

                        <input
                            type="password"
                            name="password"
                            required
                            placeholder="Enter password"
                            className="input input-bordered w-full"
                        />

                    </div>

                    {/* ERROR */}
                    {
                        error && (

                            <p className="text-error text-sm">
                                {error}
                            </p>
                        )
                    }

                    {/* BUTTON */}
                    <button className="btn btn-primary w-full">

                        Login

                    </button>

                </form>

                {/* DIVIDER */}
                <div className="divider">
                    OR
                </div>

                {/* GOOGLE LOGIN */}
                <button
                    onClick={
                        handleGoogleLogin
                    }
                    className="btn btn-outline w-full"
                >
                    Continue With Google
                </button>

                {/* REGISTER */}
                <p className="text-center mt-6 text-base-content/70">

                    Don&apos;t have an account?{" "}

                    <Link
                        href="/register"
                        className="text-primary font-semibold"
                    >
                        Register
                    </Link>

                </p>

            </div>

            <ToastContainer position="top-center" />

        </div>
    );
};

export default LoginPage;