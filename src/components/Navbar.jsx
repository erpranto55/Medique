"use client";

import Link from "next/link";
import { FaUserCircle } from "react-icons/fa";
import ThemeToggle from "./ThemeToggle";
import { GiHamburgerMenu } from "react-icons/gi";

const Navbar = () => {

    // temporary auth state
    const user = true;
    // later replace with firebase/auth context

    const navLinks = (
        <>
            <li>
                <Link href="/">Home</Link>
            </li>

            <li>
                <Link href="/tutors">Tutors</Link>
            </li>

            {
                user && (
                    <>
                        <li>
                            <Link href="/add-tutor">
                                Add Tutor
                            </Link>
                        </li>

                        <li>
                            <Link href="/my-tutors">
                                My Tutors
                            </Link>
                        </li>

                        <li>
                            <Link href="/my-bookings">
                                My Booked Sessions
                            </Link>
                        </li>
                    </>
                )
            }
        </>
    );

    return (
        <div className="bg-base-100 shadow-md sticky top-0 z-50 mb-10">
            <div className="navbar container mx-auto px-4">

                {/* LEFT */}
                <div className="navbar-start">

                    {/* MOBILE MENU */}
                    <div className="dropdown">
                        <div
                            tabIndex={0}
                            role="button"
                            className="btn btn-ghost lg:hidden"
                        >
                            <GiHamburgerMenu />
                        </div>

                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content mt-3 z-1 p-2 shadow bg-base-100 rounded-box w-52"
                        >
                            {navLinks}
                        </ul>
                    </div>

                    {/* LOGO */}
                    <Link
                        href="/"
                        className="text-3xl md:text-4xl font-bold text-primary"
                    >
                        MediQueue
                    </Link>
                </div>

                {/* CENTER */}
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 gap-2 font-medium">
                        {navLinks}
                    </ul>
                </div>

                {/* RIGHT */}
                <div className="navbar-end gap-3">

                    {/* THEME TOGGLE */}
                    <ThemeToggle />

                    {
                        user ? (
                            <div className="dropdown dropdown-end">

                                <div
                                    tabIndex={0}
                                    role="button"
                                    className="avatar placeholder"
                                >
                                    <div className="bg-neutral text-neutral-content rounded-full w-10">
                                        <FaUserCircle className="text-3xl" />
                                    </div>
                                </div>

                                <ul
                                    tabIndex={0}
                                    className="menu menu-sm dropdown-content mt-3 z-1 p-2 shadow bg-base-100 rounded-box w-52"
                                >
                                    <li>
                                        <Link href="/profile">
                                            Profile
                                        </Link>
                                    </li>

                                    <li>
                                        <button>
                                            Logout
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        ) : (
                            <div className="flex gap-2">

                                <Link
                                    href="/login"
                                    className="btn btn-primary btn-sm"
                                >
                                    Login
                                </Link>

                                <Link
                                    href="/register"
                                    className="btn btn-outline btn-primary btn-sm"
                                >
                                    Register
                                </Link>

                            </div>
                        )
                    }

                </div>
            </div>
        </div>
    );
};

export default Navbar;