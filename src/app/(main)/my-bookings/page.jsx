"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const MyBookingsPage = () => {

    const [bookings, setBookings] = useState([]);

    useEffect(() => {

        fetch("http://localhost:5000/bookings")
            .then((res) => res.json())
            .then((data) => setBookings(data));

    }, []);

    const handleCancelBooking = async (id) => {

        const result = await Swal.fire({
            title: "Are you sure?",
            text: "This booking will be cancelled!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#6b7280",
            confirmButtonText: "Yes, Cancel It",
        });

        if (!result.isConfirmed) return;

        try {

            const res = await fetch(
                `http://localhost:5000/bookings/${id}`,
                {
                    method: "DELETE",
                }
            );

            const data = await res.json();

            if (data.deletedCount > 0) {

                toast.success(
                    "Booking Cancelled Successfully"
                );

                const remainingBookings =
                    bookings.filter(
                        (booking) =>
                            booking._id !== id
                    );

                setBookings(remainingBookings);
            }

        } catch (error) {

            console.log(error);

            toast.error(
                "Failed to cancel booking"
            );
        }
    };

    return (
        <div className="container mx-auto px-4 py-10">

            <div className="text-center mb-12">

                <h1 className="text-5xl font-bold mb-4">
                    My Bookings
                </h1>

                <p className="text-base-content/70">
                    Manage your booked tutor sessions.
                </p>

            </div>

            {
                bookings.length === 0 ? (

                    <div className="text-center py-20">

                        <h2 className="text-3xl font-bold mb-3">
                            No Bookings Found
                        </h2>

                    </div>

                ) : (

                    <div className="overflow-x-auto">

                        <table className="table">

                            <thead>

                                <tr>

                                    <th>Image</th>
                                    <th>Tutor</th>
                                    <th>Subject</th>
                                    <th>Fee</th>
                                    <th>Action</th>

                                </tr>

                            </thead>

                            <tbody>

                                {
                                    bookings.map(
                                        (booking) => (

                                            <tr
                                                key={
                                                    booking._id
                                                }
                                            >

                                                <td>

                                                    <div className="avatar">

                                                        <div className="w-16 rounded-xl">

                                                            <Image
                                                                src={
                                                                    booking?.image &&
                                                                        booking.image.startsWith(
                                                                            "http"
                                                                        )
                                                                        ? booking.image
                                                                        : "/avatar.png"
                                                                }
                                                                alt={
                                                                    booking.tutorName
                                                                }
                                                                width={
                                                                    70
                                                                }
                                                                height={
                                                                    70
                                                                }
                                                                className="object-cover"
                                                            />

                                                        </div>

                                                    </div>

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

                                                    <button
                                                        onClick={() =>
                                                            handleCancelBooking(
                                                                booking._id
                                                            )
                                                        }
                                                        className="btn btn-error btn-sm"
                                                    >
                                                        Cancel
                                                    </button>

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

        </div>
    );
};

export default MyBookingsPage;