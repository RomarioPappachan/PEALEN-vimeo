"use client";
import React, { useState } from "react";
import { useCreateClassVideosStore } from "@/store/createClassVideosStore";
import AddVideoSteps from "./AddVideoSteps";
import AddQuestionsAndChallenge from "./AddQuestionsAndChallenge";
import ClassVideo from "./ClassVideo";
import DemoVideo from "./DemoVideo";
import AnimationVideo from "./AnimationVideo";
import AddTranscript from "./AddTranscript";

import { LuPlus, LuMinus } from "react-icons/lu";
import { LiaTrashAlt } from "react-icons/lia";
import DeleteVideo from "./DeleteVideo";

export default function AddClassVideos({ videoIndex, video }) {
  const { addClassVideoDetails, removeClassVideo } =
    useCreateClassVideosStore();
  const [isExpanded, setIsExpanded] = useState(false);

  const [isDeleteClassVideoOpen, setIsDeleteClassVideoOpen] = useState(false);

  const [isAddClassVideoOpen, setIsAddClassVideoOpen] = useState(false);
  const [isAddDemoVideoOpen, setIsAddDemoVideoOpen] = useState(false);
  const [isAddAnimationOpen, setIsAddAnimationOpen] = useState(false);
  const [isAddTranscriptOpen, setIsAddTranscriptOpen] = useState(false);
  const [addStepsOpen, setAddStepOpen] = useState(false);
  const [addQuestionsOpen, setAddQuestionsOpen] = useState(false);

  // const [previewImgUrl, setPreviewImgUrl] = useState("");

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    addClassVideoDetails(name, value, index);
  };

  const handleVideoThumbnail = (e, index) => {
    const name = e.target.name;
    const file = e.target.files[0];
    // console.log(file);
    // const imageUrl = URL.createObjectURL(file);
    addClassVideoDetails(name, file, index); // in the store for form submission
    // setPreviewImgUrl(imageUrl); // for display
  };

  return (
    <div className="px-8 py-4 bg-[var(--background-primary)] rounded-2xl drop-shadow-md dark:border dark:border-[var(--border-secondary)]">
      <div className="flex justify-between items-center">
        <h3 className="font-semibold text-sm text-[var(--text-secondary)]">
          {videoIndex + 1} <span className="ms-4">Class Video</span>
        </h3>
        <div className="flex items-center gap-4">
          <button
            type="button"
            className="flex justify-center items-center cursor-pointer"
            onClick={() => setIsDeleteClassVideoOpen(true)}
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
          isExpanded ? "max-h-max mt-4" : "max-h-0"
        }`}
      >
        <div className="flex">
          <div className="w-3/4 pe-5 border-r-2 border-[#DCDCDC]">
            <div className="w-full px-3 py-2 bg-[var(--background-tertiary)] rounded-2xl">
              <div className="space-y-1">
                <h3 className="text-[var(--text-secondary)] text-sm font-semibold">
                  Video Title
                </h3>
                <input
                  id="title"
                  type="text"
                  name="title"
                  value={video?.title}
                  className="w-full h-10 px-3.5 py-2 text-sm bg-[var(--background-primary)] text-[var(--text-secondary)] border border-[var(--border-primary)] rounded-xl outline-none placeholder:text-[var(--text-placeholder)] placeholder:italic focus:border-[var(--border-secondary)]"
                  placeholder="Type here"
                  onChange={(e) => handleChange(e, videoIndex)}
                />
              </div>

              <div className="space-y-1 mt-3.5">
                <h3 className="text-[var(--text-secondary)] text-sm font-semibold">
                  Video subject (First window of the Tutor)
                </h3>
                <input
                  id="subject"
                  type="text"
                  name="subject"
                  value={video?.subject}
                  className="w-full h-10 px-3.5 py-2 text-sm bg-[var(--background-primary)] text-[var(--text-secondary)] border border-[var(--border-primary)] rounded-xl outline-none placeholder:text-[var(--text-placeholder)] placeholder:italic focus:border-[var(--border-secondary)]"
                  placeholder="Type here"
                  onChange={(e) => handleChange(e, videoIndex)}
                />
              </div>

              <div className="mt-7 flex gap-3.5">
                <div className="flex-1 grid grid-cols-3 gap-5 gap-y-3">
                  <button
                    type="button"
                    className="w-full h-10 p-3 border border-[var(--border-secondary)] rounded-xl outline-none flex justify-center items-center cursor-pointer"
                    onClick={() => setIsAddClassVideoOpen(true)}
                  >
                    <span className="text-sm text-[var(--border-secondary)] font-semibold text-center leading-[18px]">
                      Add Class Video
                    </span>
                  </button>
                  <button
                    type="button"
                    className="w-full h-10 p-3 border border-[var(--border-secondary)] rounded-xl outline-none flex justify-center items-center cursor-pointer"
                    onClick={() => setIsAddTranscriptOpen(true)}
                  >
                    <span className="text-sm text-[var(--border-secondary)] font-semibold text-center leading-[18px]">
                      Transcription (SRT)
                    </span>
                  </button>
                  <button
                    type="button"
                    className="w-full h-10 p-3 border border-[var(--border-secondary)] rounded-xl outline-none flex justify-center items-center cursor-pointer"
                    onClick={() => setIsAddDemoVideoOpen(true)}
                  >
                    <span className="text-sm text-[var(--border-secondary)] font-semibold text-center leading-[18px]">
                      Demo Video
                    </span>
                  </button>
                  <button
                    type="button"
                    className="w-full h-10 p-3 border border-[var(--border-secondary)] rounded-xl outline-none flex justify-center items-center cursor-pointer"
                    onClick={() => setIsAddAnimationOpen(true)}
                  >
                    <span className="text-sm text-[var(--border-secondary)] font-semibold text-center leading-[18px]">
                      Add Animation
                    </span>
                  </button>
                  <button
                    type="button"
                    className="w-full h-10 p-3 border border-[var(--border-secondary)] rounded-xl outline-none flex justify-center items-center cursor-pointer"
                    onClick={() => setAddStepOpen(true)}
                  >
                    <span className="text-sm text-[var(--border-secondary)] font-semibold text-center leading-[18px]">
                      Add Steps
                    </span>
                  </button>
                  <button
                    type="button"
                    className="w-full h-10 p-3 border border-[var(--border-secondary)] rounded-xl outline-none flex justify-center items-center cursor-pointer"
                    onClick={() => setAddQuestionsOpen(true)}
                  >
                    <span className="text-sm text-[var(--border-secondary)] font-semibold text-center leading-[18px]">
                      Add Questions & Challenges
                    </span>
                  </button>
                </div>
                <div>
                  <div className="w-44 h-28 rounded-2xl bg-[var(--border-primary)] flex justify-center items-center">
                    <label
                      htmlFor={`classVideoThumbnail-${videoIndex}`}
                      className="text-sm text-[var(--text-secondary)] font-semibold cursor-pointer"
                    >
                      {video?.image?.name ? (
                        <div className="w-full h-28 rounded-2xl border border-[var(--border-primary)] overflow-hidden flex justify-center items-center">
                          <img
                            src={URL.createObjectURL(video?.image)}
                            alt={video?.image?.name || "Thumbnail"}
                            className="w-full"
                          />
                        </div>
                      ) : (
                        <div className="h-28 rounded-2xl bg-[var(--border-primary)] flex justify-center items-center">
                          <span className="text-sm text-[var(--text-secondary)] font-normal">
                            + Upload photo
                          </span>
                        </div>
                      )}
                      <input
                        id={`classVideoThumbnail-${videoIndex}`}
                        type="file"
                        accept="image/*"
                        name="image"
                        className="hidden"
                        onChange={(e) => handleVideoThumbnail(e, videoIndex)}
                      />
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="w-1/4 px-6 max-w-max">
            <div className="p-2 bg-[var(--background-tertiary)] rounded-2xl space-y-2">
              <div className=" grid grid-cols-2 gap-1">
                {/* class video */}
                <div
                  className={`size-[88px] rounded-2xl border-2 cursor-pointer flex justify-center items-center ${
                    video.videoUrl
                      ? "border-[#05A8E3] bg-[#B6E9FB] border-dotted"
                      : "border-[#B3B8B8] bg-[#F1F1F1]"
                  }`}
                  onClick={() => setIsAddClassVideoOpen(true)}
                >
                  <span className="text-xs text-center">
                    {video.videoUrl ? "Video ✅" : ""}
                  </span>
                </div>

                {/* Demo video  */}
                <div
                  className={`size-[88px] rounded-2xl border-2 cursor-pointer flex justify-center items-center ${
                    video.demoVideourl
                      ? "border-[#05A8E3] bg-[#B6E9FB] border-dotted"
                      : "border-[#B3B8B8] bg-[#F1F1F1]"
                  }`}
                  onClick={() => setIsAddDemoVideoOpen(true)}
                >
                  <span className="text-xs text-center">
                    {video.demoVideourl ? "Demo Video ✅" : ""}
                  </span>
                </div>

                {/* Transcript  */}
                <div
                  className={`size-[88px] rounded-2xl border-2 cursor-pointer flex justify-center items-center ${
                    video.srt?.name
                      ? "border-[#05A8E3] bg-[#B6E9FB] border-dotted"
                      : "border-[#B3B8B8] bg-[#F1F1F1]"
                  }`}
                  onClick={() => setIsAddTranscriptOpen(true)}
                >
                  <span className="text-xs text-center">
                    {video.srt?.name ? "Transcript ✅" : ""}
                  </span>
                </div>

                {/* Animation video  */}
                <div
                  className={`size-[88px] rounded-2xl border-2 cursor-pointer flex justify-center items-center ${
                    video.animationUrl
                      ? "border-[#05A8E3] bg-[#B6E9FB] border-dotted"
                      : "border-[#B3B8B8] bg-[#F1F1F1]"
                  }`}
                  onClick={() => setIsAddAnimationOpen(true)}
                >
                  <span className="text-xs text-center">
                    {video.animationUrl ? "Animation video ✅" : ""}
                  </span>
                </div>

                {/* Audio  */}
                <div
                  className={`size-[88px] rounded-2xl border-2 cursor-pointer flex justify-center items-center ${
                    video.videoUrl
                      ? "border-[#05A8E3] bg-[#B6E9FB] border-dotted"
                      : "border-[#B3B8B8] bg-[#F1F1F1]"
                  }`}
                  // onClick={() => setIsAddTranscriptOpen(true)}
                >
                  <span className="text-xs text-center">
                    {video.videoUrl ? "Audio URL ✅" : ""}
                  </span>
                </div>

                {/* Video steps  */}
                <div
                  className={`size-[88px] rounded-2xl border-2 cursor-pointer flex justify-center items-center ${
                    video.videoSteps.length > 0
                      ? "border-[#05A8E3] bg-[#B6E9FB] border-dotted"
                      : "border-[#B3B8B8] bg-[#F1F1F1]"
                  }`}
                  onClick={() => setAddStepOpen(true)}
                >
                  <span className="text-xs text-center">
                    {video.videoSteps.length > 0 ? "Video Steps ✅" : ""}
                  </span>
                </div>
              </div>
              <p className="text-center text-[var(--text-secondary)] text-[10px] leading-3.5">
                Please look at the selected area to see which slot you are
                uploading video/file.
              </p>
            </div>
          </div>
        </div>
      </div>

      {isAddClassVideoOpen && (
        <ClassVideo
          key={video.id}
          id={video.id}
          videoIndex={videoIndex}
          setIsAddClassVideoOpen={setIsAddClassVideoOpen}
        />
      )}

      {isAddDemoVideoOpen && (
        <DemoVideo
          key={video.id}
          id={video.id}
          videoIndex={videoIndex}
          setIsAddDemoVideoOpen={setIsAddDemoVideoOpen}
        />
      )}

      {isAddAnimationOpen && (
        <AnimationVideo
          key={video.id}
          id={video.id}
          videoIndex={videoIndex}
          setIsAddAnimationOpen={setIsAddAnimationOpen}
        />
      )}

      {isAddTranscriptOpen && (
        <AddTranscript
          key={video.id}
          id={video.id}
          videoIndex={videoIndex}
          setIsAddTranscriptOpen={setIsAddTranscriptOpen}
        />
      )}

      {addStepsOpen && (
        <AddVideoSteps
          key={video.id}
          id={video.id}
          videoIndex={videoIndex}
          setAddStepOpen={setAddStepOpen}
        />
      )}
      {addQuestionsOpen && (
        <AddQuestionsAndChallenge
          key={video.id}
          id={video.id}
          videoIndex={videoIndex}
          setAddQuestionsOpen={setAddQuestionsOpen}
        />
      )}

      {isDeleteClassVideoOpen && (
        <DeleteVideo
          key={video.id}
          videoIndex={videoIndex}
          videoTitle={video.title}
          onDelete={removeClassVideo}
          onClose={() => setIsDeleteClassVideoOpen(false)}
        />
      )}
    </div>
  );
}
