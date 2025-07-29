"use client";

import React from "react";
import { createPortal } from "react-dom";

import { LuX, LuUpload, LuTrash2 } from "react-icons/lu";

export default function ModuleMaterial({ video, onFileChange, onClose }) {
  const handleFileChange = (e) => {
    const name = e.target.name;
    const file = e.target.files[0];
    if (file) {
      onFileChange(name, file);
    }
  };

  const handleRemoveFile = () => {
    onFileChange("pdf", null);
  };

  return createPortal(
    <div className="fixed inset-0 z-50 bg-black/40 flex justify-center items-center px-2 py-6">
      <div className="relative w-full max-w-2xl h-auto max-h-[90vh] bg-[var(--background-primary)] rounded-2xl overflow-hidden flex flex-col items-center pb-8">
        {/* Close Button */}
        <button
          type="button"
          onClick={() => onClose(false)}
          className="absolute top-3 right-3 size-9 rounded-lg bg-[#DF5050] text-white flex justify-center items-center z-10 cursor-pointer"
        >
          <LuX className="text-xl" />
        </button>

        {/* Header */}
        <div className="pt-6 px-6 pb-3 w-full text-center">
          <h2 className="text-base md:text-lg font-semibold text-[var(--text-secondary)]">
            Add Module Material
          </h2>
        </div>

        {/* File Upload */}
        <div className="flex flex-col items-center justify-center px-6 py-6 w-full">
          <label
            htmlFor="pdf"
            className="cursor-pointer flex items-center gap-2 border border-[#72c347] text-[var(--text-primary)] px-4 py-2 rounded-lg shadow-md hover:bg-opacity-90 transition duration-200"
          >
            <LuUpload className="text-lg text-[#72c347]" />
            <span className="text-sm md:text-base">Upload PDF File</span>
          </label>
          <input
            type="file"
            name="pdf"
            id="pdf"
            accept=".pdf"
            onChange={(e) => handleFileChange(e)}
            className="hidden"
          />

          {(video?.pdf?.name || video?.moduleMaterial) && (
            <div className="mt-5 flex flex-col items-center space-y-3">
              <p className="text-center text-sm md:text-base text-[var(--text-secondary)] break-words max-w-xs md:max-w-md lg:max-w-lg">
                Selected File:{" "}
                <span className="font-medium">
                  {video?.pdf?.name ? video?.pdf?.name : video?.moduleMaterial}
                </span>
              </p>
              <button
                type="button"
                onClick={() => handleRemoveFile()}
                className="flex items-center gap-1 bg-[#DF5050] text-white px-3 py-1 rounded-md shadow hover:bg-opacity-90 transition duration-200"
              >
                <LuTrash2 className="text-lg" />
                <span className="text-sm">Remove</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}
