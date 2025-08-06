"use client";
import React from "react";
import { useCourseTestAndChallengeStore } from "@/store/courseTestAndChallengeStore";

export default function Questions() {
  const { selectedVideoId, questions = [] } = useCourseTestAndChallengeStore();

  return (
    <>
      {questions.length > 0 ? (
        <ul className="list-disc pl-5 space-y-2 text-[var(--text-secondary)]">
          {questions.map((step, index) => (
            <li key={index} className="relative pr-6 break-words">
              <span>{step}</span>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  handleDeleteStep(index);
                }}
                className="absolute right-0 top-0 w-6 h-6 bg-[var(--text-secondary)] text-white hover:bg-red-400 rounded-full flex justify-center items-center cursor-pointer"
                title="Delete"
                type="button"
              >
                <LuX size={14} />
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-[var(--text-secondary)] italic">
          No questions added yet
        </p>
      )}
    </>
  );
}
