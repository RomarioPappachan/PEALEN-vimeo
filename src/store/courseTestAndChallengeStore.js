import { create } from "zustand";

export const useCourseTestAndChallengeStore = create((set) => ({
  selectedVideoId: null,

  setSelectedVideoId: (videoId) => {
    set({ selectedVideoId: null });
    if (videoId) {
      set({ selectedVideoId: videoId });
    }
  },
}));
