"use client";
import React, { useState } from "react";
import { useCourseTestAndChallengeStore } from "@/store/courseTestAndChallengeStore";
import { deleteChallengeById } from "@/api/course";
import toast from "react-hot-toast";

export default function ViewChallenge({ onEdit }) {
  const { challenge } = useCourseTestAndChallengeStore();
  const {
    selectedVideoId,
    getVideoTestAndChallenge,
    isChallengeActionButtonsDisabled,
    disableChallengeButtons,
  } = useCourseTestAndChallengeStore();

  const [isDeleteConfirm, setIsDeleteConfirm] = useState(false);

  const handleDeleteChallenge = async (e) => {
    e.preventDefault();

    disableChallengeButtons(true);

    try {
      const res = await deleteChallengeById(challenge.id);
      toast.success("Challenge deleted successfully");
      setIsDeleteConfirm(false);
      getVideoTestAndChallenge(selectedVideoId);
    } catch (error) {
      toast.error("Error deleting challenge.");
    } finally {
      disableChallengeButtons(false);
    }
  };

  return (
    <>
      <div className="w-full min-h-32 p-0.5 flex items-start">
        <div className="grow px-4 py-3 text-sm text-[var(--text-secondary)]">
          <p>{challenge?.description}</p>
        </div>
        {challenge?.imageUrl && (
          <div className="w-[400px] py-3">
            <img
              src={challenge?.imageUrl}
              alt="challenge image"
              className="w-full"
            />
          </div>
        )}
      </div>

      {!isDeleteConfirm ? (
        <div className="mt-2 flex items-center justify-end gap-4">
          <button
            type="button"
            className={`px-4 py-2 text-sm font-semibold text-white bg-rose-500 rounded-xl ${
              isChallengeActionButtonsDisabled
                ? "cursor-not-allowed"
                : "cursor-pointer"
            }`}
            onClick={() => setIsDeleteConfirm(true)}
            disabled={isChallengeActionButtonsDisabled}
          >
            Delete
          </button>
          <button
            className={`px-4 py-2 text-sm font-semibold text-white bg-[#72C347] rounded-xl ${
              isChallengeActionButtonsDisabled
                ? "cursor-not-allowed"
                : "cursor-pointer"
            }`}
            type="button"
            onClick={onEdit}
            disabled={isChallengeActionButtonsDisabled}
          >
            Edit Challenge
          </button>
        </div>
      ) : (
        <div className="mt-2 flex items-center justify-end gap-4">
          <p className="text-sm text-[var(--text-secondary)]">
            Are you sure you want to delete the challenge?
          </p>
          <button
            className={`px-2 py-1 text-sm font-semibold text-white bg-rose-500 rounded-xl ${
              isChallengeActionButtonsDisabled
                ? "cursor-not-allowed"
                : "cursor-pointer"
            }`}
            type="button"
            onClick={handleDeleteChallenge}
            disabled={isChallengeActionButtonsDisabled}
          >
            Confirm
          </button>
          <button
            className={`px-2 py-1 text-sm font-semibold text-white bg-gray-500 rounded-xl ${
              isChallengeActionButtonsDisabled
                ? "cursor-not-allowed"
                : "cursor-pointer"
            }`}
            type="button"
            onClick={() => setIsDeleteConfirm(false)}
            disabled={isChallengeActionButtonsDisabled}
          >
            Cancel
          </button>
        </div>
      )}
    </>
  );
}
