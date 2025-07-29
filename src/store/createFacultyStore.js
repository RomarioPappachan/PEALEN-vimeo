import { create } from "zustand";
import { createFaculty } from "@/api/faculty";

export const useCreateFacultyStore = create((set) => ({
  facultyData: {
    firstName: "",
    lastName: "",
    designation: "",
    joinedDate: "",
    ageRange: "",
    location: "",
    nationality: "",
    profession: "",
    expertiseIn: "",
    qualification: "",
    experience: "",
    facultyCode: "",
    image: null,
  },

  loading: false,
  error: null,

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

  // Add a new faculty
  addFaculty: async (facultyData) => {
    set({ loading: true, error: null });
    try {
      const res = await createFaculty(facultyData);
      set({
        loading: false,
        facultyData: {
          firstName: "",
          lastName: "",
          designation: "",
          joinedDate: "",
          ageRange: "",
          location: "",
          nationality: "",
          profession: "",
          expertiseIn: "",
          qualification: "",
          experience: "",
          facultyCode: "",
          image: null,
        },
      });
      return res;
    } catch (error) {
      set({ error: "Failed to create a new member", loading: false });
      throw error;
    }
  },
}));
