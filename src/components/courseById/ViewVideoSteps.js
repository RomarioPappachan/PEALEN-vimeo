"use client";

import React, { useState } from "react";
import { createPortal } from "react-dom";

import { LuX } from "react-icons/lu";

export default function ViewVideoSteps({ videoSteps, onClose }) {
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
            Video Steps
          </h2>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto mx-14 pb-24 flex-1">
          <label className="block text-base text-[var(--text-secondary)] font-semibold mb-2">
            Video Steps
          </label>
          <div className="w-full min-h-32 p-3.5 rounded-2xl border border-[var(--border-primary)] focus-within:border-[var(--border-secondary)]">
            {videoSteps.length > 0 ? (
              <ul className="list-disc pl-5 space-y-2 text-[var(--text-secondary)]">
                {videoSteps.map((step, index) => (
                  <li key={index} className="relative pr-6">
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-[var(--text-secondary)]">
                No video steps added
              </p>
            )}
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
