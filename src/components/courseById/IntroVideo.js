"use client";
import React, { useState } from "react";
import { LiaTrashAlt } from "react-icons/lia";
import { LuCircleCheckBig, LuMinus, LuPlus } from "react-icons/lu";
import IntroVideoDetail from "./IntroVideoDetail";
import EditIntroVideo from "./EditIntroVideo";
import { useEditIntroVideoStore } from "@/store/editIntroVideoStore";

export default function IntroVideo({ id, videoIndex, video }) {
  const { selectedIntroVideoId, setIntroVideoId } = useEditIntroVideoStore();

  const [isExpanded, setIsExpanded] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleDelete = () => {
    // Call delete logic here
    console.log("Deleting video", id);
    setShowDeleteConfirm(false);
  };

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
        {/* <IntroVideoDetail key={id} videoIndex={videoIndex} video={video} /> */}

        {isEdit && id === selectedIntroVideoId ? (
          <EditIntroVideo
            videoIndex={videoIndex}
            video={video}
            onCancel={() => setIsEdit(false)}
            onUpdate={() => setIsEdit(false)}
          />
        ) : (
          <IntroVideoDetail videoIndex={videoIndex} video={video} />
        )}

        {/* Bottom right buttons */}
        {(!isEdit || id !== selectedIntroVideoId) && (
          <>
            <div className="flex justify-end gap-4 mt-6">
              <button
                onClick={() => {
                  setIntroVideoId(id);
                  setIsEdit(true);
                }}
                className="px-4 py-2 text-sm font-semibold text-white bg-[#72C347] rounded-xl"
              >
                Edit
              </button>
              <button
                onClick={() => setShowDeleteConfirm(true)}
                className="px-4 py-2 text-sm font-semibold text-white bg-red-500 rounded-xl"
              >
                Delete
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
