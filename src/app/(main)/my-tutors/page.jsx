"use client";

import PrivateRoute from "@/routes/PrivateRoute";

import Image from "next/image";

import Link from "next/link";

import {
    useEffect,
    useState,
    useContext,
} from "react";

import {
    ToastContainer,
    toast,
} from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

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

    const [tutors, setTutors] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

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

                        setLoading(false);

                        return;
                    }

                    const data =
                        await res.json();

                    setTutors(data);

                    setLoading(false);

                } catch (error) {

                    console.log(error);

                    toast.error(
                        "Failed To Fetch Tutors"
                    );

                    setLoading(false);
                }
            };

        fetchTutors();

    }, [user]);

    // DELETE TUTOR
    const handleDeleteTutor =
        async (id) => {

            const result =
                await Swal.fire({
                    title:
                        "Are you sure?",

                    text:
                        "Tutor will be deleted permanently!",

                    icon:
                        "warning",

                    showCancelButton:
                        true,

                    confirmButtonColor:
                        "#d33",

                    cancelButtonColor:
                        "#6b7280",

                    confirmButtonText:
                        "Yes, Delete",
                });

            if (
                !result.isConfirmed
            )
                return;

            try {

                const token =
                    localStorage.getItem(
                        "access-token"
                    );

                const res =
                    await fetch(
                        `${process.env.NEXT_PUBLIC_API_URL}/tutors/${id}`,
                        {
                            method:
                                "DELETE",

                            headers: {
                                authorization:
                                    `Bearer ${token}`,
                            },
                        }
                    );

                const data =
                    await res.json();

                if (
                    data.deletedCount >
                    0
                ) {

                    toast.success(
                        "Tutor Deleted Successfully"
                    );

                    const remainingTutors =
                        tutors.filter(
                            (
                                tutor
                            ) =>
                                tutor._id !==
                                id
                        );

                    setTutors(
                        remainingTutors
                    );
                }

            } catch (error) {

                console.log(error);

                toast.error(
                    "Failed To Delete Tutor"
                );
            }
        };

    // LOADING
    if (loading) {

        return (

            <div className="min-h-screen flex items-center justify-center">

                <span className="loading loading-spinner loading-lg"></span>

            </div>
        );
    }

    return (

        <PrivateRoute>

            <div className="relative min-h-screen py-10 overflow-hidden">

                <div className="absolute top-20 left-10 w-96 h-96 bg-primary/10 blur-3xl rounded-full" />
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/10 blur-3xl rounded-full" />

                <div className="container mx-auto px-4 relative z-10">

                    {/* HEADING */}
                    <div className="text-center mb-14">

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
                            Tutor Dashboard
                        </div>

                        <h1 className="text-5xl md:text-6xl font-black mb-4">
                            My Tutors
                        </h1>

                        <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
                            Manage, update and organize all your tutor profiles
                            from one beautiful dashboard.
                        </p>

                    </div>
                    {tutors.length > 0 && (
                        <div className="grid md:grid-cols-3 gap-6 mb-10">

                            <div className="bg-base-100 rounded-3xl p-6 shadow-xl border border-base-300/30">
                                <h3 className="text-base-content/60 text-sm">
                                    Total Tutors
                                </h3>

                                <p className="text-4xl font-black mt-2">
                                    {tutors.length}
                                </p>
                            </div>

                            <div className="bg-base-100 rounded-3xl p-6 shadow-xl border border-base-300/30">
                                <h3 className="text-base-content/60 text-sm">
                                    Average Fee
                                </h3>

                                <p className="text-4xl font-black mt-2 text-primary">
                                    ৳
                                    {Math.round(
                                        tutors.reduce(
                                            (sum, tutor) =>
                                                sum +
                                                Number(tutor.fee),
                                            0
                                        ) / tutors.length
                                    )}
                                </p>
                            </div>

                            <div className="bg-base-100 rounded-3xl p-6 shadow-xl border border-base-300/30">
                                <h3 className="text-base-content/60 text-sm">
                                    Available Slots
                                </h3>

                                <p className="text-4xl font-black mt-2 text-success">
                                    {tutors.reduce(
                                        (sum, tutor) =>
                                            sum +
                                            Number(
                                                tutor.totalSlot || 0
                                            ),
                                        0
                                    )}
                                </p>
                            </div>

                        </div>
                    )}

                </div>

                {/* EMPTY STATE */}
                {
                    tutors.length ===
                        0 ? (

                        <div className="
bg-base-100/80
backdrop-blur-xl
rounded-[36px]
shadow-2xl
border
border-base-300/30
p-20
text-center
">

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
                            <div className="
hidden
lg:block
overflow-hidden
rounded-[36px]
shadow-2xl
border
border-base-300/30
bg-base-100/80
backdrop-blur-xl
">

                                <table className="table table-zebra">

                                    {/* HEAD */}
                                    <thead className="bg-base-200">

                                        <tr className="text-base">

                                            <th>Tutor</th>

                                            <th>Subject</th>

                                            <th>Fee</th>

                                            <th className="text-right pr-10">
                                                Actions
                                            </th>

                                        </tr>

                                    </thead>

                                    {/* BODY */}
                                    <tbody>

                                        {
                                            tutors.map(
                                                (
                                                    tutor
                                                ) => (

                                                    <tr
                                                        key={
                                                            tutor._id
                                                        }
                                                        className="hover align-middle"
                                                    >

                                                        {/* TUTOR */}
                                                        <td>

                                                            <div className="flex items-center gap-4">

                                                                <div className="avatar">

                                                                    <div className="w-16 h-16 rounded-2xl overflow-hidden ring-2 ring-primary/20">

                                                                        <Image
                                                                            src={
                                                                                tutor?.photo &&
                                                                                    tutor.photo.startsWith(
                                                                                        "http"
                                                                                    )
                                                                                    ? tutor.photo
                                                                                    : "/avatar.png"
                                                                            }
                                                                            alt={
                                                                                tutor.name
                                                                            }
                                                                            width={
                                                                                70
                                                                            }
                                                                            height={
                                                                                70
                                                                            }
                                                                            className="object-cover w-full h-full"
                                                                        />

                                                                    </div>

                                                                </div>

                                                                <div>

                                                                    <h2 className="font-bold text-lg">

                                                                        {
                                                                            tutor.name
                                                                        }

                                                                    </h2>

                                                                    <p className="text-base-content/70 text-sm">

                                                                        {
                                                                            tutor.location
                                                                        }

                                                                    </p>

                                                                </div>

                                                            </div>

                                                        </td>

                                                        {/* SUBJECT */}
                                                        <td>

                                                            <div className="badge badge-primary badge-lg">

                                                                {
                                                                    tutor.subject
                                                                }

                                                            </div>

                                                        </td>

                                                        {/* FEE */}
                                                        <td className="font-semibold">

                                                            {
                                                                tutor.fee
                                                            }{" "}

                                                            BDT

                                                        </td>

                                                        {/* ACTIONS */}
                                                        <td>

                                                            <div className="flex items-center justify-end gap-3">

                                                                <Link
                                                                    href={`/update-tutor/${tutor._id}`}
                                                                    className="
btn
btn-primary
btn-sm
rounded-xl
px-5
shadow-md
"
                                                                >

                                                                    Update

                                                                </Link>

                                                                <button
                                                                    onClick={() =>
                                                                        handleDeleteTutor(
                                                                            tutor._id
                                                                        )
                                                                    }
                                                                    className="
btn
btn-error
btn-sm
rounded-xl
px-5
shadow-md
"
                                                                >

                                                                    Delete

                                                                </button>

                                                            </div>

                                                        </td>

                                                    </tr>
                                                )
                                            )
                                        }

                                    </tbody>

                                </table>

                            </div>

                            {/* MOBILE CARDS */}
                            <div className="grid gap-6 lg:hidden">

                                {
                                    tutors.map(
                                        (
                                            tutor
                                        ) => (

                                            <div
                                                key={
                                                    tutor._id
                                                }
                                                className="
bg-base-100/80
backdrop-blur-xl
rounded-[30px]
shadow-xl
border
border-base-300/30
p-6
hover:shadow-2xl
transition-all
duration-300
"
                                            >

                                                <div className="flex items-center gap-4">

                                                    <div className="avatar">

                                                        <div className="w-20 h-20 rounded-2xl overflow-hidden">

                                                            <Image
                                                                src={
                                                                    tutor?.photo &&
                                                                        tutor.photo.startsWith(
                                                                            "http"
                                                                        )
                                                                        ? tutor.photo
                                                                        : "/avatar.png"
                                                                }
                                                                alt={
                                                                    tutor.name
                                                                }
                                                                width={
                                                                    100
                                                                }
                                                                height={
                                                                    100
                                                                }
                                                                className="object-cover w-full h-full"
                                                            />

                                                        </div>

                                                    </div>

                                                    <div>

                                                        <h2 className="text-xl font-bold">

                                                            {
                                                                tutor.name
                                                            }

                                                        </h2>

                                                        <p className="text-base-content/70">

                                                            {
                                                                tutor.location
                                                            }

                                                        </p>

                                                    </div>

                                                </div>

                                                <div className="mt-5 flex items-center justify-between">

                                                    <div className="badge badge-primary badge-lg">

                                                        {
                                                            tutor.subject
                                                        }

                                                    </div>

                                                    <h2 className="font-bold">

                                                        {
                                                            tutor.fee
                                                        }{" "}

                                                        BDT

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
                                        )
                                    )
                                }

                            </div>
                        </>
                    )
                }

                <ToastContainer position="top-center" />

            </div>

        </PrivateRoute >
    );
};

export default MyTutorsPage;