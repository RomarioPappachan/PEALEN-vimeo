"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useEditIntroVideoStore } from "@/store/editIntroVideoStore";
import { useCourseDetailStore } from "@/store/courseDetailStore";
import ModuleMaterial from "./ModuleMaterial";

import toast from "react-hot-toast";
import { LuCircleCheckBig } from "react-icons/lu";

export default function EditIntroVideo({ videoIndex, video, onCancel }) {
  const { courseId } = useParams();
  const {
    updatedIntroVideoDetails,
    setInitialIntroVideo,
    setIntroVideoDetails,
    updateIntroVideo,
    resetSelectedIntroVideo,
  } = useEditIntroVideoStore();

  const { getCourseById } = useCourseDetailStore();

  const [isEditIntroMaterialOpen, setIsEditIntroMaterialOpen] = useState(false);
  const [isEditIntroVideoOpen, setIsEditIntroVideoOpen] = useState(false);

  useEffect(() => {
    setInitialIntroVideo({
      id: video?.id || null,
      videoType: "intro",
      title: video?.title || "",
      videoThumbnail: video?.videoThumbnail || null,
      moduleMaterial: video?.moduleMaterial || "",

      videoUrl: video?.videoUrl || "",
      videoId: video?.videoId || "",

      image: null, // for new thumbnail
      pdf: null, // for new course material
    });
  }, []);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setIntroVideoDetails(name, value); // in the store for form submission
  };

  const handleVideoThumbnail = (e) => {
    const name = e.target.name;
    const file = e.target.files[0];

    setIntroVideoDetails(name, file); // in the store for form submission
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const { title, videoThumbnail, image, videoId } = updatedIntroVideoDetails;

    if (!title || !videoId || (!image && !videoThumbnail)) {
      toast("Please add title, image and video");
      return;
    }

    try {
      const res = await updateIntroVideo();
      console.log(res);
      onCancel(); // close edit section
      getCourseById(courseId);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <form className="m-0" onSubmit={handleUpdate}>
        <h3 className="text-[var(--text-secondary)] text-sm font-normal">
          Video Title
        </h3>

        <div className="flex gap-4">
          <div className="w-4/5 flex gap-x-3">
            <div className="flex-1 space-y-6">
              <input
                id={`introTitle-${videoIndex}`}
                type="text"
                name="title"
                value={updatedIntroVideoDetails.title}
                className="w-full h-10 px-3.5 py-2 text-sm text-[var(--text-secondary)] border border-[var(--border-primary)] rounded-xl outline-none placeholder:text-[var(--text-placeholder)] placeholder:italic focus:border-[var(--border-secondary)]"
                placeholder="Type here"
                onChange={handleOnChange}
              />

              <div className="flex justify-between gap-x-10">
                <button
                  className="w-full h-10 p-3 border border-[var(--border-secondary)] rounded-xl outline-none flex justify-center items-center gap-x-2 cursor-pointer"
                  type="button"
                  // onClick={() => setIsEditIntroVideoOpen(true)}
                >
                  <span className="text-sm text-[var(--border-secondary)] font-semibold">
                    Intro Video
                  </span>
                  {updatedIntroVideoDetails?.videoId && (
                    <LuCircleCheckBig className="text-xl text-[var(--border-secondary)]" />
                  )}
                </button>

                <button
                  className="w-full h-10 p-3 border border-[var(--border-secondary)] rounded-xl outline-none flex justify-center items-center gap-x-2 cursor-pointer"
                  type="button"
                  onClick={() => setIsEditIntroMaterialOpen(true)}
                >
                  <span className="text-sm text-[var(--border-secondary)] font-semibold">
                    Module materials
                  </span>
                  {(updatedIntroVideoDetails?.moduleMaterial ||
                    updatedIntroVideoDetails?.pdf?.name) && (
                    <LuCircleCheckBig className="text-xl text-[var(--border-secondary)]" />
                  )}
                </button>
              </div>
            </div>

            <div>
              <button
                type="button"
                className="h-10 p-4 text-sm rounded-xl bg-[#72c347] text-[var(--background-primary)] cursor-pointer flex justify-center items-center"
                //   onClick={() => setIsAddIntroVideoOpen(true)}
              >
                {updatedIntroVideoDetails?.videoId
                  ? "Change Video"
                  : "+ Add Video"}
              </button>
            </div>
          </div>

          <div className="w-1/5">
            <div>
              <label
                htmlFor={`introVideoThumbnail-${videoIndex}`}
                className="text-base text-[var(--text-secondary)] font-semibold cursor-pointer"
              >
                {updatedIntroVideoDetails?.image?.name ||
                updatedIntroVideoDetails?.videoThumbnail ? (
                  <div className="w-full h-32 rounded-2xl border border-[var(--border-primary)] overflow-hidden flex justify-center items-center">
                    <img
                      src={
                        updatedIntroVideoDetails?.image
                          ? URL.createObjectURL(updatedIntroVideoDetails?.image)
                          : updatedIntroVideoDetails?.videoThumbnail
                      }
                      alt={updatedIntroVideoDetails?.title || "Thumbnail"}
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
                  id={`introVideoThumbnail-${videoIndex}`}
                  type="file"
                  accept="image/*"
                  name="image"
                  hidden
                  onChange={(e) => handleVideoThumbnail(e)}
                />
              </label>
            </div>
          </div>
        </div>

        {/* form buttons  */}
        <div className="flex justify-end gap-4 mt-6">
          <button
            type="button"
            onClick={() => {
              onCancel();
              resetSelectedIntroVideo(); // reset id in store
            }}
            className="px-4 py-2 text-sm font-semibold text-white bg-gray-500 rounded-xl"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-sm font-semibold text-white bg-[#72C347] rounded-xl"
          >
            Update
          </button>
        </div>
      </form>

      {isEditIntroMaterialOpen && (
        <ModuleMaterial
          video={updatedIntroVideoDetails}
          onFileChange={setIntroVideoDetails}
          onClose={() => setIsEditIntroMaterialOpen(false)}
        />
      )}
    </>
  );
}
