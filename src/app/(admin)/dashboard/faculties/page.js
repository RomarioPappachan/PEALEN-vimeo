"use client";
import React, { useEffect } from "react";
import { useFacultyStore } from "@/store/facultyStore";
import FacultyCard from "@/components/faculties/FacultyCard";
import FacultyNav from "@/components/faculties/FacultyNav";

import { LuPlus } from "react-icons/lu";

export default function Faculties() {
  const { faculties, getFaculties, loading } = useFacultyStore();

  useEffect(function () {
    getFaculties();
  }, []);

  return (
    <div className="">
      <div className="flex justify-between items-center">
        <FacultyNav />
        <button className="text-base text-[#72C347] flex justify-center items-center gap-2 cursor-pointer">
          <LuPlus />
          <span>Add Faculties</span>
        </button>
      </div>
      <div className="mt-8 p-6 bg-[var(--background-secondary)] rounded-2xl flex flex-wrap gap-6">
        {faculties?.length > 0 ? (
          faculties.map((faculty, index) => (
            <FacultyCard key={faculty.id} faculty={faculty} />
          ))
        ) : (
          <div>
            <span>No faculties to display</span>
          </div>
        )}
      </div>
    </div>
  );
}
