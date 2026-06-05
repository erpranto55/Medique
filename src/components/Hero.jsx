"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
    FaArrowLeft,
    FaArrowRight,
    FaGraduationCap,
    FaUsers,
    FaStar,
} from "react-icons/fa";

const slides = [
    {
        id: 1,
        image:
            "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2000&auto=format&fit=crop",
        title: "Find Expert Tutors For Every Subject",
        description:
            "Connect with experienced mentors, schedule personalized sessions, and accelerate your learning journey.",
        button: "Explore Tutors",
    },
    {
        id: 2,
        image:
            "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2000&auto=format&fit=crop",
        title: "Book Sessions In Seconds",
        description:
            "Smart scheduling system designed to help students find and book tutors effortlessly.",
        button: "Book Session",
    },
    {
        id: 3,
        image:
            "https://images.unsplash.com/photo-1513258496099-48168024aec0?q=80&w=2000&auto=format&fit=crop",
        title: "Learn Anytime Anywhere",
        description:
            "Flexible online and offline tutoring sessions that fit your schedule and goals.",
        button: "Start Learning",
    },
];

const Hero = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) =>
                prev === slides.length - 1 ? 0 : prev + 1
            );
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    const nextSlide = () => {
        setCurrentSlide((prev) =>
            prev === slides.length - 1 ? 0 : prev + 1
        );
    };

    const prevSlide = () => {
        setCurrentSlide((prev) =>
            prev === 0 ? slides.length - 1 : prev - 1
        );
    };

    return (
        <section className="container mx-auto px-4 mt-6">
            <div className="relative h-[85vh] rounded-[40px] overflow-hidden shadow-2xl">

                {/* Slides */}
                {slides.map((slide, index) => (
                    <div
                        key={slide.id}
                        className={`absolute inset-0 transition-all duration-1000 ${
                            currentSlide === index
                                ? "opacity-100 scale-100 z-10"
                                : "opacity-0 scale-110 z-0"
                        }`}
                    >
                        <div
                            className="absolute inset-0 bg-cover bg-center"
                            style={{
                                backgroundImage: `url(${slide.image})`,
                            }}
                        />

                        {/* Modern Overlay */}
                        <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/50 to-black/20" />

                        {/* Content */}
                        <div className="relative z-20 h-full flex items-center">
                            <div className="max-w-7xl mx-auto px-6 w-full">

                                <div className="max-w-3xl">

                                    <div className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white">
                                        <FaGraduationCap />
                                        <span className="text-sm">
                                            Trusted by Thousands of Students
                                        </span>
                                    </div>

                                    <h1 className="text-5xl md:text-7xl font-black text-white leading-tight">
                                        {slide.title}
                                    </h1>

                                    <p className="mt-6 text-lg md:text-xl text-gray-200 max-w-2xl leading-relaxed">
                                        {slide.description}
                                    </p>

                                    <div className="mt-10 flex flex-wrap gap-4">

                                        <Link
                                            href="/tutors"
                                            className="
                                            btn
                                            btn-lg
                                            border-0
                                            rounded-full
                                            bg-linear-to-r
                                            from-primary
                                            to-secondary
                                            text-white
                                            px-8
                                            shadow-xl
                                            hover:scale-105
                                            transition-all
                                            "
                                        >
                                            {slide.button}
                                        </Link>

                                        <Link
                                            href="/add-tutor"
                                            className="
                                            btn
                                            btn-lg
                                            rounded-full
                                            bg-white/10
                                            backdrop-blur-md
                                            border
                                            border-white/20
                                            text-white
                                            hover:bg-white/20
                                            "
                                        >
                                            Become a Tutor
                                        </Link>
                                    </div>

                                    {/* Stats */}
                                    <div className="mt-12 flex flex-wrap gap-4">

                                        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl px-6 py-4">
                                            <div className="flex items-center gap-2 text-white">
                                                <FaUsers />
                                                <span className="font-bold text-xl">
                                                    10K+
                                                </span>
                                            </div>
                                            <p className="text-sm text-gray-300">
                                                Students
                                            </p>
                                        </div>

                                        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl px-6 py-4">
                                            <div className="flex items-center gap-2 text-white">
                                                <FaGraduationCap />
                                                <span className="font-bold text-xl">
                                                    500+
                                                </span>
                                            </div>
                                            <p className="text-sm text-gray-300">
                                                Tutors
                                            </p>
                                        </div>

                                        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl px-6 py-4">
                                            <div className="flex items-center gap-2 text-white">
                                                <FaStar />
                                                <span className="font-bold text-xl">
                                                    4.9
                                                </span>
                                            </div>
                                            <p className="text-sm text-gray-300">
                                                Rating
                                            </p>
                                        </div>

                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                ))}

                {/* Navigation */}
                <div className="absolute z-30 left-0 right-0 top-1/2 -translate-y-1/2 flex justify-between px-6">

                    <button
                        onClick={prevSlide}
                        className="
                        w-14 h-14
                        rounded-full
                        bg-white/10
                        backdrop-blur-xl
                        border border-white/20
                        text-white
                        flex items-center justify-center
                        hover:bg-white/20
                        transition-all
                        "
                    >
                        <FaArrowLeft />
                    </button>

                    <button
                        onClick={nextSlide}
                        className="
                        w-14 h-14
                        rounded-full
                        bg-white/10
                        backdrop-blur-xl
                        border border-white/20
                        text-white
                        flex items-center justify-center
                        hover:bg-white/20
                        transition-all
                        "
                    >
                        <FaArrowRight />
                    </button>

                </div>

                {/* Indicators */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-3">

                    {slides.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentSlide(index)}
                            className={`transition-all duration-300 rounded-full ${
                                currentSlide === index
                                    ? "w-12 h-3 bg-primary"
                                    : "w-3 h-3 bg-white/50"
                            }`}
                        />
                    ))}

                </div>
            </div>
        </section>
    );
};

export default Hero;