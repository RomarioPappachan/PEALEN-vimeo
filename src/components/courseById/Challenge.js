"use client";
import React, { useState } from "react";
import { useCourseTestAndChallengeStore } from "@/store/courseTestAndChallengeStore";
import EditChallenge from "./EditChallenge";
import ViewChallenge from "./ViewChallenge";

export default function Challenge() {
  const { selectedVideoId } = useCourseTestAndChallengeStore();

  const [isEdit, setIsEdit] = useState(false);

  function handleEdit() {
    if (!isEdit) {
      setIsEdit(true);
    } else {
      setIsEdit(false);
    }
  }

  return (
    <>
      <h2 className="w-full text-center text-lg sm:text-xl font-bold text-[var(--text-primary)] truncate">
        Challenge
      </h2>

      <div className="flex items-center justify-end">
        <button
          className="px-4 py-2 text-sm text-[var(--foreground-primary)] cursor-pointer"
          type="button"
          onClick={handleEdit}
        >
          {isEdit ? "Cancel" : "Edit"}
        </button>
      </div>

      {isEdit ? <EditChallenge /> : <ViewChallenge />}
    </>
  );
}
