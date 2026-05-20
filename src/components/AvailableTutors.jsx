"use client";

import { useEffect, useState } from "react";
import TutorCard from "./TutorCard";

const AvailableTutors = () => {

    const [tutors, setTutors] = useState([]);

    useEffect(() => {

        fetch("http://localhost:5000/tutors")
            .then((res) => res.json())
            .then((data) => setTutors(data));

    }, []);

    return (
        <section className="py-20">

            <div className="container mx-auto px-4">

                {/* Heading */}
                <div className="text-center mb-12">

                    <h2 className="text-4xl font-bold mb-4">
                        Available Tutors
                    </h2>

                    <p className="max-w-2xl mx-auto text-base-content/70">
                        Discover experienced tutors from multiple subjects
                        and book personalized learning sessions easily.
                    </p>

                </div>

                {/* Grid */}
                {
                    tutors.length > 0 ? (

                        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">

                            {
                                tutors.map((tutor) => (
                                    <TutorCard
                                        key={tutor._id}
                                        tutor={tutor}
                                    />
                                ))
                            }

                        </div>

                    ) : (

                        <div className="text-center py-10">

                            <h3 className="text-2xl font-semibold">
                                No Tutors Available
                            </h3>

                        </div>
                    )
                }

            </div>

        </section>
    );
};

export default AvailableTutors;