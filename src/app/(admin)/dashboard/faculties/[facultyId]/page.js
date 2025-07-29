"use client";
import React, { useEffect, useState } from "react";
import { useEditFacultyStore } from "@/store/editFacultyStore";
import { useParams, useRouter } from "next/navigation";
import { LuPen } from "react-icons/lu";
import toast from "react-hot-toast";

export default function Faculty() {
  const params = useParams();
  const {
    facultyData,
    setFacultyData,
    setFacultyImage,
    getfacultyById,
    editFaculty,
    resetFacultyData,
  } = useEditFacultyStore();

  const [facultyId, setFacultyId] = useState(null);
  const [isIdLoaded, setIsIdLoaded] = useState(false);

  const [editMode, setEditMode] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);

  const router = useRouter();

  console.log(facultyId);

  useEffect(() => {
    if (params && params.facultyId) {
      setFacultyId(params.facultyId);
      console.log("facultyId set:", params.facultyId);
    }
  }, [params]);

  useEffect(() => {
    setIsIdLoaded(true);
    async function getFaculty() {
      if (facultyId) {
        await getfacultyById(facultyId);
        setIsIdLoaded(false);
      }
    }
    getFaculty();
  }, [facultyId]);

  // Handler functions

  const handleChange = (key, value) => {
    setFacultyData(key, value);
  };

  const handleImageChange = async (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImageUrl(url);
      setFacultyImage(file);
    }
  };

  const handleSave = async () => {
    console.log("Saved data:", facultyData);
    try {
      const formData = new FormData();

      formData.append("firstName", facultyData.firstName);
      formData.append("lastName", facultyData.lastName);
      formData.append("designation", facultyData.designation);
      formData.append("joinedDate", facultyData.joinedDate);
      formData.append("ageRange", facultyData.ageRange);
      formData.append("location", facultyData.location);
      formData.append("nationality", facultyData.nationality);
      formData.append("profession", facultyData.profession);
      formData.append("expertiseIn", facultyData.expertiseIn);
      formData.append("qualification", facultyData.qualification);
      formData.append("experience", facultyData.experience);
      formData.append("facultyCode", facultyData.facultyCode);
      formData.append("image", facultyData.image);

      const response = await editFaculty(facultyId, formData);
      // console.log(response);
      toast.success(response?.message);
    } catch (err) {
      console.log(err);
      toast.error("Error updating faculty.");
    }
    setEditMode(false);
  };

  const handleCancel = () => {
    resetFacultyData();
    setImageUrl(null);
    setEditMode(false);
  };

  const handleBack = () => {
    console.log("Back clicked");
    router.push("/dashboard/faculties");
    // Replace this with navigation if needed
  };

  if (isIdLoaded) return <div>Loading...</div>;

  return (
    <div>
      <div className="flex justify-end mb-2">
        <button
          onClick={() => setEditMode((prev) => !prev)}
          className="flex justify-center items-center gap-1 text-[#72C347] text-base cursor-pointer"
        >
          <LuPen />
          {editMode ? "Save" : "Edit"}
        </button>
      </div>

      <div className="flex">
        {/* Left - Profile Image & Info */}
        <div className="w-1/5 flex flex-col items-center border-r-[1px] border-[var(--border-primary)]">
          <div className="size-[150px] bg-slate-400 rounded-full flex justify-center items-center overflow-hidden object-cover relative">
            <img
              className="min-w-full"
              src={
                editMode
                  ? imageUrl
                    ? imageUrl
                    : facultyData?.image
                  : facultyData?.image
              }
              alt="faculty profile"
            />
            {editMode && (
              <label
                htmlFor="image"
                className="w-full h-full rouunded full flex justify-center items-center absolute top-0 left-0 bg-white/15 cursor-pointer"
              >
                <span className="px-1 bg-black/30 text-[#EDEDED] flex items-center gap-1 relative top-8">
                  <span>
                    <LuPen />
                  </span>
                  <span>Update Image</span>
                </span>
                <input
                  id="image"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </label>
            )}
          </div>
          <h2 className="text-[#72C347] text-base font-semibold text-center mt-2">
            {facultyData?.firstName}
          </h2>
          <h3 className="text-[#5D5D5D] text-sm text-center">
            {facultyData?.designation}
          </h3>
          <p className="text-[#5D5D5D] text-sm text-center">
            Faculty code - {facultyData?.facultyCode}
          </p>
        </div>

        {/* Middle - Personal Info */}
        <div className="w-2/5 border-r-[1px] border-[var(--border-primary)] ps-10">
          <h1 className="text-base font-semibold mt-2">Details</h1>
          <table className="table-auto w-full border-separate border-spacing-y-6 text-sm mt-4">
            <tbody className="space-y-6">
              {[
                ["First Name", "firstName"],
                ["Last Name", "lastName"],
                ["Designation", "designation"],
                ["Joined on", "joinedDate"],
                ["Age range", "ageRange"],
                ["Location", "location"],
                ["Nationality", "nationality"],
              ].map(([label, key]) => (
                <tr key={key}>
                  <td className="w-32 text-gray-700">{label}</td>
                  <td className="w-10">:</td>
                  <td className="text-gray-800 font-semibold pe-4">
                    {editMode ? (
                      <input
                        type="text"
                        className="border border-gray-300 rounded px-2 py-1 w-full outline-[#72C347]"
                        value={facultyData[key]}
                        onChange={(e) => handleChange(key, e.target.value)}
                      />
                    ) : (
                      facultyData[key]
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Right - Professional Info */}
        <div className="w-2/5 ps-10">
          <table className="table-auto w-full border-separate border-spacing-y-6 text-sm mt-10">
            <tbody>
              {[
                ["Profession", "profession"],
                ["Expertise in", "expertiseIn"],
                ["Qualification", "qualification"],
                ["Experience", "experience"],
              ].map(([label, key]) => (
                <tr key={key}>
                  <td className="w-32 text-gray-700">{label}</td>
                  <td className="w-10">:</td>
                  <td className="text-gray-800 font-semibold pe-4">
                    {editMode ? (
                      <input
                        type="text"
                        className="border border-gray-300 rounded px-2 py-1 w-full outline-[#72C347]"
                        value={facultyData[key]}
                        onChange={(e) => handleChange(key, e.target.value)}
                      />
                    ) : (
                      facultyData[key]
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-8 mt-[30px]">
        {/* Cancel or Back Button */}
        <button
          className="w-[300px] h-[48px] bg-[#9D9D9D] text-white font-semibold text-lg rounded-2xl cursor-pointer"
          onClick={editMode ? handleCancel : handleBack}
        >
          {editMode ? "Cancel" : "Back"}
        </button>

        {/* Ok Button */}
        <button
          className={`w-[300px] h-[48px] ${
            editMode
              ? "bg-[#72c347] cursor-pointer"
              : "bg-gray-300 cursor-not-allowed"
          } text-white font-semibold text-lg rounded-2xl`}
          type="button"
          disabled={!editMode}
          onClick={handleSave}
        >
          Save
        </button>
      </div>
    </div>
  );
}
