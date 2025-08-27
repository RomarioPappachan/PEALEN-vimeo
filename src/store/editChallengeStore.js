import { create } from "zustand";
import { updateChallengeById } from "@/api/course";

export const useEditChallengeStore = create((set, get) => ({
  updatedChallenge: {
    id: null,
    description: "",
    image: null,
    imageUrl: "",
  },

  // load detail to edit
  setChallengeToEdit: (challengeDetails) => {
    set((state) => {
      return {
        updatedChallenge: {
          ...state.updatedChallenge,
          id: challengeDetails?.id || null,
          description: challengeDetails?.description || "",
          imageUrl: challengeDetails?.imageUrl || "",
        },
      };
    });
  },

  changeChallengeText: (text) => {
    set((state) => {
      return {
        updatedChallenge: {
          ...state.updatedChallenge,
          description: text,
        },
      };
    });
  },

  changeChallengeImage: (image) => {
    set((state) => {
      return {
        updatedChallenge: {
          ...state.updatedChallenge,
          image: image,
        },
      };
    });
  },

  editChallengeById: async (challengeId) => {
    try {
      const { updatedChallenge } = get();

      const formData = new FormData();

      // Append challenge text
      formData.append("description", updatedChallenge.description);

      // Append challenge image (if present)
      if (updatedChallenge.image) {
        formData.append("image", updatedChallenge.image);
      }

      // ✅ Call the API with formData
      const res = await updateChallengeById(challengeId, formData);
      return res;
    } catch (error) {
      throw error;
    }
  },

  resetEditChallengeStore: () => {
    set({
      updatedChallenge: {
        id: null,
        description: "",
        image: null,
        imageUrl: "",
      },
    });
  },
}));
