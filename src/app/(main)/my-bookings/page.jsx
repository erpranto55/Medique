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
        <div className="relative min-h-screen py-12 overflow-hidden">

            {/* Background Glow */}
            <div className="absolute top-20 left-10 w-96 h-96 bg-primary/10 blur-3xl rounded-full" />
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/10 blur-3xl rounded-full" />

            <div className="container mx-auto px-4 relative z-10">

                {/* Hero */}
                <div className="text-center mb-12">

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
                         Student Dashboard
                    </div>

                    <h1 className="text-5xl md:text-6xl font-black mb-4">
                        My Booked Sessions
                    </h1>

                    <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
                        View, manage and track all your tutoring
                        sessions from one place.
                    </p>

                </div>

                {/* Stats */}
                {bookings.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

                        <div className="bg-base-100/80 backdrop-blur-xl rounded-3xl p-6 shadow-xl border border-base-300/30">
                            <h3 className="text-base-content/60 text-sm">
                                Total Bookings
                            </h3>

                            <p className="text-4xl font-black mt-2">
                                {bookings.length}
                            </p>
                        </div>

                        <div className="bg-base-100/80 backdrop-blur-xl rounded-3xl p-6 shadow-xl border border-base-300/30">
                            <h3 className="text-base-content/60 text-sm">
                                Active Sessions
                            </h3>

                            <p className="text-4xl font-black mt-2 text-success">
                                {
                                    bookings.filter(
                                        (b) =>
                                            b.status !==
                                            "cancelled"
                                    ).length
                                }
                            </p>
                        </div>

                        <div className="bg-base-100/80 backdrop-blur-xl rounded-3xl p-6 shadow-xl border border-base-300/30">
                            <h3 className="text-base-content/60 text-sm">
                                Cancelled
                            </h3>

                            <p className="text-4xl font-black mt-2 text-error">
                                {
                                    bookings.filter(
                                        (b) =>
                                            b.status ===
                                            "cancelled"
                                    ).length
                                }
                            </p>
                        </div>

                    </div>
                )}

                {bookings.length === 0 ? (

                    <div
                        className="
                        rounded-[36px]
                        bg-base-100/80
                        backdrop-blur-xl
                        border
                        border-base-300/30
                        shadow-xl
                        py-24
                        text-center
                    "
                    >
                        <div className="text-7xl mb-5">
                            📖
                        </div>

                        <h2 className="text-3xl font-bold mb-3">
                            No Bookings Found
                        </h2>

                        <p className="text-base-content/70">
                            Your booked sessions will appear here.
                        </p>
                    </div>

                ) : (

                    <div
                        className="
                        bg-base-100/80
                        backdrop-blur-xl
                        border
                        border-base-300/30
                        rounded-[36px]
                        shadow-2xl
                        overflow-hidden
                    "
                    >

                        <div className="overflow-x-auto">

                            <table className="table table-zebra">

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
                                            Action
                                        </th>
                                    </tr>

                                </thead>

                                <tbody>

                                    {bookings.map(
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

                                                <td className="font-semibold">
                                                    {
                                                        booking.tutorName
                                                    }
                                                </td>

                                                <td>
                                                    <span className="badge badge-primary">
                                                        {
                                                            booking.subject
                                                        }
                                                    </span>
                                                </td>

                                                <td>
                                                    ৳
                                                    {
                                                        booking.fee
                                                    }
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

                                                    {booking.status ===
                                                    "cancelled" ? (
                                                        <span className="badge badge-error badge-lg">
                                                            Cancelled
                                                        </span>
                                                    ) : (
                                                        <span className="badge badge-success badge-lg">
                                                            Active
                                                        </span>
                                                    )}

                                                </td>

                                                <td className="text-end">

                                                    {booking.status ===
                                                    "cancelled" ? (
                                                        <button
                                                            disabled
                                                            className="btn btn-error btn-sm"
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
                                                            className="
                                                            btn
                                                            btn-warning
                                                            btn-sm
                                                            rounded-xl
                                                        "
                                                        >
                                                            Cancel
                                                        </button>
                                                    )}

                                                </td>

                                            </tr>
                                        )
                                    )}

                                </tbody>

                            </table>

                        </div>

                    </div>

                )}

                <ToastContainer position="top-center" />

            </div>

        </div>
    </PrivateRoute>
);
};

export default MyBookingsPage;