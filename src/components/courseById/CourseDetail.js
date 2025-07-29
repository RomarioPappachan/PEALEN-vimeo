"use client";

import { useState } from "react";
import Link from "next/link";
import EditCourseDetails from "@/components/courseById/EditCourseDetail";
import ShowCourseDetails from "@/components/courseById/ShowCourseDetails";

import { LuChevronLeft, LuPen } from "react-icons/lu";

function CourseDetail({ onNext }) {
  const [isEdit, setIsEdit] = useState(false);

  return (
    <div>
      <div className="flex items-center justify-end">
        {/* <Link
          href={`/dashboard/courses`}
          className="flex justify-center items-center gap-1 text-sm text-[#72C347] hover:underline"
        >
          <LuChevronLeft className="text-xl" />
          <span>Back</span>
        </Link> */}

        <button
          type="button"
          className="flex justify-center items-center gap-2 text-sm text-[#72C347] cursor-pointer hover:underline"
          onClick={() => {
            isEdit ? setIsEdit(false) : setIsEdit(true);
          }}
        >
          {!isEdit && <LuPen className="text-md" />}
          <span>{isEdit ? "Cancel" : "Edit Course"}</span>
        </button>
      </div>

      <div>
        {isEdit ? (
          <EditCourseDetails onEdit={setIsEdit} />
        ) : (
          <ShowCourseDetails onNext={onNext} />
        )}
      </div>
    </div>
  );
}

export default CourseDetail;
