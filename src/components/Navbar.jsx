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

            return pathname ===
                path
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

    // NAV LINKS
    const navLinks = (
        <>

            <li>

                <Link
                    href="/"
                    className={activeClass(
                        "/"
                    )}
                >

                    Home

                </Link>

            </li>

            <li>

                <Link
                    href="/tutors"
                    className={activeClass(
                        "/tutors"
                    )}
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
                                className={activeClass(
                                    "/add-tutor"
                                )}
                            >

                                Add Tutor

                            </Link>

                        </li>

                        <li>

                            <Link
                                href="/my-tutors"
                                className={activeClass(
                                    "/my-tutors"
                                )}
                            >

                                My Tutors

                            </Link>

                        </li>

                        <li>

                            <Link
                                href="/my-bookings"
                                className={activeClass(
                                    "/my-bookings"
                                )}
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

        <div className="bg-base-100 shadow-sm px-4 md:px-8 sticky top-0 z-50">

            <div className="container mx-auto navbar">

                {/* START */}
                <div className="navbar-start">

                    {/* MOBILE MENU */}
                    <div className="dropdown">

                        <div
                            tabIndex={0}
                            role="button"
                            className="btn btn-ghost lg:hidden"
                        >

                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >

                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16"
                                />

                            </svg>

                        </div>

                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
                        >

                            {navLinks}

                        </ul>

                    </div>

                    {/* LOGO */}
                    <Link
                        href="/"
                        className="text-3xl font-bold text-primary"
                    >

                        MediQueue

                    </Link>

                </div>

                {/* CENTER */}
                <div className="navbar-center hidden lg:flex">

                    <ul className="menu menu-horizontal px-1 gap-2">

                        {navLinks}

                    </ul>

                </div>

                {/* END */}
                <div className="navbar-end gap-3">

                    {/* THEME */}
                    <ThemeToggle />

                    {
                        user ? (
                            <>

                                {/* USER IMAGE */}
                                <div>

                                    <Image
                                        src={
                                            user?.photoURL
                                                ? user.photoURL
                                                : "/avatar.png"
                                        }
                                        alt="User Profile"
                                        width={40}
                                        height={40}
                                        className="rounded-full object-cover cursor-pointer"
                                    />

                                </div>

                                {/* LOGOUT */}
                                <button
                                    onClick={
                                        handleLogout
                                    }
                                    className="btn btn-error btn-sm text-white"
                                >

                                    Logout

                                </button>

                            </>
                        ) : (
                            <>

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

                            </>
                        )
                    }

                </div>

            </div>

        </div>
    );
};

export default Navbar;