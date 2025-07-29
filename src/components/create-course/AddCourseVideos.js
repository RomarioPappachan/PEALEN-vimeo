"use client";
import React from "react";
import AddIntroVideo from "./AddIntroVideo";
import AddClassVideos from "./AddClassVideos";
import { useAddCourseVideosStore } from "@/store/addCourseVideosStore";
import { useCreateClassVideosStore } from "@/store/createClassVideosStore";
import { useCreateIntroVideosStore } from "@/store/createIntroVideosStore";
import { useCreateConclusionVideosStore } from "@/store/createConclusionVideosStore";
import AddConclusionVideo from "./AddConclusionVideo";

export default function AddCourseVideos({ onNext, onPrevious }) {
  // const {
  //   introVideos,
  //   classVideos,
  //   conclusionVideos,
  //   addNewIntroVideo,
  //   addNewClassVideo,
  //   addConclusionVideo,
  // } = useAddCourseVideosStore();
  const { introVideos, addNewIntroVideo } = useCreateIntroVideosStore();
  const { classVideos, addNewClassVideo } = useCreateClassVideosStore();
  const { conclusionVideos, addNewConclusionVideo } =
    useCreateConclusionVideosStore();

  function handleSubmit(e) {
    e.preventDefault();
    onNext();
  }

  console.log(introVideos);
  console.log(classVideos);
  console.log(conclusionVideos);

  return (
    <div>
      <form action="" onSubmit={handleSubmit}>
        {/* Intro videos */}
        <div className="mt-4">
          <h2 className="mb-2 text-[var(--text-primary)] text-base font-semibold">
            Class Videos (Intro videos)
          </h2>
          <div className="space-y-3.5">
            {introVideos?.length > 0 ? (
              introVideos.map((video, index) => (
                <AddIntroVideo
                  key={video.id}
                  id={video.id}
                  videoIndex={index}
                  video={video}
                />
              ))
            ) : (
              <p className="text-red-400 ">Add an intro video</p>
            )}
          </div>

          <div className="mt-6 flex justify-center">
            <button
              type="button"
              className="font-semibold text-sm text-[var(--text-secondary)] border-b border-[var(--text-secondary)] cursor-pointer"
              onClick={addNewIntroVideo}
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
            {classVideos.length > 0 ? (
              classVideos.map((video, index) => (
                <AddClassVideos
                  key={video.id}
                  videoIndex={index}
                  video={video}
                />
              ))
            ) : (
              <p className="text-red-400">Add a class video</p>
            )}
          </div>

          <div className="mt-6 flex justify-center">
            <button
              type="button"
              className="font-semibold text-sm text-[var(--text-secondary)] border-b border-[var(--text-secondary)] cursor-pointer"
              onClick={addNewClassVideo}
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
            {conclusionVideos.length > 0 ? (
              conclusionVideos.map((video, index) => (
                <AddConclusionVideo
                  key={video.id}
                  videoIndex={index}
                  video={video}
                />
              ))
            ) : (
              <p className="text-red-400">Add a conclusion video</p>
            )}
          </div>

          <div className="mt-6 flex justify-center">
            <button
              type="button"
              className="font-semibold text-sm text-[var(--text-secondary)] border-b border-[var(--text-secondary)] cursor-pointer"
              onClick={addNewConclusionVideo}
            >
              + Add Module
            </button>
          </div>
        </div>

        <div className="flex justify-end gap-8 mt-[60px]">
          <button
            type="button"
            className="w-80 px-6 py-2 h-10 text-base bg-[#9D9D9D] text-white font-semibold rounded-xl cursor-pointer"
            onClick={onPrevious}
          >
            Cancel
          </button>
          <button
            className="w-80 px-6 py-2 h-10 text-base bg-[#72c347] text-white font-semibold rounded-xl cursor-pointer"
            type="submit"
          >
            Next
          </button>
        </div>
      </form>
    </div>
  );
}
