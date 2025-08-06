import { create } from "zustand";
import { fetchCourseById } from "@/api/course";

export const useCourseDetailStore = create((set) => ({
  courseDetails: {},

  //videos
  introVideos: [
    {
      id: "40b08fd6-e2a1-49fc-aa74-914d4fa04b3d",
      title: "Intro Video 1",
      videoThumbnail:
        "https://res.cloudinary.com/dppck3c2b/image/upload/v1752755523/pealen/i9dvdv893eweu4fxwtbb.jpg",
      videoUrl: "1102451987",
      videoId: "1102451987",
      moduleMaterial:
        "https://res.cloudinary.com/dppck3c2b/image/upload/v1752755524/pealen/obbgp29g5dz2iqdniyxr.pdf",
      videoType: "intro",
    },
    {
      id: "e85a0028-30ff-4900-aee4-c21ecb1899be",
      title: "Intro Video 2",
      videoThumbnail:
        "https://res.cloudinary.com/dppck3c2b/image/upload/v1752755525/pealen/wmz8dbvprpeydtaufaci.jpg",
      videoUrl: "bH8loCsO5iduNd01oVqwaZ6MiWmvDk9nVkpLfekrT6VU",
      videoId: "MGrRj1jVNfgidlYeMLzmiymE51pAkpJZ54t4hSNlRVQ",
      moduleMaterial:
        "https://res.cloudinary.com/dppck3c2b/image/upload/v1752755525/pealen/ujgmxpu36ijupkis3svn.pdf",
      videoType: "intro",
    },
  ],
  classVideos: [
    {
      id: "3a82cd04-4e6f-4dc8-9e09-5ae2f9b4f9c3",
      title: "Main Class Video 1",
      videoThumbnail:
        "https://res.cloudinary.com/dppck3c2b/image/upload/v1752755527/pealen/wtr31wrbn1iznbmtl21z.jpg",
      videoUrl: "1102451987",
      videoId: "1102451987",
      moduleMaterial:
        "https://res.cloudinary.com/dppck3c2b/raw/upload/v1752755527/pealen/ifscxzeqlw5tlakafesgx",
      videoType: "class",
      subject:
        "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
      demoVideourl: "1102463483",
      demoVideoId: "1102463483",
      animationUrl: "1102463483",
      animationVideoId: "1102463483",
      videoTranscript:
        "https://res.cloudinary.com/dppck3c2b/raw/upload/v1752755527/pealen/ifscxzeqlw5tlakaa1wq",
      videoSteps: ["jhgfdjskkl", "jhdfysuad"],
    },
    {
      id: "1767ef2f-b154-4311-b441-b56c6be0bf1a",
      title: "Main Class Video 2",
      videoThumbnail:
        "https://res.cloudinary.com/dppck3c2b/image/upload/v1752755527/pealen/ix3iljryfkp9afokzdz1.jpg",
      videoUrl: "SjqOa96ORHmwZuiJZW8jjZTaUHXuXZF1meesC1zaHfU",
      videoId: "8785698984",
      moduleMaterial:
        "https://res.cloudinary.com/dppck3c2b/raw/upload/v1752755527/pealen/hcsmnbamarc0fwkdffbjhl",
      videoType: "class",
      subject:
        "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
      demoVideourl: "Rxnw2dZ900q2iCGhlKYPhLqPp3E00OIVsKNOtbi8kj95Y",
      demoVideoId: "6745897609",
      animationUrl: "6SeKrUkTqz43xsyZdbeSQccS5iC44A01CdEqi5NoLASA",
      animationVideoId: "4986738",
      videoTranscript:
        "https://res.cloudinary.com/dppck3c2b/raw/upload/v1752755527/pealen/hcsmnbamarc0fwkdoaql",
      videoSteps: ["jfhguiaodpkofjgbk\\", "kjhgjfkl;LEKFJOIGK"],
    },
  ],
  conclusionVideos: [
    {
      id: "40b08fd6-e2a2-49fc-aa74-914d4fa04b3d",
      title: "Conclusion Video 1",
      videoThumbnail:
        "https://res.cloudinary.com/dppck3c2b/image/upload/v1752755523/pealen/i9dvdv893eweu4fxwtbb.jpg",
      videoUrl: "1102451987",
      videoId: "1102451987",
      moduleMaterial:
        "https://res.cloudinary.com/dppck3c2b/image/upload/v1752755524/pealen/obbgp29g5dz2iqdniyxr.pdf",
      videoType: "conclusion",
    },
    {
      id: "e85a0028-30ff-4910-aee4-c21ecb1899be",
      title: "Conclusion Video 2",
      videoThumbnail:
        "https://res.cloudinary.com/dppck3c2b/image/upload/v1752755525/pealen/wmz8dbvprpeydtaufaci.jpg",
      videoUrl: "bH8loCsO5iduNd01oVqwaZ6MiWmvDk9nVkpLfekrT6VU",
      videoId: "MGrRj1jVNfgidlYeMLzmiymE51pAkpJZ54t4hSNlRVQ",
      moduleMaterial:
        "https://res.cloudinary.com/dppck3c2b/image/upload/v1752755525/pealen/ujgmxpu36ijupkis3svn.pdf",
      videoType: "conclusion",
    },
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
