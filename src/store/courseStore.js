import { create } from "zustand";
import { fetchCourses } from "@/api/course";

export const useCourseStore = create((set) => ({
  courses: [],
  loading: false,
  error: null,

  // Fetch all Courses
  getCourses: async () => {
    set({ loading: true, error: null });
    try {
      const data = await fetchCourses();
      console.log(data);
      set({ courses: data.courses, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
}));
