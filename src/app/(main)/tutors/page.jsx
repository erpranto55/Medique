"use client";

import { useState } from "react";
import tutorsData from "@/data/tutors";
import TutorCard from "@/components/TutorCard";


const TutorsPage = () => {

    const [search, setSearch] = useState("");

    // SEARCH FILTER
    const filteredTutors = tutorsData.filter((tutor) =>
        tutor.name
            .toLowerCase()
            .includes(search.toLowerCase())
    );

    return (
        <div className="container mx-auto px-4 py-5">

            {/* Heading */}
            <div className="text-center mb-12">

                <h1 className="text-5xl font-bold mb-4">
                    Explore Tutors
                </h1>

                <p className="max-w-2xl mx-auto text-base-content/70">
                    Discover professional tutors from different
                    subjects and book sessions easily.
                </p>
            </div>

            {/* Search */}
            <div className="flex justify-center mb-10">

                <input
                    type="text"
                    placeholder="Search tutors by name..."
                    value={search}
                    onChange={(e) =>
                        setSearch(e.target.value)
                    }
                    className="input input-bordered w-full max-w-xl"
                />

            </div>

            {/* Tutors Grid */}
            {
                filteredTutors.length > 0 ? (

                    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">

                        {
                            filteredTutors.map((tutor) => (
                                <TutorCard
                                    key={tutor.id}
                                    tutor={tutor}
                                />
                            ))
                        }

                    </div>

                ) : (

                    <div className="text-center py-20">

                        <h2 className="text-3xl font-bold mb-3">
                            No Tutors Found
                        </h2>

                        <p className="text-base-content/70">
                            Try searching with another tutor name.
                        </p>
                    </div>
                )
            }
        </div>
    );
};

export default TutorsPage;