"use client";

import {
    useEffect,
    useState,
} from "react";

import axios from "axios";

import {
    FaChalkboardTeacher,
    FaBookOpen,
    FaUsers,
    FaClock,
} from "react-icons/fa";

const Statistics = () => {

    const [stats, setStats] =
        useState({
            tutors: 0,
            bookings: 0,
            users: 0,
            sessions: 120,
        });

    const [loading, setLoading] =
        useState(true);

    useEffect(() => {

        const fetchStats =
            async () => {

                try {

                    // TUTORS
                    const tutorsRes =
                        await axios.get(
                            `${process.env.NEXT_PUBLIC_API_URL}/tutors`
                        );

                    // USERS
                    const usersRes =
                        await axios.get(
                            `${process.env.NEXT_PUBLIC_API_URL}/users`
                        );

                    // BOOKINGS
                    let bookingsCount = 0;

                    try {

                        const token =
                            localStorage.getItem(
                                "access-token"
                            );

                        const bookingsRes =
                            await axios.get(
                                `${process.env.NEXT_PUBLIC_API_URL}/bookings?email=test@gmail.com`,
                                {
                                    headers: {
                                        authorization:
                                            `Bearer ${token}`,
                                    },
                                }
                            );

                        bookingsCount =
                            bookingsRes.data.length;

                    } catch (error) {

                        bookingsCount = 0;
                    }

                    setStats({

                        tutors:
                            tutorsRes.data.length,

                        bookings:
                            bookingsCount,

                        users:
                            usersRes.data.length,

                        sessions: 120,
                    });

                    setLoading(false);

                } catch (error) {

                    console.log(error);

                    setLoading(false);
                }
            };

        fetchStats();

    }, []);

    const statItems = [

        {
            title: "Total Tutors",
            value: stats.tutors,
            icon:
                <FaChalkboardTeacher />,
        },

        {
            title: "Bookings",
            value: stats.bookings,
            icon:
                <FaBookOpen />,
        },

        {
            title: "Users",
            value: stats.users,
            icon:
                <FaUsers />,
        },

        {
            title: "Active Sessions",
            value: stats.sessions,
            icon:
                <FaClock />,
        },
    ];

    // LOADING
    if (loading) {

        return (

            <div className="py-20 flex justify-center">

                <span className="loading loading-spinner loading-lg"></span>

            </div>
        );
    }

    return (

        <section className="py-20 bg-base-200">

            <div className="container mx-auto px-4">

                {/* HEADING */}
                <div className="text-center mb-14">

                    <h2 className="text-4xl font-bold mb-4">

                        Platform Statistics

                    </h2>

                    <p className="max-w-2xl mx-auto text-base-content/70">

                        Trusted by students and tutors
                        across Bangladesh for smart
                        learning and booking solutions.

                    </p>

                </div>

                {/* STATS GRID */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

                    {
                        statItems.map(
                            (
                                item,
                                index
                            ) => (

                                <div
                                    key={index}
                                    className="bg-base-100 rounded-3xl shadow-xl p-8 text-center hover:scale-105 transition duration-300"
                                >

                                    <div className="text-5xl text-primary flex justify-center mb-5">

                                        {item.icon}

                                    </div>

                                    <h3 className="text-4xl font-bold mb-2">

                                        {item.value}+

                                    </h3>

                                    <p className="text-lg text-base-content/70">

                                        {item.title}

                                    </p>

                                </div>
                            )
                        )
                    }

                </div>

            </div>

        </section>
    );
};

export default Statistics;