"use client";
import React, { useState } from "react";
import { useParams } from "next/navigation";
import { useNewConclusionVideoStore } from "@/store/newConclusionVideoStore";
import { useCourseDetailStore } from "@/store/courseDetailStore";
import ModuleMaterial from "./ModuleMaterial";

import { LiaTrashAlt } from "react-icons/lia";
import { LuCircleCheckBig, LuMinus, LuPlus } from "react-icons/lu";
import toast from "react-hot-toast";

export default function NewConclusionVideoForm({ index, onCancel }) {
  const { courseId } = useParams();

  const {
    newConclusionVideoDetails,
    setNewConclusionVideoDetails,
    addNewConclusionVideo,
    resetNewConclusionVideo,
  } = useNewConclusionVideoStore();
  const { getCourseById } = useCourseDetailStore();

  const [isExpanded, setIsExpanded] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [isAddConclusionMaterialOpen, setIsAddConclusionMaterialOpen] =
    useState(false);
  const [isAddConclusionVideoOpen, setIsAddConclusionVideoOpen] =
    useState(false);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setNewConclusionVideoDetails(name, value); // in the store for form submission
  };

  const handleVideoThumbnail = (e) => {
    const name = e.target.name;
    const file = e.target.files[0];

    setNewConclusionVideoDetails(name, file); // in the store for form submission
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const { title, image, videoId } = newConclusionVideoDetails;

    if (!title || !videoId || !image) {
      toast("Please add title, image and video");
      setIsSubmitting(false);
      return;
    }

    try {
      const res = await addNewConclusionVideo(courseId);

      toast.success("Conclusion Video added successfully");
      resetNewConclusionVideo(); //reset store
      onCancel(); // close edit section
      getCourseById(courseId);
    } catch (error) {
      console.log(error);
      toast.error("Error adding Conclusion Video.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="px-8 py-4 bg-[var(--background-primary)] rounded-2xl drop-shadow-md dark:border dark:border-[var(--border-secondary)]">
      <div className="flex justify-between items-center">
        <h3 className="font-semibold text-sm text-[var(--text-secondary)]">
          {index + 1}
          <span className="ms-4">
            {newConclusionVideoDetails?.title
              ? newConclusionVideoDetails?.title
              : "Untitled Video"}
          </span>
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
        <form className="m-0" onSubmit={handleSubmit}>
          <h3 className="text-[var(--text-secondary)] text-sm font-normal">
            Video Title
          </h3>

          <div className="flex gap-4">
            <div className="w-4/5 flex gap-x-3">
              <div className="flex-1 space-y-6">
                <input
                  id={`conclusionTitle-${index + 1}`}
                  type="text"
                  name="title"
                  value={newConclusionVideoDetails?.title}
                  className="w-full h-10 px-3.5 py-2 text-sm text-[var(--text-secondary)] border border-[var(--border-primary)] rounded-xl outline-none placeholder:text-[var(--text-placeholder)] placeholder:italic focus:border-[var(--border-secondary)]"
                  placeholder="Type here"
                  onChange={handleOnChange}
                />

                <div className="flex justify-between gap-x-10">
                  <button
                    className="w-full h-10 p-3 border border-[var(--border-secondary)] rounded-xl outline-none flex justify-center items-center gap-x-2 cursor-pointer"
                    type="button"
                    // onClick={() => setIsAddConclusionVideoOpen(true)}
                  >
                    <span className="text-sm text-[var(--border-secondary)] font-semibold">
                      Conclusion Video
                    </span>
                    {newConclusionVideoDetails?.videoId && (
                      <LuCircleCheckBig className="text-xl text-[var(--border-secondary)]" />
                    )}
                  </button>

                  <button
                    className="w-full h-10 p-3 border border-[var(--border-secondary)] rounded-xl outline-none flex justify-center items-center gap-x-2 cursor-pointer"
                    type="button"
                    onClick={() => setIsAddConclusionMaterialOpen(true)}
                  >
                    <span className="text-sm text-[var(--border-secondary)] font-semibold">
                      Module materials
                    </span>
                    {newConclusionVideoDetails?.pdf?.name && (
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
                  {newConclusionVideoDetails?.videoId
                    ? "Change Video"
                    : "+ Add Video"}
                </button>
              </div>
            </div>

            <div className="w-1/5">
              <div>
                <label
                  htmlFor={`conclusionVideoThumbnail-${index + 1}`}
                  className="text-base text-[var(--text-secondary)] font-semibold cursor-pointer"
                >
                  {newConclusionVideoDetails?.image?.name ? (
                    <div className="w-full h-32 rounded-2xl border border-[var(--border-primary)] overflow-hidden flex justify-center items-center">
                      <img
                        src={URL.createObjectURL(
                          newConclusionVideoDetails?.image
                        )}
                        alt={newConclusionVideoDetails?.title || "Thumbnail"}
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
                    id={`conclusionVideoThumbnail-${index + 1}`}
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
            {/* <button
              type="button"
              onClick={() => {
                onCancel();
                resetNewConclusionVideo(); //reset store
              }}
              className="px-4 py-2 text-sm font-semibold text-white bg-gray-500 rounded-xl"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-semibold text-white bg-[#72C347] rounded-xl"
            >
              Submit
            </button> */}

            <button
              type="button"
              onClick={() => {
                onCancel();
                resetNewConclusionVideo(); //reset store
              }}
              className={`px-4 py-2 text-sm font-semibold text-white bg-gray-500 rounded-xl ${
                isSubmitting ? "cursor-not-allowed" : "cursor-pointer"
              }`}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`px-4 py-2 text-sm font-semibold text-white bg-[#72C347] rounded-xl ${
                isSubmitting ? "cursor-not-allowed" : "cursor-pointer"
              }`}
              disabled={isSubmitting}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
      {isAddConclusionMaterialOpen && (
        <ModuleMaterial
          video={newConclusionVideoDetails}
          onFileChange={setNewConclusionVideoDetails}
          onClose={() => setIsAddConclusionMaterialOpen(false)}
        />
      )}
    </div>
  );
}
