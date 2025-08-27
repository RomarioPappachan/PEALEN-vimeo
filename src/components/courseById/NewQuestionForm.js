"use client";
import React, { useState } from "react";
import { useCourseTestAndChallengeStore } from "@/store/courseTestAndChallengeStore";
import { useNewQuestionStore } from "@/store/newQuestionStore";

import { LuPen, LuPlus, LuX } from "react-icons/lu";
import toast from "react-hot-toast";

export default function NewQuestionForm({ onClose }) {
  const {
    selectedVideoId,
    questions,
    disableQuestionButtons,
    getVideoTestAndChallenge,
  } = useCourseTestAndChallengeStore();
  const {
    newQuestion,
    changeQuestionText,
    changeQuestionImage,
    changeOptionText,
    changeOptionImage,
    changeCorrectAnswer,
    addOptionField,
    removeOptionField,
    addNewQuestion,
    resetNewQuestionStore,
  } = useNewQuestionStore();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState("");

  function validateForm() {
    const errors = [];

    // 1. Check if either questionText or questionImage or both are present
    if (!newQuestion.questionText?.trim() && !newQuestion.questionImage) {
      errors.push("Question text or image is required.");
    }

    // 2. Check at least 2 options are present
    if (newQuestion.options.length < 2) {
      errors.push("At least 2 options are required.");
    }

    // 3. Check each option: either text or image or both must be present
    const invalidOptions = newQuestion.options.filter(
      (opt) => !opt.text?.trim() && !opt.image
    );
    if (invalidOptions.length > 0) {
      errors.push("All options must have text or an image.");
    }

    // 4. Check if a correct answer is present
    if (!newQuestion.correctAnswer?.id) {
      errors.push("A correct answer must be selected.");
    }

    return errors;
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setFormErrors(""); // clear errors initially

    const errors = validateForm();
    if (errors.length > 0) {
      setFormErrors(errors.join(" ")); // combine into single sentence
      return;
    }

    setFormErrors(""); // clear errors
    disableQuestionButtons(true); // all buttons are disabled

    try {
      await addNewQuestion(selectedVideoId);
      toast.success("Question added successfully");
      resetNewQuestionStore();
      getVideoTestAndChallenge(selectedVideoId);
      onClose();
    } catch (error) {
      console.log(error);
      toast.error("Error on adding question");
    } finally {
      disableQuestionButtons(false); // all buttons are enabled
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
            value={newQuestion?.questionText}
            className="flex-1 w-full h-full px-4 py-3 text-sm text-[var(--text-secondary)] rounded-[10px] outline-none placeholder:text-[var(--text-placeholder)]"
            placeholder="Type Question"
            onChange={(e) => changeQuestionText(e.target.value)}
          />
          <label
            className="w-20 h-full px-3 py-1 text-[10px] text-[#72C347] bg-[#E5E5E5] rounded-[10px] text-center cursor-pointer"
            htmlFor={`newQuestionImage`}
          >
            {newQuestion?.questionImage ? (
              <span className="flex items-center">
                <LuPen className="text-sm me-0.5" />
                <span>Edit Image</span>
              </span>
            ) : (
              "Upload Image"
            )}
            <input
              id={`newQuestionImage`}
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
        {newQuestion?.options.map((option, idx) => (
          <div
            key={option.id}
            className="flex justify-start items-center gap-x-[26px]"
          >
            <span className="text-base text-[var(--foreground-primary)] font-normal">
              {String.fromCharCode(65 + idx)}
            </span>
            <div className="flex-1 flex items-center gap-x-4">
              <input
                id={`correctAnswer-${option.id}`}
                type="checkbox"
                className="size-4 text-[var(--foreground-primary)] accent-[#72C347]"
                name="correctAnswer"
                checked={newQuestion.correctAnswer?.id === option?.id}
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
                  htmlFor={`optionImage-${option.id}`}
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
                    id={`optionImage-${option.id}`}
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

      {/* Error Message */}
      {formErrors && (
        <div className="ps-6 text-rose-500 text-sm font-light">
          {formErrors}
        </div>
      )}

      {/* buttons  */}
      <div className="flex justify-end gap-4 mt-2">
        {questions.length > 0 && (
          <button
            type="button"
            onClick={() => {
              onClose();
              resetNewQuestionStore(); //reset store
            }}
            className={`px-4 py-2 text-sm font-semibold text-white bg-gray-500 rounded-xl ${
              isSubmitting ? "cursor-not-allowed" : "cursor-pointer"
            }`}
            disabled={isSubmitting}
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          className={`px-4 py-2 text-sm font-semibold text-white bg-[#72C347] rounded-xl ${
            isSubmitting ? "cursor-not-allowed" : "cursor-pointer"
          }`}
          disabled={isSubmitting}
        >
          Add Question
        </button>
      </div>
    </form>
  );
}
