import Link from "next/link";
import {
    FaFacebookF,
    FaGithub,
    FaLinkedinIn,
} from "react-icons/fa";

import { FaXTwitter } from "react-icons/fa6";
import { MdCopyright } from "react-icons/md";
import { MdEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="bg-base-200 mt-20">

            <div className="container mx-auto px-4 py-12">

                {/* Main Footer */}
                <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4 text-center md:text-left">

                    {/* Logo */}
                    <div className="flex flex-col items-center md:items-start">

                        <h2 className="text-3xl font-bold text-primary mb-4">
                            MediQueue
                        </h2>

                        <p className="text-sm leading-7 text-base-content/80">
                            MediQueue is a modern tutor booking platform where
                            students can discover tutors, schedule sessions,
                            and manage learning efficiently.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className="flex flex-col items-center md:items-start">

                        <h3 className="footer-title">
                            Quick Links
                        </h3>

                        <div className="flex flex-col gap-2">

                            <Link href="/">
                                Home
                            </Link>

                            <Link href="/tutors">
                                Tutors
                            </Link>

                            <Link href="/add-tutor">
                                Add Tutor
                            </Link>

                            <Link href="/my-bookings">
                                My Booked Sessions
                            </Link>

                        </div>
                    </div>

                    {/* Services */}
                    <div className="flex flex-col items-center md:items-start">

                        <h3 className="footer-title">
                            Learning Services
                        </h3>

                        <div className="flex flex-col gap-2 text-sm">

                            <p>Online Classes</p>
                            <p>Offline Coaching</p>
                            <p>Academic Mentorship</p>
                            <p>Skill Development</p>

                        </div>
                    </div>

                    {/* Contact & Social */}
                    <div className="flex flex-col items-center md:items-start">

                        <h3 className="footer-title">
                            Contact Us
                        </h3>

                        <div className="space-y-3 text-sm">

                            <p className="flex items-center gap-2">
                                <MdEmail />
                                support@mediqueue.com
                            </p>

                            <p className="flex items-center gap-2">
                                <FaPhoneAlt />
                                +880 1234-567890
                            </p>

                        </div>

                        {/* Social */}
                        <div className="flex items-center gap-3 mt-5">

                            <Link
                                href="https://facebook.com"
                                target="_blank"
                                className="btn btn-circle btn-outline btn-sm"
                            >
                                <FaFacebookF />
                            </Link>

                            <Link
                                href="https://github.com"
                                target="_blank"
                                className="btn btn-circle btn-outline btn-sm"
                            >
                                <FaGithub />
                            </Link>

                            <Link
                                href="https://linkedin.com"
                                target="_blank"
                                className="btn btn-circle btn-outline btn-sm"
                            >
                                <FaLinkedinIn />
                            </Link>

                            <Link
                                href="https://x.com"
                                target="_blank"
                                className="btn btn-circle btn-outline btn-sm"
                            >
                                <FaXTwitter />
                            </Link>

                        </div>
                    </div>
                </div>

                {/* Bottom */}
                <div className="border-t border-base-300 mt-10 pt-6">

                    <div className="flex items-center justify-center gap-2 text-sm text-center">

                        <MdCopyright className="text-lg" />

                        <p>
                            {new Date().getFullYear()} MediQueue.
                            All rights reserved.
                        </p>

                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;