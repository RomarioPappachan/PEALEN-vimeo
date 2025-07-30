"use client";
import { useState } from "react";
import { useCourseDetailStore } from "@/store/courseDetailStore";
import IntroVideo from "./IntroVideo";
import ClassVideo from "./ClassVideo";
import ConclusionVideo from "./ConclusionVideo";
import NewIntroVideoForm from "./NewIntroVideoForm";
import NewConclusionVideoForm from "./NewConclusionVideoForm";
import NewClassVideoForm from "./NewClassVideoForm";

function CourseVideos({ onNext, onPrevious }) {
  const { introVideos, classVideos, conclusionVideos } = useCourseDetailStore();

  const [isNewIntroVideoOpen, setIsNewIntroVideoOpen] = useState(false);
  const [isNewClassVideoOpen, setIsNewClassVideoOpen] = useState(false);
  const [isNewConclusionVideoOpen, setIsNewConclusionVideoOpen] =
    useState(false);

  return (
    <div>
      <div>
        {/* Intro Videos  */}
        <div className="mt-4">
          <h2 className="mb-2 text-[var(--text-primary)] text-base font-semibold">
            Class Videos (Intro videos)
          </h2>
          <div className="space-y-3.5">
            {introVideos?.length > 0
              ? introVideos.map((video, index) => (
                  <IntroVideo
                    key={video.id}
                    id={video.id}
                    videoIndex={index}
                    video={video}
                  />
                ))
              : !isNewIntroVideoOpen && (
                  <p className="text-red-400 ">Add an intro video</p>
                )}

            {isNewIntroVideoOpen && (
              <NewIntroVideoForm
                index={introVideos.length}
                onCancel={() => setIsNewIntroVideoOpen(false)}
              />
            )}
          </div>

          <div className="mt-6 flex justify-center">
            <button
              type="button"
              className={`font-semibold text-sm text-[var(--text-secondary)] border-b border-[var(--text-secondary)]  ${
                isNewIntroVideoOpen ? "cursor-not-allowed" : "cursor-pointer"
              }`}
              onClick={() => setIsNewIntroVideoOpen(true)}
              disabled={isNewIntroVideoOpen}
            >
              + Add Module
            </button>
          </div>
        </div>

        {/* Main class videos */}
        <div className="mt-4">
          <h2 className="mb-2 text-[var(--text-primary)] text-base font-semibold">
            Main Class Videos
          </h2>

          <div className="space-y-3.5">
            {classVideos.length > 0
              ? classVideos.map((video, index) => (
                  <ClassVideo
                    key={video.id}
                    id={video.id}
                    videoIndex={index}
                    video={video}
                  />
                ))
              : !isNewClassVideoOpen && (
                  <p className="text-red-400">Add a class video</p>
                )}

            {isNewClassVideoOpen && (
              <NewClassVideoForm
                index={classVideos.length}
                onCancel={() => setIsNewClassVideoOpen(false)}
              />
            )}
          </div>

          <div className="mt-6 flex justify-center">
            <button
              type="button"
              className={`font-semibold text-sm text-[var(--text-secondary)] border-b border-[var(--text-secondary)]  ${
                isNewClassVideoOpen ? "cursor-not-allowed" : "cursor-pointer"
              }`}
              onClick={() => setIsNewClassVideoOpen(true)}
              disabled={isNewClassVideoOpen}
            >
              + Add Module
            </button>
          </div>
        </div>

        {/* Conclusion Videos */}
        <div className="mt-4">
          <h2 className="mb-2 text-[var(--text-primary)] text-base font-semibold">
            Conclusion Videos
          </h2>

          <div className="space-y-3.5">
            {conclusionVideos.length > 0
              ? conclusionVideos.map((video, index) => (
                  <ConclusionVideo
                    key={video.id}
                    id={video.id}
                    videoIndex={index}
                    video={video}
                  />
                ))
              : !isNewConclusionVideoOpen && (
                  <p className="text-red-400">Add a conclusion video</p>
                )}

            {isNewConclusionVideoOpen && (
              <NewConclusionVideoForm
                index={conclusionVideos.length}
                onCancel={() => setIsNewConclusionVideoOpen(false)}
              />
            )}
          </div>

          <div className="mt-6 flex justify-center">
            <button
              type="button"
              className={`font-semibold text-sm text-[var(--text-secondary)] border-b border-[var(--text-secondary)] ${
                isNewConclusionVideoOpen
                  ? "cursor-not-allowed"
                  : "cursor-pointer"
              }`}
              onClick={() => setIsNewConclusionVideoOpen(true)}
            >
              + Add Module
            </button>
          </div>
        </div>
      </div>

      {/* buttons  */}
      <div className="flex justify-end gap-8 mt-6">
        <button
          type="button"
          className="w-80 px-6 py-2 h-10 text-base bg-[#9D9D9D] text-white font-semibold rounded-xl cursor-pointer"
          onClick={() => onPrevious()}
        >
          Back
        </button>
        <button
          className="w-80 px-6 py-2 h-10 text-base bg-[#72c347] text-white font-semibold rounded-xl cursor-pointer"
          type="button"
          onClick={() => onNext()}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default CourseVideos;
