import { create } from "zustand";
import { fetchCourseById } from "@/api/course";

export const useCourseDetailStore = create((set) => ({
  courseDetails: {},

  //videos
  introVideos: [
    // {
    //   id: "40b08fd6-e2a1-49fc-aa74-914d4fa04b3d",
    //   title: "Intro Video 1",
    //   videoThumbnail:
    //     "https://res.cloudinary.com/dppck3c2b/image/upload/v1752755523/pealen/i9dvdv893eweu4fxwtbb.jpg",
    //   videoUrl: "eqNYOr74NeBxdDcejjenRrupMNsBBoKiHUkzEDNTHhk",
    //   videoId: "CwGPD01CmmjgEN18l7bblIjLMs5KjRRXZuZ2Gde3FbsU",
    //   moduleMaterial:
    //     "https://res.cloudinary.com/dppck3c2b/image/upload/v1752755524/pealen/obbgp29g5dz2iqdniyxr.pdf",
    //   videoType: "intro",
    // },
    // {
    //   id: "e85a0028-30ff-4900-aee4-c21ecb1899be",
    //   title: "Intro Video 2",
    //   videoThumbnail:
    //     "https://res.cloudinary.com/dppck3c2b/image/upload/v1752755525/pealen/wmz8dbvprpeydtaufaci.jpg",
    //   videoUrl: "bH8loCsO5iduNd01oVqwaZ6MiWmvDk9nVkpLfekrT6VU",
    //   videoId: "MGrRj1jVNfgidlYeMLzmiymE51pAkpJZ54t4hSNlRVQ",
    //   moduleMaterial:
    //     "https://res.cloudinary.com/dppck3c2b/image/upload/v1752755525/pealen/ujgmxpu36ijupkis3svn.pdf",
    //   videoType: "intro",
    // },
  ],
  classVideos: [],
  conclusionVideos: [
    // {
    //   id: "40b08fd6-e2a2-49fc-aa74-914d4fa04b3d",
    //   title: "Conclusion Video 1",
    //   videoThumbnail:
    //     "https://res.cloudinary.com/dppck3c2b/image/upload/v1752755523/pealen/i9dvdv893eweu4fxwtbb.jpg",
    //   videoUrl: "eqNYOr74NeBxdDcejjenRrupMNsBBoKiHUkzEDNTHhk",
    //   videoId: "CwGPD01CmmjgEN18l7bblIjLMs5KjRRXZuZ2Gde3FbsU",
    //   moduleMaterial:
    //     "https://res.cloudinary.com/dppck3c2b/image/upload/v1752755524/pealen/obbgp29g5dz2iqdniyxr.pdf",
    //   videoType: "conclusion",
    // },
    // {
    //   id: "e85a0028-30ff-4910-aee4-c21ecb1899be",
    //   title: "Conclusion Video 2",
    //   videoThumbnail:
    //     "https://res.cloudinary.com/dppck3c2b/image/upload/v1752755525/pealen/wmz8dbvprpeydtaufaci.jpg",
    //   videoUrl: "bH8loCsO5iduNd01oVqwaZ6MiWmvDk9nVkpLfekrT6VU",
    //   videoId: "MGrRj1jVNfgidlYeMLzmiymE51pAkpJZ54t4hSNlRVQ",
    //   moduleMaterial:
    //     "https://res.cloudinary.com/dppck3c2b/image/upload/v1752755525/pealen/ujgmxpu36ijupkis3svn.pdf",
    //   videoType: "conclusion",
    // },
  ],

  certificateDetails: {},

  loadingCourseById: true,
  error: null,

  // Fetch all Courses
  getCourseById: async (courseId) => {
    set({ loadingCourseById: true, error: null });
    try {
      const data = await fetchCourseById(courseId);
      console.log(data);
      set({
        courseDetails: data.courseDetails || {},
        introVideos: data.introVideos || [],
        classVideos: data.classVideos || [],
        conclusionVideos: data.conclusionVideos || [],
        certificateDetails: data.certificateDetails || {},

        loadingCourseById: false,
        error: null,
      });
    } catch (error) {
      set({ error: error.message, loadingCourseById: false });
    }
  },
}));
