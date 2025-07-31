import axiosInstance from "./axiosInstance";

// Categories
export const fetchCategories = async () => {
  try {
    const res = await axiosInstance.get("/category/listCategories");
    return res.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch categories"
    );
  }
};

// Courses
export const fetchCourses = async () => {
  try {
    const res = await axiosInstance.get("/courses/listCourses");
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch courses");
  }
};

export const fetchCourseById = async (courseId) => {
  try {
    const res = await axiosInstance.get(
      `/courses/adminCourseDetails/${courseId}`
    );
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch course");
  }
};

export const createCourse = async (courseData) => {
  try {
    const res = await axiosInstance.post(
      "/admin/adminCreateCourse",
      courseData
    );
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to create course");
  }
};

export const updateCourse = async (courseId, updatedData) => {
  try {
    const res = await axiosInstance.put(
      `/courses/updateCourse/${courseId}`,
      updatedData
    );
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to update course");
  }
};

export const createCourseVideos = async (courseId, videosData) => {
  try {
    const res = await axiosInstance.post(
      `/videos/addVideoToCourse/${courseId}`,
      videosData
    );
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to create course");
  }
};

export const updateVideoById = async (videoId, updatedData) => {
  try {
    const res = await axiosInstance.put(
      `/videos/updateVideoInCourse/${videoId}`,
      updatedData
    );
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to update course");
  }
};

export const deleteVideoById = async (videoId) => {
  try {
    const res = await axiosInstance.delete(
      `/videos/deleteVideoFromCourse/${videoId}`
    );
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to delete video");
  }
};

export const createCourseCertificate = async (courseId, certificateDetails) => {
  try {
    const res = await axiosInstance.post(
      `/courses/addCertificate/${courseId}`,
      certificateDetails
    );
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to create course");
  }
};

export const updateCourseCertificate = async (certificateId, updatedData) => {
  try {
    const res = await axiosInstance.put(
      `/courses/updateCertificate/${certificateId}`,
      updatedData
    );
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to update course");
  }
};

export const deleteCourse = async (courseId) => {
  try {
    const res = await axiosInstance.delete(`/courses/deleteCourse/${courseId}`);
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to delete course");
  }
};
