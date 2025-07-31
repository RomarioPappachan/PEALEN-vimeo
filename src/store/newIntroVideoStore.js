import { create } from "zustand";
import { createCourseVideos } from "@/api/course";

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

  setNewIntroVideoId: (newVideoId) => {
    set((state) => {
      return {
        newIntroVideoDetails: {
          ...state.newIntroVideoDetails,
          videoId: newVideoId,
          videoUrl: newVideoId,
        },
      };
    });
  },

  addNewIntroVideo: async (courseId) => {
    try {
      const { newIntroVideoDetails } = get();

      const introVideos = [newIntroVideoDetails];

      const formData = new FormData();

      const introVideosJson = introVideos.map(
        ({ title, videoUrl, videoId, videoType }) => ({
          title: title,
          videoUrl,
          videoId,
          videoType,
        })
      );
      formData.append("introVideos", JSON.stringify(introVideosJson));

      // ✅ Append related files
      introVideos.forEach((video, i) => {
        if (video.image)
          formData.append(`introVideos[${i}][image]`, video.image);
        if (video.pdf) formData.append(`introVideos[${i}][pdf]`, video.pdf);
      });

      // ✅ Call your imported API here
      const res = await createCourseVideos(courseId, formData);
      return res;
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
