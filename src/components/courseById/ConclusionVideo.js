"use client";
import React, { useState } from "react";
import { LiaTrashAlt } from "react-icons/lia";
import { LuMinus, LuPlus } from "react-icons/lu";

export default function ConclusionVideo({ id, videoIndex, video }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="px-8 py-4 bg-[var(--background-primary)] rounded-2xl drop-shadow-md dark:border dark:border-[var(--border-secondary)]">
      <div className="flex justify-between items-center">
        <h3 className="font-semibold text-sm text-[var(--text-secondary)]">
          {videoIndex + 1} <span className="ms-4">{video?.title}</span>
        </h3>
        <div className="flex items-center gap-4">
          {/* <button
            type="button"
            className="flex justify-center items-center cursor-pointer"
            onClick={() => setIsDeleteIntroVideoOpen(true)}
            title="Delete"

          >
            <LiaTrashAlt className="text-2xl text-[#BEBEBE] font-bold hover:text-red-400" />
          </button> */}

          <button
            type="button"
            onClick={() => setIsExpanded((prev) => !prev)}
            className="size-6 rounded-full flex justify-center items-center bg-[#BEBEBE] cursor-pointer transition-all duration-300"
            title={isExpanded ? "Minimise" : "Expand"}
          >
            {isExpanded ? (
              <LuMinus className="text-white font-bold" />
            ) : (
              <LuPlus className="text-white font-bold" />
            )}
          </button>
        </div>
      </div>

      {/* Expanded section  */}
      <div
        className={`transition-all duration-500 ease-in-out overflow-hidden ${
          isExpanded ? "max-h-[1000px] mt-4" : "max-h-0"
        }`}
      >
        <h3 className="text-[var(--text-secondary)] text-sm font-normal">
          {video?.title}
        </h3>
      </div>
    </div>
  );
}

