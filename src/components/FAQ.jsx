"use client";

import {
    FaQuestionCircle,
    FaHeadset,
} from "react-icons/fa";

const FAQ = () => {
    const faqs = [
        {
            question:
                "How can I book a tutor session?",
            answer:
                "Simply browse available tutors, view their details, and click the booking button to schedule your preferred session instantly.",
        },
        {
            question:
                "Can I update my tutor information later?",
            answer:
                "Yes. Tutors can update their profile, pricing, availability, and subject information anytime from the My Tutors section.",
        },
        {
            question:
                "Is MediQueue free for students?",
            answer:
                "Yes. Students can browse tutors, search subjects, and explore the platform completely free. Session fees depend on the tutor you choose.",
        },
        {
            question:
                "Can I cancel a booked session?",
            answer:
                "Absolutely. You can manage and cancel your bookings anytime from the My Bookings page.",
        },
        {
            question:
                "Do you support online and offline tutoring?",
            answer:
                "Yes. Depending on the tutor's availability, you can choose either online or in-person tutoring sessions.",
        },
    ];

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
                        <FaQuestionCircle />
                        Frequently Asked Questions
                    </div>

                    <h2 className="text-4xl md:text-5xl font-black mb-4">
                        Got Questions?
                    </h2>

                    <p className="max-w-2xl mx-auto text-lg text-base-content/70">
                        Find answers to common questions about
                        tutor booking, scheduling, payments,
                        and using the MediQueue platform.
                    </p>

                </div>

                {/* FAQ Items */}
                <div className="max-w-4xl mx-auto space-y-5">

                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className="
                            collapse
                            collapse-plus
                            rounded-[24px]
                            border
                            border-base-300/30
                            bg-base-100/70
                            backdrop-blur-xl
                            shadow-lg
                            hover:shadow-xl
                            transition-all
                            duration-300
                        "
                        >
                            <input
                                type="radio"
                                name="faq"
                                defaultChecked={index === 0}
                            />

                            <div
                                className="
                                collapse-title
                                text-lg
                                md:text-xl
                                font-bold
                                pr-12
                            "
                            >
                                {faq.question}
                            </div>

                            <div className="collapse-content">
                                <div
                                    className="
                                    h-1
                                    w-16
                                    rounded-full
                                    bg-linear-to-r
                                    from-primary
                                    to-secondary
                                    mb-4
                                "
                                />

                                <p
                                    className="
                                    text-base-content/70
                                    leading-7
                                "
                                >
                                    {faq.answer}
                                </p>
                            </div>
                        </div>
                    ))}

                </div>

                {/* Support Card */}
                <div
                    className="
                    mt-14
                    max-w-4xl
                    mx-auto
                    rounded-[30px]
                    border
                    border-base-300/30
                    bg-base-100/70
                    backdrop-blur-xl
                    shadow-xl
                    p-8
                    text-center
                "
                >
                    <div
                        className="
                        w-16
                        h-16
                        mx-auto
                        rounded-2xl
                        bg-linear-to-br
                        from-primary
                        to-secondary
                        text-white
                        flex
                        items-center
                        justify-center
                        text-2xl
                        mb-5
                    "
                    >
                        <FaHeadset />
                    </div>

                    <h3 className="text-2xl font-bold mb-3">
                        Still Need Help?
                    </h3>

                    <p className="text-base-content/70 max-w-xl mx-auto">
                        Can&apos;t find the answer you&apos;re looking for?
                        Contact our support team and we&apos;ll be
                        happy to assist you.
                    </p>

                    <button
                        className="
                        mt-6
                        px-8
                        py-3
                        rounded-full
                        bg-linear-to-r
                        from-primary
                        to-secondary
                        text-white
                        font-semibold
                        shadow-lg
                        hover:scale-105
                        transition-all
                        duration-300
                    "
                    >
                        Contact Support
                    </button>
                </div>

            </div>
        </section>
    );
};

export default FAQ;