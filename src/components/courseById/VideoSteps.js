"use client";

import React, { useState } from "react";
import { createPortal } from "react-dom";

import { LuX } from "react-icons/lu";

export default function VideoSteps({
  video,
  onClose,
  onAddStep,
  onRemoveStep,
}) {
  const [newVideoStep, setNewVideoStep] = useState("");

  const handleAddStep = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      const trimmed = newVideoStep.trim();
      if (trimmed !== "") {
        onAddStep(trimmed);
        setNewVideoStep("");
      }
    }
  };

  const handleDeleteStep = (indexToDelete) => {
    onRemoveStep(indexToDelete);
  };

  return createPortal(
    <div className="fixed inset-0 z-50 bg-black/40 flex justify-center items-center px-2 py-6">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-[var(--background-primary)] rounded-2xl overflow-hidden flex flex-col">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 right-3 size-9 rounded-lg bg-[#DF5050] text-white flex justify-center items-center z-10 cursor-pointer"
        >
          <LuX className="text-xl" />
        </button>

        {/* Header */}
        <div className="pt-6 px-6 pb-3">
          <h2 className="text-center text-xl md:text-2xl font-semibold text-[var(--text-secondary)]">
            Add Video Steps
          </h2>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto mx-14 pb-24 flex-1">
          <label
            htmlFor={`videoSteps`}
            className="block text-base text-[var(--text-secondary)] font-semibold mb-2"
          >
            Video Steps
          </label>
          <div className="w-full min-h-32 p-3.5 rounded-2xl border border-[var(--border-primary)] focus-within:border-[var(--border-secondary)]">
            {video?.videoSteps.length > 0 && (
              <ul className="list-disc pl-5 space-y-2 text-[var(--text-secondary)]">
                {video?.videoSteps.map((step, index) => (
                  <li key={index} className="relative pr-6">
                    <span>{step}</span>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        handleDeleteStep(index);
                      }}
                      className="absolute right-0 top-0 size-6 bg-[var(--text-secondary)] text-white hover:bg-red-400 rounded-full flex justify-center items-center cursor-pointer"
                      title="Delete"
                      type="button"
                    >
                      <LuX size={16} />
                    </button>
                  </li>
                ))}
              </ul>
            )}
            <textarea
              id={`videoSteps`}
              name="videoSteps"
              value={newVideoStep}
              onChange={(e) => setNewVideoStep(e.target.value)}
              onKeyDown={handleAddStep}
              className="w-full mt-2 outline-none text-[var(--text-secondary)] placeholder:text-[var(--text-placeholder)] placeholder:italic resize-none"
              placeholder="Type here and press Enter"
              rows={6}
            />
          </div>
        </div>

        {/* Sticky Footer Button */}
        <div className="absolute bottom-0 left-0 w-full bg-[var(--background-primary)] px-14 py-4 flex items-center justify-end">
          <button
            type="button"
            className="px-6 py-3 bg-[#72C347] hover:bg-[#72c347e2] text-white text-xl rounded-2xl font-semibold"
          >
            Add Steps
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
