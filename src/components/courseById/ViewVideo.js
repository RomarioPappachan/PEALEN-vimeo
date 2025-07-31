"use client";

import React from "react";
import { createPortal } from "react-dom";

import { LuX } from "react-icons/lu";

export default function ViewVideo({ videoTitle, videoId, onClose }) {
  const videoUrl = `https://player.vimeo.com/video/${videoId}`;
  return createPortal(
    <div className="fixed inset-0 z-50 bg-black/40 flex justify-center items-center px-2 py-6">
      <div className="relative w-full max-w-2xl h-auto max-h-[90vh] bg-[var(--background-primary)] rounded-2xl overflow-hidden flex flex-col items-center pb-8">
        {/* Close Button */}
        <button
          type="button"
          onClick={() => onClose(false)}
          className="absolute top-3 right-3 size-9 rounded-lg bg-[#DF5050] text-white flex justify-center items-center z-10 cursor-pointer"
        >
          <LuX className="text-xl" />
        </button>

        {/* Header */}
        <div className="pt-6 px-6 pb-3 w-full text-center">
          <h2 className="text-base md:text-lg font-semibold text-[var(--text-secondary)]">
            {videoTitle}
          </h2>
        </div>

        {/* File Upload */}
        <div className="flex flex-col items-center justify-center px-6 pt-6 pb-16 w-full">
          {videoId ? (
            <div className="mt-5 flex flex-col items-center space-y-3">
              <iframe
                title="vimeo-player"
                src={videoUrl}
                width="540"
                height="320"
                frameBorder="0"
                allowFullScreen
                allow="full-screen"
              ></iframe>
            </div>
          ) : (
            <p className="text-center text-sm md:text-base text-[var(--text-secondary)]">
              No video available
            </p>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}
