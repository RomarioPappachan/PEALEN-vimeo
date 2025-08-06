"use client";
import React, { useState } from "react";
import { useEditConclusionVideoStore } from "@/store/editConclusionVideoStore";
import EditConclusionVideo from "./EditConclusionVideo";
import ConclusionVideoDetail from "./ConclusionVideoDetail";
import DeleteConfirmation from "./DeleteConfirmation";

import { LuMinus, LuPen, LuPlus, LuTrash2 } from "react-icons/lu";

export default function ConclusionVideo({ id, videoIndex, video }) {
  const { selectedConclusionVideoId, setConclusionVideoId } =
    useEditConclusionVideoStore();

  const [isExpanded, setIsExpanded] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  return (
    <>
      <div className="px-8 py-4 bg-[var(--background-primary)] rounded-2xl drop-shadow-md dark:border dark:border-[var(--border-secondary)]">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold text-sm text-[var(--text-secondary)]">
            {videoIndex + 1} <span className="ms-4">{video?.title}</span>
          </h3>
          <div className="flex items-center gap-4">
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
          {isEdit && id === selectedConclusionVideoId ? (
            <EditConclusionVideo
              videoIndex={videoIndex}
              video={video}
              onCancel={() => setIsEdit(false)}
              onUpdate={() => setIsEdit(false)}
            />
          ) : (
            <ConclusionVideoDetail videoIndex={videoIndex} video={video} />
          )}

          {/* Bottom right buttons */}
          {(!isEdit || id !== selectedConclusionVideoId) && (
            <>
              <div className="flex justify-end gap-4 mt-6">
                <button
                  onClick={() => {
                    setConclusionVideoId(id);
                    setIsEdit(true);
                  }}
                  className="px-4 py-2 flex justify-center items-center gap-x-2 text-sm font-semibold text-white bg-[#72C347] rounded-xl hover:bg-[#62B337] cursor-pointer"
                >
                  <LuPen className="text-base" />
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => setShowDeleteConfirm(true)}
                  className="px-4 py-2 flex justify-center items-center gap-x-2 text-sm font-semibold text-white bg-red-500 rounded-xl hover:bg-red-600 cursor-pointer"
                >
                  <LuTrash2 className="text-base" />
                  <span>Delete</span>
                </button>
              </div>
            </>
          )}
        </div>
      </div>
      {showDeleteConfirm && (
        <DeleteConfirmation
          key={video?.id}
          video={video}
          videoType="Conclusion"
          onClose={() => setShowDeleteConfirm(false)}
        />
      )}
    </>
  );
}
