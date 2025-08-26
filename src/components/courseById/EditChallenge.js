"use client";
import React from "react";
import { useCourseTestAndChallengeStore } from "@/store/courseTestAndChallengeStore";

export default function EditChallenge() {
  const { selectedVideoId } = useCourseTestAndChallengeStore();

  return (
    <form>
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
      <div className="flex items-center justify-end">
        <button
          className="px-4 py-2 text-sm text-[var(--foreground-primary)] cursor-pointer"
          type="submit"
        >
          Save
        </button>
      </div>
    </form>
  );
}
