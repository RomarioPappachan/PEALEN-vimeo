"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useEditConclusionVideoStore } from "@/store/editConclusionVideoStore";
import { useCourseDetailStore } from "@/store/courseDetailStore";
import ModuleMaterial from "./ModuleMaterial";

import toast from "react-hot-toast";
import { LuCircleCheckBig } from "react-icons/lu";

export default function EditConclusionVideo({ videoIndex, video, onCancel }) {
  const { courseId } = useParams();
  const {
    updatedConclusionVideoDetails,
    setInitialConclusionVideo,
    setConclusionVideoDetails,
    updateConclusionVideoById,
    resetSelectedConclusionVideo,
  } = useEditConclusionVideoStore();

  const { getCourseById } = useCourseDetailStore();

  const [isEditConclusionMaterialOpen, setIsEditConclusionMaterialOpen] =
    useState(false);
  const [isEditConclusionVideoOpen, setIsEditConclusionVideoOpen] =
    useState(false);

  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    setInitialConclusionVideo({
      id: video?.id || null,
      videoType: "conclusion",
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
    setConclusionVideoDetails(name, value); // in the store for form submission
  };

  const handleVideoThumbnail = (e) => {
    const name = e.target.name;
    const file = e.target.files[0];

    setConclusionVideoDetails(name, file); // in the store for form submission
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setIsUpdating(true);

    const { title, videoThumbnail, image, videoId } =
      updatedConclusionVideoDetails;

    if (!title || !videoId || (!image && !videoThumbnail)) {
      toast("Please add title, image and video");
      setIsUpdating(false);

      return;
    }

    try {
      const res = await updateConclusionVideoById();
      console.log(res);
      toast.success("Conclusion video updated successfully");

      onCancel(); // close edit section
      getCourseById(courseId);
    } catch (error) {
      console.log(error);
      toast.error("Failed to update Conclusion video");
    } finally {
      setIsUpdating(false);
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
                id={`conclusionTitle-${videoIndex}`}
                type="text"
                name="title"
                value={updatedConclusionVideoDetails.title}
                className="w-full h-10 px-3.5 py-2 text-sm text-[var(--text-secondary)] border border-[var(--border-primary)] rounded-xl outline-none placeholder:text-[var(--text-placeholder)] placeholder:italic focus:border-[var(--border-secondary)]"
                placeholder="Type here"
                onChange={handleOnChange}
              />

              <div className="flex justify-between gap-x-10">
                <button
                  className="w-full h-10 p-3 border border-[var(--border-secondary)] rounded-xl outline-none flex justify-center items-center gap-x-2 cursor-pointer"
                  type="button"
                  // onClick={() => setIsEditConclusionVideoOpen(true)}
                >
                  <span className="text-sm text-[var(--border-secondary)] font-semibold">
                    Conclusion Video
                  </span>
                  {updatedConclusionVideoDetails?.videoId && (
                    <LuCircleCheckBig className="text-xl text-[var(--border-secondary)]" />
                  )}
                </button>

                <button
                  className="w-full h-10 p-3 border border-[var(--border-secondary)] rounded-xl outline-none flex justify-center items-center gap-x-2 cursor-pointer"
                  type="button"
                  onClick={() => setIsEditConclusionMaterialOpen(true)}
                >
                  <span className="text-sm text-[var(--border-secondary)] font-semibold">
                    Module materials
                  </span>
                  {(updatedConclusionVideoDetails?.moduleMaterial ||
                    updatedConclusionVideoDetails?.pdf?.name) && (
                    <LuCircleCheckBig className="text-xl text-[var(--border-secondary)]" />
                  )}
                </button>
              </div>
            </div>

            <div>
              <button
                type="button"
                className="h-10 p-4 text-sm rounded-xl bg-[#72c347] text-[var(--background-primary)] cursor-pointer flex justify-center items-center"
                //   onClick={() => setIsAddConclusionVideoOpen(true)}
              >
                {updatedConclusionVideoDetails?.videoId
                  ? "Change Video"
                  : "+ Add Video"}
              </button>
            </div>
          </div>

          <div className="w-1/5">
            <div>
              <label
                htmlFor={`conclusionVideoThumbnail-${videoIndex}`}
                className="text-base text-[var(--text-secondary)] font-semibold cursor-pointer"
              >
                {updatedConclusionVideoDetails?.image?.name ||
                updatedConclusionVideoDetails?.videoThumbnail ? (
                  <div className="w-full h-32 rounded-2xl border border-[var(--border-primary)] overflow-hidden flex justify-center items-center">
                    <img
                      src={
                        updatedConclusionVideoDetails?.image
                          ? URL.createObjectURL(
                              updatedConclusionVideoDetails?.image
                            )
                          : updatedConclusionVideoDetails?.videoThumbnail
                      }
                      alt={updatedConclusionVideoDetails?.title || "Thumbnail"}
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
              resetSelectedConclusionVideo(); // reset id in store
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

      {isEditConclusionMaterialOpen && (
        <ModuleMaterial
          video={updatedConclusionVideoDetails}
          onFileChange={setConclusionVideoDetails}
          onClose={() => setIsEditConclusionMaterialOpen(false)}
        />
      )}
    </>
  );
}
