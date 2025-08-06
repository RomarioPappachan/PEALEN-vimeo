"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useCourseDetailStore } from "@/store/courseDetailStore";

import Certificate from "@/components/courseById/Certificate";
import CourseDetail from "@/components/courseById/CourseDetail";
import CourseVideos from "@/components/courseById/CourseVideos";
import TestsAndChallenges from "@/components/courseById/TestsAndChallenges";

import { LuChevronLeft } from "react-icons/lu";

function CourseById() {
  const { courseId } = useParams();

  const { getCourseById, loadingCourseById } = useCourseDetailStore();

  const [step, setStep] = useState(1);

  useEffect(() => {
    if (courseId) getCourseById(courseId);
  }, [courseId]);

  const nextStep = () => {
    if (step < 1 || step >= 4) return;

    setStep((prevVal) => prevVal + 1);
  };

  const prevStep = () => {
    if (step <= 1) return;

    setStep((prevVal) => prevVal - 1);
  };

  // if (loadingCourseById)
  //   return (
  //     <div className="flex justify-center items-center h-screen">
  //       <div className="flex items-center justify-center space-x-2">
  //         <span className="w-4 h-4 bg-[#72C347] rounded-full animate-bounce [animation-delay:-0.3s]"></span>
  //         <span className="w-4 h-4 bg-[#72C347] rounded-full animate-bounce [animation-delay:-0.15s]"></span>
  //         <span className="w-4 h-4 bg-[#72C347] rounded-full animate-bounce"></span>
  //       </div>
  //     </div>
  //   );

  return (
    <div className="h-full">
      <div className="flex items-center justify-between">
        <Link
          href={`/dashboard/courses`}
          className="flex justify-center items-center gap-1 text-sm text-[#72C347] hover:underline"
        >
          <LuChevronLeft className="text-xl" />
          <span>Back to Courses</span>
        </Link>
      </div>

      <div>
        {step === 1 && <CourseDetail onNext={nextStep} />}
        {step === 2 && <CourseVideos onNext={nextStep} onPrevious={prevStep} />}
        {step === 3 && (
          <TestsAndChallenges onNext={nextStep} onPrevious={prevStep} />
        )}
        {step === 4 && <Certificate onPrevious={prevStep} />}
      </div>
    </div>
  );
}

export default CourseById;
