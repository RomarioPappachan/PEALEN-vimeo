"use client";
import React from "react";
import { useCourseTestAndChallengeStore } from "@/store/courseTestAndChallengeStore";

export default function Challenge() {
  const { selectedVideoId } = useCourseTestAndChallengeStore();
  return (
    <>
      <h2 className="w-full mb-2 text-center text-lg sm:text-xl font-bold text-[var(--text-primary)] truncate">
        Challenge
      </h2>
      {/* Always visible textarea */}

      <textarea
        id={`challenge${selectedVideoId}`}
        name="challenge"
        // value={challenge}
        // onChange={(e) => setNewVideoStep(e.target.value)}
        // onKeyDown={handleAddStep}
        placeholder="Enter the Challenge"
        rows={4}
        className="w-full resize-none rounded-md p-2 outline-none text-[var(--text-secondary)] placeholder:text-[var(--text-placeholder)] placeholder:italic border border-[var(--border-primary)] focus:border-[var(--border-secondary)] transition"
      />
    </>
  );
}
