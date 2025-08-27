"use client";
import React, { useState } from "react";
import { useCourseTestAndChallengeStore } from "@/store/courseTestAndChallengeStore";
import NewQuestionForm from "./NewQuestionForm";
import Question from "./Question";

export default function Questions() {
  const { questions, isTestLoading, isQuestionsActionButtonsDisabled } =
    useCourseTestAndChallengeStore();

  const [isQuestionFormOpen, setIsQuestionFormOpen] = useState(false);

  return (
    <>
      {isTestLoading || isQuestionsActionButtonsDisabled ? (
        <div className="w-full min-h-48 flex items-center justify-center space-x-2">
          <span className="w-4 h-4 bg-[#72C347] rounded-full animate-bounce [animation-delay:-0.3s]"></span>
          <span className="w-4 h-4 bg-[#72C347] rounded-full animate-bounce [animation-delay:-0.15s]"></span>
          <span className="w-4 h-4 bg-[#72C347] rounded-full animate-bounce"></span>
        </div>
      ) : isQuestionFormOpen || questions.length < 1 ? (
        <NewQuestionForm onClose={() => setIsQuestionFormOpen(false)} />
      ) : (
        <Question onFormOpen={() => setIsQuestionFormOpen(true)} />
      )}
    </>
  );
}
