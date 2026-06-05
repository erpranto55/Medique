"use client";

import PrivateRoute from "@/routes/PrivateRoute";
import Image from "next/image";
import Link from "next/link";

import {
    useContext,
    useEffect,
    useState,
} from "react";

import {
    AuthContext,
} from "@/providers/AuthProvider";

import {
    FaEnvelope,
    FaUser,
} from "react-icons/fa";

import {
    updateProfile,
} from "firebase/auth";

import { auth } from "@/firebase/firebase.config";

import {
    ToastContainer,
    toast,
} from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

const ProfilePage = () => {

    const { user } = useContext(AuthContext);

    const [name, setName] = useState("");
    const [photo, setPhoto] = useState("");

    useEffect(() => {

        document.title = "Profile | MediQueue";

        if (user) {

            // eslint-disable-next-line react-hooks/set-state-in-effect
            setName(user?.displayName || "");
            setPhoto(user?.photoURL || "");

        }

    }, [user]);

    const handleUpdateProfile = async (e) => {

        e.preventDefault();

        try {

            // UPDATE FIREBASE USER
            await updateProfile(auth.currentUser, {
                displayName: name,
                photoURL: photo,
            });

            // GET JWT TOKEN
            const token =
                localStorage.getItem("access-token");

            if (!token) {

                toast.error(
                    "Please login again"
                );

                return;
            }

            // UPDATE DATABASE
            const response =
                await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/users/${user.email}`,
                    {
                        method: "PUT",

                        headers: {
                            "content-type":
                                "application/json",

                            authorization:
                                `Bearer ${token}`,
                        },

                        body: JSON.stringify({
                            name,
                            photoURL: photo,
                            email: user.email,
                        }),
                    }
                );

            const data =
                await response.json();

            console.log(data);

            if (
                response.ok &&
                data.success
            ) {

                toast.success(
                    "Profile Updated Successfully"
                );

                document
                    .getElementById("edit_modal")
                    .close();

                setTimeout(() => {

                    window.location.reload();

                }, 1200);

            } else {

                toast.error(
                    data.message ||
                    "Update failed"
                );

            }

        } catch (error) {

            console.log(error);

            toast.error(
                "Something went wrong"
            );

        }

    };

    return (

        <PrivateRoute>

            <div className="relative min-h-screen py-16 px-4 overflow-hidden">

                <div className="absolute top-20 left-10 w-96 h-96 bg-primary/10 blur-3xl rounded-full" />

                <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/10 blur-3xl rounded-full" />

                <div
                    className="
                        max-w-5xl
                        mx-auto
                        bg-base-100/80
                        backdrop-blur-xl
                        rounded-[36px]
                        shadow-2xl
                        overflow-hidden
                        border
                        border-base-300/30
                    "
                >

                    {/* COVER */}
                    <div
                        className="
                            h-64
                            bg-linear-to-r
                            from-primary
                            via-secondary
                            to-primary
                            relative
                        "
                    >

                        {/* PROFILE IMAGE */}
                        <div className="absolute left-1/2 -bottom-16 transform -translate-x-1/2">

                            <div
                                className="
                                    w-40
                                    h-40
                                    rounded-full
                                    border-[6px]
                                    border-base-100
                                    overflow-hidden
                                    shadow-2xl
                                    bg-base-100
                                    ring-4
                                    ring-primary/20
                                "
                            >

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

                        <p className="text-base-content/70 text-lg mb-10 max-w-xl mx-auto">

                            Welcome to your MediQueue profile dashboard.

                        </p>
                        <div className="grid md:grid-cols-3 gap-5 mb-10">

                            <div className="bg-base-200/60 rounded-2xl p-5">
                                <h3 className="text-sm text-base-content/60">
                                    Account Status
                                </h3>

                                <p className="text-2xl font-bold text-success mt-2">
                                    Active
                                </p>
                            </div>

                            <div className="bg-base-200/60 rounded-2xl p-5">
                                <h3 className="text-sm text-base-content/60">
                                    Profile Completion
                                </h3>

                                <p className="text-2xl font-bold mt-2">
                                    100%
                                </p>
                            </div>

                            <div className="bg-base-200/60 rounded-2xl p-5">
                                <h3 className="text-sm text-base-content/60">
                                    Account Type
                                </h3>

                                <p className="text-2xl font-bold mt-2">
                                    User
                                </p>
                            </div>

                        </div>

                        {/* INFO CARDS */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                            {/* EMAIL */}
                            <div className="
                                    bg-base-200/60
                                    rounded-3xl
                                    p-6
                                    flex
                                    items-center
                                    gap-4
                                    shadow-lg
                                    border
                                    border-base-300/20
                                    ">

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
                            <div className="
                                    bg-base-200/60
                                    rounded-3xl
                                    p-6
                                    flex
                                    items-center
                                    gap-4
                                    shadow-lg
                                    border
                                    border-base-300/20
                                    ">

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

                            <button
                                onClick={() =>
                                    document
                                        .getElementById("edit_modal")
                                        .showModal()
                                }

                                className="
                                    btn
                                    border-0
                                    px-8
                                    rounded-2xl
                                    bg-linear-to-r
                                    from-primary
                                    to-secondary
                                    text-white
                                    shadow-lg
                                    "
                            >

                                Edit Profile

                            </button>

                            <Link
                                href={"/my-tutors"}

                                className="
                                    btn
                                    btn-outline
                                    rounded-2xl
                                    px-8
                                    "
                            >

                                View My Tutors

                            </Link>

                        </div>

                    </div>

                </div>

            </div>

            {/* MODAL */}
            <dialog
                id="edit_modal"
                className="modal"
            >

                <div className="
                        modal-box
                        max-w-xl
                        rounded-[32px]
                        bg-base-100
                        shadow-2xl
                        ">

                    <h3 className="font-bold text-3xl mb-2">

                        Edit Profile

                    </h3>

                    <p className="text-base-content/60 mb-6">

                        Update your personal information

                    </p>

                    <form
                        onSubmit={handleUpdateProfile}

                        className="space-y-5"
                    >

                        {/* NAME */}
                        <div>

                            <label className="label font-semibold">

                                Full Name

                            </label>

                            <input
                                type="text"

                                placeholder="Enter your full name"

                                className="
                                    input
                                    input-bordered
                                    w-full
                                    rounded-2xl
                                    "

                                value={name}

                                onChange={(e) =>
                                    setName(e.target.value)
                                }

                                required
                            />

                        </div>

                        {/* PHOTO URL */}
                        <div>

                            <label className="label font-semibold">

                                Profile Image URL

                            </label>

                            <input
                                type="text"

                                placeholder="Paste your image URL"

                                className="
                                    input
                                    input-bordered
                                    w-full
                                    rounded-2xl
                                    "

                                value={photo}

                                onChange={(e) =>
                                    setPhoto(e.target.value)
                                }

                                required
                            />

                        </div>

                        {/* BUTTONS */}
                        <div className="flex justify-end gap-3 pt-4">

                            <button
                                type="button"

                                className="btn btn-outline"

                                onClick={() =>
                                    document
                                        .getElementById("edit_modal")
                                        .close()
                                }
                            >

                                Cancel

                            </button>

                            <button
                                type="submit"

                                className="
                                    btn
                                    border-0
                                    rounded-xl
                                    bg-linear-to-r
                                    from-primary
                                    to-secondary
                                    text-white
                                    "
                            >

                                Save Changes

                            </button>

                        </div>

                    </form>

                </div>

            </dialog>

            {/* TOAST */}
            <ToastContainer position="top-center" />

        </PrivateRoute>

    );
};

export default ProfilePage;