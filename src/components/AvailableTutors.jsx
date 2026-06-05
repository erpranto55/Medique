"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import TutorCard from "./TutorCard";
import {
    FaGraduationCap,
    FaArrowRight,
} from "react-icons/fa";

const AvailableTutors = () => {
    const [tutors, setTutors] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTutors = async () => {
            try {
                const res = await axios.get(
                    `${process.env.NEXT_PUBLIC_API_URL}/tutors`
                );

                setTutors(res.data);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        fetchTutors();
    }, []);

    const displayedTutors = tutors.slice(0, 6);

    if (loading) {
        return (
            <section className="py-10">
                <div className="container mx-auto px-4">

                    <div className="text-center mb-14">
                        <div className="h-10 w-64 mx-auto bg-base-200 rounded-xl animate-pulse mb-4"></div>
                        <div className="h-5 w-96 max-w-full mx-auto bg-base-200 rounded animate-pulse"></div>
                    </div>

                    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        {[...Array(6)].map((_, index) => (
                            <div
                                key={index}
                                className="h-105 rounded-[32px] bg-base-200 animate-pulse"
                            />
                        ))}
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="relative py-24 overflow-hidden">

            {/* Background Effects */}
            <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 blur-3xl rounded-full" />
            <div className="absolute bottom-10 right-10 w-72 h-72 bg-secondary/10 blur-3xl rounded-full" />

            <div className="container mx-auto px-4 relative z-10">

                {/* Header */}
                <div className="text-center mb-16">

                    <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-primary/10 text-primary font-semibold mb-5">
                        <FaGraduationCap />
                        Expert Educators
                    </div>

                    <h2 className="text-4xl md:text-5xl font-black mb-5">
                        Available Tutors
                    </h2>

                    <p className="max-w-2xl mx-auto text-lg text-base-content/70">
                        Discover highly skilled tutors across
                        multiple subjects and schedule
                        personalized learning sessions that
                        match your goals and learning style.
                    </p>
                </div>

                {/* Empty State */}
                {tutors.length === 0 ? (
                    <div
                        className="
                        rounded-[36px]
                        border
                        border-base-300/30
                        bg-base-100/70
                        backdrop-blur-xl
                        shadow-xl
                        p-16
                        text-center
                    "
                    >
                        <div className="text-7xl mb-5">
                            🎓
                        </div>

                        <h3 className="text-3xl font-bold mb-3">
                            No Tutors Found
                        </h3>

                        <p className="text-base-content/70 text-lg">
                            Tutors will appear here once
                            they are added to the platform.
                        </p>
                    </div>
                ) : (
                    <>
                        {/* Tutors Grid */}
                        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">

                            {displayedTutors.map((tutor) => (
                                <div
                                    key={tutor._id}
                                    className="
                                    transition-all
                                    duration-500
                                    hover:-translate-y-2
                                "
                                >
                                    <TutorCard tutor={tutor} />
                                </div>
                            ))}
                        </div>

                        {/* Bottom CTA */}
                        {tutors.length > 6 && (
                            <div className="text-center mt-16">

                                <Link
                                    href="/tutors"
                                    className="
                                    inline-flex
                                    items-center
                                    gap-3
                                    px-8
                                    py-4
                                    rounded-full
                                    bg-linear-to-r
                                    from-primary
                                    to-secondary
                                    text-white
                                    font-semibold
                                    shadow-xl
                                    hover:shadow-2xl
                                    hover:scale-105
                                    transition-all
                                    duration-300
                                "
                                >
                                    Explore All Tutors

                                    <FaArrowRight />
                                </Link>

                            </div>
                        )}
                    </>
                )}
            </div>
        </section>
    );
};

export default AvailableTutors;