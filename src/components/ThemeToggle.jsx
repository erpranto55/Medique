"use client";

import { useEffect, useState } from "react";
import { CiLight } from "react-icons/ci";
import { IoMoonSharp } from "react-icons/io5";

const ThemeToggle = () => {

    const [theme, setTheme] = useState("light");

    useEffect(() => {

        const savedTheme =
            localStorage.getItem("theme") || "light";

        // eslint-disable-next-line react-hooks/set-state-in-effect
        setTheme(savedTheme);

        document.documentElement.setAttribute(
            "data-theme",
            savedTheme
        );

    }, []);

    const toggleTheme = () => {

        const newTheme =
            theme === "light" ? "dark" : "light";

        setTheme(newTheme);

        localStorage.setItem("theme", newTheme);

        document.documentElement.setAttribute(
            "data-theme",
            newTheme
        );
    };

    return (
        <button
            onClick={toggleTheme}
            className="btn btn-sm btn-outline rounded-full"
        >
            {
                theme === "light"
                    ? <IoMoonSharp />
                    : <CiLight />
            }
        </button>
    );
};

export default ThemeToggle;