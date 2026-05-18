"use client";

import { useEffect, useState } from "react";

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
            className="btn btn-sm btn-outline"
        >
            {
                theme === "light"
                    ? "🌙"
                    : "☀️"
            }
        </button>
    );
};

export default ThemeToggle;