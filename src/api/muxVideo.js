import axiosInstance from "./axiosInstance";

// Fetch All Faculties
export const deleteMuxVideo = async (muxAssetId) => {
  try {
    const res = await axiosInstance.delete(
      `/videos/deleteVideo?muxAssetId=${muxAssetId}`
    );
    console.log(res);

    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to delete video");
  }
};
