"use client";
import React, { useState } from "react";
import Test from "./Test";
import { useCourseTestAndChallengeStore } from "@/store/courseTestAndChallengeStore";

export default function TestAndChallengeItem({ index, video }) {
  const { selectedVideoId, setSelectedVideoId } =
    useCourseTestAndChallengeStore();
  const [isTestOpen, setIsTestOpen] = useState(false);

  const handleClick = () => {
    setSelectedVideoId(video?.id); // Set id in store
    setIsTestOpen(true); // Open popup
  };

  return (
    <>
      <div className="px-8 py-4 flex justify-start items-center gap-x-4 text-sm text-[var(--text-primary)] bg-[var(--background-primary)] rounded-2xl drop-shadow-md dark:border dark:border-[var(--border-secondary)]">
        <span>{index + 1}</span>

        <span className="flex items-center">
          <img
            className="w-24 h-16 object-cover"
            src={video?.videoThumbnail}
            alt="thumbnail"
          />
        </span>
        <span className="flex-1 font-semibold capitalize">{video?.title}</span>
        <span
          className={`px-4 py-1 rounded-full capitalize flex justify-start items-center ${
            video?.videoType === "class"
              ? "bg-[#d2f7be] text-[#72c347]"
              : "bg-blue-100 text-blue-400"
          }`}
        >
          {video?.videoType}
        </span>
        <button
          type="button"
          className="h-10 px-4 py-2 border border-[var(--border-secondary)] rounded-xl flex justify-start items-center cursor-pointer"
          onClick={handleClick}
        >
          Test and Challenge
        </button>
      </div>

      {isTestOpen && (
        <Test
          key={selectedVideoId}
          videoId={video.id}
          onClose={() => setIsTestOpen(false)}
        />
      )}
    </>
  );
}
