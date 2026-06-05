"use client";

import Image from "next/image";
import { FaQuoteLeft, FaStar } from "react-icons/fa";

const reviews = [
    {
        id: 1,
        name: "Ariana Rahman",
        image:
            "https://randomuser.me/api/portraits/women/65.jpg",
        review:
            "MediQueue helped me find an amazing math tutor. The booking process was smooth and easy.",
    },
    {
        id: 2,
        name: "Rakib Hasan",
        image:
            "https://randomuser.me/api/portraits/men/32.jpg",
        review:
            "I love the clean interface and flexible scheduling system. Highly recommended for students.",
    },
    {
        id: 3,
        name: "Nusrat Jahan",
        image:
            "https://randomuser.me/api/portraits/women/45.jpg",
        review:
            "The platform made online tutoring simple and organized. Great experience overall.",
    },
];

const Testimonials = () => {
    return (
        <section className="relative py-10 overflow-hidden">

            {/* Background Glow */}
            <div className="absolute top-10 left-10 w-72 h-72 bg-primary/10 blur-3xl rounded-full" />
            <div className="absolute bottom-10 right-10 w-72 h-72 bg-secondary/10 blur-3xl rounded-full" />

            <div className="container mx-auto px-4 relative z-10">

                {/* Header */}
                <div className="text-center mb-14">

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
                         Student Reviews
                    </div>

                    <h2 className="text-4xl md:text-5xl font-black mb-4">
                        What Students Say
                    </h2>

                    <p className="max-w-2xl mx-auto text-lg text-base-content/70">
                        Discover why students trust MediQueue
                        to connect them with expert tutors and
                        achieve their learning goals.
                    </p>
                </div>

                {/* Cards */}
                <div className="grid gap-8 md:grid-cols-3">

                    {reviews.map((review) => (
                        <div
                            key={review.id}
                            className="
                            group
                            relative
                            overflow-hidden
                            rounded-[30px]
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
                            {/* Quote Icon */}
                            <div
                                className="
                                absolute
                                top-6
                                right-6
                                text-primary/15
                                text-5xl
                            "
                            >
                                <FaQuoteLeft />
                            </div>

                            {/* Avatar */}
                            <div className="flex items-center gap-4 mb-5">

                                <div className="relative">
                                    <Image
                                        src={review.image}
                                        alt={review.name}
                                        width={70}
                                        height={70}
                                        className="
                                        w-17.5
                                        h-17.5
                                        rounded-full
                                        object-cover
                                        ring-4
                                        ring-primary/20
                                    "
                                    />
                                </div>

                                <div>
                                    <h3 className="text-xl font-bold">
                                        {review.name}
                                    </h3>

                                    <div className="flex gap-1 mt-1 text-warning">
                                        {[...Array(5)].map((_, index) => (
                                            <FaStar key={index} />
                                        ))}
                                    </div>
                                </div>

                            </div>

                            {/* Review */}
                            <p
                                className="
                                text-base-content/70
                                leading-7
                                text-[15px]
                            "
                            >
                                `{review.review}`
                            </p>

                            {/* Bottom Accent */}
                            <div
                                className="
                                mt-6
                                h-1
                                w-16
                                rounded-full
                                bg-linear-to-r
                                from-primary
                                to-secondary
                            "
                            />
                        </div>
                    ))}
                </div>

                {/* Trust Banner */}
                <div
                    className="
                    mt-14
                    rounded-[30px]
                    border
                    border-base-300/30
                    bg-base-100/70
                    backdrop-blur-xl
                    shadow-lg
                    p-8
                    text-center
                "
                >
                    <h3 className="text-2xl font-bold mb-2">
                        Trusted by Thousands of Learners
                    </h3>

                    <p className="text-base-content/70">
                        Join students who are already improving
                        their academic performance with the help
                        of expert tutors on MediQueue.
                    </p>
                </div>

            </div>
        </section>
    );
};

export default Testimonials;