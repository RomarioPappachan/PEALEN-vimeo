"use client";
import React, { useEffect, useState } from "react";
import { useCourseTestAndChallengeStore } from "@/store/courseTestAndChallengeStore";
import { useEditQuestionStore } from "@/store/editQuestionStore";

import { LuPen, LuPlus, LuX } from "react-icons/lu";

export default function EditQuestion({ onCancel }) {
  const { questions, selectedQuestionIndex } = useCourseTestAndChallengeStore();
  const {
    updatedQuestion,
    changeQuestionText,
    changeQuestionImage,
    changeOptionText,
    changeOptionImage,
    changeCorrectAnswer,
    addOptionField,
    removeOptionField,
    setQuestionToEdit,
    editQuestionById,
    resetUpdatedQuestionStore,
  } = useEditQuestionStore();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const selectedQuestionDetails = questions[selectedQuestionIndex];

  useEffect(() => {
    setQuestionToEdit(selectedQuestionDetails);
  }, [selectedQuestionIndex]);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      console.log(updatedQuestion);
      const res = await editQuestionById();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <form className="flex flex-col gap-y-4 snap-start" onSubmit={handleSubmit}>
      {/* Question */}
      <div className="flex justify-start items-center gap-x-[26px]  ">
        <span className="text-xl text-[var(--foreground-primary)] font-normal">
          {1}
        </span>
        <div className="flex-1 p-0.5 h-10 border border-[var(--border-primary)] rounded-[10px] focus-within:border-[var(--border-secondary)] flex items-center">
          <input
            type="text"
            name="questionText"
            value={updatedQuestion?.questionText}
            className="flex-1 w-full h-full px-4 py-3 text-sm text-[var(--text-secondary)] rounded-[10px] outline-none placeholder:text-[var(--text-placeholder)]"
            placeholder="Type Question"
            onChange={(e) => changeQuestionText(e.target.value)}
          />
          <label
            className="w-20 h-full px-3 py-1 text-[10px] text-[#72C347] bg-[#E5E5E5] rounded-[10px] text-center cursor-pointer"
            htmlFor={`updatedQuestionImage`}
          >
            {updatedQuestion?.questionImage ? (
              <span className="flex items-center">
                <LuPen className="text-sm me-0.5" />
                <span>Edit Image</span>
              </span>
            ) : (
              "Upload Image"
            )}
            <input
              id={`updatedQuestionImage`}
              type="file"
              accept="image/*"
              name="image"
              hidden
              onChange={(e) => {
                if (e.target.files[0]) {
                  changeQuestionImage(e.target.files[0]);
                }
              }}
            />
          </label>
        </div>
        <button
          //   onClick={() => removeClassVideoQuestions(videoIndex, questionIndex)}
          className="size-6 bg-[var(--border-secondary)] text-white hover:bg-red-400 rounded-full flex justify-center items-center cursor-pointer"
          type="button"
        >
          <LuX size={16} />
        </button>
      </div>

      {/* Options */}
      <div className="grid grid-cols-2 gap-4">
        {updatedQuestion?.options?.map((option, idx) => (
          <div
            // key={option.id}
            key={`updatedOptions${idx + 1}`}
            className="flex justify-start items-center gap-x-[26px]"
          >
            <span className="text-base text-[var(--foreground-primary)] font-normal">
              {String.fromCharCode(65 + idx)}
            </span>
            <div className="flex-1 flex items-center gap-x-4">
              <input
                // id={`correctAnswer-${option.id}`}
                type="checkbox"
                className="size-4 text-[var(--foreground-primary)] accent-[#72C347]"
                name="correctAnswer"
                // checked={updatedQuestion.correctAnswer?.id === option?.id}
                onChange={() => changeCorrectAnswer(option)}
              />
              <div className="flex-1 p-0.5 h-10 border border-[var(--border-primary)] rounded-[10px] focus-within:border-[var(--border-secondary)] flex items-center">
                <input
                  type="text"
                  name="text"
                  value={option.text}
                  className="flex-1 w-full h-full px-4 py-3 text-sm text-[var(--text-secondary)] rounded-[10px] outline-none placeholder:text-[var(--text-placeholder)]"
                  placeholder="Type Question"
                  onChange={(e) => changeOptionText(idx, e.target.value)}
                />
                <label
                  className="w-20 h-full px-3 py-1 text-[10px] text-[#72C347] bg-[#E5E5E5] rounded-[10px] text-center cursor-pointer"
                  //   htmlFor={`optionImage-${option.id}`}
                  htmlFor={`updatedoptionImage-${idx}`}
                >
                  {option.image?.name ? (
                    <span className="flex items-center">
                      <LuPen className="text-sm me-0.5" />
                      <span>Edit Image</span>
                    </span>
                  ) : (
                    "Upload Image"
                  )}
                  <input
                    // id={`optionImage-${option.id}`}
                    id={`updatedoptionImage-${idx}`}
                    type="file"
                    accept="image/*"
                    name="image"
                    hidden
                    onChange={(e) => {
                      if (e.target.files[0]) {
                        changeOptionImage(idx, e.target.files[0]);
                      }
                    }}
                  />
                </label>
              </div>

              <button
                onClick={() => removeOptionField(idx)}
                className="size-6 bg-[var(--text-secondary)] text-white hover:bg-red-400 rounded-full flex justify-center items-center cursor-pointer"
                type="button"
              >
                <LuX size={16} />
              </button>
            </div>
          </div>
        ))}

        <button
          type="button"
          title="Add option"
          className="ms-10 size-9 border border-[var(--border-secondary)] rounded-lg flex justify-center items-center cursor-pointer"
          onClick={() => addOptionField()}
        >
          <LuPlus className="text-xl text-[#72C347]" />
        </button>
      </div>

      {/* buttons  */}
      <div className="flex justify-end gap-4 mt-6">
        <button
          type="button"
          onClick={() => {
            onCancel();
            resetUpdatedQuestionStore(); //reset store
          }}
          className={`px-4 py-2 text-sm font-semibold text-white bg-gray-500 rounded-xl ${
            isSubmitting ? "cursor-not-allowed" : "cursor-pointer"
          }`}
          disabled={isSubmitting}
        >
          Cancel
        </button>
        <button
          type="submit"
          className={`px-4 py-2 text-sm font-semibold text-white bg-[#72C347] rounded-xl ${
            isSubmitting ? "cursor-not-allowed" : "cursor-pointer"
          }`}
          disabled={isSubmitting}
        >
          Update Question
        </button>
      </div>
    </form>
  );
}
