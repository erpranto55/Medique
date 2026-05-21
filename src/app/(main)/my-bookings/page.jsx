"use client";

import PrivateRoute from "@/routes/PrivateRoute";

import {
    useContext,
    useEffect,
    useState,
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

const MyBookingsPage = () => {

    useEffect(() => {

        document.title =
            "My Bookings | MediQueue";

    }, []);

    const { user } =
        useContext(AuthContext);

    const [bookings, setBookings] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    // FETCH BOOKINGS
    useEffect(() => {

        if (!user?.email) return;

        const fetchBookings =
            async () => {

                try {

                    const token =
                        localStorage.getItem(
                            "access-token"
                        );

                    const res =
                        await fetch(
                            `${process.env.NEXT_PUBLIC_API_URL}/bookings?email=${user.email}`,
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

                    setBookings(data);

                    setLoading(false);

                } catch (error) {

                    console.log(error);

                    toast.error(
                        "Failed To Fetch Bookings"
                    );

                    setLoading(false);
                }
            };

        fetchBookings();

    }, [user]);

    // CANCEL BOOKING
    const handleCancelBooking =
        async (id) => {

            const result =
                await Swal.fire({

                    title: "Are you sure?",

                    text: "This booking will be cancelled!",

                    icon: "warning",

                    showCancelButton: true,

                    confirmButtonColor:
                        "#d33",

                    cancelButtonColor:
                        "#6b7280",

                    confirmButtonText:
                        "Yes, Cancel It",
                });

            if (!result.isConfirmed)
                return;

            try {

                const res =
                    await fetch(
                        `${process.env.NEXT_PUBLIC_API_URL}/bookings/${id}`,
                        {
                            method:
                                "PATCH",
                        }
                    );

                const data =
                    await res.json();

                if (data.success) {

                    toast.success(
                        "Booking Cancelled Successfully"
                    );

                    // AUTO RELOAD AFTER 1 SECOND
                    setTimeout(() => {
                        window.location.reload();
                    }, 100);

                    const updatedBookings =
                        bookings.map(
                            (
                                booking
                            ) => {

                                if (
                                    booking._id ===
                                    id
                                ) {

                                    return {

                                        ...booking,

                                        status:
                                            "cancelled",
                                    };
                                }

                                return booking;
                            }
                        );

                    setBookings(
                        updatedBookings
                    );
                }

            } catch (error) {

                console.log(error);

                toast.error(
                    "Failed To Cancel Booking"
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

            <div className="container mx-auto px-4 py-10">

                {/* HEADING */}
                <div className="text-center mb-10">

                    <h1 className="text-5xl font-bold mb-4">

                        My Booked Sessions

                    </h1>

                    <p className="text-base-content/70">

                        Manage all your booked tutoring sessions.

                    </p>

                </div>

                {
                    bookings.length ===
                        0 ? (

                        <div className="text-center py-20">

                            <h2 className="text-3xl font-bold">

                                No Bookings Found

                            </h2>

                        </div>

                    ) : (

                        <div className="overflow-x-auto rounded-2xl border border-base-300">

                            <table className="table">

                                {/* HEAD */}
                                <thead className="bg-base-200">

                                    <tr>

                                        <th>#</th>

                                        <th>Tutor</th>

                                        <th>Subject</th>

                                        <th>Fee</th>

                                        <th>Student</th>

                                        <th>Email</th>

                                        <th>Status</th>

                                        <th className="text-end">

                                            Actions

                                        </th>

                                    </tr>

                                </thead>

                                <tbody>

                                    {
                                        bookings.map(
                                            (
                                                booking,
                                                index
                                            ) => (

                                                <tr
                                                    key={
                                                        booking._id
                                                    }
                                                >

                                                    <td>

                                                        {index + 1}

                                                    </td>

                                                    <td>

                                                        {
                                                            booking.tutorName
                                                        }

                                                    </td>

                                                    <td>

                                                        {
                                                            booking.subject
                                                        }

                                                    </td>

                                                    <td>

                                                        {
                                                            booking.fee
                                                        }{" "}

                                                        BDT

                                                    </td>

                                                    <td>

                                                        {
                                                            booking.studentName
                                                        }

                                                    </td>

                                                    <td>

                                                        {
                                                            booking.studentEmail
                                                        }

                                                    </td>

                                                    <td>

                                                        {
                                                            booking.status ===
                                                                "cancelled" ? (

                                                                <span className="badge badge-error">

                                                                    Cancelled

                                                                </span>

                                                            ) : (

                                                                <span className="badge badge-success">

                                                                    Booked

                                                                </span>
                                                            )
                                                        }

                                                    </td>

                                                    <td className="text-end">

                                                        {
                                                            booking.status ===
                                                                "cancelled" ? (

                                                                <button
                                                                    disabled
                                                                    className="btn btn-sm btn-error text-white"
                                                                >

                                                                    Cancelled

                                                                </button>

                                                            ) : (

                                                                <button
                                                                    onClick={() =>
                                                                        handleCancelBooking(
                                                                            booking._id
                                                                        )
                                                                    }
                                                                    className="btn btn-warning btn-sm text-black"
                                                                >

                                                                    Cancel

                                                                </button>
                                                            )
                                                        }

                                                    </td>

                                                </tr>
                                            )
                                        )
                                    }

                                </tbody>

                            </table>

                        </div>
                    )
                }

                <ToastContainer position="top-center" />

            </div>

        </PrivateRoute>
    );
};

export default MyBookingsPage;