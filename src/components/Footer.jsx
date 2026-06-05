"use client";

import Link from "next/link";
import {
    FaFacebookF,
    FaGithub,
    FaLinkedinIn,
    FaPhoneAlt,
} from "react-icons/fa";

import { FaXTwitter } from "react-icons/fa6";
import { MdEmail, MdCopyright } from "react-icons/md";

const Footer = () => {
    return (
        <footer className="relative mt-24 overflow-hidden">

            {/* Background Glow */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-primary/10 blur-3xl rounded-full" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/10 blur-3xl rounded-full" />

            <div className="container mx-auto px-4 relative z-10">



                {/* Main Footer */}
                <div
                    className="
                    rounded-[32px]
                    border
                    border-base-300/30
                    bg-base-100/70
                    backdrop-blur-xl
                    shadow-xl
                    p-10
                "
                >
                    <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">

                        {/* Brand */}
                        <div>

                            <div className="flex items-center gap-3 mb-5">

                                <div
                                    className="
                                    w-12
                                    h-12
                                    rounded-2xl
                                    bg-linear-to-br
                                    from-primary
                                    via-secondary
                                    to-accent
                                    flex
                                    items-center
                                    justify-center
                                    text-white
                                    font-black
                                    text-xl
                                    shadow-lg
                                "
                                >
                                    M
                                </div>

                                <div>
                                    <h2 className="text-2xl font-black">
                                        MediQueue
                                    </h2>

                                    <p className="text-xs text-base-content/60">
                                        Smart Tutor Platform
                                    </p>
                                </div>

                            </div>

                            <p className="text-base-content/70 leading-7">
                                MediQueue helps students discover expert
                                tutors, book sessions, and manage learning
                                efficiently through a modern and seamless
                                platform.
                            </p>

                        </div>

                        {/* Quick Links */}
                        <div>

                            <h3 className="font-bold text-lg mb-5">
                                Quick Links
                            </h3>

                            <div className="flex flex-col gap-3 text-base-content/70">

                                <Link
                                    href="/"
                                    className="hover:text-primary transition"
                                >
                                    Home
                                </Link>

                                <Link
                                    href="/tutors"
                                    className="hover:text-primary transition"
                                >
                                    Tutors
                                </Link>

                                <Link
                                    href="/add-tutor"
                                    className="hover:text-primary transition"
                                >
                                    Add Tutor
                                </Link>

                                <Link
                                    href="/my-bookings"
                                    className="hover:text-primary transition"
                                >
                                    My Bookings
                                </Link>

                            </div>

                        </div>

                        {/* Services */}
                        <div>

                            <h3 className="font-bold text-lg mb-5">
                                Learning Services
                            </h3>

                            <div className="space-y-3 text-base-content/70">

                                <p>Online Tutoring</p>
                                <p>Offline Coaching</p>
                                <p>Academic Mentorship</p>
                                <p>Skill Development</p>
                                <p>Exam Preparation</p>

                            </div>

                        </div>

                        {/* Contact */}
                        <div>

                            <h3 className="font-bold text-lg mb-5">
                                Contact Us
                            </h3>

                            <div className="space-y-4 text-base-content/70">

                                <div className="flex items-center gap-3">
                                    <MdEmail className="text-primary text-lg" />
                                    <span>
                                        support@mediqueue.com
                                    </span>
                                </div>

                                <div className="flex items-center gap-3">
                                    <FaPhoneAlt className="text-primary text-lg" />
                                    <span>
                                        +880 1234-567890
                                    </span>
                                </div>

                            </div>

                            {/* Social */}
                            <div className="flex gap-3 mt-6">

                                <Link
                                    href="https://facebook.com"
                                    target="_blank"
                                    className="
                                    w-11
                                    h-11
                                    rounded-full
                                    bg-base-200
                                    flex
                                    items-center
                                    justify-center
                                    hover:bg-primary
                                    hover:text-white
                                    transition-all
                                    duration-300
                                "
                                >
                                    <FaFacebookF />
                                </Link>

                                <Link
                                    href="https://github.com"
                                    target="_blank"
                                    className="
                                    w-11
                                    h-11
                                    rounded-full
                                    bg-base-200
                                    flex
                                    items-center
                                    justify-center
                                    hover:bg-primary
                                    hover:text-white
                                    transition-all
                                    duration-300
                                "
                                >
                                    <FaGithub />
                                </Link>

                                <Link
                                    href="https://linkedin.com"
                                    target="_blank"
                                    className="
                                    w-11
                                    h-11
                                    rounded-full
                                    bg-base-200
                                    flex
                                    items-center
                                    justify-center
                                    hover:bg-primary
                                    hover:text-white
                                    transition-all
                                    duration-300
                                "
                                >
                                    <FaLinkedinIn />
                                </Link>

                                <Link
                                    href="https://x.com"
                                    target="_blank"
                                    className="
                                    w-11
                                    h-11
                                    rounded-full
                                    bg-base-200
                                    flex
                                    items-center
                                    justify-center
                                    hover:bg-primary
                                    hover:text-white
                                    transition-all
                                    duration-300
                                "
                                >
                                    <FaXTwitter />
                                </Link>

                            </div>

                        </div>
                    </div>

                    {/* Bottom */}
                    <div className="border-t border-base-300/30 mt-10 pt-6">

                        <div
                            className="
                            flex
                            flex-col
                            md:flex-row
                            items-center
                            justify-between
                            gap-4
                            text-sm
                            text-base-content/60
                        "
                        >
                            <div className="flex items-center gap-2">
                                <MdCopyright />
                                <span>
                                    {new Date().getFullYear()} MediQueue.
                                    All rights reserved.
                                </span>
                            </div>

                            <div className="flex gap-6">
                                <Link href="#">
                                    Privacy Policy
                                </Link>

                                <Link href="#">
                                    Terms of Service
                                </Link>

                                <Link href="#">
                                    Support
                                </Link>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </footer>
    );
};

export default Footer;