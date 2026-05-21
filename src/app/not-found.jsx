"use client";

import Link from "next/link";

const NotFoundPage = () => {

    return (

        <div className="min-h-screen flex items-center justify-center px-4">

            <div className="text-center max-w-xl">

                {/* ERROR CODE */}
                <h1 className="text-8xl md:text-9xl font-black text-primary mb-6">

                    404

                </h1>

                {/* TITLE */}
                <h2 className="text-4xl font-bold mb-4">

                    Page Not Found

                </h2>

                {/* DESCRIPTION */}
                <p className="text-base-content/70 leading-7 mb-10">

                    The page you are looking for does not exist
                    or may have been moved.

                </p>

                {/* BUTTON */}
                <Link
                    href="/"
                    className="btn btn-primary btn-wide"
                >
                    Back To Home
                </Link>

            </div>

        </div>
    );
};

export default NotFoundPage;