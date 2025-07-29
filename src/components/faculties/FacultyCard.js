"use client";
import React from "react";
import { useRouter } from "next/navigation";

export default function FacultyCard({ faculty }) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/dashboard/faculties/${faculty?.id}`);
  };
  return (
    <div
      className="bg-[var(--background-primary)] rounded-3xl px-10 py-6 space-y-3 drop-shadow-md cursor-pointer"
      onClick={handleClick}
    >
      <div className="mx-auto size-[88px] rounded-full overflow-hidden  flex justify-center items-center drop-shadow-xs">
        <img
          className="h-full object-cover"
          src={faculty.profilePicture}
          alt={`${faculty.firstName} profile`}
        />
      </div>

      <h3 className="text-sm text-[#72C347] font-semibold text-center">
        {faculty.firstName}
      </h3>
      <p className="text-xs text-[var(--text-secondary)] text-center">
        {faculty.designation}
      </p>
    </div>
  );
}
