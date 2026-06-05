"use client";

import {
    FaUserGraduate,
    FaClock,
    FaLaptopHouse,
} from "react-icons/fa";

const WhyChooseUs = () => {
    const features = [
        {
            icon: <FaUserGraduate />,
            title: "Expert Tutors",
            description:
                "Learn from highly qualified tutors with years of teaching experience across various subjects and academic levels.",
            gradient: "from-primary to-secondary",
        },
        {
            icon: <FaClock />,
            title: "Flexible Scheduling",
            description:
                "Book tutoring sessions according to your preferred date and time without worrying about scheduling conflicts.",
            gradient: "from-secondary to-accent",
        },
        {
            icon: <FaLaptopHouse />,
            title: "Online & Offline Learning",
            description:
                "Attend classes remotely or meet tutors in person based on your learning preferences and convenience.",
            gradient: "from-accent to-primary",
        },
    ];

    return (
        <section className="relative py-10 overflow-hidden">

            {/* Background Glow Effects */}
            <div className="absolute top-20 left-10 w-80 h-80 bg-primary/10 blur-3xl rounded-full" />
            <div className="absolute bottom-10 right-10 w-80 h-80 bg-secondary/10 blur-3xl rounded-full" />

            <div className="container mx-auto px-4 relative z-10">

                {/* Header */}
                <div className="text-center mb-16">

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
                         Why Students Choose Us
                    </div>

                    <h2 className="text-4xl md:text-5xl font-black mb-5">
                        Why Choose MediQueue?
                    </h2>

                    <p className="max-w-2xl mx-auto text-lg text-base-content/70">
                        A modern tutor booking platform designed
                        to connect students with experienced
                        educators through a seamless learning
                        experience.
                    </p>
                </div>

                {/* Cards */}
                <div className="grid gap-8 md:grid-cols-3">

                    {features.map((feature, index) => (
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
                            hover:-translate-y-3
                            transition-all
                            duration-500
                            p-8
                        "
                        >
                            {/* Hover Glow */}
                            <div
                                className={`
                                absolute
                                inset-0
                                opacity-0
                                group-hover:opacity-100
                                transition-opacity
                                duration-500
                                bg-linear-to-br
                                ${feature.gradient}
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
                                ${feature.gradient}
                                shadow-lg
                                group-hover:scale-110
                                transition-transform
                                duration-300
                            `}
                            >
                                {feature.icon}
                            </div>

                            {/* Title */}
                            <h3 className="text-2xl font-bold mb-4">
                                {feature.title}
                            </h3>

                            {/* Description */}
                            <p className="text-base-content/70 leading-7">
                                {feature.description}
                            </p>

                            {/* Decorative Line */}
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

                {/* Bottom Feature Banner */}
                <div
                    className="
                    mt-16
                    rounded-[36px]
                    bg-linear-to-r
                    from-primary
                    via-secondary
                    to-accent
                    p-px
                "
                >
                    <div
                        className="
                        rounded-[35px]
                        bg-base-100
                        px-8
                        py-10
                        text-center
                    "
                    >
                        <h3 className="text-2xl md:text-3xl font-bold mb-3">
                            Empowering Smarter Learning
                        </h3>

                        <p className="max-w-2xl mx-auto text-base-content/70">
                            Whether you&apos;re looking for expert guidance,
                            exam preparation, or skill development,
                            MediQueue helps you connect with the right
                            tutor quickly and efficiently.
                        </p>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default WhyChooseUs;