"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import { useCourseStore } from "@/store/courseStore";

import CourseNav from "@/components/courses/CourseNav";
import CourseCard from "@/components/courses/CourseCard";

import { LuPlus } from "react-icons/lu";

export default function Courses() {
  const { courses, getCourses, loading } = useCourseStore();
  console.log(courses);

  useEffect(function () {
    getCourses();
  }, []);

  return (
    <div className="">
      <div className="flex justify-between items-center">
        <CourseNav />
        <Link
          href="/dashboard/courses/create-course"
          className="text-base text-[#72C347] flex justify-center items-center gap-2 cursor-pointer"
        >
          <LuPlus />
          <span>Add Course</span>
        </Link>
      </div>

      <div className="mt-8 p-6 bg-[var(--background-secondary)] rounded-2xl flex flex-wrap gap-6">
        {courses?.length > 0 ? (
          courses.map((course, index) => (
            <CourseCard key={course.id} course={course} />
          ))
        ) : (
          <div>
            <span>No courses to display</span>
          </div>
        )}
      </div>
    </div>
  );
}
