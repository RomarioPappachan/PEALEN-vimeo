"use client";

import React from "react";
import { createPortal } from "react-dom";
import { useCreateIntroVideosStore } from "@/store/createIntroVideosStore";

import { LuPen, LuPenLine, LuTrash, LuX } from "react-icons/lu";

export default function AddIntroChallenge({
  id,
  videoIndex,
  setIsAddIntroChallengeOpen,
}) {
  const { introVideos, updateChallengeText, updateChallengeImage } =
    useCreateIntroVideosStore();
  const videoTest = introVideos[videoIndex]?.test;

  return createPortal(
    <div className="fixed inset-0 z-50 bg-black/40 flex justify-center items-center px-2 py-6">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-[var(--background-primary)] rounded-2xl overflow-hidden flex flex-col">
        {/* Close Button */}
        <button
          type="button"
          onClick={() => setIsAddIntroChallengeOpen(false)}
          className="absolute top-3 right-3 size-9 rounded-lg bg-[#DF5050] text-white flex justify-center items-center z-10 cursor-pointer"
        >
          <LuX className="text-xl" />
        </button>

        {/* Header */}
        <div className="pt-6 px-6 pb-3">
          <h2 className="text-center text-xl font-semibold text-[var(--text-secondary)]">
            Add Challenge
          </h2>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto mx-14 pb-24 flex-1">
          <div className="w-full p-0.5 border border-[var(--border-primary)] rounded-[10px] focus-within:border-[var(--border-secondary)] flex items-start">
            <textarea
              name="challenge"
              value={videoTest?.challenge?.challengeText}
              className="flex-1 w-full px-4 py-3 text-sm text-[var(--text-secondary)] rounded-[10px] outline-none placeholder:text-[var(--text-placeholder)]"
              placeholder="Type here"
              rows={8}
              onChange={(e) => updateChallengeText(videoIndex, e.target.value)}
            />
            <label
              className="w-20 h-full px-3 py-1 text-[10px] text-[#72C347] bg-[#E5E5E5] rounded-[10px] text-center cursor-pointer"
              htmlFor={`introChallengeImage-${videoIndex}`}
            >
              {videoTest?.challenge?.image?.name ? (
                <span className="h-8 flex justify-around items-center">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      updateChallengeImage(videoIndex, null);
                    }}
                  >
                    <LuTrash className="text-base text-red-400" />
                  </button>
                  <span>
                    <LuPenLine className="text-base text-blue-400" />
                  </span>
                </span>
              ) : (
                "Upload Image"
              )}
              <input
                id={`introChallengeImage-${videoIndex}`}
                type="file"
                accept="image/*"
                name="image"
                hidden
                onChange={(e) => {
                  e.preventDefault();
                  if (e.target.files[0]) {
                    updateChallengeImage(videoIndex, e.target.files[0]);
                  }
                }}
              />
            </label>
          </div>
        </div>

        {/* Sticky Footer Button */}
        <div className="absolute bottom-0 left-0 w-full bg-[var(--background-primary)] px-14 py-4 flex items-center justify-end">
          <button
            type="button"
            className="px-6 py-3 bg-[#72C347] hover:bg-[#72c347e2] text-white text-xl rounded-2xl font-semibold"
            onClick={() => setIsAddIntroChallengeOpen(false)}
          >
            Add Challenge
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
