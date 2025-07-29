import axiosInstance from "./axiosInstance";

// Fetch All Faculties
export const fetchFaculties = async () => {
  try {
    const res = await axiosInstance.get("/faculty/getAllFaculties");
    console.log(res);

    return res.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch faculties"
    );
  }
};

// Fetch faculty by Id
export const fetchFacultyById = async (facultyId) => {
  try {
    const res = await axiosInstance.get(`/faculty/getFacultyById/${facultyId}`);
    // console.log(res);
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch faculty");
  }
};

// Search Faculty
export const findFaculty = async (queryString) => {
  try {
    const res = await axiosInstance.get(
      `/faculty/searchFaculties?query=${queryString}`
    );
    console.log(res);

    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch faculty");
  }
};

// Create new Faculty
export const createFaculty = async (facultyData) => {
  try {
    const res = await axiosInstance.post(
      "/faculty/createFacultyProfile",
      facultyData
    );
    console.log(res);
    return res.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to create faculty."
    );
  }
};

export const updateFaculty = async (facultyId, facultyData) => {
  try {
    const res = await axiosInstance.put(
      `/faculty/updateFacultyprofile/${facultyId}`,
      facultyData
    );
    // console.log(res);
    return res.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to update faculty"
    );
  }
};
