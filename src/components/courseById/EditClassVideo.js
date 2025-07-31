"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useEditClassVideoStore } from "@/store/editClassVideoStore";
import { useCourseDetailStore } from "@/store/courseDetailStore";
import ModuleMaterial from "./ModuleMaterial";
import VideoTranscript from "./VideoTranscript";
import VideoSteps from "./VideoSteps";

import toast from "react-hot-toast";
import { LuCircleCheckBig } from "react-icons/lu";

export default function EditClassVideo({ videoIndex, video, onCancel }) {
  const { courseId } = useParams();
  const {
    updatedClassVideoDetails,
    setInitialClassVideo,
    setClassVideoDetails,
    addClassVideoSteps,
    removeClassVideoSteps,
    updateClassVideoById,
    resetSelectedClassVideo,
  } = useEditClassVideoStore();

  const { getCourseById } = useCourseDetailStore();

  const [isEditClassMaterialOpen, setIsEditClassMaterialOpen] = useState(false);
  const [isEditTranscriptOpen, setIsEditTranscriptOpen] = useState(false);
  const [isEditStepsOpen, setIsEditStepsOpen] = useState(false);

  const [isEditClassVideoOpen, setIsEditClassVideoOpen] = useState(false);
  const [isEditDemoVideoOpen, setIsEditDemoVideoOpen] = useState(false);
  const [isEditAnimationOpen, setIsEditAnimationOpen] = useState(false);

  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    setInitialClassVideo({
      id: video.id || null,
      videoType: video.videoType || "class",
      title: video.title || "",
      subject: video.subject || "",
      videoSteps: video.videoSteps || [],
      videoThumbnail: video.videoThumbnail || null,
      moduleMaterial: video.moduleMaterial || "",
      videoTranscript: video.videoTranscript || "",

      videoUrl: video.videoUrl || "",
      videoId: video.videoId || "",

      demoVideourl: video.demoVideourl || "",
      demoVideoId: video.demoVideoId || "",

      animationUrl: video.animationUrl || "",
      animationVideoId: video.animationVideoId || "",

      image: null, // for new thumbnail
      pdf: null, // for new module material
      srt: null, // for new transcript
    });
  }, []);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setClassVideoDetails(name, value); // in the store for form submission
  };

  const handleVideoThumbnail = (e) => {
    const name = e.target.name;
    const file = e.target.files[0];

    setClassVideoDetails(name, file); // in the store for form submission
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setIsUpdating(true);

    const { title, videoThumbnail, image, videoId } = updatedClassVideoDetails;

    if (!title || !videoId || (!image && !videoThumbnail)) {
      toast("Please add title, image and video");
      setIsUpdating(false);

      return;
    }

    try {
      const res = await updateClassVideoById();
      console.log(res);
      toast.success("Class video updated successfully");

      onCancel(); // close edit section
      getCourseById(courseId);
    } catch (error) {
      console.log(error);
      toast.error("Failed to update Class video");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <>
      <form onSubmit={handleUpdate}>
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
                  value={updatedClassVideoDetails?.title}
                  className="w-full h-10 px-3.5 py-2 text-sm bg-[var(--background-primary)] text-[var(--text-secondary)] border border-[var(--border-primary)] rounded-xl outline-none placeholder:text-[var(--text-placeholder)] placeholder:italic focus:border-[var(--border-secondary)]"
                  placeholder="Type here"
                  onChange={(e) => handleOnChange(e)}
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
                  value={updatedClassVideoDetails?.subject}
                  className="w-full h-10 px-3.5 py-2 text-sm bg-[var(--background-primary)] text-[var(--text-secondary)] border border-[var(--border-primary)] rounded-xl outline-none placeholder:text-[var(--text-placeholder)] placeholder:italic focus:border-[var(--border-secondary)]"
                  placeholder="Type here"
                  onChange={(e) => handleOnChange(e)}
                />
              </div>

              <div className="mt-7 flex gap-3.5">
                <div className="flex-1 grid grid-cols-3 gap-5 gap-y-3">
                  <button
                    type="button"
                    className="w-full h-10 p-3 border border-[var(--border-secondary)] rounded-xl outline-none flex justify-center items-center gap-x-2 cursor-pointer"
                    onClick={() => setIsEditClassVideoOpen(true)}
                  >
                    <span className="text-sm text-[var(--border-secondary)] font-semibold text-center leading-[18px]">
                      Add Class Video
                    </span>
                    {updatedClassVideoDetails?.videoId && (
                      <LuCircleCheckBig className="text-xl text-[var(--border-secondary)]" />
                    )}
                  </button>
                  <button
                    type="button"
                    className="w-full h-10 p-3 border border-[var(--border-secondary)] rounded-xl outline-none flex justify-center items-center gap-x-2 cursor-pointer"
                    onClick={() => setIsEditTranscriptOpen(true)}
                  >
                    <span className="text-sm text-[var(--border-secondary)] font-semibold text-center leading-[18px]">
                      Transcription (SRT)
                    </span>
                    {(updatedClassVideoDetails?.videoTranscript ||
                      updatedClassVideoDetails?.srt) && (
                      <LuCircleCheckBig className="text-xl text-[var(--border-secondary)]" />
                    )}
                  </button>
                  <button
                    type="button"
                    className="w-full h-10 p-3 border border-[var(--border-secondary)] rounded-xl outline-none flex justify-center items-center gap-x-2 cursor-pointer"
                    onClick={() => setIsEditDemoVideoOpen(true)}
                  >
                    <span className="text-sm text-[var(--border-secondary)] font-semibold text-center leading-[18px]">
                      Demo Video
                    </span>
                    {updatedClassVideoDetails?.demoVideoId && (
                      <LuCircleCheckBig className="text-xl text-[var(--border-secondary)]" />
                    )}
                  </button>
                  <button
                    type="button"
                    className="w-full h-10 p-3 border border-[var(--border-secondary)] rounded-xl outline-none flex justify-center items-center gap-x-2 cursor-pointer"
                    onClick={() => setIsEditAnimationOpen(true)}
                  >
                    <span className="text-sm text-[var(--border-secondary)] font-semibold text-center leading-[18px]">
                      Add Animation
                    </span>
                    {updatedClassVideoDetails?.animationVideoId && (
                      <LuCircleCheckBig className="text-xl text-[var(--border-secondary)]" />
                    )}
                  </button>
                  <button
                    type="button"
                    className="w-full h-10 p-3 border border-[var(--border-secondary)] rounded-xl outline-none flex justify-center items-center gap-x-2 cursor-pointer"
                    onClick={() => setIsEditStepsOpen(true)}
                  >
                    <span className="text-sm text-[var(--border-secondary)] font-semibold text-center leading-[18px]">
                      Add Steps
                    </span>
                    {updatedClassVideoDetails?.videoSteps?.length > 0 && (
                      <LuCircleCheckBig className="text-xl text-[var(--border-secondary)]" />
                    )}
                  </button>
                  <button
                    type="button"
                    className="w-full h-10 p-3 border border-[var(--border-secondary)] rounded-xl outline-none flex justify-center items-center gap-x-2 cursor-pointer"
                    onClick={() => setIsEditClassMaterialOpen(true)}
                  >
                    <span className="text-sm text-[var(--border-secondary)] font-semibold text-center leading-[18px]">
                      Module Material
                    </span>
                    {(updatedClassVideoDetails?.moduleMaterial ||
                      updatedClassVideoDetails?.pdf?.name) && (
                      <LuCircleCheckBig className="text-xl text-[var(--border-secondary)]" />
                    )}
                  </button>
                </div>
                <div>
                  <div className="w-44 h-28 rounded-2xl bg-[var(--border-primary)] flex justify-center items-center">
                    <label
                      htmlFor={`classVideoThumbnail-${videoIndex}`}
                      className="text-sm text-[var(--text-secondary)] font-semibold cursor-pointer"
                    >
                      {updatedClassVideoDetails?.image?.name ||
                      updatedClassVideoDetails?.videoThumbnail ? (
                        <div className="w-full h-28 rounded-2xl border border-[var(--border-primary)] overflow-hidden flex justify-center items-center">
                          <img
                            src={
                              updatedClassVideoDetails?.image
                                ? URL.createObjectURL(
                                    updatedClassVideoDetails?.image
                                  )
                                : updatedClassVideoDetails?.videoThumbnail
                            }
                            alt={updatedClassVideoDetails?.title || "Thumbnail"}
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
                        onChange={(e) => handleVideoThumbnail(e)}
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
                    updatedClassVideoDetails?.videoUrl
                      ? "border-[#05A8E3] bg-[#B6E9FB] border-dotted"
                      : "border-[#B3B8B8] bg-[#F1F1F1]"
                  }`}
                  //   onClick={() => setIsEditClassVideoOpen(true)}
                >
                  <span className="text-xs text-center">
                    {updatedClassVideoDetails?.videoUrl ? "Video ✅" : ""}
                  </span>
                </div>

                {/* Demo video  */}
                <div
                  className={`size-[88px] rounded-2xl border-2 cursor-pointer flex justify-center items-center ${
                    updatedClassVideoDetails?.demoVideourl
                      ? "border-[#05A8E3] bg-[#B6E9FB] border-dotted"
                      : "border-[#B3B8B8] bg-[#F1F1F1]"
                  }`}
                  //   onClick={() => setIsEditDemoVideoOpen(true)}
                >
                  <span className="text-xs text-center">
                    {updatedClassVideoDetails?.demoVideourl
                      ? "Demo Video ✅"
                      : ""}
                  </span>
                </div>

                {/* Transcript  */}
                <div
                  className={`size-[88px] rounded-2xl border-2 cursor-pointer flex justify-center items-center ${
                    updatedClassVideoDetails?.srt?.name ||
                    updatedClassVideoDetails?.videoTranscript
                      ? "border-[#05A8E3] bg-[#B6E9FB] border-dotted"
                      : "border-[#B3B8B8] bg-[#F1F1F1]"
                  }`}
                  onClick={() => setIsEditTranscriptOpen(true)}
                >
                  <span className="text-xs text-center">
                    {updatedClassVideoDetails?.srt?.name ||
                    updatedClassVideoDetails?.videoTranscript
                      ? "Transcript ✅"
                      : ""}
                  </span>
                </div>

                {/* Animation video  */}
                <div
                  className={`size-[88px] rounded-2xl border-2 cursor-pointer flex justify-center items-center ${
                    updatedClassVideoDetails?.animationUrl
                      ? "border-[#05A8E3] bg-[#B6E9FB] border-dotted"
                      : "border-[#B3B8B8] bg-[#F1F1F1]"
                  }`}
                  //   onClick={() => setIsEditAnimationOpen(true)}
                >
                  <span className="text-xs text-center">
                    {updatedClassVideoDetails?.animationUrl
                      ? "Animation video ✅"
                      : ""}
                  </span>
                </div>

                {/* Audio  */}
                <div
                  className={`size-[88px] rounded-2xl border-2 cursor-pointer flex justify-center items-center ${
                    updatedClassVideoDetails?.videoUrl
                      ? "border-[#05A8E3] bg-[#B6E9FB] border-dotted"
                      : "border-[#B3B8B8] bg-[#F1F1F1]"
                  }`}
                  // onClick={() => setIsEditTranscriptOpen(true)}
                >
                  <span className="text-xs text-center">
                    {updatedClassVideoDetails?.videoUrl ? "Audio URL ✅" : ""}
                  </span>
                </div>

                {/* Video steps  */}
                <div
                  className={`size-[88px] rounded-2xl border-2 cursor-pointer flex justify-center items-center ${
                    updatedClassVideoDetails?.videoSteps?.length > 0
                      ? "border-[#05A8E3] bg-[#B6E9FB] border-dotted"
                      : "border-[#B3B8B8] bg-[#F1F1F1]"
                  }`}
                  onClick={() => setIsEditStepsOpen(true)}
                >
                  <span className="text-xs text-center">
                    {updatedClassVideoDetails?.videoSteps?.length > 0
                      ? "Video Steps ✅"
                      : ""}
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

        {/* form buttons  */}
        <div className="flex justify-end gap-4 mt-6">
          <button
            type="button"
            onClick={() => {
              onCancel();
              resetSelectedClassVideo(); // reset id in store
            }}
            className={`px-4 py-2 text-sm font-semibold text-white bg-gray-500 rounded-xl ${
              isUpdating ? "cursor-not-allowed" : "cursor-pointer"
            }`}
            disabled={isUpdating}
          >
            Cancel
          </button>
          <button
            type="submit"
            className={`px-4 py-2 text-sm font-semibold text-white bg-[#72C347] rounded-xl ${
              isUpdating ? "cursor-not-allowed" : "cursor-pointer"
            }`}
            disabled={isUpdating}
          >
            Update
          </button>
        </div>
      </form>

      {isEditClassMaterialOpen && (
        <ModuleMaterial
          video={updatedClassVideoDetails}
          onFileChange={setClassVideoDetails}
          onClose={() => setIsEditClassMaterialOpen(false)}
        />
      )}

      {isEditTranscriptOpen && (
        <VideoTranscript
          video={updatedClassVideoDetails}
          onFileChange={setClassVideoDetails}
          onClose={() => setIsEditTranscriptOpen(false)}
        />
      )}

      {isEditStepsOpen && (
        <VideoSteps
          video={updatedClassVideoDetails}
          onAddStep={addClassVideoSteps}
          onRemoveStep={removeClassVideoSteps}
          onClose={() => setIsEditStepsOpen(false)}
        />
      )}
    </>
  );
}
