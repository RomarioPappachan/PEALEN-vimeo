import { create } from "zustand";
import { createCourseVideos } from "@/api/course";

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

  setVideoIdInStore: (newVideoId, type) => {
    set((state) => {
      return {
        newConclusionVideoDetails: {
          ...state.newConclusionVideoDetails,
          videoId: newVideoId,
          videoUrl: newVideoId,
        },
      };
    });
  },

  deleteVideoIdFromStore: (videoType) => {
    set((state) => {
      return {
        newConclusionVideoDetails: {
          ...state.newConclusionVideoDetails,
          videoId: "",
          videoUrl: "",
        },
      };
    });
  },

  addNewConclusionVideo: async (courseId) => {
    try {
      const { newConclusionVideoDetails } = get();

      const conclusionVideos = [newConclusionVideoDetails];

      const formData = new FormData();

      const conclusionVideosJson = conclusionVideos.map(
        ({ title, videoUrl, videoId, videoType }) => ({
          title,
          videoUrl,
          videoId,
          videoType,
        })
      );
      formData.append("conclusionVideos", JSON.stringify(conclusionVideosJson));

      conclusionVideos.forEach((video, i) => {
        if (video.image)
          formData.append(`conclusionVideos[${i}][image]`, video.image);
        if (video.pdf)
          formData.append(`conclusionVideos[${i}][pdf]`, video.pdf);
      });

      // ✅ Call your imported API here
      const res = await createCourseVideos(courseId, formData);
      return res;
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
