"use client";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";

export default function CourseNav() {
  const pathname = usePathname();
  return (
    <nav>
      <ul className="flex gap-6">
        <Link href="/dashboard/courses">
          <li
            className={`text-[var(--text-secondary)] text-sm ${
              pathname === "/dashboard/courses"
                ? "border-b-2 border-[var(--border-secondary)]"
                : ""
            }`}
          >
            Master Courses
          </li>
        </Link>
        <Link href="/dashboard/courses/created-course">
          <li
            className={`text-[var(--text-secondary)] text-sm ${
              pathname === "/dashboard/courses/master-courses"
                ? "border-b-2 border-[var(--border-secondary)]"
                : ""
            }`}
          >
            Created Courses
          </li>
        </Link>
      </ul>
    </nav>
  );
}
