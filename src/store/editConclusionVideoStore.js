import { create } from "zustand";
import { updateVideoById } from "@/api/course";

export const useEditConclusionVideoStore = create((set, get) => ({
  selectedConclusionVideoId: null,
  updatedConclusionVideoDetails: {
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

  setConclusionVideoId: (videoId) => {
    set((state) => {
      return {
        selectedConclusionVideoId: videoId,
        updatedConclusionVideoDetails: {
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

  setInitialConclusionVideo: (videoDetails) => {
    set((state) => {
      return {
        ...state,
        updatedConclusionVideoDetails: videoDetails,
      };
    });
  },

  setConclusionVideoDetails: (name, value) => {
    set((state) => {
      return {
        updatedConclusionVideoDetails: {
          ...state.updatedConclusionVideoDetails,
          [name]: value,
        },
      };
    });
  },

  setVideoIdInStore: (newVideoId, type) => {
    set((state) => {
      return {
        updatedConclusionVideoDetails: {
          ...state.updatedConclusionVideoDetails,
          videoId: newVideoId,
          videoUrl: newVideoId,
        },
      };
    });
  },

  deleteVideoIdFromStore: (videoType) => {
    set((state) => {
      return {
        updatedConclusionVideoDetails: {
          ...state.updatedConclusionVideoDetails,
          videoId: "",
          videoUrl: "",
        },
      };
    });
  },

  updateConclusionVideoById: async () => {
    try {
      const { selectedConclusionVideoId, updatedConclusionVideoDetails } =
        get();

      const formData = new FormData();

      formData.append("id", updatedConclusionVideoDetails.id);
      formData.append("videoType", updatedConclusionVideoDetails.videoType);
      formData.append("title", updatedConclusionVideoDetails.title);
      formData.append("videoUrl", updatedConclusionVideoDetails.videoUrl);
      formData.append("videoId", updatedConclusionVideoDetails.videoId);

      if (updatedConclusionVideoDetails.image) {
        formData.append("image", updatedConclusionVideoDetails.image);
      } else if (updatedConclusionVideoDetails.videoThumbnail) {
        formData.append(
          "videoThumbnail",
          updatedConclusionVideoDetails.videoThumbnail
        );
      }

      if (updatedConclusionVideoDetails.pdf) {
        formData.append("pdf", updatedConclusionVideoDetails.pdf);
      } else if (updatedConclusionVideoDetails.moduleMaterial) {
        formData.append(
          "moduleMaterial",
          updatedConclusionVideoDetails.moduleMaterial
        );
      }

      // ✅ Call your imported API here
      const res = await updateVideoById(selectedConclusionVideoId, formData);
      return res.data;
    } catch (error) {
      throw error;
    }
  },

  resetSelectedConclusionVideo: () => {
    set((state) => {
      return {
        selectedConclusionVideoId: null,
        updatedConclusionVideoDetails: {
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
