"use client";

import PrivateRoute from "@/routes/PrivateRoute";

import Image from "next/image";

import {
    useContext,
    useEffect,
} from "react";

import {
    AuthContext,
} from "@/providers/AuthProvider";

import {
    FaEnvelope,
    FaUser,
} from "react-icons/fa";
import Link from "next/link";

const ProfilePage = () => {

    useEffect(() => {

        document.title =
            "Profile | MediQueue";

    }, []);

    const { user } =
        useContext(AuthContext);

    return (

        <PrivateRoute>

            <div className="min-h-screen bg-base-200 py-16 px-4">

                <div className="max-w-4xl mx-auto bg-base-100 rounded-3xl shadow-2xl overflow-hidden border border-base-300">

                    {/* COVER */}
                    <div className="h-52 bg-linear-to-r from-primary to-secondary relative">

                        {/* PROFILE IMAGE */}
                        <div className="absolute left-1/2 -bottom-16 transform -translate-x-1/2">

                            <div className="w-36 h-36 rounded-full border-4 border-base-100 overflow-hidden shadow-xl bg-base-100">

                                <Image
                                    src={
                                        user?.photoURL
                                            ? user.photoURL
                                            : "/avatar.png"
                                    }
                                    alt="Profile"
                                    width={150}
                                    height={150}
                                    className="object-cover w-full h-full"
                                />

                            </div>

                        </div>

                    </div>

                    {/* CONTENT */}
                    <div className="pt-24 pb-12 px-6 md:px-12 text-center">

                        {/* NAME */}
                        <h1 className="text-4xl font-bold mb-3">

                            {
                                user?.displayName ||
                                "User Name"
                            }

                        </h1>

                        <p className="text-base-content/70 text-lg mb-8">

                            Welcome to your MediQueue profile dashboard.

                        </p>

                        {/* INFO CARDS */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                            {/* EMAIL */}
                            <div className="bg-base-200 rounded-2xl p-6 flex items-center gap-4 shadow-md">

                                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary text-2xl">

                                    <FaEnvelope />

                                </div>

                                <div className="text-left">

                                    <h2 className="font-bold text-lg">

                                        Email Address

                                    </h2>

                                    <p className="text-base-content/70 break-all">

                                        {
                                            user?.email
                                        }

                                    </p>

                                </div>

                            </div>

                            {/* USER */}
                            <div className="bg-base-200 rounded-2xl p-6 flex items-center gap-4 shadow-md">

                                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary text-2xl">

                                    <FaUser />

                                </div>

                                <div className="text-left">

                                    <h2 className="font-bold text-lg">

                                        Display Name

                                    </h2>

                                    <p className="text-base-content/70">

                                        {
                                            user?.displayName ||
                                            "No Name"
                                        }

                                    </p>

                                </div>

                            </div>

                        </div>

                        {/* BUTTONS */}
                        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">

                            <button className="btn btn-primary px-8">

                                Edit Profile

                            </button>

                            <button className="btn btn-outline px-8">

                                <Link href={'/my-tutors'}>
                                    View My Tutors
                                </Link>

                            </button>

                        </div>

                    </div>

                </div>

            </div>

        </PrivateRoute>
    );
};

export default ProfilePage;