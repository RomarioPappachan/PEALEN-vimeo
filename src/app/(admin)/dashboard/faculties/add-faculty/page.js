"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useCreateFacultyStore } from "@/store/createFacultyStore";
import { LuPen } from "react-icons/lu";
import toast from "react-hot-toast";

const ageRangeOptions = [
  { label: "20 - 25 Yrs", value: "20 - 25" },
  { label: "25 - 30 Yrs", value: "25 - 30" },
  { label: "30 - 35 Yrs", value: "30 - 35" },
  { label: "35 - 40 Yrs", value: "35 - 40" },
  { label: "40 - 45 Yrs", value: "40 - 45" },
  { label: "45 - 50 Yrs", value: "45 - 50" },
  { label: "50 - 55 Yrs", value: "50 - 55" },
  { label: "55 - 60 Yrs", value: "55 - 60" },
  { label: "60 - 65 Yrs", value: "60 - 65" },
  { label: "65 - 70 Yrs", value: "65 - 70" },
];

export default function AddFaculty() {
  const {
    facultyData,
    setFacultyData,
    setFacultyImage,
    addFaculty,
    loading,
    error,
  } = useCreateFacultyStore();
  const [imageUrl, setImageUrl] = useState(null);

  const router = useRouter();

  // Handler functions

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFacultyData(name, value);
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImageUrl(url);
      setFacultyImage(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const {
      firstName,
      lastName,
      designation,
      joinedDate,
      ageRange,
      location,
      nationality,
      profession,
      expertiseIn,
      qualification,
      experience,
      facultyCode,
      image,
    } = facultyData;

    if (
      !firstName ||
      !lastName ||
      !designation ||
      !joinedDate ||
      !ageRange ||
      !location ||
      !nationality ||
      !profession ||
      !expertiseIn ||
      !qualification ||
      !experience ||
      !facultyCode ||
      !image
    ) {
      toast.error("All the fields and image are required.");
      return;
    }

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

      const response = await addFaculty(formData);
      console.log(response);
      toast.success(response?.message);
      setImageUrl(null);
      router.push(`/dashboard/faculties/${response?.newFaculty?.id}`);
    } catch (err) {
      console.log(err);
      toast.error("Failed to add new faculty.");
    }
  };

  return (
    <div className="min-h-full">
      <form onSubmit={handleSubmit}>
        {/* image and faculty details */}
        <div className="flex gap-4">
          <div className="size-[150px] bg-slate-400 rounded-full flex justify-center items-center overflow-hidden object-cover relative">
            <label
              htmlFor="image"
              className="w-full h-full rouunded full flex justify-center items-center absolute top-0 left-0 bg-white/15 cursor-pointer"
            >
              <img
                className="min-w-full"
                src={imageUrl ? imageUrl : null}
                alt="faculty profile"
              />
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
          </div>
          <div className="flex-1 grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="firstName"
                className="text-sm text-[var(--text-secondary)] font-semibold mt-3.5 mb-2"
              >
                First Name
              </label>
              <input
                id="firstName"
                type="text"
                name="firstName"
                value={facultyData.title}
                className="w-full h-10 px-3.5 py-2 text-xs text-[var(--text-secondary)] border border-[var(--border-primary)] rounded-xl outline-none placeholder:text-[var(--text-placeholder)] placeholder:italic focus:border-[var(--border-secondary)]"
                placeholder="Type here"
                onChange={handleOnChange}
                required
              />
            </div>
            <div>
              <label
                htmlFor="lastName"
                className="text-sm text-[var(--text-secondary)] font-semibold mt-3.5 mb-2"
              >
                Last Name
              </label>
              <input
                id="lastName"
                type="text"
                name="lastName"
                value={facultyData.lastName}
                className="w-full h-10 px-3.5 py-2 text-xs text-[var(--text-secondary)] border border-[var(--border-primary)] rounded-xl outline-none placeholder:text-[var(--text-placeholder)] placeholder:italic focus:border-[var(--border-secondary)]"
                placeholder="Type here"
                onChange={handleOnChange}
                required
              />
            </div>
            <div>
              <label
                htmlFor="facultyCode"
                className="text-sm text-[var(--text-secondary)] font-semibold mt-3.5 mb-2"
              >
                Faculty Code
              </label>
              <input
                id="facultyCode"
                type="text"
                name="facultyCode"
                value={facultyData.facultyCode}
                className="w-full h-10 px-3.5 py-2 text-xs text-[var(--text-secondary)] border border-[var(--border-primary)] rounded-xl outline-none placeholder:text-[var(--text-placeholder)] placeholder:italic focus:border-[var(--border-secondary)]"
                placeholder="Type here"
                onChange={handleOnChange}
                required
              />
            </div>
            <div>
              <label
                htmlFor="designation"
                className="text-sm text-[var(--text-secondary)] font-semibold mt-3.5 mb-2"
              >
                Designation
              </label>
              <select
                id="designation"
                type="text"
                name="designation"
                value={facultyData.designation}
                className="w-full h-10 px-3.5 py-2 text-xs text-[var(--text-secondary)] border border-[var(--border-primary)] rounded-xl outline-none placeholder:text-[var(--text-placeholder)] placeholder:italic focus:border-[var(--border-secondary)]"
                placeholder="Type here"
                onChange={handleOnChange}
                required
              >
                <option value="" selected disabled>
                  -- Select a designation --
                </option>
                <option value="faculty">Faculty</option>
                <option value="seniorFaculty">Senior Faculty</option>
              </select>
            </div>
          </div>
        </div>

        {/* remaining details  */}
        <div className="mt-4 grid grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="joinedDate"
              className="text-sm text-[var(--text-secondary)] font-semibold mt-3.5 mb-2"
            >
              Joined On
            </label>
            <input
              id="joinedDate"
              type="text"
              name="joinedDate"
              value={facultyData.joinedDate}
              className="w-full h-10 px-3.5 py-2 text-xs text-[var(--text-secondary)] border border-[var(--border-primary)] rounded-xl outline-none placeholder:text-[var(--text-placeholder)] placeholder:italic focus:border-[var(--border-secondary)]"
              placeholder="Type here"
              onChange={handleOnChange}
              required
            />
          </div>
          <div>
            <label
              htmlFor="ageRange"
              className="text-sm text-[var(--text-secondary)] font-semibold mt-3.5 mb-2"
            >
              Age Range
            </label>
            <select
              id="ageRange"
              type="text"
              name="ageRange"
              value={facultyData.ageRange}
              className="w-full h-10 px-3.5 py-2 text-xs text-[var(--text-secondary)] border border-[var(--border-primary)] rounded-xl outline-none placeholder:text-[var(--text-placeholder)] placeholder:italic focus:border-[var(--border-secondary)]"
              placeholder="Type here"
              onChange={handleOnChange}
              required
            >
              <option value="" selected disabled>
                -- Select an age Range --
              </option>
              {ageRangeOptions.map((option, index) => (
                <option key={`${option.label} ${index}`} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label
              htmlFor="location"
              className="text-sm text-[var(--text-secondary)] font-semibold mt-3.5 mb-2"
            >
              Location
            </label>
            <input
              id="location"
              type="text"
              name="location"
              value={facultyData.location}
              className="w-full h-10 px-3.5 py-2 text-xs text-[var(--text-secondary)] border border-[var(--border-primary)] rounded-xl outline-none placeholder:text-[var(--text-placeholder)] placeholder:italic focus:border-[var(--border-secondary)]"
              placeholder="Type here"
              onChange={handleOnChange}
              required
            />
          </div>
          <div>
            <label
              htmlFor="nationality"
              className="text-sm text-[var(--text-secondary)] font-semibold mt-3.5 mb-2"
            >
              Nationality
            </label>
            <input
              id="nationality"
              type="text"
              name="nationality"
              value={facultyData.nationality}
              className="w-full h-10 px-3.5 py-2 text-xs text-[var(--text-secondary)] border border-[var(--border-primary)] rounded-xl outline-none placeholder:text-[var(--text-placeholder)] placeholder:italic focus:border-[var(--border-secondary)]"
              placeholder="Type here"
              onChange={handleOnChange}
              required
            />
          </div>
          <div>
            <label
              htmlFor="profession"
              className="text-sm text-[var(--text-secondary)] font-semibold mt-3.5 mb-2"
            >
              Profession
            </label>
            <input
              id="profession"
              type="text"
              name="profession"
              value={facultyData.profession}
              className="w-full h-10 px-3.5 py-2 text-xs text-[var(--text-secondary)] border border-[var(--border-primary)] rounded-xl outline-none placeholder:text-[var(--text-placeholder)] placeholder:italic focus:border-[var(--border-secondary)]"
              placeholder="Type here"
              onChange={handleOnChange}
              required
            />
          </div>
          <div>
            <label
              htmlFor="expertiseIn"
              className="text-sm text-[var(--text-secondary)] font-semibold mt-3.5 mb-2"
            >
              Expertise In
            </label>
            <input
              id="expertiseIn"
              type="text"
              name="expertiseIn"
              value={facultyData.expertiseIn}
              className="w-full h-10 px-3.5 py-2 text-xs text-[var(--text-secondary)] border border-[var(--border-primary)] rounded-xl outline-none placeholder:text-[var(--text-placeholder)] placeholder:italic focus:border-[var(--border-secondary)]"
              placeholder="Type here"
              onChange={handleOnChange}
              required
            />
          </div>
          <div>
            <label
              htmlFor="qualification"
              className="text-sm text-[var(--text-secondary)] font-semibold mt-3.5 mb-2"
            >
              Qualification
            </label>
            <input
              id="qualification"
              type="text"
              name="qualification"
              value={facultyData.qualification}
              className="w-full h-10 px-3.5 py-2 text-xs text-[var(--text-secondary)] border border-[var(--border-primary)] rounded-xl outline-none placeholder:text-[var(--text-placeholder)] placeholder:italic focus:border-[var(--border-secondary)]"
              placeholder="Type here"
              onChange={handleOnChange}
              required
            />
          </div>

          <div>
            <label
              htmlFor="experience"
              className="text-sm text-[var(--text-secondary)] font-semibold mt-3.5 mb-2"
            >
              Experience
            </label>
            <select
              id="experience"
              type="text"
              name="experience"
              value={facultyData.experience}
              className="w-full h-10 px-3.5 py-2 text-xs text-[var(--text-secondary)] border border-[var(--border-primary)] rounded-xl outline-none placeholder:text-[var(--text-placeholder)] placeholder:italic focus:border-[var(--border-secondary)]"
              placeholder="Type here"
              onChange={handleOnChange}
              required
            >
              <option value="" selected disabled>
                -- Select experience --
              </option>
              <option value="faculty">Faculty</option>
              <option value="seniorFaculty">Senior Faculty</option>
            </select>
          </div>
        </div>

        {/* buttons  */}
        <div className="mt-6 flex justify-end">
          <button
            className={`px-6 py-2 h-10 bg-[#72c347] text-white font-semibold text-sm rounded-2xl ${
              loading ? "cursor-not-allowed" : "cursor-pointer"
            } `}
            type="submit"
            disabled={loading}
          >
            {loading ? "Adding..." : "Add Faculty"}
          </button>
        </div>
      </form>
    </div>
  );
}
