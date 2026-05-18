"use client";

import React, { useState } from "react";

import {
    Button,
    FieldError,
    Form,
    Input,
    InputGroup,
    Label,
    TextField,
} from "@heroui/react";

import Link from "next/link";

import { useForm } from "react-hook-form";

import {
    FaEye,
    FaEyeSlash,
} from "react-icons/fa";

import { FcGoogle } from "react-icons/fc";

import {
    ToastContainer,
    toast,
} from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import { useRouter } from "next/navigation";

const LoginPage = () => {

    const router = useRouter();

    const {
        register,
        handleSubmit,
    } = useForm();

    const [isShowPassword, setIsShowPassword] =
        useState(false);

    // LOGIN
    const handleLogInFunc = async (data) => {

        console.log(data);

        toast.success("Login successful!");

        setTimeout(() => {
            router.push("/");
        }, 1500);
    };

    // GOOGLE LOGIN
    const handleGoogleLogin = () => {

        toast.success(
            "Google Login Clicked"
        );
    };

    return (
        <div className="container mx-auto min-h-screen flex items-center justify-center px-4 py-16">

            <div className="w-full max-w-lg bg-base-100 p-8 rounded-3xl shadow-2xl border border-base-300">

                {/* Heading */}
                <div className="text-center mb-8">

                    <h2 className="text-4xl font-bold text-base-content">
                        Login Your Account
                    </h2>

                    <p className="text-base-content/70 mt-3">
                        Welcome back to MediQueue
                    </p>

                </div>

                <hr className="border-base-300 mb-8" />

                {/* Form */}
                <Form
                    className="flex flex-col gap-5"
                    onSubmit={handleSubmit(handleLogInFunc)}
                >

                    {/* Email */}
                    <TextField
                        isRequired
                        name="email"
                        type="email"
                    >

                        <Label>
                            Email Address
                        </Label>

                        <Input
                            placeholder="Enter your email"
                            className="mt-1 w-full"
                            {...register("email")}
                        />

                        <FieldError />

                    </TextField>

                    {/* Password */}
                    <TextField
                        isRequired
                        name="password"
                        type={
                            isShowPassword
                                ? "text"
                                : "password"
                        }
                    >

                        <Label>
                            Password
                        </Label>

                        <InputGroup>

                            <InputGroup.Input
                                className="w-full"
                                placeholder="Enter your password"
                                type={
                                    isShowPassword
                                        ? "text"
                                        : "password"
                                }
                                {...register("password")}
                            />

                            <InputGroup.Suffix>

                                <Button
                                    isIconOnly
                                    size="sm"
                                    variant="light"
                                    onPress={() =>
                                        setIsShowPassword(
                                            !isShowPassword
                                        )
                                    }
                                >

                                    {
                                        isShowPassword
                                            ? (
                                                <FaEye className="size-4" />
                                            ) : (
                                                <FaEyeSlash className="size-4" />
                                            )
                                    }

                                </Button>

                            </InputGroup.Suffix>

                        </InputGroup>

                        <FieldError />

                    </TextField>

                    {/* Forgot Password */}
                    <div className="w-full text-right">

                        <button
                            type="button"
                            className="text-sm text-primary hover:underline"
                        >
                            Forgot Password?
                        </button>

                    </div>

                    {/* Login Button */}
                    <Button
                        type="submit"
                        className="w-full btn btn-primary text-white"
                    >
                        Login
                    </Button>

                </Form>

                {/* Divider */}
                <div className="divider my-8">
                    OR
                </div>

                {/* Google */}
                <Button
                    onPress={handleGoogleLogin}
                    className="w-full"
                    variant="bordered"
                >

                    <FcGoogle className="text-xl" />

                    Continue with Google

                </Button>

                {/* Register */}
                <div className="flex gap-2 items-center justify-center mt-8 text-sm">

                    <p className="text-base-content/70">
                        Don&apos;t have an account?
                    </p>

                    <Link
                        href="/register"
                        className="text-primary font-semibold hover:underline"
                    >
                        Register
                    </Link>

                </div>
            </div>

            {/* Toast */}
            <ToastContainer
                position="top-center"
            />
        </div>
    );
};

export default LoginPage;