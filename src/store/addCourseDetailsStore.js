import { create } from "zustand";
import { createCourse, updateCourse } from "@/api/course";

export const useAddCourseDetailsStore = create((set) => ({
  // store

  courseDetails: {
    id: "",
    title: "",
    description: "",
    courseContents: [],
    image: null, // File
    pdf: null, // File
    instructorIds: [],
    categoryId: "",
  },

  loading: false,
  error: null,
  isCreated: false, // to check whether the course is already created.
  currentCourseId: null,
  selectedFacultyList: [],

  //   change course details
  setCourseDetail: (field, value) => {
    set((state) => ({
      courseDetails: {
        ...state.courseDetails,
        [field]: value,
      },
    }));
  },

  //   clear course material
  clearCourseMaterial: () => {
    set((state) => ({
      courseDetails: {
        ...state.courseDetails,
        pdf: null,
      },
    }));
  },

  //add course content
  addCourseContent: (newContent) => {
    set((state) => ({
      courseDetails: {
        ...state.courseDetails,
        courseContents: [...state.courseDetails.courseContents, newContent],
      },
    }));
  },

  //remove course content
  removeCourseContent: (indexToRemove) => {
    set((state) => ({
      courseDetails: {
        ...state.courseDetails,
        courseContents: state.courseDetails.courseContents.filter(
          (_, idx) => idx !== indexToRemove
        ),
      },
    }));
  },

  //add new faculty
  addFaculty: (newFaculty) => {
    set((state) => ({
      courseDetails: {
        ...state.courseDetails,
        instructorIds: [...state.courseDetails.instructorIds, newFaculty?.id],
      },
      selectedFacultyList: [...state.selectedFacultyList, newFaculty],
    }));
  },

  // remove a faculty
  removeFaculty: (indexToRemove) => {
    set((state) => ({
      courseDetails: {
        ...state.courseDetails,
        instructorIds: state.courseDetails.instructorIds.filter(
          (_, idx) => idx !== indexToRemove
        ),
      },
      selectedFacultyList: state.selectedFacultyList.filter(
        (_, idx) => idx !== indexToRemove
      ),
    }));
  },

  // Add a new course
  addCourse: async (courseData) => {
    set({ loading: true, error: null });
    try {
      const res = await createCourse(courseData);
      set((state) => ({
        loading: false,
        isCreated: true,
        currentCourseId: res?.course?.id,
        courseDetails: {
          ...state.courseDetails,
          id: res?.course?.id,
        },
      }));
      return res;
    } catch (error) {
      set({ error: "Failed to create a new course", loading: false });
      throw error;
    }
  },

  // Edit a course
  editCourse: async (courseId, courseData) => {
    set({ loading: true, error: null });
    try {
      const res = await updateCourse(courseId, courseData);
      set((state) => ({
        loading: false,
        isCreated: true,
        currentCourseId: res?.course?.id,
        courseDetails: {
          ...state.courseDetails,
          id: res?.course?.id,
        },
      }));
      return res;
    } catch (error) {
      set({ error: "Failed to create a new course", loading: false });
      throw error;
    }
  },

  //reset course details
  resetCourseDetails: () => {
    set({
      courseDetails: {
        title: "",
        description: "",
        courseContents: [],
        image: null,
        pdf: null,
        instructorIds: [],
        categoryId: "cbed4b23-ca60-4245-9bea-1ade60684fbf",
      },
      loading: false,
      error: null,
      isCreated: false,
      currentCourseId: null,
    });
  },
}));
