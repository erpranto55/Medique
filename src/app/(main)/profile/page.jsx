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

            // // UPDATE LOCAL USER STATE
            // setUser({
            //     ...user,
            //     displayName: name,
            //     photoURL: photo,
            // });

            // GET JWT TOKEN
            const token = localStorage.getItem("access-token");

            if (!token) {

                alert("No token found. Please login again.");
                return;

            }

            // UPDATE DATABASE
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/users/${user.email}`,
                {
                    method: "PUT",
                    headers: {
                        "content-type": "application/json",
                        authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        name,
                        photoURL: photo,
                        email: user.email,
                    }),
                }
            );

            const data = await response.json();

            console.log(data);

            if (response.ok && data.success) {

                alert("Profile Updated Successfully");

                document
                    .getElementById("edit_modal")
                    .close();

            } else {

                alert(data.message || "Update failed");

            }

        } catch (error) {

            console.log(error);

            alert("Something went wrong");

        }

    };

    return (

        <PrivateRoute>

            <div className="min-h-screen bg-base-200 py-16 px-4">

                <div className="max-w-4xl mx-auto bg-base-100 rounded-3xl shadow-2xl overflow-hidden border border-base-300">

                    {/* COVER */}
                    <div className="h-52 bg-gradient-to-r from-primary to-secondary relative">

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

                        <h1 className="text-4xl font-bold mb-3">

                            {
                                user?.displayName ||
                                "User Name"
                            }

                        </h1>

                        <p className="text-base-content/70 text-lg mb-8">

                            Welcome to your MediQueue profile dashboard.

                        </p>

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

                                        {user?.email}

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
                                    document.getElementById("edit_modal").showModal()
                                }
                                className="btn btn-primary px-8"
                            >
                                Edit Profile
                            </button>

                            <Link
                                href={"/my-tutors"}
                                className="btn btn-outline px-8"
                            >
                                View My Tutors
                            </Link>

                        </div>

                    </div>

                </div>

            </div>

            {/* MODAL */}
            <dialog id="edit_modal" className="modal">

                <div className="modal-box">

                    <h3 className="font-bold text-2xl mb-6">

                        Edit Profile

                    </h3>

                    <form
                        onSubmit={handleUpdateProfile}
                        className="space-y-4"
                    >

                        <input
                            type="text"
                            placeholder="Your Name"
                            className="input input-bordered w-full"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />

                        <input
                            type="text"
                            placeholder="Photo URL"
                            className="input input-bordered w-full"
                            value={photo}
                            onChange={(e) => setPhoto(e.target.value)}
                            required
                        />

                        <div className="flex justify-end gap-3 pt-4">

                            <button
                                type="button"
                                className="btn"
                                onClick={() =>
                                    document.getElementById("edit_modal").close()
                                }
                            >
                                Cancel
                            </button>

                            <button
                                type="submit"
                                className="btn btn-primary"
                            >
                                Save Changes
                            </button>

                        </div>

                    </form>

                </div>

            </dialog>

        </PrivateRoute>

    );
};

export default ProfilePage;