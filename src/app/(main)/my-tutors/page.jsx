"use client";

import PrivateRoute from "@/routes/PrivateRoute";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useContext } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import {
    AuthContext,
} from "@/providers/AuthProvider";

const MyTutorsPage = () => {

    useEffect(() => {
        document.title =
            "My Tutors | MediQueue";
    }, []);
    const { user } =
        useContext(AuthContext);

    const [tutors, setTutors] = useState([]);

    // FETCH MY TUTORS
    useEffect(() => {

        if (!user?.email) return;

        const fetchTutors =
            async () => {

                try {

                    const token =
                        localStorage.getItem(
                            "access-token"
                        );

                    const res =
                        await fetch(
                            `${process.env.NEXT_PUBLIC_API_URL}/my-tutors?email=${user.email}`,
                            {
                                headers: {
                                    authorization:
                                        `Bearer ${token}`,
                                },
                            }
                        );

                    // UNAUTHORIZED
                    if (
                        res.status === 401 ||
                        res.status === 403
                    ) {

                        toast.error(
                            "Unauthorized Access"
                        );

                        return;
                    }

                    const data =
                        await res.json();

                    setTutors(data);

                } catch (error) {

                    console.log(error);

                    toast.error(
                        "Failed To Fetch Tutors"
                    );
                }
            };

        fetchTutors();

    }, [user]);

    // DELETE TUTOR
    const handleDeleteTutor = async (id) => {

        const result = await Swal.fire({
            title: "Are you sure?",
            text: "Tutor will be deleted permanently!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#6b7280",
            confirmButtonText: "Yes, Delete",
        });

        if (!result.isConfirmed) return;

        try {

            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/tutors/${id}`,
                {
                    method: "DELETE",
                }
            );

            const data = await res.json();

            if (data.deletedCount > 0) {

                toast.success(
                    "Tutor Deleted Successfully"
                );

                const remainingTutors =
                    tutors.filter(
                        (tutor) =>
                            tutor._id !== id
                    );

                setTutors(remainingTutors);
            }

        } catch (error) {

            console.log(error);

            toast.error(
                "Failed To Delete Tutor"
            );
        }
    };

    return (
        <PrivateRoute>
            <div className="container mx-auto px-4 py-10">

                {/* HEADING */}
                <div className="text-center mb-12">

                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        My Tutors
                    </h1>

                    <p className="text-base-content/70 text-lg">
                        Manage your added tutors easily.
                    </p>

                </div>

                {/* EMPTY STATE */}
                {
                    tutors.length === 0 ? (

                        <div className="bg-base-100 rounded-3xl shadow-xl border border-base-300 p-16 text-center">

                            <h2 className="text-3xl font-bold mb-3">
                                No Tutors Found
                            </h2>

                            <p className="text-base-content/70">
                                Add tutors to manage them here.
                            </p>

                        </div>

                    ) : (

                        <>
                            {/* DESKTOP TABLE */}
                            <div className="hidden lg:block overflow-x-auto rounded-3xl shadow-2xl border border-base-300 bg-base-100">

                                <table className="table table-zebra">

                                    {/* HEAD */}
                                    <thead>

                                        <tr className="text-base">

                                            <th>
                                                Tutor
                                            </th>

                                            <th>
                                                Subject
                                            </th>

                                            <th>
                                                Fee
                                            </th>

                                            <th className="text-right pr-10">
                                                Actions
                                            </th>

                                        </tr>

                                    </thead>

                                    {/* BODY */}
                                    <tbody>

                                        {
                                            tutors.map((tutor) => (

                                                <tr
                                                    key={tutor._id}
                                                    className="hover align-middle"
                                                >

                                                    {/* TUTOR */}
                                                    <td>

                                                        <div className="flex items-center gap-4">

                                                            <div className="avatar">

                                                                <div className="w-16 h-16 rounded-2xl overflow-hidden">

                                                                    <Image
                                                                        src={
                                                                            tutor?.photo &&
                                                                                tutor.photo.startsWith("http")
                                                                                ? tutor.photo
                                                                                : "/avatar.png"
                                                                        }
                                                                        alt={tutor.name}
                                                                        width={70}
                                                                        height={70}
                                                                        className="object-cover w-full h-full"
                                                                    />

                                                                </div>

                                                            </div>

                                                            <div>

                                                                <h2 className="font-bold text-lg">
                                                                    {tutor.name}
                                                                </h2>

                                                                <p className="text-base-content/70 text-sm">
                                                                    {tutor.location}
                                                                </p>

                                                            </div>

                                                        </div>

                                                    </td>

                                                    {/* SUBJECT */}
                                                    <td>

                                                        <div className="badge badge-primary badge-lg">

                                                            {tutor.subject}

                                                        </div>

                                                    </td>

                                                    {/* FEE */}
                                                    <td className="font-semibold">

                                                        {tutor.fee} BDT

                                                    </td>

                                                    {/* ACTIONS */}
                                                    <td>

                                                        <div className="flex items-center justify-end gap-3">

                                                            <Link
                                                                href={`/update-tutor/${tutor._id}`}
                                                                className="btn btn-primary btn-sm"
                                                            >
                                                                Update
                                                            </Link>

                                                            <button
                                                                onClick={() =>
                                                                    handleDeleteTutor(
                                                                        tutor._id
                                                                    )
                                                                }
                                                                className="btn btn-error btn-sm"
                                                            >
                                                                Delete
                                                            </button>

                                                        </div>

                                                    </td>

                                                </tr>
                                            ))
                                        }

                                    </tbody>

                                </table>

                            </div>

                            {/* MOBILE CARDS */}
                            <div className="grid gap-6 lg:hidden">

                                {
                                    tutors.map((tutor) => (

                                        <div
                                            key={tutor._id}
                                            className="bg-base-100 rounded-3xl shadow-xl border border-base-300 p-5"
                                        >

                                            <div className="flex items-center gap-4">

                                                <div className="avatar">

                                                    <div className="w-20 h-20 rounded-2xl overflow-hidden">

                                                        <Image
                                                            src={
                                                                tutor?.photo &&
                                                                    tutor.photo.startsWith("http")
                                                                    ? tutor.photo
                                                                    : "/avatar.png"
                                                            }
                                                            alt={tutor.name}
                                                            width={100}
                                                            height={100}
                                                            className="object-cover w-full h-full"
                                                        />

                                                    </div>

                                                </div>

                                                <div>

                                                    <h2 className="text-xl font-bold">
                                                        {tutor.name}
                                                    </h2>

                                                    <p className="text-base-content/70">
                                                        {tutor.location}
                                                    </p>

                                                </div>

                                            </div>

                                            <div className="mt-5 flex items-center justify-between">

                                                <div className="badge badge-primary badge-lg">
                                                    {tutor.subject}
                                                </div>

                                                <h2 className="font-bold">
                                                    {tutor.fee} BDT
                                                </h2>

                                            </div>

                                            {/* ACTIONS */}
                                            <div className="flex gap-3 mt-6">

                                                <Link
                                                    href={`/update-tutor/${tutor._id}`}
                                                    className="btn btn-primary flex-1"
                                                >
                                                    Update
                                                </Link>

                                                <button
                                                    onClick={() =>
                                                        handleDeleteTutor(
                                                            tutor._id
                                                        )
                                                    }
                                                    className="btn btn-error flex-1"
                                                >
                                                    Delete
                                                </button>

                                            </div>

                                        </div>
                                    ))
                                }

                            </div>
                        </>
                    )
                }

            </div>
        </PrivateRoute>
    );
};

export default MyTutorsPage;