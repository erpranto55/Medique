"use client";

import {
    useEffect,
    useState,
} from "react";

import Link from "next/link";

import axios from "axios";

import TutorCard from "./TutorCard";

const AvailableTutors = () => {

    const [tutors, setTutors] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    // FETCH TUTORS
    useEffect(() => {

        const fetchTutors =
            async () => {

                try {

                    const res =
                        await axios.get(
                            "http://localhost:5000/tutors"
                        );

                    setTutors(
                        res.data
                    );

                } catch (error) {

                    console.log(error);

                } finally {

                    setLoading(false);
                }
            };

        fetchTutors();

    }, []);

    // SHOW ONLY 9
    const displayedTutors = tutors.slice(0, 6);

    // LOADING
    if (loading) {

        return (

            <div className="py-20 text-center">

                <span className="loading loading-spinner loading-lg text-primary"></span>

            </div>
        );
    }

    return (

        <section className="py-20">

            <div className="container mx-auto px-4">

                {/* HEADING */}
                <div className="text-center mb-12">

                    <h2 className="text-4xl font-bold mb-4">
                        Available Tutors
                    </h2>

                    <p className="max-w-2xl mx-auto text-base-content/70">
                        Discover experienced tutors from
                        multiple subjects and book
                        personalized learning sessions easily.
                    </p>

                </div>

                {/* EMPTY STATE */}
                {
                    tutors.length === 0 && (

                        <div className="text-center py-20">

                            <h2 className="text-3xl font-bold mb-3">
                                No Tutors Found
                            </h2>

                            <p className="text-base-content/70">
                                Tutors will appear here after adding.
                            </p>

                        </div>
                    )
                }

                {/* GRID */}
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">

                    {
                        displayedTutors.map(
                            (tutor) => (

                                <TutorCard
                                    key={tutor._id}
                                    tutor={tutor}
                                />
                            )
                        )
                    }

                </div>

                {/* SEE MORE BUTTON */}
                {
                    tutors.length > 6 && (

                        <div className="text-center mt-14">

                            <Link
                                href="/tutors"
                                className="btn btn-primary btn-wide"
                            >
                                See More Tutors
                            </Link>

                        </div>
                    )
                }

            </div>

        </section>
    );
};

export default AvailableTutors;