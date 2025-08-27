"use client";

import { LuCircleCheckBig, LuPen, LuPlus, LuX } from "react-icons/lu";

export default function ViewQuestion({ question, selectedQuestionIndex }) {
  return (
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
  );
}
