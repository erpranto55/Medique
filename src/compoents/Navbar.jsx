"use client";

import Link from "next/link";
import { FaUserCircle } from "react-icons/fa";

const Navbar = () => {
    const navLinks = (
        <>
            <li>
                <Link href="/">Home</Link>
            </li>

            <li>
                <Link href="/tutors">Tutors</Link>
            </li>

            <li>
                <Link href="/add-tutor">Add Tutor</Link>
            </li>

            <li>
                <Link href="/my-tutors">My Tutors</Link>
            </li>

            <li>
                <Link href="/my-bookings">My Booked Sessions</Link>
            </li>
        </>
    );

    return (
        <div className="bg-base-100 shadow-md sticky top-0 z-50">
            <div className="navbar container mx-auto px-4">
                {/* Left */}
                <div className="navbar-start">
                    {/* Mobile Menu */}
                    <div className="dropdown">
                        <div
                            tabIndex={0}
                            role="button"
                            className="btn btn-ghost lg:hidden"
                        >
                            ☰
                        </div>

                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
                        >
                            {navLinks}
                        </ul>
                    </div>

                    {/* Logo */}
                    <Link
                        href="/"
                        className="text-4xl font-bold text-primary"
                    >
                        MediQueue
                    </Link>
                </div>

                {/* Center */}
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 gap-2 font-medium">
                        {navLinks}
                    </ul>
                </div>

                {/* Right */}
                <div className="navbar-end gap-3">
                    <button className="btn btn-primary btn-sm">
                        Login
                    </button>

                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button">
                            <FaUserCircle className="text-3xl cursor-pointer" />
                        </div>

                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content mt-3 z-1 p-2 shadow bg-base-100 rounded-box w-52"
                        >
                            <li>
                                <Link href="/profile">Profile</Link>
                            </li>

                            <li>
                                <button>Logout</button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;