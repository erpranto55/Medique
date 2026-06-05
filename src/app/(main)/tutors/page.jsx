"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import TutorCard from "@/components/TutorCard";
import {
    FaSearch,
    FaCalendarAlt,
    FaGraduationCap,
} from "react-icons/fa";

const TutorsPage = () => {
    useEffect(() => {
        document.title = "Tutors | MediQueue";
    }, []);

    const [tutors, setTutors] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [search, setSearch] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTutors = async () => {
            try {
                setLoading(true);

                const res = await axios.get(
                    `${process.env.NEXT_PUBLIC_API_URL}/tutors?search=${search}&startDate=${startDate}&endDate=${endDate}`
                );

                setTutors(res.data);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        fetchTutors();
    }, [search, startDate, endDate]);

    const handleSearch = (e) => {
        e.preventDefault();
        setSearch(searchText);
    };

    return (
        <section className="relative min-h-screen py-12 overflow-hidden">

            {/* Background Effects */}
            <div className="absolute top-20 left-10 w-80 h-80 bg-primary/10 blur-3xl rounded-full" />
            <div className="absolute bottom-20 right-10 w-80 h-80 bg-secondary/10 blur-3xl rounded-full" />

            <div className="container mx-auto px-4 relative z-10">

                {/* HERO */}
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
                        <FaGraduationCap />
                        Expert Educators
                    </div>

                    <h1 className="text-5xl md:text-6xl font-black mb-5">
                        Explore Tutors
                    </h1>

                    <p className="max-w-2xl mx-auto text-lg text-base-content/70">
                        Discover experienced tutors from
                        different subjects and schedule
                        personalized learning sessions
                        effortlessly.
                    </p>

                </div>

                {/* SEARCH PANEL */}
                <div
                    className="
                    rounded-[32px]
                    border
                    border-base-300/30
                    bg-base-100/70
                    backdrop-blur-xl
                    shadow-xl
                    p-6
                    mb-10
                "
                >
                    <form
                        onSubmit={handleSearch}
                        className="
                        flex
                        flex-col
                        xl:flex-row
                        gap-4
                        items-center
                    "
                    >
                        {/* Search */}
                        <div className="relative w-full">

                            <FaSearch
                                className="
                                absolute
                                left-4
                                top-1/2
                                -translate-y-1/2
                                text-base-content/40
                            "
                            />

                            <input
                                type="text"
                                placeholder="Search tutors by name..."
                                value={searchText}
                                onChange={(e) =>
                                    setSearchText(e.target.value)
                                }
                                className="
                                input
                                input-bordered
                                w-full
                                pl-12
                                rounded-2xl
                            "
                            />
                        </div>

                        {/* Start Date */}
                        <div className="relative w-full lg:w-auto">

                            <FaCalendarAlt
                                className="
                                absolute
                                left-4
                                top-1/2
                                -translate-y-1/2
                                text-base-content/40
                            "
                            />

                            <input
                                type="date"
                                value={startDate}
                                onChange={(e) =>
                                    setStartDate(
                                        e.target.value
                                    )
                                }
                                className="
                                input
                                input-bordered
                                pl-12
                                rounded-2xl
                            "
                            />
                        </div>

                        {/* End Date */}
                        <div className="relative w-full lg:w-auto">

                            <FaCalendarAlt
                                className="
                                absolute
                                left-4
                                top-1/2
                                -translate-y-1/2
                                text-base-content/40
                            "
                            />

                            <input
                                type="date"
                                value={endDate}
                                onChange={(e) =>
                                    setEndDate(
                                        e.target.value
                                    )
                                }
                                className="
                                input
                                input-bordered
                                pl-12
                                rounded-2xl
                            "
                            />
                        </div>

                        {/* Search Button */}
                        <button
                            type="submit"
                            className="
                            btn
                            border-0
                            rounded-2xl
                            px-8
                            bg-linear-to-r
                            from-primary
                            to-secondary
                            text-white
                            shadow-lg
                        "
                        >
                            <FaSearch />
                            Search
                        </button>
                    </form>
                </div>

                {/* Results Counter */}
                {!loading && (
                    <div className="mb-8 flex justify-between items-center">

                        <h2 className="text-xl font-bold">
                            {tutors.length} Tutors Found
                        </h2>

                    </div>
                )}

                {/* Loading */}
                {loading ? (
                    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">

                        {[...Array(6)].map((_, index) => (
                            <div
                                key={index}
                                className="
                                h-112.5
                                rounded-[32px]
                                bg-base-200
                                animate-pulse
                            "
                            />
                        ))}

                    </div>
                ) : tutors.length > 0 ? (

                    <>
                        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">

                            {tutors.map((tutor) => (
                                <TutorCard
                                    key={tutor._id}
                                    tutor={tutor}
                                />
                            ))}

                        </div>
                    </>

                ) : (

                    <div
                        className="
                        rounded-[32px]
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
                            🔍
                        </div>

                        <h2 className="text-3xl font-bold mb-3">
                            No Tutors Found
                        </h2>

                        <p className="text-base-content/70">
                            Try another search term or
                            adjust your date filters.
                        </p>
                    </div>

                )}
            </div>
        </section>
    );
};

export default TutorsPage;