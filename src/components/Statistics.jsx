"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import {
    FaChalkboardTeacher,
    FaBookOpen,
    FaUsers,
    FaClock,
} from "react-icons/fa";

const CountUp = ({ end }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let start = 0;

        const duration = 1500;
        const increment = end / (duration / 20);

        const timer = setInterval(() => {
            start += increment;

            if (start >= end) {
                setCount(end);
                clearInterval(timer);
            } else {
                setCount(Math.floor(start));
            }
        }, 20);

        return () => clearInterval(timer);
    }, [end]);

    return count;
};

const Statistics = () => {
    const [stats, setStats] = useState({
        tutors: 0,
        bookings: 0,
        users: 0,
        sessions: 120,
    });

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const tutorsRes = await axios.get(
                    `${process.env.NEXT_PUBLIC_API_URL}/tutors`
                );

                const usersRes = await axios.get(
                    `${process.env.NEXT_PUBLIC_API_URL}/users`
                );

                let bookingsCount = 0;

                try {
                    const token =
                        localStorage.getItem("access-token");

                    const bookingsRes =
                        await axios.get(
                            `${process.env.NEXT_PUBLIC_API_URL}/bookings?email=test@gmail.com`,
                            {
                                headers: {
                                    authorization: `Bearer ${token}`,
                                },
                            }
                        );

                    bookingsCount =
                        bookingsRes.data.length;
                } catch {
                    bookingsCount = 0;
                }

                setStats({
                    tutors: tutorsRes.data.length,
                    bookings: bookingsCount,
                    users: usersRes.data.length,
                    sessions: 120,
                });
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    const statItems = [
        {
            title: "Expert Tutors",
            value: stats.tutors,
            icon: <FaChalkboardTeacher />,
            gradient:
                "from-primary to-secondary",
        },
        {
            title: "Bookings Made",
            value: stats.bookings,
            icon: <FaBookOpen />,
            gradient:
                "from-secondary to-accent",
        },
        {
            title: "Registered Users",
            value: stats.users,
            icon: <FaUsers />,
            gradient:
                "from-accent to-primary",
        },
        {
            title: "Active Sessions",
            value: stats.sessions,
            icon: <FaClock />,
            gradient:
                "from-primary to-info",
        },
    ];

    if (loading) {
        return (
            <section className="py-24">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[...Array(4)].map((_, i) => (
                            <div
                                key={i}
                                className="h-64 rounded-3xl bg-base-200 animate-pulse"
                            />
                        ))}
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="relative py-10 overflow-hidden">

            {/* Background Blur */}
            <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 blur-3xl rounded-full" />
            <div className="absolute bottom-10 right-10 w-72 h-72 bg-secondary/10 blur-3xl rounded-full" />

            <div className="container mx-auto px-4 relative z-10">

                {/* Header */}
                <div className="text-center mb-16">

                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-semibold mb-4">
                         Trusted Learning Platform
                    </span>

                    <h2 className="text-4xl md:text-5xl font-black mb-4">
                        Our Impact In Numbers
                    </h2>

                    <p className="max-w-2xl mx-auto text-base-content/70 text-lg">
                        Empowering students and tutors with a
                        modern booking platform designed for
                        seamless learning experiences.
                    </p>
                </div>

                {/* Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

                    {statItems.map((item, index) => (
                        <div
                            key={index}
                            className="
                            group
                            relative
                            overflow-hidden
                            rounded-[32px]
                            border
                            border-base-300/30
                            bg-base-100/70
                            backdrop-blur-xl
                            shadow-xl
                            hover:shadow-2xl
                            hover:-translate-y-2
                            transition-all
                            duration-500
                            p-8
                        "
                        >
                            {/* Glow Effect */}
                            <div
                                className={`
                                absolute
                                inset-0
                                opacity-0
                                group-hover:opacity-100
                                transition-opacity
                                duration-500
                                bg-linear-to-br
                                ${item.gradient}
                                blur-3xl
                                scale-150
                                -z-10
                            `}
                            />

                            {/* Icon */}
                            <div
                                className={`
                                w-20
                                h-20
                                rounded-3xl
                                flex
                                items-center
                                justify-center
                                text-white
                                text-3xl
                                mb-6
                                bg-linear-to-br
                                ${item.gradient}
                                shadow-lg
                            `}
                            >
                                {item.icon}
                            </div>

                            {/* Value */}
                            <h3 className="text-5xl font-black mb-3">
                                <CountUp end={item.value} />+
                            </h3>

                            {/* Label */}
                            <p className="text-lg font-medium text-base-content/70">
                                {item.title}
                            </p>

                            {/* Decorative Line */}
                            <div className="mt-6 h-1 w-12 rounded-full bg-linear-to-r from-primary to-secondary" />
                        </div>
                    ))}
                </div>

                {/* Bottom Banner */}
                <div
                    className="
                    mt-16
                    rounded-[32px]
                    bg-linear-to-r
                    from-primary
                    via-secondary
                    to-accent
                    p-px
                "
                >
                    <div className="rounded-[31px] bg-base-100 px-8 py-8 text-center">
                        <h3 className="text-2xl md:text-3xl font-bold mb-2">
                            Join Thousands of Learners Today
                        </h3>

                        <p className="text-base-content/70">
                            Connect with expert tutors and
                            start achieving your learning goals.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Statistics;