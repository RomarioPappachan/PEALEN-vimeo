"use client";

import React from "react";
import { createPortal } from "react-dom";
import { useCreateClassVideosStore } from "@/store/createClassVideosStore";

import { LuPen, LuPlus, LuX } from "react-icons/lu";

export default function AddQuestionsAndChallenge({
  id,
  videoIndex,
  setAddQuestionsOpen,
}) {
  const {
    classVideos,
    addClassVideoQuestions,
    addClassQuestionOptions,
    removeClassVideoQuestions,
    removeClassQuestionOptions,
    updateQuestionText,
    updateQuestionImage,
    updateOptionText,
    updateOptionImage,
    updateCorrectAnswer,
    updateChallengeText,
    updateChallengeImage,
  } = useCreateClassVideosStore();

  const videoTest = classVideos[videoIndex]?.test;

  return createPortal(
    <div className="fixed inset-0 z-50 bg-black/40 flex justify-center items-center px-2 py-6">
      <div className="relative w-full max-w-5xl max-h-[90vh] bg-[var(--background-primary)] rounded-2xl overflow-hidden flex flex-col">
        {/* Close Button */}
        <button
          type="button"
          onClick={() => setAddQuestionsOpen(false)}
          className="absolute top-3 right-3 size-9 rounded-lg bg-[#DF5050] text-white flex justify-center items-center z-10 cursor-pointer"
        >
          <LuX className="text-xl" />
        </button>

        {/* Header */}
        <div className="pt-6 px-6 pb-3">
          <h2 className="text-center text-base md:text-lg font-semibold text-[var(--text-secondary)]">
            Add Questions
          </h2>
        </div>

        {/* Scrollable Question & Options Section */}
        <div className="relative flex-1 overflow-y-auto scrollbar-visible mx-14 pe-2 pb-6 space-y-8 snap-y">
          {videoTest?.questions?.map((question, questionIndex) => (
            <div
              key={question?.id}
              className="flex flex-col gap-y-4 snap-start"
            >
              {/* Question */}
              <div className="flex justify-start items-center gap-x-[26px]  ">
                <span className="text-xl text-[var(--foreground-primary)] font-normal">
                  {questionIndex + 1}
                </span>
                <div className="flex-1 p-0.5 h-10 border border-[var(--border-primary)] rounded-[10px] focus-within:border-[var(--border-secondary)] flex items-center">
                  <input
                    type="text"
                    name="questionText"
                    value={question?.question?.questionText}
                    className="flex-1 w-full h-full px-4 py-3 text-sm text-[var(--text-secondary)] rounded-[10px] outline-none placeholder:text-[var(--text-placeholder)]"
                    placeholder="Type Question"
                    onChange={(e) =>
                      updateQuestionText(
                        videoIndex,
                        questionIndex,
                        e.target.value
                      )
                    }
                  />
                  <label
                    className="w-20 h-full px-3 py-1 text-[10px] text-[#72C347] bg-[#E5E5E5] rounded-[10px] text-center cursor-pointer"
                    htmlFor={`questionImage-${questionIndex}`}
                  >
                    {question?.question?.image?.name ? (
                      <span className="flex items-center">
                        <LuPen className="text-sm me-0.5" />
                        <span>Edit Image</span>
                      </span>
                    ) : (
                      "Upload Image"
                    )}
                    <input
                      id={`questionImage-${questionIndex}`}
                      type="file"
                      accept="image/*"
                      name="image"
                      hidden
                      onChange={(e) => {
                        if (e.target.files[0]) {
                          updateQuestionImage(
                            videoIndex,
                            questionIndex,
                            e.target.files[0]
                          );
                        }
                      }}
                    />
                  </label>
                </div>
                <button
                  onClick={() =>
                    removeClassVideoQuestions(videoIndex, questionIndex)
                  }
                  className="size-6 bg-[var(--border-secondary)] text-white hover:bg-red-400 rounded-full flex justify-center items-center cursor-pointer"
                  type="button"
                >
                  <LuX size={16} />
                </button>
              </div>

              {/* Options */}
              <div className="grid grid-cols-2 gap-4">
                {question?.options.map((option, idx) => (
                  <div
                    key={option.id}
                    className="flex justify-start items-center gap-x-[26px]"
                  >
                    <span className="text-base text-[var(--foreground-primary)] font-normal">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <div className="flex-1 flex items-center gap-x-4">
                      <input
                        id={`correctAnswer-${questionIndex}-${idx}`}
                        type="checkbox"
                        className="size-4 text-[var(--foreground-primary)] accent-[#72C347]"
                        // name="correctAnswer"
                        checked={question.correctAnswer?.id === option?.id}
                        onChange={() =>
                          updateCorrectAnswer(videoIndex, questionIndex, option)
                        }
                      />
                      <div className="flex-1 p-0.5 h-10 border border-[var(--border-primary)] rounded-[10px] focus-within:border-[var(--border-secondary)] flex items-center">
                        <input
                          type="text"
                          name="optionText"
                          value={option.optionText}
                          className="flex-1 w-full h-full px-4 py-3 text-sm text-[var(--text-secondary)] rounded-[10px] outline-none placeholder:text-[var(--text-placeholder)]"
                          placeholder="Type Question"
                          onChange={(e) =>
                            updateOptionText(
                              videoIndex,
                              questionIndex,
                              idx,
                              e.target.value
                            )
                          }
                        />
                        <label
                          className="w-20 h-full px-3 py-1 text-[10px] text-[#72C347] bg-[#E5E5E5] rounded-[10px] text-center cursor-pointer"
                          htmlFor={`optionImage-${questionIndex}-${idx}`}
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
                            id={`optionImage-${questionIndex}-${idx}`}
                            type="file"
                            accept="image/*"
                            name="image"
                            hidden
                            onChange={(e) => {
                              if (e.target.files[0]) {
                                updateOptionImage(
                                  videoIndex,
                                  questionIndex,
                                  idx,
                                  e.target.files[0]
                                );
                              }
                            }}
                          />
                        </label>
                      </div>

                      <button
                        onClick={() =>
                          removeClassQuestionOptions(
                            videoIndex,
                            questionIndex,
                            idx
                          )
                        }
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
                  onClick={() =>
                    addClassQuestionOptions(videoIndex, questionIndex)
                  }
                >
                  <LuPlus className="text-xl text-[#72C347]" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Fixed Bottom Section */}
        <div className="w-full bg-[var(--background-primary)] px-14 pb-4 flex flex-col gap-6">
          {/* Add New Question */}
          <div className="flex justify-center pt-2">
            <button
              type="button"
              title="Add question"
              className="font-semibold text-sm text-[#72C347] border-b border-[var(--border-secondary)] cursor-pointer"
              onClick={() => addClassVideoQuestions(videoIndex)}
            >
              + Add a question
            </button>
          </div>

          {/* Add Challenge */}
          <div>
            <h2 className="mb-2 text-center text-base md:text-lg font-semibold text-[var(--text-secondary)]">
              Add Challenge
            </h2>
            <div className="w-full p-0.5 border border-[var(--border-primary)] rounded-[10px] focus-within:border-[var(--border-secondary)] flex items-start">
              <textarea
                name="challenge"
                value={videoTest?.challenge?.challengeText}
                className="flex-1 w-full px-4 py-3 text-sm text-[var(--text-secondary)] rounded-[10px] outline-none placeholder:text-[var(--text-placeholder)]"
                placeholder="Type here"
                rows={4}
                onChange={(e) =>
                  updateChallengeText(videoIndex, e.target.value)
                }
              />
              <label className="w-20 h-full px-3 py-1 text-[10px] text-[#72C347] bg-[#E5E5E5] rounded-[10px] text-center cursor-pointer">
                {videoTest?.challenge?.image?.name ? (
                  <span className="flex items-center">
                    <LuPen className="text-sm me-0.5" />
                    <span>Edit Image</span>
                  </span>
                ) : (
                  "Upload Image"
                )}
                <input
                  id={`challengeImage-${videoIndex}`}
                  type="file"
                  accept="image/*"
                  name="image"
                  hidden
                  onChange={(e) => {
                    if (e.target.files[0]) {
                      updateChallengeImage(videoIndex, e.target.files[0]);
                    }
                  }}
                />
              </label>
            </div>
          </div>

          {/* Finish Button */}
          <div className="flex justify-end">
            <button
              type="button"
              className="px-6 py-3 bg-[#72C347] hover:bg-[#72c347e2] text-white text-sm rounded-2xl font-semibold"
              onClick={() => setAddQuestionsOpen(false)}
            >
              Finish
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
