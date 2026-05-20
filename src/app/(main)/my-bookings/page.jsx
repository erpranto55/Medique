"use client";

import { useState } from "react";

import Image from "next/image";

import {
    Button,
} from "@heroui/react";

import {
    FaTrash,
} from "react-icons/fa";

const initialBookings = [
    {
        id: 1,
        tutorName: "Michael Brown",
        subject: "Physics",
        studentName: "John Doe",
        email: "john@example.com",
        status: "Confirmed",
        date: "20 May 2026",
        time: "5:00 PM - 7:00 PM",
        fee: 30,
        image:
            "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
    },

    {
        id: 2,
        tutorName: "Sarah Johnson",
        subject: "Mathematics",
        studentName: "John Doe",
        email: "john@example.com",
        status: "Pending",
        date: "22 May 2026",
        time: "3:00 PM - 5:00 PM",
        fee: 25,
        image:
            "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
    },
];

const MyBookingsPage = () => {

    const [bookings, setBookings] =
        useState(initialBookings);

    const [selectedBooking, setSelectedBooking] =
        useState(null);

    // CANCEL BOOKING
    const handleCancelBooking = (id) => {

        const updatedBookings =
            bookings.filter(
                (booking) => booking.id !== id
            );

        setBookings(updatedBookings);

        document
            .getElementById("cancel_modal")
            .close();
    };

    // TOTAL AMOUNT
    const totalAmount =
        bookings.reduce(
            (total, booking) =>
                total + booking.fee,
            0
        );

    return (
        <div className="container mx-auto px-4 py-16">

            {/* Heading */}
            <div className="text-center mb-12">

                <h1 className="text-4xl md:text-5xl font-bold">
                    My Booked Sessions
                </h1>

                <p className="text-base-content/70 mt-4 text-lg">
                    View and manage all your
                    booked tutoring sessions.
                </p>

            </div>

            {/* Stats */}
            {
                bookings.length > 0 && (

                    <div className="grid md:grid-cols-2 gap-6 mb-10">

                        {/* Total Sessions */}
                        <div className="bg-base-100 rounded-3xl shadow-xl border border-base-300 p-8">

                            <h2 className="text-lg font-semibold text-base-content/70">
                                Total Bookings
                            </h2>

                            <h1 className="text-5xl font-bold mt-4">
                                {bookings.length}
                            </h1>

                        </div>

                        {/* Total Amount */}
                        <div className="bg-base-100 rounded-3xl shadow-xl border border-base-300 p-8">

                            <h2 className="text-lg font-semibold text-base-content/70">
                                Total Amount
                            </h2>

                            <h1 className="text-5xl font-bold mt-4">
                                ${totalAmount}
                            </h1>

                        </div>

                    </div>
                )
            }

            {/* EMPTY STATE */}
            {
                bookings.length === 0 && (

                    <div className="bg-base-100 rounded-3xl shadow-xl border border-base-300 p-16 text-center">

                        <h2 className="text-3xl font-bold">
                            No Bookings Found
                        </h2>

                        <p className="text-base-content/70 mt-4">
                            You have not booked any
                            tutoring session yet.
                        </p>

                    </div>
                )
            }

            {/* TABLE */}
            {
                bookings.length > 0 && (

                    <div className="hidden lg:block overflow-x-auto bg-base-100 rounded-3xl shadow-2xl border border-base-300">

                        <table className="table">

                            {/* HEAD */}
                            <thead>

                                <tr className="text-base">

                                    <th>
                                        Tutor
                                    </th>

                                    <th>
                                        Student
                                    </th>

                                    <th>
                                        Session
                                    </th>

                                    <th>
                                        Fee
                                    </th>

                                    <th>
                                        Status
                                    </th>

                                    <th className="text-center">
                                        Action
                                    </th>

                                </tr>

                            </thead>

                            {/* BODY */}
                            <tbody>

                                {
                                    bookings.map((booking) => (

                                        <tr key={booking.id}>

                                            {/* Tutor */}
                                            <td>

                                                <div className="flex items-center gap-4">

                                                    <div className="relative w-16 h-16 rounded-2xl overflow-hidden">

                                                        <Image
                                                            src={booking.image}
                                                            alt={booking.tutorName}
                                                            fill
                                                            className="object-cover"
                                                        />

                                                    </div>

                                                    <div>

                                                        <h2 className="font-bold text-lg">
                                                            {booking.tutorName}
                                                        </h2>

                                                        <p className="text-base-content/70">
                                                            {booking.subject}
                                                        </p>

                                                    </div>
                                                </div>

                                            </td>

                                            {/* Student */}
                                            <td>

                                                <div>

                                                    <h2 className="font-semibold">
                                                        {booking.studentName}
                                                    </h2>

                                                    <p className="text-base-content/70">
                                                        {booking.email}
                                                    </p>

                                                </div>

                                            </td>

                                            {/* Session */}
                                            <td>

                                                <div>

                                                    <h2>
                                                        {booking.date}
                                                    </h2>

                                                    <p className="text-base-content/70">
                                                        {booking.time}
                                                    </p>

                                                </div>

                                            </td>

                                            {/* Fee */}
                                            <td>
                                                ${booking.fee}
                                            </td>

                                            {/* Status */}
                                            <td>

                                                <div
                                                    className={`badge ${booking.status === "Confirmed"
                                                            ? "badge-success"
                                                            : "badge-warning"
                                                        }`}
                                                >

                                                    {booking.status}

                                                </div>

                                            </td>

                                            {/* Action */}
                                            <td>

                                                <div className="flex justify-center">

                                                    <Button
                                                        onPress={() => {

                                                            setSelectedBooking(
                                                                booking
                                                            );

                                                            document
                                                                .getElementById(
                                                                    "cancel_modal"
                                                                )
                                                                .showModal();
                                                        }}
                                                        className="btn btn-error btn-sm text-white"
                                                    >

                                                        <FaTrash />

                                                        Cancel

                                                    </Button>

                                                </div>

                                            </td>

                                        </tr>
                                    ))
                                }

                            </tbody>
                        </table>
                    </div>
                )
            }

            {/* MOBILE CARDS */}
            <div className="grid gap-6 lg:hidden">

                {
                    bookings.map((booking) => (

                        <div
                            key={booking.id}
                            className="bg-base-100 rounded-3xl shadow-xl border border-base-300 p-5"
                        >

                            <div className="flex items-center gap-4">

                                <div className="relative w-20 h-20 rounded-2xl overflow-hidden">

                                    <Image
                                        src={booking.image}
                                        alt={booking.tutorName}
                                        fill
                                        className="object-cover"
                                    />

                                </div>

                                <div>

                                    <h2 className="text-xl font-bold">
                                        {booking.tutorName}
                                    </h2>

                                    <p className="text-base-content/70">
                                        {booking.subject}
                                    </p>

                                </div>
                            </div>

                            <div className="mt-5 space-y-2">

                                <p>
                                    <span className="font-semibold">
                                        Student:
                                    </span>{" "}
                                    {booking.studentName}
                                </p>

                                <p>
                                    <span className="font-semibold">
                                        Email:
                                    </span>{" "}
                                    {booking.email}
                                </p>

                                <p>
                                    <span className="font-semibold">
                                        Date:
                                    </span>{" "}
                                    {booking.date}
                                </p>

                                <p>
                                    <span className="font-semibold">
                                        Time:
                                    </span>{" "}
                                    {booking.time}
                                </p>

                                <p>
                                    <span className="font-semibold">
                                        Fee:
                                    </span>{" "}
                                    ${booking.fee}
                                </p>

                                <div
                                    className={`badge mt-2 ${booking.status === "Confirmed"
                                            ? "badge-success"
                                            : "badge-warning"
                                        }`}
                                >

                                    {booking.status}

                                </div>

                            </div>

                            {/* Button */}
                            <div className="mt-6">

                                <Button
                                    onPress={() => {

                                        setSelectedBooking(
                                            booking
                                        );

                                        document
                                            .getElementById(
                                                "cancel_modal"
                                            )
                                            .showModal();
                                    }}
                                    className="btn btn-error w-full text-white"
                                >

                                    <FaTrash />

                                    Cancel Booking

                                </Button>

                            </div>
                        </div>
                    ))
                }

            </div>

            {/* CANCEL MODAL */}
            <dialog
                id="cancel_modal"
                className="modal"
            >

                <div className="modal-box">

                    <h3 className="font-bold text-2xl">
                        Cancel Booking
                    </h3>

                    <p className="py-6 text-base-content/70">

                        Are you sure you want to
                        cancel this booked session?

                    </p>

                    <div className="flex justify-end gap-4">

                        <button
                            onClick={() =>
                                document
                                    .getElementById(
                                        "cancel_modal"
                                    )
                                    .close()
                            }
                            className="btn"
                        >
                            Keep Booking
                        </button>

                        <button
                            onClick={() =>
                                handleCancelBooking(
                                    selectedBooking.id
                                )
                            }
                            className="btn btn-error text-white"
                        >
                            Confirm Cancel
                        </button>

                    </div>

                </div>

            </dialog>
        </div>
    );
};

export default MyBookingsPage;