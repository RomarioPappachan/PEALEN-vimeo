import { create } from "zustand";
import { createTestChallenge } from "@/api/course";

export const useNewChallengeStore = create((set, get) => ({
  newChallenge: {
    description: "",
    image: null,
  },

  changeChallengeText: (text) => {
    set((state) => {
      return {
        newChallenge: {
          ...state.newChallenge,
          description: text,
        },
      };
    });
  },

  changeChallengeImage: (image) => {
    set((state) => {
      return {
        newChallenge: {
          ...state.newChallenge,
          image: image,
        },
      };
    });
  },

  addNewChallenge: async (testId) => {
    try {
      const { newChallenge } = get();

      const formData = new FormData();

      // Append challenge text
      formData.append("description", newChallenge.description);

      // Append challenge image (if present)
      if (newChallenge.image) {
        formData.append("image", newChallenge.image);
      }

      // ✅ Call the API with formData
      const res = await createTestChallenge(testId, formData);
      return res;
    } catch (error) {
      throw error;
    }
  },

  resetNewChallengeStore: () => {
    set({
      newChallenge: {
        description: "",
        image: null,
      },
    });
  },
}));
