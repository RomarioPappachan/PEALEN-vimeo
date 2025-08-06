import axiosInstance from "./axiosInstance";

// Generate Vimeo upload URL
export const generateVimeoUploadUrl = async (size, title) => {
  try {
    const res = await axiosInstance.get(
      `/videos/generateUploadUrls?size=${size}&title=${title}`
    );
    return res;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to delete video");
  }
};

// Check uploaded video status
export const checkVimeoVideoStatus = async (videoId) => {
  try {
    const res = await axiosInstance.get(`/videos/getVideoStatus/${videoId}`);
    return res;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to delete video");
  }
};

// Delete Video from Vimeo
export const deleteVideoFromVimeo = async (videoId) => {
  try {
    const res = await axiosInstance.delete(
      `/videos/deleteVideo?videoId=${videoId}`
    );

    return res;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to delete video");
  }
};
