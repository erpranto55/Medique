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
    ToastContainer,
    toast,
} from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import { useRouter } from "next/navigation";

import {
    FaEye,
    FaEyeSlash,
} from "react-icons/fa";

import { FcGoogle } from "react-icons/fc";

const RegisterPage = () => {

    const [isShowPassword, setIsShowPassword] =
        useState(false);

    const {
        register,
        handleSubmit,
    } = useForm();

    const router = useRouter();

    // REGISTER
    const handleRegisterFunc = async (data) => {

        console.log(data);

        toast.success(
            "Registration successful!"
        );

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
                        Register Your Account
                    </h2>

                    <p className="text-base-content/70 mt-3">
                        Create your MediQueue account
                    </p>

                </div>

                <hr className="border-base-300 mb-8" />

                {/* Form */}
                <Form
                    className="flex flex-col gap-5"
                    onSubmit={handleSubmit(handleRegisterFunc)}
                >

                    {/* Name */}
                    <TextField isRequired>

                        <Label>
                            Name
                        </Label>

                        <Input
                            placeholder="Your Name"
                            className="mt-1 w-full"
                            {...register("name")}
                        />

                        <FieldError />

                    </TextField>

                    {/* Photo URL */}
                    <TextField isRequired>

                        <Label>
                            Photo URL
                        </Label>

                        <Input
                            placeholder="Photo URL"
                            className="mt-1 w-full"
                            {...register("photoURL")}
                        />

                        <FieldError />

                    </TextField>

                    {/* Email */}
                    <TextField
                        isRequired
                        type="email"
                    >

                        <Label>
                            Email Address
                        </Label>

                        <Input
                            placeholder="Your Email"
                            className="mt-1 w-full"
                            {...register("email")}
                        />

                        <FieldError />

                    </TextField>

                    {/* Password */}
                    <TextField
                        isRequired
                        type={
                            isShowPassword
                                ? "text"
                                : "password"
                        }
                        validate={(value) => {

                            if (value.length < 6) {
                                return "Password must be at least 6 characters";
                            }

                            if (!/[A-Z]/.test(value)) {
                                return "Must contain uppercase letter";
                            }

                            if (!/[a-z]/.test(value)) {
                                return "Must contain lowercase letter";
                            }

                            return null;
                        }}
                    >

                        <Label>
                            Password
                        </Label>

                        <InputGroup>

                            <InputGroup.Input
                                className="w-full"
                                placeholder="Your Password"
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

                    {/* Register Button */}
                    <Button
                        type="submit"
                        className="w-full btn btn-primary text-white"
                    >
                        Register
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

                {/* Login */}
                <div className="flex gap-2 items-center justify-center mt-8 text-sm">

                    <p className="text-base-content/70">
                        Already Have An Account?
                    </p>

                    <Link
                        href="/login"
                        className="text-primary font-semibold hover:underline"
                    >
                        Login
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

export default RegisterPage;    