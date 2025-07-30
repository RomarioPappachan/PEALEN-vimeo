import { create } from "zustand";

export const useEditClassVideoStore = create((set, get) => ({
  selectedClassVideoId: null,
  updatedClassVideoDetails: {
    id: null,
    videoType: "class",
    title: "",
    subject: "",
    videoSteps: [],
    videoThumbnail: null,
    moduleMaterial: "",
    videoTranscript: "",

    videoUrl: "https://vimeo.com/manage/videos/1104073672",
    videoId: "1104073672",

    demoVideourl: "https://vimeo.com/manage/videos/1104073672",
    demoVideoId: "1104073672",

    animationUrl: "https://vimeo.com/manage/videos/1104073672",
    animationVideoId: "1104073672",

    image: null, // for new thumbnail
    pdf: null, // for new module material
    srt: null, // for new transcript
  },

  setClassVideoId: (videoId) => {
    set((state) => {
      return {
        selectedClassVideoId: videoId,
        updatedClassVideoDetails: {
          id: null,
          videoType: "class",
          title: "",
          subject: "",
          videoSteps: [],
          videoThumbnail: null,
          moduleMaterial: "",
          videoTranscript: "",

          videoUrl: "",
          videoId: "",

          demoVideourl: "",
          demoVideoId: "",

          animationUrl: "",
          animationVideoId: "",

          image: null, // for new thumbnail
          pdf: null, // for new module material
          srt: null, // for new transcript
        },
      };
    });
  },

  setInitialClassVideo: (videoDetails) => {
    set((state) => {
      return {
        ...state,
        updatedClassVideoDetails: videoDetails,
      };
    });
  },

  setClassVideoDetails: (name, value) => {
    set((state) => {
      return {
        updatedClassVideoDetails: {
          ...state.updatedClassVideoDetails,
          [name]: value,
        },
      };
    });
  },

  addClassVideoSteps: (newVideoStep) => {
    set((state) => {
      const updatedvideoSteps = state.updatedClassVideoDetails.videoSteps;
      updatedvideoSteps.push(newVideoStep);
      return {
        updatedClassVideoDetails: {
          ...state.updatedClassVideoDetails,
          videoSteps: updatedvideoSteps,
        },
      };
    });
  },

  removeClassVideoSteps: (stepIndex) => {
    set((state) => {
      const updatedvideoSteps =
        state.updatedClassVideoDetails.videoSteps.filter(
          (_, index) => index !== stepIndex
        );
      return {
        updatedClassVideoDetails: {
          ...state.updatedClassVideoDetails,
          videoSteps: updatedvideoSteps,
        },
      };
    });
  },

  updateClassVideo: async () => {
    try {
      const { updatedClassVideoDetails } = get();

      const formData = new FormData();

      formData.append("id", updatedClassVideoDetails.id);
      formData.append("videoType", updatedClassVideoDetails.videoType);
      formData.append("title", updatedClassVideoDetails.title);
      formData.append("videoUrl", updatedClassVideoDetails.videoUrl);
      formData.append("videoId", updatedClassVideoDetails.videoId);
      formData.append("demoVideourl", updatedClassVideoDetails.demoVideourl);
      formData.append("demoVideoId", updatedClassVideoDetails.demoVideoId);
      formData.append("animationUrl", updatedClassVideoDetails.animationUrl);
      formData.append(
        "animationVideoId",
        updatedClassVideoDetails.animationVideoId
      );

      if (updatedClassVideoDetails.image) {
        formData.append("image", updatedClassVideoDetails.image);
      } else if (updatedClassVideoDetails.videoThumbnail) {
        formData.append(
          "videoThumbnail",
          updatedClassVideoDetails.videoThumbnail
        );
      }

      if (updatedClassVideoDetails.pdf) {
        formData.append("pdf", updatedClassVideoDetails.pdf);
      } else if (updatedClassVideoDetails.moduleMaterial) {
        formData.append(
          "moduleMaterial",
          updatedClassVideoDetails.moduleMaterial
        );
      }

      if (updatedClassVideoDetails.srt) {
        formData.append("srt", updatedClassVideoDetails.srt);
      } else if (updatedClassVideoDetails.videoTranscript) {
        formData.append(
          "videoTranscript",
          updatedClassVideoDetails.videoTranscript
        );
      }
      // console.log(formData);

      // ✅ Call your imported API here
      // const response = await updateIntroVideoById(selectedClassVideoId, formData);
      // return response.data;
    } catch (error) {
      throw error;
    }
  },

  resetSelectedClassVideo: () => {
    set((state) => {
      return {
        selectedClassVideoId: null,
        updatedClassVideoDetails: {
          id: null,
          videoType: "class",
          title: "",
          subject: "",
          videoSteps: [],
          videoThumbnail: null,
          moduleMaterial: "",
          videoTranscript: "",

          videoUrl: "",
          videoId: "",

          demoVideourl: "",
          demoVideoId: "",

          animationUrl: "",
          animationVideoId: "",

          image: null, // for new thumbnail
          pdf: null, // for new module material
          srt: null, // for new transcript
        },
      };
    });
  },
}));
