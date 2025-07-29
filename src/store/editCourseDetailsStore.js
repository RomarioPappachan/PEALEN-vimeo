import { create } from "zustand";
import { updateCourse } from "@/api/course";

export const useEditCourseDetailsStore = create((set) => ({
  updatedCourseDetails: {
    id: "",
    title: "",
    description: "",
    courseContents: [],
    thumbnail: null,
    courseMaterial: null,
    categoryId: "",
    instructorIds: [],
    price: null,
    image: null, //for new upload
    pdf: null, //for new upload
  },

  selectedFacultyList: [], // for display UI

  detailsLoading: false,
  error: null,

  // methods

  // Load initial details
  setInitialCourseDetails: (details, facultyList) => {
    set({
      detailsLoading: true,
      error: null,
      updatedCourseDetails: {
        id: "",
        title: "",
        description: "",
        courseContents: [],
        thumbnail: null,
        courseMaterial: null,
        categoryId: "",
        instructorIds: [],
        price: null,
        image: null, //for new upload
        pdf: null, //for new upload
      },
      selectedFacultyList: [],
    });

    set((state) => ({
      updatedCourseDetails: details,
      selectedFacultyList: facultyList,
      detailsLoading: false,
      error: null,
    }));
  },

  //   change course details
  setCourseDetail: (field, value) => {
    set((state) => ({
      updatedCourseDetails: {
        ...state.updatedCourseDetails,
        [field]: value,
      },
    }));
  },

  //   clear course material
  clearCourseMaterial: () => {
    set((state) => ({
      updatedCourseDetails: {
        ...state.updatedCourseDetails,
        pdf: null,
      },
    }));
  },

  //add course content
  addCourseContent: (newContent) => {
    set((state) => ({
      updatedCourseDetails: {
        ...state.updatedCourseDetails,
        courseContents: [
          ...state.updatedCourseDetails.courseContents,
          newContent,
        ],
      },
    }));
  },

  //remove course content
  removeCourseContent: (indexToRemove) => {
    set((state) => ({
      updatedCourseDetails: {
        ...state.updatedCourseDetails,
        courseContents: state.updatedCourseDetails.courseContents.filter(
          (_, idx) => idx !== indexToRemove
        ),
      },
    }));
  },

  //add new faculty
  addFaculty: (newFaculty) => {
    set((state) => ({
      updatedCourseDetails: {
        ...state.updatedCourseDetails,
        instructorIds: [
          ...state.updatedCourseDetails.instructorIds,
          newFaculty?.id,
        ],
      },
      selectedFacultyList: [...state.selectedFacultyList, newFaculty],
    }));
  },

  // remove a faculty
  removeFaculty: (indexToRemove) => {
    set((state) => ({
      updatedCourseDetails: {
        ...state.updatedCourseDetails,
        instructorIds: state.updatedCourseDetails.instructorIds.filter(
          (_, idx) => idx !== indexToRemove
        ),
      },
      selectedFacultyList: state.selectedFacultyList.filter(
        (_, idx) => idx !== indexToRemove
      ),
    }));
  },

  // Edit selected course
  editCourse: async (courseId, courseData) => {
    set({ detailsLoading: true, error: null });
    try {
      const res = await updateCourse(courseId, courseData);
      console.log(res);
      return res;
    } catch (error) {
      set({ error: "Failed to update course", detailsLoading: false });
      throw error;
    }
  },
}));
