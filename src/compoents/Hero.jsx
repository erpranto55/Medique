"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { FaCircleArrowLeft, FaCircleArrowRight } from "react-icons/fa6";

const slides = [
    {
        id: 1,
        image:
            "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1600&auto=format&fit=crop",
        title: "Find Expert Tutors For Every Subject",
        description:
            "Book personalized tutoring sessions with experienced mentors and improve your academic performance.",
        button: "Explore Tutors",
    },

    {
        id: 2,
        image:
            "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=1600&auto=format&fit=crop",
        title: "Smart & Hassle-Free Booking System",
        description:
            "Manage tutoring schedules, avoid conflicts, and book sessions instantly from anywhere.",
        button: "Book Session",
    },

    {
        id: 3,
        image:
            "https://images.unsplash.com/photo-1513258496099-48168024aec0?q=80&w=1600&auto=format&fit=crop",
        title: "Learn Anytime Anywhere",
        description:
            "Online and offline tutoring support designed for students who want flexible learning.",
        button: "Start Learning",
    },
];

const Hero = () => {

    const [currentSlide, setCurrentSlide] = useState(0);

    // AUTO SLIDE
    useEffect(() => {

        const interval = setInterval(() => {

            setCurrentSlide((prev) =>
                prev === slides.length - 1
                    ? 0
                    : prev + 1
            );

        }, 5000);

        return () => clearInterval(interval);

    }, []);

    const nextSlide = () => {
        setCurrentSlide((prev) =>
            prev === slides.length - 1
                ? 0
                : prev + 1
        );
    };

    const prevSlide = () => {
        setCurrentSlide((prev) =>
            prev === 0
                ? slides.length - 1
                : prev - 1
        );
    };

    return (
        <div className=" container mx-auto relative w-full h-[80vh] overflow-hidden rounded-3xl">

            {
                slides.map((slide, index) => (

                    <div
                        key={slide.id}
                        className={`absolute inset-0 transition-opacity duration-1000 ${currentSlide === index
                                ? "opacity-100 z-10"
                                : "opacity-0 z-0"
                            }`}
                    >

                        {/* Background */}
                        <div
                            className="w-full h-full bg-cover bg-center"
                            style={{
                                backgroundImage: `url(${slide.image})`,
                            }}
                        >

                            {/* Overlay */}
                            <div className="w-full h-full bg-black/60 flex items-center">

                                <div className="container mx-auto px-6">

                                    <div className="max-w-2xl text-white space-y-6">

                                        <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                                            {slide.title}
                                        </h1>

                                        <p className="text-lg text-gray-200 leading-8">
                                            {slide.description}
                                        </p>

                                        <div className="flex gap-4 flex-wrap">

                                            <Link
                                                href="/tutors"
                                                className="btn btn-primary btn-lg"
                                            >
                                                {slide.button}
                                            </Link>

                                            <Link
                                                href="/add-tutor"
                                                className="btn btn-outline btn-lg text-white"
                                            >
                                                Become Tutor
                                            </Link>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            }

            {/* Buttons */}
            <div className="absolute z-20 flex justify-between w-full top-1/2 -translate-y-1/2 px-5">

                <button
                    onClick={prevSlide}
                >
                    <FaCircleArrowLeft className="text-4xl" />
                </button>

                <button
                    onClick={nextSlide}
                >
                    <FaCircleArrowRight className="text-4xl" />
                </button>

            </div>

            {/* Indicators */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-3">

                {
                    slides.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentSlide(index)}
                            className={`w-3 h-3 rounded-full ${currentSlide === index
                                    ? "bg-primary"
                                    : "bg-white"
                                }`}
                        />
                    ))
                }

            </div>
        </div>
    );
};

export default Hero;