"use client";
import React, { useEffect, useState } from "react";

import ViewQuestion from "./ViewQuestion";
import EditQuestion from "./EditQuestion";
import { useCourseTestAndChallengeStore } from "@/store/courseTestAndChallengeStore";
import { LuChevronLeft, LuChevronRight, LuPlus } from "react-icons/lu";

export default function Question({ onFormOpen }) {
  const {
    questions,
    selectedQuestionIndex,
    handleNextQuestion,
    handlePreviousQuestion,
  } = useCourseTestAndChallengeStore();

  const [question, setQuestion] = useState([]);

  const [isEditQuestion, setIsEditQuestion] = useState(false);

  useEffect(() => {
    setQuestion(questions[selectedQuestionIndex]);
  }, [selectedQuestionIndex]);

  return (
    <>
      {!isEditQuestion ? (
        <>
          <div className="flex items-center justify-end gap-x-2 mb-4 pe-2">
            <button
              type="button"
              className="mr-10 px-2 py-1 rounded-sm text-sm font-semibold transition disabled:opacity-60 cursor-pointer text-[var(--border-secondary)] flex items-center justify-center gap-x-2 box-border border border-transparent hover:border-[var(--border-secondary)]"
              onClick={onFormOpen}
            >
              <LuPlus className="text-base" />
              <span>New Question</span>
            </button>
            <button
              type="button"
              className="px-2 py-1 rounded-sm text-sm font-semibold transition disabled:opacity-60 cursor-pointer text-[var(--border-secondary)] flex items-center justify-center gap-x-1 box-border border border-transparent hover:border-[var(--border-secondary)]"
              onClick={handlePreviousQuestion}
            >
              <LuChevronLeft />
              <span>Previous</span>
            </button>
            <span className="text-sm font-semibold text-[var(--border-secondary)]">
              {selectedQuestionIndex + 1} of {questions.length}
            </span>
            <button
              type="button"
              className="px-2 py-1 rounded-sm text-sm font-semibold transition disabled:opacity-60 cursor-pointer text-[var(--border-secondary)] flex items-center justify-center gap-x-1 box-border border border-transparent hover:border-[var(--border-secondary)]"
              onClick={handleNextQuestion}
            >
              <span>Next</span>
              <LuChevronRight />
            </button>
          </div>

          <ViewQuestion
            question={question}
            selectedQuestionIndex={selectedQuestionIndex}
            onEditOpen={() => setIsEditQuestion(true)}
          />
        </>
      ) : (
        <EditQuestion onCancel={() => setIsEditQuestion(false)} />
      )}
    </>
  );
}
