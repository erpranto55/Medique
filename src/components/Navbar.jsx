"use client";

import Link from "next/link";
import Image from "next/image";
import { useContext } from "react";
import { usePathname } from "next/navigation";
import { AuthContext } from "@/providers/AuthProvider";
import { toast } from "react-toastify";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
    const { user, logoutUser } = useContext(AuthContext);
    const pathname = usePathname();

    const activeClass = (path) => {
        return pathname === path
            ? "bg-linear-to-r from-primary to-secondary text-white shadow-lg scale-105"
            : "hover:bg-base-200 hover:scale-105";
    };

    const navItemClass = (path) =>
        `px-5 py-2.5 rounded-full font-medium transition-all duration-300 ${activeClass(
            path
        )}`;

    const handleLogout = async () => {
        try {
            await logoutUser();
            toast.success("Logout Successful");
        } catch (error) {
            console.log(error);
            toast.error("Logout Failed");
        }
    };

    const navLinks = (
        <>
            <li>
                <Link href="/" className={navItemClass("/")}>
                    Home
                </Link>
            </li>

            <li>
                <Link href="/tutors" className={navItemClass("/tutors")}>
                    Tutors
                </Link>
            </li>

            {user && (
                <>
                    <li>
                        <Link
                            href="/add-tutor"
                            className={navItemClass("/add-tutor")}
                        >
                            Add Tutor
                        </Link>
                    </li>

                    <li>
                        <Link
                            href="/my-tutors"
                            className={navItemClass("/my-tutors")}
                        >
                            My Tutors
                        </Link>
                    </li>

                    <li>
                        <Link
                            href="/my-bookings"
                            className={navItemClass("/my-bookings")}
                        >
                            My Bookings
                        </Link>
                    </li>
                </>
            )}
        </>
    );

    return (
        <header
            className="
            sticky top-0 z-50
            bg-base-100/70
            backdrop-blur-2xl
            border-b border-base-300/20
            shadow-[0_8px_30px_rgb(0,0,0,0.08)]
            "
        >
            <div className="container mx-auto px-4">
                <div className="navbar py-4 relative">

                    {/* TOP GLOW */}
                    <div
                        className="
                        absolute
                        left-1/2
                        top-0
                        -translate-x-1/2
                        h-0.5
                        w-40
                        bg-linear-to-r
                        from-transparent
                        via-primary
                        to-transparent
                        "
                    />

                    {/* LEFT */}
                    <div className="navbar-start">
                        <Link
                            href="/"
                            className="flex items-center gap-3 group"
                        >
                            <div
                                className="
                                w-12 h-12
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
                                shadow-xl
                                group-hover:rotate-6
                                group-hover:scale-110
                                transition-all
                                duration-300
                                "
                            >
                                M
                            </div>

                            <div>
                                <h2 className="font-black text-xl md:text-2xl leading-none">
                                    MediQueue
                                </h2>

                                <p className="text-xs text-base-content/60">
                                    Smart Appointment System
                                </p>
                            </div>
                        </Link>
                    </div>

                    {/* CENTER */}
                    <div className="navbar-center hidden lg:flex">
                        <ul
                            className="
                            flex
                            items-center
                            gap-2
                            bg-base-200/40
                            backdrop-blur-lg
                            border
                            border-base-300/30
                            px-2
                            py-2
                            rounded-full
                            shadow-lg
                            "
                        >
                            {navLinks}
                        </ul>
                    </div>

                    {/* RIGHT */}
                    <div className="navbar-end gap-3">
                        <ThemeToggle />

                        {/* MOBILE MENU */}
                        <div className="dropdown dropdown-end lg:hidden">
                            <div
                                tabIndex={0}
                                role="button"
                                className="
                                btn
                                btn-ghost
                                btn-circle
                                hover:bg-primary/10
                                "
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-6 h-6"
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
                                className="
                                menu
                                menu-sm
                                dropdown-content
                                mt-4
                                p-4
                                w-72
                                rounded-[28px]
                                bg-base-100/80
                                backdrop-blur-2xl
                                shadow-[0_20px_60px_rgba(0,0,0,0.15)]
                                border
                                border-base-300/20
                                z-100
                                "
                            >
                                {navLinks}

                                <div className="divider my-2" />

                                {user ? (
                                    <>
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
                                    </>
                                ) : (
                                    <>
                                        <li>
                                            <Link
                                                href="/login"
                                                className="
                                                btn
                                                border-0
                                                rounded-full
                                                bg-linear-to-r
                                                from-primary
                                                to-secondary
                                                text-white
                                                "
                                            >
                                                Login
                                            </Link>
                                        </li>

                                        <li className="mt-2">
                                            <Link
                                                href="/register"
                                                className="
                                                btn
                                                rounded-full
                                                btn-outline
                                                "
                                            >
                                                Register
                                            </Link>
                                        </li>
                                    </>
                                )}
                            </ul>
                        </div>

                        {/* USER */}
                        {user ? (
                            <div className="dropdown dropdown-end hidden lg:block">
                                <div
                                    tabIndex={0}
                                    role="button"
                                    className="
                                    btn
                                    btn-ghost
                                    btn-circle
                                    avatar
                                    "
                                >
                                    <div
                                        className="
                                        relative
                                        w-12
                                        h-12
                                        rounded-full
                                        ring-2
                                        ring-primary
                                        ring-offset-2
                                        ring-offset-base-100
                                        overflow-hidden
                                        shadow-xl
                                        "
                                    >
                                        <Image
                                            src={
                                                user?.photoURL ||
                                                "/avatar.png"
                                            }
                                            alt="Profile"
                                            fill
                                            className="object-cover"
                                        />

                                        <span
                                            className="
                                            absolute
                                            bottom-0
                                            right-0
                                            w-3.5
                                            h-3.5
                                            bg-green-500
                                            rounded-full
                                            border-2
                                            border-base-100
                                            "
                                        />
                                    </div>
                                </div>

                                <ul
                                    tabIndex={0}
                                    className="
                                    menu
                                    menu-sm
                                    dropdown-content
                                    mt-4
                                    p-4
                                    w-80
                                    rounded-[28px]
                                    bg-base-100/90
                                    backdrop-blur-2xl
                                    shadow-2xl
                                    border
                                    border-base-300/20
                                    z-100
                                    "
                                >
                                    <div className="bg-base-200 rounded-2xl p-4 mb-3">
                                        <h2 className="font-bold text-lg">
                                            {user?.displayName || "User"}
                                        </h2>

                                        <p className="text-sm text-base-content/70 break-all">
                                            {user?.email}
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
                            <div className="hidden lg:flex items-center gap-3">
                                <Link
                                    href="/login"
                                    className="
                                    btn
                                    border-0
                                    rounded-full
                                    px-6
                                    bg-linear-to-r
                                    from-primary
                                    to-secondary
                                    text-white
                                    shadow-lg
                                    hover:scale-105
                                    transition-all
                                    duration-300
                                    "
                                >
                                    Login
                                </Link>

                                <Link
                                    href="/register"
                                    className="
                                    btn
                                    rounded-full
                                    border-2
                                    border-primary/30
                                    hover:border-primary
                                    hover:bg-primary
                                    hover:text-white
                                    px-6
                                    transition-all
                                    duration-300
                                    "
                                >
                                    Register
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Navbar;