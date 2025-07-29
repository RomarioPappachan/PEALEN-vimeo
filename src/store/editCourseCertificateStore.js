import { create } from "zustand";
import { createCourseCertificate, updateCourseCertificate } from "@/api/course";

export const useEditCourseCertificateStore = create((set) => ({
  updatedCertificateDetails: {
    id: null,
    fileName: "",
    certificateSize: "",
    downloadable: true, // true by default
    watermark: "",
    fileUrl: null,
    image: null,
    isWatermark: false, // false by default
  },

  isCertificateLoading: false,
  certificateError: null,

  // Load initial certificate details
  setInitialCertificateDetails: (details) => {
    set({
      isCertificateLoading: true,
      updatedCertificateDetails: {
        id: null,
        fileName: "",
        certificateSize: "",
        downloadable: true, // true by default
        watermark: "",
        fileUrl: null,
        image: null,
        isWatermark: false, // false by default
      },
    });

    set((state) => ({
      updatedCertificateDetails: {
        ...details,
      },
      isCertificateLoading: false,
    }));
  },

  //   change certificate details
  setCertificateDetail: (field, value) => {
    set((state) => ({
      updatedCertificateDetails: {
        ...state.updatedCertificateDetails,
        [field]: value,
      },
    }));
  },

  // set certificate watermark
  setIsWaterMark: (value) => {
    if (!value) {
      set((state) => ({
        updatedCertificateDetails: {
          ...state.updatedCertificateDetails,
          isWatermark: value,
          watermark: "", // make it empty if value is false
        },
      }));
    } else {
      set((state) => ({
        updatedCertificateDetails: {
          ...state.updatedCertificateDetails,
          isWatermark: value, //just update if value is true
        },
      }));
    }
  },

  // Add course certicate
  addCourseCertificate: async (courseId, certificateDetails) => {
    set({ isCertificateLoading: true, certificateError: null });
    try {
      const res = await createCourseCertificate(courseId, certificateDetails);
      set((state) => ({
        isCertificateLoading: false,
        certificateError: null,
      }));
      return res;
    } catch (error) {
      set({
        certificateError: "Failed to add course certificate",
        isCertificateLoading: false,
      });
      throw error;
    }
  },

  // Edit course certicate
  editCourseCertificate: async (certificateId, certificateDetails) => {
    set({ isCertificateLoading: true, certificateError: null });
    try {
      const res = await updateCourseCertificate(
        certificateId,
        certificateDetails
      );
      set((state) => ({
        isCertificateLoading: false,
        certificateError: null,
      }));
      return res;
    } catch (error) {
      set({
        certificateError: "Failed to update certificate",
        isCertificateLoading: false,
      });
      throw error;
    }
  },
}));
