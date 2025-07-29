"use client";

import React from "react";
import { createPortal } from "react-dom";
import { useCreateConclusionVideosStore } from "@/store/createConclusionVideosStore";

import { LuPen, LuX } from "react-icons/lu";

export default function AddConclusionChallenge({
  id,
  videoIndex,
  setIsAddConclusionChallengeOpen,
}) {
  const { conclusionVideos, updateChallengeText, updateChallengeImage } =
    useCreateConclusionVideosStore();
  const videoTest = conclusionVideos[videoIndex]?.test;

  return createPortal(
    <div className="fixed inset-0 z-50 bg-black/40 flex justify-center items-center px-2 py-6">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-[var(--background-primary)] rounded-2xl overflow-hidden flex flex-col">
        {/* Close Button */}
        <button
          type="button"
          onClick={() => setIsAddConclusionChallengeOpen(false)}
          className="absolute top-3 right-3 size-9 rounded-lg bg-[#DF5050] text-white flex justify-center items-center z-10 cursor-pointer"
        >
          <LuX className="text-xl" />
        </button>

        {/* Header */}
        <div className="pt-6 px-6 pb-3">
          <h2 className="text-center text-xl md:text-2xl font-semibold text-[var(--text-secondary)]">
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
              htmlFor={`conclusionChallengeImage-${videoIndex}`}
            >
              {videoTest?.challenge?.image?.name ? (
                <span className="flex items-center">
                  <LuPen className="text-sm me-0.5" />
                  <span>Edit Image</span>
                </span>
              ) : (
                "Upload Image"
              )}
              <input
                id={`conclusionChallengeImage-${videoIndex}`}
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

        {/* Sticky Footer Button */}
        <div className="absolute bottom-0 left-0 w-full bg-[var(--background-primary)] px-14 py-4 flex items-center justify-end">
          <button
            type="button"
            className="px-6 py-3 bg-[#72C347] hover:bg-[#72c347e2] text-white text-xl rounded-2xl font-semibold"
            onClick={() => setIsAddConclusionChallengeOpen(false)}
          >
            Add Challenge
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
