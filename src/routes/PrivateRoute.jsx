"use client";

import {
    AuthContext,
} from "@/providers/AuthProvider";

import {
    useRouter,
} from "next/navigation";

import {
    useContext,
    useEffect,
} from "react";

const PrivateRoute = ({
    children,
}) => {

    const {
        user,
        loading,
    } = useContext(AuthContext);

    const router = useRouter();

    useEffect(() => {

        if (
            !loading &&
            !user
        ) {

            router.push("/login");
        }

    }, [
        user,
        loading,
        router,
    ]);

    // LOADING
    if (loading) {

        return (
            <div className="min-h-screen flex items-center justify-center">

                <span className="loading loading-spinner loading-lg"></span>

            </div>
        );
    }

    // USER FOUND
    if (user) {

        return children;
    }

    return null;
};

export default PrivateRoute;