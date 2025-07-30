import { create } from "zustand";
import { createCourseVideos } from "@/api/course";

export const useNewClassVideoStore = create((set, get) => ({
  newClassVideoDetails: {
    videoType: "class",
    title: "",
    subject: "",
    videoSteps: [],

    videoUrl: "https://vimeo.com/manage/videos/1104073672",
    videoId: "1104073672",

    demoVideourl: "https://vimeo.com/manage/videos/1104073672",
    demoVideoId: "1104073672",

    animationUrl: "https://vimeo.com/manage/videos/1104073672",
    animationVideoId: "1104073672",

    image: null,
    pdf: null,
    srt: null,
  },

  setNewClassVideoDetails: (name, value) => {
    set((state) => {
      return {
        newClassVideoDetails: {
          ...state.newClassVideoDetails,
          [name]: value,
        },
      };
    });
  },

  addClassVideoSteps: (newVideoStep) => {
    set((state) => {
      const updatedvideoSteps = state.newClassVideoDetails.videoSteps;
      updatedvideoSteps.push(newVideoStep);
      return {
        newClassVideoDetails: {
          ...state.newClassVideoDetails,
          videoSteps: updatedvideoSteps,
        },
      };
    });
  },

  removeClassVideoSteps: (stepIndex) => {
    set((state) => {
      const updatedvideoSteps = state.newClassVideoDetails.videoSteps.filter(
        (_, index) => index !== stepIndex
      );
      return {
        newClassVideoDetails: {
          ...state.newClassVideoDetails,
          videoSteps: updatedvideoSteps,
        },
      };
    });
  },

  addNewClassVideo: async (courseId) => {
    try {
      const { newClassVideoDetails } = get();

      const classVideos = [newClassVideoDetails];

      const formData = new FormData();

      const classVideosJson = classVideos.map(
        ({
          title,
          subject,
          videoType,
          videoUrl,
          videoId,
          demoVideourl,
          demoVideoId,
          animationUrl,
          animationVideoId,
          videoSteps,
        }) => ({
          title,
          subject,
          videoType,
          videoUrl,
          videoId,
          demoVideourl,
          demoVideoId,
          animationUrl,
          animationVideoId,
          videoSteps,
        })
      );
      formData.append("classVideos", JSON.stringify(classVideosJson));

      // ✅ Append related files
      classVideos.forEach((video, i) => {
        if (video.image)
          formData.append(`classVideos[${i}][image]`, video.image);
        if (video.pdf) formData.append(`classVideos[${i}][pdf]`, video.pdf);
        if (video.srt) formData.append(`classVideos[${i}][srt]`, video.srt);
      });

      // ✅ Call your imported API here
      const res = await createCourseVideos(courseId, formData);
      return res;
    } catch (error) {
      throw error;
    }
  },

  resetNewClassVideo: () => {
    set((state) => {
      return {
        newClassVideoDetails: {
          videoType: "class",
          title: "",
          subject: "",
          videoSteps: [],

          videoUrl: "",
          videoId: "",

          demoVideourl: "",
          demoVideoId: "",

          animationUrl: "",
          animationVideoId: "",

          image: null, // for thumbnail
          pdf: null, // for course material
          srt: null, //for video subtitle
        },
      };
    });
  },
}));
