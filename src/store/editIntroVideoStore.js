import { create } from "zustand";

export const useEditIntroVideoStore = create((set, get) => ({
  selectedIntroVideoId: null,
  updatedIntroVideoDetails: {
    id: null,
    videoType: "intro",
    title: "",
    videoThumbnail: null,
    moduleMaterial: "",

    videoUrl: "",
    videoId: "",

    image: null, // for new thumbnail
    pdf: null, // for new course material
  },

  setIntroVideoId: (videoId) => {
    set((state) => {
      return {
        selectedIntroVideoId: videoId,
        updatedIntroVideoDetails: {
          id: videoId,
          videoType: "intro",
          title: "",
          videoThumbnail: null,
          moduleMaterial: "",

          videoUrl: "",
          videoId: "",

          image: null, // for new thumbnail
          pdf: null, // for new course material
        },
      };
    });
  },

  setInitialIntroVideo: (videoDetails) => {
    set((state) => {
      return {
        ...state,
        updatedIntroVideoDetails: videoDetails,
      };
    });
  },

  setIntroVideoDetails: (name, value) => {
    set((state) => {
      return {
        updatedIntroVideoDetails: {
          ...state.updatedIntroVideoDetails,
          [name]: value,
        },
      };
    });
  },

  updateIntroVideo: async () => {
    try {
      const { updatedIntroVideoDetails } = get();

      const formData = new FormData();

      formData.append("id", updatedIntroVideoDetails.id);
      formData.append("videoType", updatedIntroVideoDetails.videoType);
      formData.append("title", updatedIntroVideoDetails.title);
      formData.append("videoUrl", updatedIntroVideoDetails.videoUrl);
      formData.append("videoId", updatedIntroVideoDetails.videoId);

      if (updatedIntroVideoDetails.image) {
        formData.append("image", updatedIntroVideoDetails.image);
      } else if (updatedIntroVideoDetails.videoThumbnail) {
        formData.append(
          "videoThumbnail",
          updatedIntroVideoDetails.videoThumbnail
        );
      }

      if (updatedIntroVideoDetails.pdf) {
        formData.append("pdf", updatedIntroVideoDetails.pdf);
      } else if (updatedIntroVideoDetails.moduleMaterial) {
        formData.append(
          "moduleMaterial",
          updatedIntroVideoDetails.moduleMaterial
        );
      }

      // console.log(formData);

      // ✅ Call your imported API here
      // const response = await updateIntroVideoById(formData);
      // return response.data;
    } catch (error) {
      throw error;
    }
  },

  resetSelectedIntroVideo: () => {
    set((state) => {
      return {
        selectedIntroVideoId: null,
        updatedIntroVideoDetails: {
          id: null,
          videoType: "intro",
          title: "",
          videoThumbnail: null,
          moduleMaterial: "",

          videoUrl: "",
          videoId: "",

          image: null, // for new thumbnail
          pdf: null, // for new course material
        },
      };
    });
  },
}));
