import { create } from "zustand";

export const useNewConclusionVideoStore = create((set, get) => ({
  newConclusionVideoDetails: {
    videoType: "conclusion",
    title: "",
    videoUrl: "",
    videoId: "",
    image: null,
    pdf: null,
  },

  setNewConclusionVideoDetails: (name, value) => {
    set((state) => {
      return {
        newConclusionVideoDetails: {
          ...state.newConclusionVideoDetails,
          [name]: value,
        },
      };
    });
  },

  addNewConclusionVideo: async () => {
    try {
      const { newConclusionVideoDetails } = get();

      const formData = new FormData();

      formData.append("videoType", newConclusionVideoDetails.videoType);
      formData.append("title", newConclusionVideoDetails.title);
      formData.append("videoUrl", newConclusionVideoDetails.videoUrl);
      formData.append("videoId", newConclusionVideoDetails.videoId);

      if (newConclusionVideoDetails.image) {
        formData.append("image", newConclusionVideoDetails.image);
      }

      if (newConclusionVideoDetails.pdf) {
        formData.append("pdf", newConclusionVideoDetails.pdf);
      }

      // console.log(formData);

      // ✅ Call your imported API here
      // const response = await createNewConclusionVideo(formData);
      // return response.data;
    } catch (error) {
      throw error;
    }
  },

  resetNewConclusionVideo: () => {
    set((state) => {
      return {
        newConclusionVideoDetails: {
          videoType: "conclusion",
          title: "",
          videoUrl: "",
          videoId: "",
          image: null, // for thumbnail
          pdf: null, // for course material
        },
      };
    });
  },
}));
