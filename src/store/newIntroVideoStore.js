import { create } from "zustand";

export const useNewIntroVideoStore = create((set, get) => ({
  newIntroVideoDetails: {
    videoType: "intro",
    title: "",
    videoUrl: "",
    videoId: "",
    image: null,
    pdf: null,
  },

  setNewIntroVideoDetails: (name, value) => {
    set((state) => {
      return {
        newIntroVideoDetails: {
          ...state.newIntroVideoDetails,
          [name]: value,
        },
      };
    });
  },

  addNewIntroVideo: async () => {
    try {
      const { newIntroVideoDetails } = get();

      const formData = new FormData();

      formData.append("videoType", newIntroVideoDetails.videoType);
      formData.append("title", newIntroVideoDetails.title);
      formData.append("videoUrl", newIntroVideoDetails.videoUrl);
      formData.append("videoId", newIntroVideoDetails.videoId);

      if (newIntroVideoDetails.image) {
        formData.append("image", newIntroVideoDetails.image);
      }

      if (newIntroVideoDetails.pdf) {
        formData.append("pdf", newIntroVideoDetails.pdf);
      }

      // console.log(formData);

      // ✅ Call your imported API here
      // const response = await createNewIntroVideo(formData);
      // return response.data;
    } catch (error) {
      throw error;
    }
  },

  resetNewIntroVideo: () => {
    set((state) => {
      return {
        newIntroVideoDetails: {
          videoType: "intro",
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
