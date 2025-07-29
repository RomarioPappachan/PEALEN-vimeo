import { create } from "zustand";
import {
  createFaculty,
  fetchFaculties,
  fetchFacultyById,
  findFaculty,
  updateFaculty,
} from "@/api/faculty";

export const useEditFacultyStore = create((set) => ({
  initialData: {
    firstName: "Stanley",
    lastName: "Stan",
    designation: "Senior Faculty",
    joinedDate: "23/08/2024",
    ageRange: "55 - 60 Yrs",
    location: "Bengaluru, Karnataka",
    nationality: "Indian",
    profession: "Agriculture department",
    expertiseIn: "Bio compost",
    qualification: "Phd",
    experience: "Faculty",
    facultyCode: "",
    image: null,
  },

  facultyData: {
    firstName: "Stanley",
    lastName: "Stan",
    designation: "Senior Faculty",
    joinedDate: "23/08/2024",
    ageRange: "55 - 60 Yrs",
    location: "Bengaluru, Karnataka",
    nationality: "Indian",
    profession: "Agriculture department",
    expertiseIn: "Bio compost",
    qualification: "Phd",
    experience: "Faculty",
    facultyCode: "",
    image: null,
  },

  loading: false,
  error: null,

  // change faculty data
  setFacultyData: (field, value) => {
    set((state) => ({
      facultyData: {
        ...state.facultyData,
        [field]: value,
      },
    }));
  },

  setFacultyImage: (file) => {
    set((state) => ({
      facultyData: {
        ...state.facultyData,
        image: file,
      },
    }));
  },

  resetFacultyData: () => {
    set((state) => ({
      facultyData: { ...state.initialData },
    }));
  },

  // Fetch a faculty by its Id
  getfacultyById: async (facultyId) => {
    console.log(facultyId);
    set({ loading: true, error: null });
    try {
      const res = await fetchFacultyById(facultyId);
      console.log(res);
      // update both initialData and facultyData
      set((state) => ({
        initialData: { ...res?.faculty, image: res?.faculty?.profilePicture }, // here we use image instead of profilePicture
        facultyData: { ...res?.faculty, image: res?.faculty?.profilePicture },
      }));
    } catch (err) {
      set({ error: err.message, loading: false });
      throw err;
    }
  },

  // Edit member details
  editFaculty: async (facultyId, facultyData) => {
    set({ loading: true, error: null });
    try {
      const res = await updateFaculty(facultyId, facultyData);
      set({ loading: false });

      // update both initialData and facultyData
      set((state) => ({
        initialData: {
          ...res?.updatedFaculty,
          image: res?.updatedFaculty?.profilePicture,
        }, // here we use image instead of profilePicture
        facultyData: {
          ...res?.updatedFaculty,
          image: res?.updatedFaculty?.profilePicture,
        },
      }));
      return res;
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },
}));
