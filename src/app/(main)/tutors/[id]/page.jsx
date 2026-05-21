"use client";

import PrivateRoute from "@/routes/PrivateRoute";
import Image from "next/image";
import Link from "next/link";
import { use, useEffect, useState, useContext } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "@/providers/AuthProvider";

const TutorDetailsPage = ({ params }) => {
    const { user } = useContext(AuthContext);

    const { id } = use(params);

    const [tutor, setTutor] = useState(null);

    useEffect(() => {

        fetch(`http://localhost:5000/tutors/${id}`)
            .then((res) => res.json())
            .then((data) => setTutor(data));

    }, [id]);

    const handleBooking = async () => {

        const bookingData = {

            tutorId: tutor._id,
            tutorName: tutor.name,
            subject: tutor.subject,
            fee: tutor.fee,
            photo: tutor.photo,
            studentName: user?.displayName,
            studentEmail: user?.email,
            bookedAt: new Date(),
        };

        try {

            const res = await fetch(
                "http://localhost:5000/bookings",
                {
                    method: "POST",
                    headers: {
                        "content-type": "application/json",
                    },
                    body: JSON.stringify(bookingData),
                }
            );

            const data = await res.json();

            if (data.success) {

                toast.success(
                    "Booking Successful!",
                    {
                        position: "top-center",
                        autoClose: 2000,
                    }
                );

                document
                    .getElementById("book_modal")
                    .close();

                setTimeout(() => {

                    window.location.href =
                        "/my-bookings";

                }, 2000);
            }

        } catch (error) {

            console.log(error);

            toast.error(
                "Booking Failed!",
                {
                    position: "top-center",
                }
            );
        }
    };

    // LOADING
    if (!tutor) {

        return (
            <div className="min-h-screen flex items-center justify-center">

                <span className="loading loading-spinner loading-lg"></span>

            </div>
        );
    }

    return (
        <PrivateRoute>
            <div className="container mx-auto px-4 py-10">

                <div className="grid lg:grid-cols-2 gap-12 items-center">

                    {/* IMAGE */}
                    <div className="relative w-100 h-100 bg-base-200 rounded-3xl overflow-hidden shadow-xl md:ml-40">

                        <Image
                            src={
                                tutor?.photo &&
                                    tutor.photo.startsWith("http")
                                    ? tutor.photo
                                    : "/avatar.png"
                            }
                            alt={tutor?.name || "Tutor Image"}
                            fill
                            sizes="100vw"
                            priority
                            className="object-cover"
                        />

                    </div>

                    {/* CONTENT */}
                    <div className="space-y-6">

                        <div className="badge badge-primary badge-lg">
                            {tutor.subject}
                        </div>

                        <h1 className="text-5xl font-bold">
                            {tutor.name}
                        </h1>

                        <p className="text-lg text-base-content/70 leading-8">
                            {tutor.description}
                        </p>

                        {/* INFO */}
                        <div className="space-y-4 text-lg">

                            <p>
                                <span className="font-bold">
                                    Experience:
                                </span>{" "}
                                {tutor.experience}
                            </p>

                            <p>
                                <span className="font-bold">
                                    Location:
                                </span>{" "}
                                {tutor.location}
                            </p>

                            <p>
                                <span className="font-bold">
                                    Hourly Fee:
                                </span>{" "}
                                {tutor.fee} BDT
                            </p>

                            <p>
                                <span className="font-bold">
                                    Available Days:
                                </span>{" "}
                                {tutor.availableDays}
                            </p>

                            <p>
                                <span className="font-bold">
                                    Time Slot:
                                </span>{" "}
                                {tutor.timeSlot}
                            </p>

                            <p>
                                <span className="font-bold">
                                    Teaching Mode:
                                </span>{" "}
                                {tutor.mode}
                            </p>

                        </div>

                        {/* BUTTON */}
                        <div className="pt-4">

                            {
                                tutor.totalSlot > 0 ? (

                                    <button
                                        onClick={() =>
                                            document
                                                .getElementById(
                                                    "book_modal"
                                                )
                                                .showModal()
                                        }
                                        className="btn btn-primary btn-lg"
                                    >
                                        Book Session
                                    </button>

                                ) : (

                                    <button
                                        disabled
                                        className="btn btn-error btn-lg"
                                    >
                                        Fully Booked
                                    </button>
                                )
                            }

                        </div>

                    </div>

                </div>

                {/* MODAL */}
                <dialog id="book_modal" className="modal">

                    <div className="modal-box">

                        <h3 className="font-bold text-2xl mb-6">
                            Book Tutor Session
                        </h3>

                        <div className="space-y-4">

                            <div>

                                <label className="label">
                                    Tutor Name
                                </label>

                                <input
                                    type="text"
                                    value={tutor.name}
                                    readOnly
                                    className="input input-bordered w-full"
                                />

                            </div>

                            <div>

                                <label className="label">
                                    Subject
                                </label>

                                <input
                                    type="text"
                                    value={tutor.subject}
                                    readOnly
                                    className="input input-bordered w-full"
                                />

                            </div>

                            <div>

                                <label className="label">
                                    Hourly Fee
                                </label>

                                <input
                                    type="text"
                                    value={`${tutor.fee} BDT`}
                                    readOnly
                                    className="input input-bordered w-full"
                                />

                            </div>

                            <div>

                                <label className="label">
                                    Student Name
                                </label>

                                <input
                                    type="text"
                                    value={user?.displayName || ""}
                                    readOnly
                                    className="input input-bordered w-full"
                                />

                            </div>

                            <div>

                                <label className="label">
                                    Email
                                </label>

                                <input
                                    type="email"
                                    value={user?.email || ""}
                                    readOnly
                                    className="input input-bordered w-full"
                                />

                            </div>

                        </div>

                        <div className="modal-action">

                            <form method="dialog">

                                <button className="btn">
                                    Cancel
                                </button>

                            </form>

                            <button
                                onClick={handleBooking}
                                className="btn btn-primary"
                            >
                                Confirm Booking
                            </button>

                        </div>

                    </div>

                </dialog>

            </div>
        </PrivateRoute>
    );
};

export default TutorDetailsPage;