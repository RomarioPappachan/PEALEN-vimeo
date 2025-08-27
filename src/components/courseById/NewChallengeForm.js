"use client";
import React from "react";
import { useCourseTestAndChallengeStore } from "@/store/courseTestAndChallengeStore";
import { useNewChallengeStore } from "@/store/newChallengeStore";
import { LuPen } from "react-icons/lu";
import toast from "react-hot-toast";

export default function NewChallengeForm() {
  const {
    testId,
    selectedVideoId,
    getVideoTestAndChallenge,
    isChallengeActionButtonsDisabled,
    disableChallengeButtons,
  } = useCourseTestAndChallengeStore();

  const {
    newChallenge,
    changeChallengeText,
    changeChallengeImage,
    addNewChallenge,
    resetNewChallengeStore,
  } = useNewChallengeStore();

  const handleAddChallenge = async (e) => {
    e.preventDefault();
    disableChallengeButtons(true);  // disable every button

    const { description, image } = newChallenge;

    if (!description && !image) {
      toast("Add challenge text or image");
      return;
    }

    try {
      await addNewChallenge(testId);

      toast.success("Challenge added successfully");
      resetNewChallengeStore();
      getVideoTestAndChallenge(selectedVideoId); // reload test for video
    } catch (error) {
      toast.error("Error adding challenge");
    } finally {
      disableChallengeButtons(false); // enable button
    }
  };

  return (
    <form onSubmit={handleAddChallenge}>
      <div className="w-full p-0.5 border border-[var(--border-primary)] rounded-[10px] focus-within:border-[var(--border-secondary)] flex items-start">
        <textarea
          name="description"
          value={newChallenge.description}
          className="flex-1 w-full px-4 py-3 text-sm text-[var(--text-secondary)] rounded-[10px] outline-none placeholder:text-[var(--text-placeholder)]"
          placeholder="Type here"
          rows={4}
          onChange={(e) => changeChallengeText(e.target.value)}
        />
        <label className="w-20 h-full px-3 py-1 text-[10px] text-[#72C347] bg-[#E5E5E5] rounded-[10px] text-center cursor-pointer">
          {newChallenge.image?.name ? (
            <span className="flex items-center">
              <LuPen className="text-sm me-0.5" />
              <span>Edit Image</span>
            </span>
          ) : (
            "Upload Image"
          )}
          <input
            id={`challengeImage-${selectedVideoId}`}
            type="file"
            accept="image/*"
            name="image"
            hidden
            onChange={(e) => {
              if (e.target.files[0]) {
                changeChallengeImage(e.target.files[0]);
              }
            }}
          />
        </label>
      </div>

      <div className="flex items-center justify-end gap-4 mt-2">
        <button
          className={`px-4 py-2 text-sm font-semibold text-white bg-[#72C347] rounded-xl ${
            isChallengeActionButtonsDisabled
              ? "cursor-not-allowed"
              : "cursor-pointer"
          }`}
          type="submit"
          disabled={isChallengeActionButtonsDisabled}
        >
          Add Challenge
        </button>
      </div>
    </form>
  );
}
