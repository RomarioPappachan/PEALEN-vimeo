"use client";
import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { useParams } from "next/navigation";
import { useCourseTestAndChallengeStore } from "@/store/courseTestAndChallengeStore";
import Questions from "./Questions";
import Challenge from "./Challenge";

export default function Test({ videoId, onClose }) {
  const { courseId } = useParams();
  const { selectedVideoId } = useCourseTestAndChallengeStore();

  //   useEffect(() => {
  //     // API to get test
  //   }, []);

  //   if (!selectedVideoId) <div>Loading...</div>;

  return createPortal(
    <div className="fixed inset-0 z-50 flex justify-center items-start sm:items-center overflow-auto px-4 py-6 bg-black/40 animate-fadeIn">
      <div className="relative w-full max-w-3xl sm:max-w-4xl md:max-w-5xl max-h-[90vh] rounded-3xl shadow-2xl border bg-[var(--background-primary)] p-0 overflow-hidden animate-popIn flex flex-col border-[var(--border-secondary)]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 sm:px-8 py-4 bg-[var(--background-primary)] relative">
          <h2 className="w-full text-center text-lg sm:text-xl font-bold text-[var(--text-primary)] truncate">
            Questions
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-6 sm:right-8 ml-4 px-3 py-2 rounded-full font-semibold shadow-lg transition disabled:opacity-60 cursor-pointer bg-[var(--border-secondary)] text-white"
            aria-label="Close video steps"
          >
            {/* <LuX className="text-lg sm:text-xl" /> */}
            Close
          </button>
        </div>

        {/* Content: flex column with scrollable list and fixed textarea */}
        <div className="flex flex-col px-6 sm:px-8 pt-6 pb-6 flex-1 min-h-0">
          {/* Scrollable Steps List */}
          <div className="flex-1 overflow-y-auto mb-4 rounded-md border border-[var(--border-primary)] focus-within:border-[var(--border-secondary)] relative p-3.5 min-h-0">
            <Questions />
            {/* {Array.from({ length: 20 }, (_, idx) => {
              return <Questions key={idx} />;
            })} */}
          </div>

          <div>
            <Challenge />
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
