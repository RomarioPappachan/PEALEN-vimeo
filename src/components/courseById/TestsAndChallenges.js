"use client";
import { useState } from "react";
import { useCourseDetailStore } from "@/store/courseDetailStore";
import TestAndChallengeItem from "./TestAndChallengeItem";

function TestsAndChallenges({ onNext, onPrevious }) {
  const { introVideos, classVideos, conclusionVideos } = useCourseDetailStore();

  return (
    <div className="bg-[var(--background-primary)]">
      <h2 className="mb-2 text-[var(--text-primary)] text-lg font-semibold"></h2>
      <div>
        {/* Intro Videos  */}
        <div className="mt-8">
          <h2 className="mb-2 text-[var(--text-primary)] text-base font-light">
            Class Videos (Intro videos)
          </h2>
          <div className="space-y-2">
            {introVideos.length > 0 &&
              introVideos.map((video, idx) => (
                <TestAndChallengeItem
                  key={video.id}
                  index={idx}
                  video={video}
                />
              ))}
          </div>
        </div>

        {/* Main class videos */}
        <div className="mt-8">
          <h2 className="mb-2 text-[var(--text-primary)] text-base font-light">
            Main Class Videos
          </h2>
          <div className="space-y-2">
            {classVideos.length > 0 &&
              classVideos.map((video, idx) => (
                <TestAndChallengeItem
                  key={video.id}
                  index={idx}
                  video={video}
                />
              ))}
          </div>
        </div>

        {/* Conclusion Videos */}
        <div className="mt-8">
          <h2 className="mb-2 text-[var(--text-primary)] text-base font-light">
            Conclusion Videos
          </h2>
          <div className="space-y-2">
            {conclusionVideos.length > 0 &&
              conclusionVideos.map((video, idx) => (
                <TestAndChallengeItem
                  key={video.id}
                  index={idx}
                  video={video}
                />
              ))}
          </div>
        </div>
      </div>

      {/* buttons  */}
      <div className="flex justify-end gap-8 mt-6">
        <button
          type="button"
          className="w-80 px-6 py-2 h-10 text-base bg-[#9D9D9D] text-white font-semibold rounded-xl cursor-pointer"
          onClick={() => onPrevious()}
        >
          Back
        </button>
        <button
          className="w-80 px-6 py-2 h-10 text-base bg-[#72c347] text-white font-semibold rounded-xl cursor-pointer"
          type="button"
          onClick={() => onNext()}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default TestsAndChallenges;
