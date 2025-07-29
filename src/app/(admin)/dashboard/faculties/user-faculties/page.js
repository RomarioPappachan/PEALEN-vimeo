import React from "react";
import FacultyNav from "@/components/faculties/FacultyNav";
import { LuPlus } from "react-icons/lu";

export default function UserFaculties() {
  return (
    <div>
      <div className="flex justify-between items-center">
        <FacultyNav />
        {/* <button className="text-base text-[#72C347] flex justify-center items-center gap-2 cursor-pointer">
          <LuPlus />
          <span>Add Faculties</span>
        </button> */}
      </div>
    </div>
  );
}
