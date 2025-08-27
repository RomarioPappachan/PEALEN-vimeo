"use client";

import { useState } from "react";
import { useCourseTestAndChallengeStore } from "@/store/courseTestAndChallengeStore";
import { LuCircleCheckBig, LuPen, LuPlus, LuX } from "react-icons/lu";
import { deleteQuestionById } from "@/api/course";
import toast from "react-hot-toast";

export default function ViewQuestion({
  question,
  selectedQuestionIndex,
  onEditOpen,
}) {
  const {
    selectedVideoId,
    isQuestionsActionButtonsDisabled,
    disableQuestionButtons,
    getVideoTestAndChallenge,
  } = useCourseTestAndChallengeStore();

  const [isDeleting, setIsDeleting] = useState(false);
  const [isDeleteConfirm, setIsDeleteConfirm] = useState(false);

  const handleDeleteQuestionById = async (e) => {
    e.preventDefault();
    setIsDeleting(true);
    disableQuestionButtons(true);
    try {
      const res = await deleteQuestionById(question.id);

      toast.success("Deleted question successfully");
      await getVideoTestAndChallenge(selectedVideoId);
    } catch (error) {
      console.log(error);
      toast.error("Error deleting question");
    } finally {
      setIsDeleting(false);
      disableQuestionButtons(false);
    }
  };

  return (
    <>
      <div className="flex flex-col gap-y-4 snap-start">
        {/* Question */}
        <div className="flex justify-start items-center gap-x-[26px]">
          <span className="text-xl text-[var(--foreground-primary)] font-normal">
            {selectedQuestionIndex + 1}
          </span>
          <div className="flex-1 p-0.5 h-10 border border-[var(--border-primary)] rounded-[10px] focus-within:border-[var(--border-secondary)] flex items-center">
            <div className="flex-1 w-full h-full px-4 py-3 text-sm text-[var(--text-secondary)] rounded-[10px] outline-none placeholder:text-[var(--text-placeholder)]">
              {question?.questionText}
            </div>
            <div className="w-20 h-full px-3 py-1 text-[10px] text-[#72C347] bg-[#E5E5E5] rounded-[10px] text-center cursor-pointer">
              {question?.questionImage ? (
                <span className="flex items-center">
                  <LuCircleCheckBig className="text-sm me-0.5" />
                  <span>Image</span>
                </span>
              ) : (
                "No Image"
              )}
            </div>
          </div>
        </div>

        {/* Options */}
        <div className="grid grid-cols-2 gap-4">
          {question?.options?.map((option, idx) => (
            <div
              key={`view-option-${idx + 1}`}
              className="flex justify-start items-center gap-x-[26px]"
            >
              <span className="text-base text-[var(--foreground-primary)] font-normal">
                {String.fromCharCode(65 + idx)}
              </span>
              <div className="flex-1 flex items-center gap-x-4">
                {(question?.correctAnswer?.text === option?.text &&
                  question?.correctAnswer?.text !== null) ||
                (question?.correctAnswer?.image === option?.image &&
                  question?.correctAnswer?.image !== null) ? (
                  <LuCircleCheckBig className="size-4 text-[#72C347]" />
                ) : (
                  <span className="size-4"></span>
                )}
                <div className="flex-1 p-0.5 h-10 border border-[var(--border-primary)] rounded-[10px] focus-within:border-[var(--border-secondary)] flex items-center">
                  <div className="flex-1 w-full h-full px-4 py-3 text-sm text-[var(--text-secondary)] rounded-[10px] outline-none placeholder:text-[var(--text-placeholder)]">
                    {option?.text}
                  </div>
                  <div className="w-20 h-full px-3 py-1 text-[10px] text-[#72C347] bg-[#E5E5E5] rounded-[10px] text-center cursor-pointer">
                    {option?.image ? (
                      <span className="flex items-center">
                        <LuCircleCheckBig className="text-sm me-0.5" />
                        <span>Image</span>
                      </span>
                    ) : (
                      "No Image"
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {!isDeleteConfirm ? (
        <div className="flex justify-end gap-4 mt-4">
          <button
            type="button"
            className={`px-4 py-2 text-sm font-semibold text-white bg-rose-500 rounded-xl ${
              isDeleting ? "cursor-not-allowed" : "cursor-pointer"
            }`}
            disabled={isDeleting}
            onClick={() => setIsDeleteConfirm(true)}
          >
            Delete
          </button>
          <button
            type="button"
            className={`px-4 py-2 text-sm font-semibold text-white bg-[#72C347] rounded-xl ${
              isDeleting ? "cursor-not-allowed" : "cursor-pointer"
            }`}
            disabled={isDeleting}
            onClick={onEditOpen}
          >
            Edit Question
          </button>
        </div>
      ) : (
        <div className="mt-4 flex items-center justify-end gap-4">
          <p className="text-sm text-[var(--text-secondary)]">
            Are you sure you want to delete this question?
          </p>
          <button
            className={`px-2 py-1 text-sm font-semibold text-white bg-rose-500 rounded-xl ${
              isQuestionsActionButtonsDisabled
                ? "cursor-not-allowed"
                : "cursor-pointer"
            }`}
            type="button"
            onClick={handleDeleteQuestionById}
            disabled={isQuestionsActionButtonsDisabled}
          >
            Confirm
          </button>
          <button
            className={`px-2 py-1 text-sm font-semibold text-white bg-gray-500 rounded-xl ${
              isQuestionsActionButtonsDisabled
                ? "cursor-not-allowed"
                : "cursor-pointer"
            }`}
            type="button"
            onClick={() => setIsDeleteConfirm(false)}
            disabled={isQuestionsActionButtonsDisabled}
          >
            Cancel
          </button>
        </div>
      )}
    </>
  );
}
