"use client";

import {
    useEffect,
    useState,
} from "react";

import axios from "axios";

import TutorCard from "@/components/TutorCard";

import PrivateRoute from "@/routes/PrivateRoute";

import {
    FaSearch,
} from "react-icons/fa";

const TutorsPage = () => {

    // PAGE TITLE
    useEffect(() => {

        document.title =
            "Tutors | MediQueue";

    }, []);

    const [tutors, setTutors] =
        useState([]);

    const [searchText, setSearchText] =
        useState("");

    const [search, setSearch] =
        useState("");

    const [loading, setLoading] =
        useState(true);

    // FETCH TUTORS
    const fetchTutors =
        async () => {

            try {

                setLoading(true);

                const res =
                    await axios.get(
                        `http://localhost:5000/tutors?search=${search}`
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

    // INITIAL LOAD
    useEffect(() => {

        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchTutors();

    }, [search]);

    // HANDLE SEARCH
    const handleSearch = (
        e
    ) => {

        e.preventDefault();

        setSearch(
            searchText
        );
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

            <div className="container mx-auto px-4 py-5">

                {/* HEADING */}
                <div className="text-center mb-12">

                    <h1 className="text-5xl font-bold mb-4">

                        Explore Tutors

                    </h1>

                    <p className="max-w-2xl mx-auto text-base-content/70">

                        Discover professional tutors
                        from different subjects and
                        book sessions easily.

                    </p>

                </div>

                {/* SEARCH */}
                <form
                    onSubmit={
                        handleSearch
                    }
                    className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-10"
                >

                    <input
                        type="text"
                        placeholder="Search tutors by name..."
                        value={
                            searchText
                        }
                        onChange={(e) =>
                            setSearchText(
                                e.target.value
                            )
                        }
                        className="input input-bordered w-full max-w-xl"
                    />

                    <button
                        type="submit"
                        className="btn btn-primary"
                    >

                        <FaSearch />

                        Search

                    </button>

                </form>

                {/* TUTORS GRID */}
                {
                    tutors.length > 0 ? (

                        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">

                            {
                                tutors.map(
                                    (
                                        tutor
                                    ) => (

                                        <TutorCard
                                            key={
                                                tutor._id
                                            }
                                            tutor={
                                                tutor
                                            }
                                        />
                                    )
                                )
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

        </PrivateRoute>
    );
};

export default TutorsPage;