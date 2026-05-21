"use client";

import Link from "next/link";
import Image from "next/image";

import {
    useContext,
} from "react";

import {
    usePathname,
} from "next/navigation";

import {
    AuthContext,
} from "@/providers/AuthProvider";

import {
    toast,
} from "react-toastify";

import ThemeToggle from "./ThemeToggle";

const Navbar = () => {

    const {
        user,
        logoutUser,
    } = useContext(AuthContext);

    const pathname =
        usePathname();

    // ACTIVE CLASS
    const activeClass =
        (path) => {

            return pathname === path
                ? "text-primary font-bold bg-primary/10 rounded-lg"
                : "";
        };

    // LOGOUT
    const handleLogout =
        async () => {

            try {

                await logoutUser();

                toast.success(
                    "Logout Successful"
                );

            } catch (error) {

                console.log(error);

                toast.error(
                    "Logout Failed"
                );
            }
        };

    // MOBILE + DESKTOP NAV LINKS
    const navLinks = (
        <>

            <li>

                <Link
                    href="/"
                    className={activeClass("/")}
                >

                    Home

                </Link>

            </li>

            <li>

                <Link
                    href="/tutors"
                    className={activeClass("/tutors")}
                >

                    Tutors

                </Link>

            </li>

            {
                user && (
                    <>



                        <li>

                            <Link
                                href="/add-tutor"
                                className={activeClass("/add-tutor")}
                            >

                                Add Tutor

                            </Link>

                        </li>

                        <li>

                            <Link
                                href="/my-tutors"
                                className={activeClass("/my-tutors")}
                            >

                                My Tutors

                            </Link>

                        </li>

                        <li>

                            <Link
                                href="/my-bookings"
                                className={activeClass("/my-bookings")}
                            >

                                My Bookings

                            </Link>

                        </li>

                    </>
                )
            }

        </>
    );

    return (

        <div className="bg-base-100 shadow-sm px-3 md:px-8 sticky top-0 z-50">

            <div className="container mx-auto navbar">

                {/* LEFT */}
                <div className="navbar-start">

                    {/* LOGO */}
                    <Link
                        href="/"
                        className="text-xl md:text-3xl font-bold text-primary"
                    >

                        MediQueue

                    </Link>

                </div>

                {/* CENTER DESKTOP */}
                <div className="navbar-center hidden md:flex">

                    <ul className="menu menu-horizontal px-1 gap-2">

                        {navLinks}

                    </ul>

                </div>

                {/* RIGHT */}
                <div className="navbar-end gap-2">

                    {/* THEME TOGGLE */}
                    <ThemeToggle />

                    {/* MOBILE MENU */}
                    <div className="dropdown dropdown-end md:hidden">

                        <div
                            tabIndex={0}
                            role="button"
                            className="btn btn-ghost btn-circle"
                        >

                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >

                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h16"
                                />

                            </svg>

                        </div>

                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content mt-3 right-0 z-100 p-3 shadow bg-base-100 rounded-2xl w-64 border border-base-300"
                        >

                            {navLinks}

                            {
                                user ? (

                                    <>
                                        <li className="mt-2">

                                            <Link
                                                href="/profile"
                                                className={activeClass("/profile")}
                                            >

                                                Profile

                                            </Link>

                                        </li>
                                        <li >

                                            <button
                                                onClick={handleLogout}
                                                className="text-error font-semibold"
                                            >

                                                Logout

                                            </button>

                                        </li>

                                    </>

                                ) : (

                                    <>

                                        <li className="mt-3">

                                            <Link
                                                href="/login"
                                                className="btn btn-primary btn-sm w-full"
                                            >

                                                Login

                                            </Link>

                                        </li>

                                        <li>

                                            <Link
                                                href="/register"
                                                className="btn btn-outline btn-sm w-full"
                                            >

                                                Register

                                            </Link>

                                        </li>

                                    </>

                                )
                            }

                        </ul>

                    </div>

                    {/* DESKTOP USER */}
                    {
                        user ? (

                            <div className="dropdown dropdown-end hidden md:block">

                                {/* PROFILE BUTTON */}
                                <div
                                    tabIndex={0}
                                    role="button"
                                    className="btn btn-ghost btn-circle avatar"
                                >

                                    <div className="w-10 rounded-full border-2 border-primary">

                                        <Image
                                            src={
                                                user?.photoURL
                                                    ? user.photoURL
                                                    : "/avatar.png"
                                            }
                                            alt="User Profile"
                                            width={40}
                                            height={40}
                                            className="rounded-full object-cover"
                                        />

                                    </div>

                                </div>

                                {/* DROPDOWN */}
                                <ul
                                    tabIndex={0}
                                    className="menu menu-sm dropdown-content mt-3 z-100 p-3 shadow bg-base-100 rounded-2xl w-64 border border-base-300"
                                >

                                    {/* USER INFO */}
                                    <div className="pb-3 border-b border-base-300 mb-2">

                                        <h2 className="font-bold text-lg">

                                            {
                                                user?.displayName ||
                                                "User"
                                            }

                                        </h2>

                                        <p className="text-sm text-base-content/70 break-all">

                                            {
                                                user?.email
                                            }

                                        </p>

                                    </div>

                                    <li>

                                        <Link href="/profile">

                                            Profile

                                        </Link>

                                    </li>

                                    <li className="mt-2">

                                        <button
                                            onClick={handleLogout}
                                            className="text-error font-semibold"
                                        >

                                            Logout

                                        </button>

                                    </li>

                                </ul>

                            </div>

                        ) : (

                            <div className="hidden md:flex items-center gap-2">

                                <Link
                                    href="/login"
                                    className="btn btn-primary btn-sm"
                                >

                                    Login

                                </Link>

                                <Link
                                    href="/register"
                                    className="btn btn-outline btn-sm"
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