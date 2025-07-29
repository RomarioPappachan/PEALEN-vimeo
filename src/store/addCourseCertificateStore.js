import { create } from "zustand";
import { createCourseCertificate, createCourseVideos } from "@/api/course";

export const useAddCourseCertificateStore = create((set) => ({
  //store
  certificateDetails: {
    fileName: "",
    certificateSize: "",
    downloadable: true, // true by default
    isWatermark: false, // false by default
    watermark: "",
    image: null,
  },

  loading: false,
  error: null,

  //   change course details
  setCertificateDetail: (field, value) => {
    set((state) => ({
      certificateDetails: {
        ...state.certificateDetails,
        [field]: value,
      },
    }));
  },

  // set certificate watermark
  setIsWaterMark: (value) => {
    if (!value) {
      set((state) => ({
        certificateDetails: {
          ...state.certificateDetails,
          isWatermark: value,
          watermark: "", // make it empty if value is false
        },
      }));
    } else {
      set((state) => ({
        certificateDetails: {
          ...state.certificateDetails,
          isWatermark: value, //just update if value is true
        },
      }));
    }
  },

  // Add course certicate
  addCourseCertificate: async (courseId, certificateDetails) => {
    set({ loading: true, error: null });
    try {
      const res = await createCourseCertificate(courseId, certificateDetails);
      set((state) => ({
        loading: false,
      }));
      return res;
    } catch (error) {
      set({ error: "Failed to add course certificate", loading: false });
      throw error;
    }
  },

  // Add course videos
  addCourseVideos: async (courseId, videosData) => {
    set({ loading: true, error: null });
    try {
      const res = await createCourseVideos(courseId, videosData);
      set((state) => ({
        loading: false,
      }));
      return res;
    } catch (error) {
      set({ error: "Failed to add course certificate", loading: false });
      throw error;
    }
  },

  //reset course details
  resetCertificateDetails: () => {
    set({
      certificateDetails: {
        fileName: "",
        certificateSize: "",
        downloadable: false,
        isWatermark: false,
        watermark: "",
        image: null,
      },
      loading: false,
      error: null,
    });
  },
}));
