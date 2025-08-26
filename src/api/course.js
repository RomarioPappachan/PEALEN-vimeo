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
    throw new Error(
      error.response?.data?.message || "Failed to create course video"
    );
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
    throw new Error(
      error.response?.data?.message || "Failed to update course video"
    );
  }
};

export const deleteVideoById = async (videoId) => {
  try {
    const res = await axiosInstance.delete(
      `/videos/deleteVideoFromCourse/${videoId}`
    );
    return res.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to delete course video"
    );
  }
};

// Fetch course test by id
export const fetchTestByVideoId = async (videoId) => {
  try {
    const res = await axiosInstance.get(`/tests/getTest/${videoId}`);
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch course");
  }
};

// Create new test question using video id
export const createTestQuestion = async (videoId, questionData) => {
  try {
    const res = await axiosInstance.post(
      `/tests/addQuestionToTest/${videoId}`,
      questionData
    );
    return res.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to create question"
    );
  }
};

// Update a test question by id
export const updateQuestionById = async (questionId, updatedData) => {
  try {
    const res = await axiosInstance.put(
      `/tests/updateQuestion/${questionId}`,
      updatedData
    );
    return res.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to update question"
    );
  }
};

// Delete a test question by id
export const deleteQuestionById = async (questionId) => {
  try {
    const res = await axiosInstance.delete(
      `/tests/deleteQuestion/${questionId}`
    );
    return res.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to delete question"
    );
  }
};

// Create test challenge using video id
export const createTestChallenge = async (videoId, challengeData) => {
  try {
    const res = await axiosInstance.post(
      `/challenge/createChallenge/${videoId}`,
      challengeData
    );
    return res.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to create challenge"
    );
  }
};

// Update test challenge by id
export const updateChallengeById = async (challengeId, updatedData) => {
  try {
    const res = await axiosInstance.put(
      `/challenge/updateChallenge/${challengeId}`,
      updatedData
    );
    return res.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to update challenge"
    );
  }
};

// Delete test challenge by id
export const deleteChallengeById = async (challengeId) => {
  try {
    const res = await axiosInstance.delete(
      `/challenge/deleteChallenge/${challengeId}`
    );
    return res.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to delete challenge"
    );
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
