"use client";

import Image from "next/image";
import { use, useEffect, useState, useContext } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "@/providers/AuthProvider";
import PrivateRoute from "@/routes/PrivateRoute";

import {
    FaMapMarkerAlt,
    FaMoneyBillWave,
    FaClock,
    FaCalendarAlt,
    FaGraduationCap,
    FaLaptop,
} from "react-icons/fa";

const TutorDetailsPage = ({ params }) => {

    // PAGE TITLE
    useEffect(() => {

        document.title =
            "Tutor Details | MediQueue";

    }, []);
    const { user } = useContext(AuthContext);

    const { id } = use(params);

    const [tutor, setTutor] = useState(null);

    useEffect(() => {

        fetch(`${process.env.NEXT_PUBLIC_API_URL}/tutors/${id}`)
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

            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/bookings`,
                {
                    method: "POST",
                    headers: {
                        "content-type": "application/json",
                    },
                    body: JSON.stringify(bookingData),
                }
            );

            const data = await res.json();

            if (data.insertedId) {

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
        <section className="relative min-h-screen py-12 overflow-hidden">

            {/* Background Effects */}
            <div className="absolute top-20 left-10 w-96 h-96 bg-primary/10 blur-3xl rounded-full" />
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/10 blur-3xl rounded-full" />

            <div className="container mx-auto px-4 relative z-10">

                <div
                    className="
                    rounded-[36px]
                    border
                    border-base-300/30
                    bg-base-100/70
                    backdrop-blur-xl
                    shadow-2xl
                    overflow-hidden
                "
                >
                    <div className="grid lg:grid-cols-2 gap-0">

                        {/* IMAGE */}
                        <div className="relative h-125 lg:h-full">

                            <Image
                                src={
                                    tutor?.photo?.startsWith("http")
                                        ? tutor.photo
                                        : "/avatar.png"
                                }
                                alt={tutor?.name}
                                fill
                                priority
                                className="object-cover"
                            />

                            <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />

                            <div className="absolute bottom-8 left-8">

                                <div className="badge badge-primary badge-lg mb-4">
                                    {tutor.subject}
                                </div>

                                <h1 className="text-4xl md:text-5xl font-black text-white">
                                    {tutor.name}
                                </h1>

                            </div>

                        </div>

                        {/* CONTENT */}
                        <div className="p-8 lg:p-12">

                            <p className="text-lg text-base-content/70 leading-8 mb-8">
                                {tutor.description}
                            </p>

                            {/* INFO GRID */}
                            <div className="grid sm:grid-cols-2 gap-5">

                                <div className="rounded-2xl bg-base-200/60 p-5">
                                    <div className="flex items-center gap-3 mb-2">
                                        <FaGraduationCap className="text-primary" />
                                        <span className="font-semibold">
                                            Experience
                                        </span>
                                    </div>

                                    <p>{tutor.experience}</p>
                                </div>

                                <div className="rounded-2xl bg-base-200/60 p-5">
                                    <div className="flex items-center gap-3 mb-2">
                                        <FaMapMarkerAlt className="text-primary" />
                                        <span className="font-semibold">
                                            Location
                                        </span>
                                    </div>

                                    <p>{tutor.location}</p>
                                </div>

                                <div className="rounded-2xl bg-base-200/60 p-5">
                                    <div className="flex items-center gap-3 mb-2">
                                        <FaMoneyBillWave className="text-primary" />
                                        <span className="font-semibold">
                                            Hourly Fee
                                        </span>
                                    </div>

                                    <p>৳ {tutor.fee}</p>
                                </div>

                                <div className="rounded-2xl bg-base-200/60 p-5">
                                    <div className="flex items-center gap-3 mb-2">
                                        <FaCalendarAlt className="text-primary" />
                                        <span className="font-semibold">
                                            Available Days
                                        </span>
                                    </div>

                                    <p>{tutor.availableDays}</p>
                                </div>

                                <div className="rounded-2xl bg-base-200/60 p-5">
                                    <div className="flex items-center gap-3 mb-2">
                                        <FaClock className="text-primary" />
                                        <span className="font-semibold">
                                            Time Slot
                                        </span>
                                    </div>

                                    <p>{tutor.timeSlot}</p>
                                </div>

                                <div className="rounded-2xl bg-base-200/60 p-5">
                                    <div className="flex items-center gap-3 mb-2">
                                        <FaLaptop className="text-primary" />
                                        <span className="font-semibold">
                                            Teaching Mode
                                        </span>
                                    </div>

                                    <p>{tutor.mode}</p>
                                </div>

                            </div>

                            {/* SLOT INFO */}
                            <div
                                className="
                                mt-8
                                p-5
                                rounded-2xl
                                bg-primary/10
                                border
                                border-primary/20
                            "
                            >
                                <h3 className="font-bold text-lg mb-2">
                                    Available Slots
                                </h3>

                                <p className="text-3xl font-black text-primary">
                                    {tutor.totalSlot}
                                </p>
                            </div>

                            {/* CTA */}
                            <div className="mt-8">

                                {tutor.totalSlot > 0 ? (
                                    <button
                                        onClick={() =>
                                            document
                                                .getElementById("book_modal")
                                                .showModal()
                                        }
                                        className="
                                        btn
                                        btn-lg
                                        border-0
                                        rounded-2xl
                                        bg-linear-to-r
                                        from-primary
                                        to-secondary
                                        text-white
                                        shadow-lg
                                        w-full
                                    "
                                    >
                                        Book Session
                                    </button>
                                ) : (
                                    <button
                                        disabled
                                        className="
                                        btn
                                        btn-error
                                        btn-lg
                                        rounded-2xl
                                        w-full
                                    "
                                    >
                                        Fully Booked
                                    </button>
                                )}

                            </div>

                        </div>
                    </div>
                </div>

                {/* MODAL */}
                <dialog id="book_modal" className="modal">

                    <div
                        className="
                        modal-box
                        max-w-xl
                        rounded-[32px]
                        bg-base-100
                    "
                    >
                        <h3 className="font-black text-3xl mb-6">
                            Confirm Booking
                        </h3>

                        <div className="space-y-4">

                            <input
                                value={tutor.name}
                                readOnly
                                className="input input-bordered w-full rounded-xl"
                            />

                            <input
                                value={tutor.subject}
                                readOnly
                                className="input input-bordered w-full rounded-xl"
                            />

                            <input
                                value={`৳ ${tutor.fee}`}
                                readOnly
                                className="input input-bordered w-full rounded-xl"
                            />

                            <input
                                value={user?.displayName || ""}
                                readOnly
                                className="input input-bordered w-full rounded-xl"
                            />

                            <input
                                value={user?.email || ""}
                                readOnly
                                className="input input-bordered w-full rounded-xl"
                            />

                        </div>

                        <div className="modal-action">

                            <form method="dialog">
                                <button className="btn rounded-xl">
                                    Cancel
                                </button>
                            </form>

                            <button
                                onClick={handleBooking}
                                className="
                                btn
                                rounded-xl
                                border-0
                                bg-linear-to-r
                                from-primary
                                to-secondary
                                text-white
                            "
                            >
                                Confirm Booking
                            </button>

                        </div>
                    </div>

                </dialog>

            </div>
        </section>
    </PrivateRoute>
);
};

export default TutorDetailsPage;