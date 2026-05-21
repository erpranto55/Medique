"use client";

import PrivateRoute from "@/routes/PrivateRoute";

import Image from "next/image";

import {
    useContext,
    useEffect,
    useState,
} from "react";

import {
    AuthContext,
} from "@/providers/AuthProvider";

import {
    updateProfile,
} from "firebase/auth";

import {
    auth,
} from "@/firebase/firebase.config";

import {
    FaEnvelope,
    FaUser,
    FaCamera,
} from "react-icons/fa";

import {
    toast,
    ToastContainer,
} from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

const ProfilePage = () => {

    useEffect(() => {

        document.title =
            "Profile | MediQueue";

    }, []);

    const { user } =
        useContext(AuthContext);

    const [loading, setLoading] =
        useState(false);

    const [isEditing, setIsEditing] =
        useState(false);

    const [formData, setFormData] =
        useState({
            name:
                user?.displayName || "",

            photo:
                user?.photoURL || "",
        });

    // HANDLE CHANGE
    const handleChange = (e) => {

        const {
            name,
            value,
        } = e.target;

        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // UPDATE PROFILE
    const handleUpdateProfile =
        async (e) => {

            e.preventDefault();

            try {

                setLoading(true);

                await updateProfile(
                    auth.currentUser,
                    {
                        displayName:
                            formData.name,

                        photoURL:
                            formData.photo,
                    }
                );

                toast.success(
                    "Profile Updated Successfully"
                );

                setIsEditing(false);

                setTimeout(() => {

                    window.location.reload();

                }, 1500);

            } catch (error) {

                console.log(error);

                toast.error(
                    "Failed To Update Profile"
                );

            } finally {

                setLoading(false);
            }
        };

    return (

        <PrivateRoute>

            <div className="min-h-screen bg-base-200 py-16 px-4">

                <div className="max-w-4xl mx-auto bg-base-100 rounded-3xl shadow-2xl overflow-hidden border border-base-300">

                    {/* COVER */}
                    <div className="h-52 bg-linear-to-r from-primary to-secondary relative">

                        {/* PROFILE IMAGE */}
                        <div className="absolute left-1/2 -bottom-16 transform -translate-x-1/2">

                            <div className="w-36 h-36 rounded-full border-4 border-base-100 overflow-hidden shadow-xl bg-base-100 relative">

                                <Image
                                    src={
                                        formData.photo
                                            ? formData.photo
                                            : "/avatar.png"
                                    }
                                    alt="Profile"
                                    width={150}
                                    height={150}
                                    className="object-cover w-full h-full"
                                />

                                <div className="absolute bottom-2 right-2 bg-primary text-white p-2 rounded-full shadow-lg">

                                    <FaCamera />

                                </div>

                            </div>

                        </div>

                    </div>

                    {/* CONTENT */}
                    <div className="pt-24 pb-12 px-6 md:px-12 text-center">

                        {
                            isEditing ? (

                                <form
                                    onSubmit={handleUpdateProfile}
                                    className="max-w-2xl mx-auto"
                                >

                                    {/* NAME */}
                                    <div className="mb-6 text-left">

                                        <label className="font-semibold block mb-2">

                                            Full Name

                                        </label>

                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            className="input input-bordered w-full"
                                            placeholder="Your Name"
                                            required
                                        />

                                    </div>

                                    {/* PHOTO */}
                                    <div className="mb-6 text-left">

                                        <label className="font-semibold block mb-2">

                                            Photo URL

                                        </label>

                                        <input
                                            type="text"
                                            name="photo"
                                            value={formData.photo}
                                            onChange={handleChange}
                                            className="input input-bordered w-full"
                                            placeholder="Photo URL"
                                            required
                                        />

                                    </div>

                                    {/* BUTTONS */}
                                    <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">

                                        <button
                                            type="submit"
                                            className="btn btn-primary px-8"
                                            disabled={loading}
                                        >

                                            {
                                                loading
                                                    ? "Updating..."
                                                    : "Save Changes"
                                            }

                                        </button>

                                        <button
                                            type="button"
                                            onClick={() =>
                                                setIsEditing(false)
                                            }
                                            className="btn btn-outline px-8"
                                        >

                                            Cancel

                                        </button>

                                    </div>

                                </form>

                            ) : (

                                <>
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

                                        <button
                                            onClick={() =>
                                                setIsEditing(true)
                                            }
                                            className="btn btn-primary px-8"
                                        >

                                            Edit Profile

                                        </button>

                                        <button
                                            onClick={() =>
                                                window.location.href =
                                                "/my-tutors"
                                            }
                                            className="btn btn-outline px-8"
                                        >

                                            View My Tutors

                                        </button>

                                    </div>
                                </>
                            )
                        }

                    </div>

                </div>

                <ToastContainer position="top-center" />

            </div>

        </PrivateRoute>
    );
};

export default ProfilePage;