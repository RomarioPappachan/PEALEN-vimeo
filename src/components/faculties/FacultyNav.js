"use client";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";

export default function FacultyNav() {
  const pathname = usePathname();
  return (
    <nav>
      <ul className="flex gap-6">
        <Link href="/dashboard/faculties">
          <li
            className={`text-[var(--text-secondary)] text-sm ${
              pathname === "/dashboard/faculties"
                ? "border-b-2 border-[var(--border-secondary)]"
                : ""
            }`}
          >
            Our Faculties
          </li>
        </Link>
        <Link href="/dashboard/faculties/user-faculties">
          <li
            className={`text-[var(--text-secondary)] text-sm ${
              pathname === "/dashboard/faculties/user-faculties"
                ? "border-b-2 border-[var(--border-secondary)]"
                : ""
            }`}
          >
            User Faculties
          </li>
        </Link>
      </ul>
    </nav>
  );
}
