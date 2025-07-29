"use client";
import { useAuthStore } from "@/store/authStore";
import { useState, useEffect } from "react";

import { LuSearch, LuSun, LuMoon, LuChevronDown } from "react-icons/lu";
import { FaUserCircle } from "react-icons/fa";

function Navbar() {
  const { user, logout } = useAuthStore();
  const [isDark, setIsDark] = useState(false);

  const [isDropdown, setIsDropDown] = useState(false);

  // Load the theme from localStorage on mount
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "dark") {
      setIsDark(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  // Toggle Dark Mode
  const toggleDarkMode = () => {
    const newMode = !isDark;
    setIsDark(newMode);

    if (newMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <nav className="bg-transparent transition-all duration-300">
      <div className="pt-[42px] pb-[22px] flex justify-between items-center border-b border-b-[var(--foreground-tertiary)]/10">
        <h1 className="text-[24px] font-bold text-[var(--foreground-primary)]">
          Dashboard
        </h1>

        <div className="flex items-center">
          {/* Search Bar */}
          <div className="w-[388px] h-[47px] flex items-center bg-[var(--background-primary)] rounded-[49px] px-[18px] space-x-[11px]">
            {/* <img src="/search-icon.svg" alt="search" className="size-[11px]" /> */}
            <LuSearch className="text-2xl text-blue-500" />
            <input
              type="search"
              placeholder="Search"
              className="w-full outline-none placeholder:text-[#B1B1B1] dark:placeholder:text-gray-400 bg-transparent text-[var(--foreground-primary)]"
            />
          </div>

          {/* Dark Mode Toggle Button (No Change) */}
          <button
            className={`ms-[25px] me-[11px] size-12 cursor-pointer flex justify-center items-center rounded-full bg-[var(--background-primary)] transition-all duration-300`}
            onClick={toggleDarkMode}
          >
            {isDark ? (
              <LuSun className="text-2xl text-[var(--foreground-primary)]" />
            ) : (
              <LuMoon className="text-2xl text-[var(--foreground-primary)]" />
            )}
          </button>

          {/* User Profile */}
          <div className="flex items-center gap-x-4 relative">
            {/* <img src="/Avatar.svg" alt="User Avatar" /> */}

            <div className="ms-[25px] me-[11px] size-12 cursor-pointer flex justify-center items-center rounded-full bg-[var(--background-primary)]">
              <FaUserCircle className="text-2xl text-[var(--foreground-primary)]" />
            </div>
            <span className="text-[16px] text-[var(--foreground-primary)]">
              {user?.username}
            </span>
            <button
              className="cursor-pointer"
              onClick={() => setIsDropDown(!isDropdown)}
            >
              <LuChevronDown
                className={`text-2xl text-[var(--foreground-tertiary)] transition-all duration-300 ${
                  isDropdown ? "rotate-180" : ""
                } `}
              />
            </button>
            {isDropdown && (
              <div className="absolute z-20 top-14 -right-0 w-64 h-96 p-4 bg-[var(--background-primary)] text-[var(--foreground-tertiary)] rounded-lg border border-gray-300 drop-shadow-lg">
                <button
                  className="w-full p-2 cursor-pointer bg-transparent text-[var(--foreground-primary)]"
                  onClick={logout}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
