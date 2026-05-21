"use client";

import Link from "next/link";

const ErrorPage = ({
    error,
    reset,
}) => {

    return (

        <div className="min-h-screen flex items-center justify-center px-4">

            <div className="text-center max-w-xl">

                {/* ERROR CODE */}
                <h1 className="text-7xl md:text-8xl font-black text-error mb-6">

                    Oops!

                </h1>

                {/* TITLE */}
                <h2 className="text-4xl font-bold mb-4">

                    Something Went Wrong

                </h2>

                {/* ERROR MESSAGE */}
                <p className="text-base-content/70 leading-7 mb-4">

                    {
                        error?.message ||
                        "An unexpected error occurred."
                    }

                </p>

                <p className="text-base-content/60 mb-10">

                    Please try again or go back to the homepage.

                </p>

                {/* BUTTONS */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">

                    <button
                        onClick={() =>
                            reset()
                        }
                        className="btn btn-primary"
                    >

                        Try Again

                    </button>

                    <Link
                        href="/"
                        className="btn btn-outline"
                    >

                        Back To Home

                    </Link>

                </div>

            </div>

        </div>
    );
};

export default ErrorPage;