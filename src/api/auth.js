import axiosInstance from "./axiosInstance";

export const login = async (username, password) => {
  try {
    const res = await axiosInstance.post("/admin/adminLogin", {
      firstName: username,
      password,
    });
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Invalid credentials");
  }
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};
