"use client";

import React, { useState } from "react";
import AddCourseDetails from "@/components/create-course/AddCourseDetails";
import AddCourseVideos from "@/components/create-course/AddCourseVideos";
import CreateCertificate from "@/components/create-course/CreateCertificate";

export default function CreateCourse() {
  const [step, setStep] = useState(1);

  const nextStep = () => {
    if (step < 1 || step >= 3) return;

    setStep((prevVal) => prevVal + 1);
  };

  const prevStep = () => {
    if (step <= 1) return;

    setStep((prevVal) => prevVal - 1);
  };

  return (
    <div>
      {step === 1 && <AddCourseDetails onNext={nextStep} />}

      {step === 2 && (
        <AddCourseVideos onNext={nextStep} onPrevious={prevStep} />
      )}

      {step === 3 && <CreateCertificate onPrevious={prevStep} />}
    </div>
  );
}
