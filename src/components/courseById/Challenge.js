"use client";
import React, { useState } from "react";
import { useCourseTestAndChallengeStore } from "@/store/courseTestAndChallengeStore";
import EditChallenge from "./EditChallenge";
import ViewChallenge from "./ViewChallenge";
import NewChallengeForm from "./NewChallengeForm";

export default function Challenge() {
  const { challenge, isTestLoading, isChallengeActionButtonsDisabled } =
    useCourseTestAndChallengeStore();

  const [isEdit, setIsEdit] = useState(false);

  return (
    <>
      <h2 className="w-full mb-2 text-center text-lg sm:text-xl font-bold text-[var(--text-primary)] truncate">
        Challenge
      </h2>

      {isTestLoading || isChallengeActionButtonsDisabled ? (
        <div className="w-full min-h-32 flex items-center justify-center space-x-2">
          <span className="w-4 h-4 bg-[#72C347] rounded-full animate-bounce [animation-delay:-0.3s]"></span>
          <span className="w-4 h-4 bg-[#72C347] rounded-full animate-bounce [animation-delay:-0.15s]"></span>
          <span className="w-4 h-4 bg-[#72C347] rounded-full animate-bounce"></span>
        </div>
      ) : !challenge?.id ? (
        <NewChallengeForm />
      ) : isEdit ? (
        <EditChallenge onCancel={() => setIsEdit(false)} />
      ) : (
        <ViewChallenge onEdit={() => setIsEdit(true)} />
      )}
    </>
  );
}
