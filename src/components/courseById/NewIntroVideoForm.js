"use client";
import React, { useState } from "react";
import { useParams } from "next/navigation";
import { useNewIntroVideoStore } from "@/store/newIntroVideoStore";
import { useCourseDetailStore } from "@/store/courseDetailStore";
import ModuleMaterial from "./ModuleMaterial";

import { LiaTrashAlt } from "react-icons/lia";
import { LuCircleCheckBig, LuMinus, LuPlus } from "react-icons/lu";

export default function NewIntroVideoForm({ index, onCancel }) {
  const { courseId } = useParams();

  const {
    newIntroVideoDetails,
    setNewIntroVideoDetails,
    addNewIntroVideo,
    resetNewIntroVideo,
  } = useNewIntroVideoStore();
  const { getCourseById } = useCourseDetailStore();

  const [isExpanded, setIsExpanded] = useState(false);
  const [isAddIntroMaterialOpen, setIsAddIntroMaterialOpen] = useState(false);
  const [isAddIntroVideoOpen, setIsAddIntroVideoOpen] = useState(false);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setNewIntroVideoDetails(name, value); // in the store for form submission
  };

  const handleVideoThumbnail = (e) => {
    const name = e.target.name;
    const file = e.target.files[0];

    setNewIntroVideoDetails(name, file); // in the store for form submission
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(newIntroVideoDetails);
    const { title, image, videoId } = newIntroVideoDetails;

    if (!title || !videoId || !image) {
      toast("Please add title, image and video");
      return;
    }

    try {
      const res = await addNewIntroVideo();
      console.log(res);
      onCancel(); // close edit section
      getCourseById(courseId);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="px-8 py-4 bg-[var(--background-primary)] rounded-2xl drop-shadow-md dark:border dark:border-[var(--border-secondary)]">
      <div className="flex justify-between items-center">
        <h3 className="font-semibold text-sm text-[var(--text-secondary)]">
          {index + 1}
          <span className="ms-4">
            {newIntroVideoDetails?.title
              ? newIntroVideoDetails?.title
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
                  id={`introTitle-${index + 1}`}
                  type="text"
                  name="title"
                  value={newIntroVideoDetails?.title}
                  className="w-full h-10 px-3.5 py-2 text-sm text-[var(--text-secondary)] border border-[var(--border-primary)] rounded-xl outline-none placeholder:text-[var(--text-placeholder)] placeholder:italic focus:border-[var(--border-secondary)]"
                  placeholder="Type here"
                  onChange={handleOnChange}
                />

                <div className="flex justify-between gap-x-10">
                  <button
                    className="w-full h-10 p-3 border border-[var(--border-secondary)] rounded-xl outline-none flex justify-center items-center gap-x-2 cursor-pointer"
                    type="button"
                    // onClick={() => setIsAddIntroVideoOpen(true)}
                  >
                    <span className="text-sm text-[var(--border-secondary)] font-semibold">
                      Intro Video
                    </span>
                    {newIntroVideoDetails?.videoId > 0 && (
                      <LuCircleCheckBig className="text-xl text-[var(--border-secondary)]" />
                    )}
                  </button>

                  <button
                    className="w-full h-10 p-3 border border-[var(--border-secondary)] rounded-xl outline-none flex justify-center items-center gap-x-2 cursor-pointer"
                    type="button"
                    onClick={() => setIsAddIntroMaterialOpen(true)}
                  >
                    <span className="text-sm text-[var(--border-secondary)] font-semibold">
                      Module materials
                    </span>
                    {newIntroVideoDetails?.pdf?.name && (
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
                  {newIntroVideoDetails?.videoId
                    ? "Change Video"
                    : "+ Add Video"}
                </button>
              </div>
            </div>

            <div className="w-1/5">
              <div>
                <label
                  htmlFor={`introVideoThumbnail-${index + 1}`}
                  className="text-base text-[var(--text-secondary)] font-semibold cursor-pointer"
                >
                  {newIntroVideoDetails?.image?.name ? (
                    <div className="w-full h-32 rounded-2xl border border-[var(--border-primary)] overflow-hidden flex justify-center items-center">
                      <img
                        src={URL.createObjectURL(newIntroVideoDetails?.image)}
                        alt={newIntroVideoDetails?.title || "Thumbnail"}
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
                    id={`introVideoThumbnail-${index + 1}`}
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
                resetNewIntroVideo(); //reset store
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
            </button>
          </div>
        </form>
      </div>
      {isAddIntroMaterialOpen && (
        <ModuleMaterial
          video={newIntroVideoDetails}
          onFileChange={setNewIntroVideoDetails}
          onClose={() => setIsAddIntroMaterialOpen(false)}
        />
      )}
    </div>
  );
}
