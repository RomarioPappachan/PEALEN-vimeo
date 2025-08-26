"use client";
import React, { useState } from "react";

import ViewQuestion from "./ViewQuestion";
import EditQuestion from "./EditQuestion";

export default function Question() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEditQuestion, setIsEditQuestion] = useState(false);
  return (
    <>
      {!isEditQuestion ? (
        <ViewQuestion />
      ) : (
        <EditQuestion onCancel={() => setIsEditQuestion(false)} />
      )}
      {/* buttons  */}
      {!isEditQuestion && (
        <div className="flex justify-end gap-4 mt-6">
          <button
            type="button"
            className={`px-4 py-2 text-sm font-semibold text-white bg-gray-500 rounded-xl ${
              isSubmitting ? "cursor-not-allowed" : "cursor-pointer"
            }`}
            disabled={isSubmitting}
          >
            Delete
          </button>
          <button
            type="button"
            className={`px-4 py-2 text-sm font-semibold text-white bg-[#72C347] rounded-xl ${
              isSubmitting ? "cursor-not-allowed" : "cursor-pointer"
            }`}
            disabled={isSubmitting}
            onClick={() => setIsEditQuestion(true)}
          >
            Edit Question
          </button>
        </div>
      )}
    </>
  );
}
