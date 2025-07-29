"use client";
import React, { useState } from "react";
import { useCreateConclusionVideosStore } from "@/store/createConclusionVideosStore";

import AddConclusionMaterials from "./AddConclusionMaterials";
import AddConclusionChallenge from "./AddConclusionChallenge";
import AddConclusionQuestions from "./AddConclusionQuestions";

import { LuPlus, LuMinus, LuCircleCheckBig } from "react-icons/lu";
import { LiaTrashAlt } from "react-icons/lia";
import DeleteVideo from "./DeleteVideo";
import ConclusionVideo from "./ConclusionVideo";

export default function AddConclusionVideo({ id, videoIndex, video }) {
  const { setConclusionVideoDetails, removeConclusionVideo } =
    useCreateConclusionVideosStore();

  const [isExpanded, setIsExpanded] = useState(false);

  const [isAddConclusionVideoOpen, setIsAddConclusionVideoOpen] =
    useState(false);
  const [isAddConclusionMaterialOpen, setIsAddConclusionMaterialOpen] =
    useState(false);
  const [isAddConclusionQuestionsOpen, setIsAddConclusionQuestionsOpen] =
    useState(false);
  const [isAddConclusionChallengeOpen, setIsAddConclusionChallengeOpen] =
    useState(false);
  const [isDeleteConclusionVideoOpen, setIsDeleteConclusionVideoOpen] =
    useState(false);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setConclusionVideoDetails(name, value, videoIndex); // in the store for form submission
  };

  const handleVideoThumbnail = (e, videoIndex) => {
    const name = e.target.name;
    const file = e.target.files[0];

    setConclusionVideoDetails(name, file, videoIndex); // in the store for form submission
  };

  return (
    <div className="px-8 py-4 bg-[var(--background-primary)] rounded-2xl drop-shadow-md dark:border dark:border-[var(--border-secondary)]">
      <div className="flex justify-between items-center">
        <h3 className="font-semibold text-sm text-[var(--text-secondary)]">
          {videoIndex + 1} <span className="ms-4">Conclusion Video</span>
        </h3>
        <div className="flex items-center gap-4">
          <button
            type="button"
            className="flex justify-center items-center cursor-pointer"
            onClick={() => setIsDeleteConclusionVideoOpen(true)}
            title="Delete"
          >
            <LiaTrashAlt className="text-2xl text-[#BEBEBE] font-bold hover:text-red-400" />
          </button>

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

      <div
        className={`transition-all duration-500 ease-in-out overflow-hidden ${
          isExpanded ? "max-h-[1000px] mt-4" : "max-h-0"
        }`}
      >
        <h3 className="text-[var(--text-secondary)] text-sm font-normal">
          Video Title
        </h3>

        <div className="flex gap-4">
          <div className="w-4/5 flex gap-x-3">
            <div className="flex-1 space-y-6">
              <input
                id={`videoTitle-${videoIndex}`}
                type="text"
                name="videoTitle"
                value={video.videoTitle}
                className="w-full h-10 px-3.5 py-2 text-sm text-[var(--text-secondary)] border border-[var(--border-primary)] rounded-xl outline-none placeholder:text-[var(--text-placeholder)] placeholder:italic focus:border-[var(--border-secondary)]"
                placeholder="Type here"
                onChange={handleOnChange}
              />

              <div className="flex justify-between gap-x-10">
                <button
                  className="w-full h-10 p-3 border border-[var(--border-secondary)] rounded-xl outline-none flex justify-center items-center gap-x-2 cursor-pointer"
                  type="button"
                  onClick={() => setIsAddConclusionMaterialOpen(true)}
                >
                  <span className="text-sm text-[var(--border-secondary)] font-semibold">
                    Module materials
                  </span>
                  {(video?.pdf || video?.pdf?.name) && (
                    <LuCircleCheckBig className="text-xl text-[var(--border-secondary)]" />
                  )}
                </button>

                <button
                  className="w-full h-10 p-3 border border-[var(--border-secondary)] rounded-xl outline-none flex justify-center items-center gap-x-2 cursor-pointer"
                  type="button"
                  onClick={() => setIsAddConclusionQuestionsOpen(true)}
                >
                  <span className="text-sm text-[var(--border-secondary)] font-semibold">
                    Add Questions
                  </span>
                  {video?.test?.questions.length > 0 && (
                    <LuCircleCheckBig className="text-xl text-[var(--border-secondary)]" />
                  )}
                </button>

                <button
                  className="w-full h-10 p-3 border border-[var(--border-secondary)] rounded-xl outline-none flex justify-center items-center gap-x-2 cursor-pointer"
                  type="button"
                  onClick={() => setIsAddConclusionChallengeOpen(true)}
                >
                  <span className="text-sm text-[var(--border-secondary)] font-semibold">
                    Add Challenges
                  </span>
                  {(video?.test?.challenge?.challengeText ||
                    video?.test?.challenge?.image?.name) && (
                    <LuCircleCheckBig className="text-xl text-[var(--border-secondary)]" />
                  )}
                </button>
              </div>
            </div>

            <div>
              <button
                type="button"
                className="h-10 p-4 text-sm rounded-xl bg-[#72c347] text-[var(--background-primary)] cursor-pointer flex justify-center items-center"
                onClick={() => setIsAddConclusionVideoOpen(true)}
              >
                + Add Video
              </button>
            </div>
          </div>

          <div className="w-1/5">
            <div>
              <label
                htmlFor={`conclusionVideoThumbnail-${videoIndex}`}
                className="text-base text-[var(--text-secondary)] font-semibold cursor-pointer"
              >
                {video?.image?.name ? (
                  <div className="w-full h-32 rounded-2xl border border-[var(--border-primary)] overflow-hidden flex justify-center items-center">
                    <img
                      src={URL.createObjectURL(video?.image)}
                      alt={video?.image?.name || "Thumbnail"}
                      className="w-full"
                    />
                  </div>
                ) : (
                  <div className="h-32 rounded-2xl bg-[var(--border-primary)] flex justify-center items-center">
                    <span className="text-[var(--text-secondary)] text-base font-normal">
                      + Add Thumbnail
                    </span>
                  </div>
                )}
                <input
                  id={`conclusionVideoThumbnail-${videoIndex}`}
                  type="file"
                  accept="image/*"
                  name="image"
                  hidden
                  onChange={(e) => handleVideoThumbnail(e, videoIndex)}
                />
              </label>
            </div>
          </div>
        </div>
      </div>

      {isAddConclusionVideoOpen && (
        <ConclusionVideo
          key={video.id}
          videoIndex={videoIndex}
          setIsAddConclusionVideoOpen={setIsAddConclusionVideoOpen}
        />
      )}

      {isAddConclusionMaterialOpen && (
        <AddConclusionMaterials
          key={video.id}
          videoIndex={videoIndex}
          setIsAddConclusionMaterialOpen={setIsAddConclusionMaterialOpen}
        />
      )}

      {isAddConclusionChallengeOpen && (
        <AddConclusionChallenge
          key={video.id}
          videoIndex={videoIndex}
          setIsAddConclusionChallengeOpen={setIsAddConclusionChallengeOpen}
        />
      )}
      {isAddConclusionQuestionsOpen && (
        <AddConclusionQuestions
          key={video.id}
          videoIndex={videoIndex}
          setIsAddConclusionQuestionsOpen={setIsAddConclusionQuestionsOpen}
        />
      )}

      {isDeleteConclusionVideoOpen && (
        <DeleteVideo
          key={video.id}
          videoIndex={videoIndex}
          videoTitle={video.videoTitle}
          onDelete={removeConclusionVideo}
          onClose={() => setIsDeleteConclusionVideoOpen(false)}
        />
      )}
    </div>
  );
}
