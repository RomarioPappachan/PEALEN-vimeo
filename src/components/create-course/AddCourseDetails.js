"use client";
import React, { useEffect, useState } from "react";
import { useAddCourseDetailsStore } from "@/store/addCourseDetailsStore";
import { useFacultyStore } from "@/store/facultyStore";
import { fetchCategories } from "@/api/course";
import Faculty from "./Faculty";

import toast from "react-hot-toast";
import { FaTrashAlt } from "react-icons/fa";
import { LuX } from "react-icons/lu";

export default function AddCourseDetails({ onNext }) {
  const { searchedFaculties, searchFaculty } = useFacultyStore();

  const {
    courseDetails,
    selectedFacultyList,
    setCourseDetail,
    clearCourseMaterial,
    addCourseContent,
    removeCourseContent,
    addFaculty,
    removeFaculty,
    loading,
    error,
    isCreated,
    addCourse,
    editCourse,
  } = useAddCourseDetailsStore();

  const [categories, setCategories] = useState([]);
  const [isCategoryLoaded, setIsCategoryLoaded] = useState(false);

  const [previewImgUrl, setPreviewImgUrl] = useState("");
  const [newCoursePoint, setNewCoursePoint] = useState("");
  const [facultyQuery, setFacultyQuery] = useState("");

  useEffect(() => {
    setIsCategoryLoaded(false);
    const getCategories = async () => {
      try {
        const res = await fetchCategories();
        console.log(res);
        setCategories(res?.categories);
        setIsCategoryLoaded(true);
      } catch (error) {
        console.log(error);
        setIsCategoryLoaded(false);
      }
    };
    getCategories();
  }, []);

  function handleOnChange(e) {
    const { name, value } = e.target;
    setCourseDetail(name, value);
  }

  function handleCourseThumbnail(e) {
    e.preventDefault();

    const name = e.target.name;
    const file = e.target.files[0];
    console.log(file);

    const imageUrl = URL.createObjectURL(file);

    setCourseDetail(name, file);
    setPreviewImgUrl(imageUrl);
  }

  function handleCourseMaterial(e) {
    e.preventDefault();
    const name = e.target.name;
    const file = e.target.files[0];

    setCourseDetail(name, file);
  }

  function handleClearCourseMaterial(e) {
    clearCourseMaterial();
  }

  const handleAddPoint = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // Prevents newline
      const trimmed = newCoursePoint.trim();
      if (trimmed !== "") {
        addCourseContent(trimmed);
        setNewCoursePoint(""); // Clear textarea
      }
    }
  };

  const handleDeletePoint = (indexToDelete) => {
    removeCourseContent(indexToDelete);
  };

  const handleAddFaculty = (e, faculty) => {
    e.preventDefault(); // Prevents newline

    if (faculty.id) {
      addFaculty(faculty); // update array in store
      setFacultyQuery("");
    }
  };

  const handleDeleteFaculty = (indexToDelete) => {
    removeFaculty(indexToDelete); // delete from array in store
  };

  const handleCreateCourse = async () => {
    try {
      const formData = new FormData();

      formData.append("title", courseDetails?.title);
      formData.append("description", courseDetails?.description);
      formData.append("categoryId", courseDetails?.categoryId);

      formData.append("image", courseDetails.image);

      formData.append("pdf", courseDetails.pdf);

      // Convert array data to JSON strings
      formData.append(
        "courseContents",
        JSON.stringify(courseDetails?.courseContents)
      );

      formData.append(
        "instructorIds",
        JSON.stringify(courseDetails?.instructorIds)
      );

      //create course
      const res = await addCourse(formData);
      console.log(res);
      toast.success("Course created successfully");

      onNext();
    } catch (error) {
      console.log(error);
      toast.error("Error creating course");
    }
  };

  const handleEditCourse = async () => {
    try {
      const formData = new FormData();

      formData.append("title", courseDetails?.title);
      formData.append("description", courseDetails?.description);
      formData.append("categoryId", courseDetails?.categoryId);
      formData.append("image", courseDetails.image);
      formData.append("pdf", courseDetails.pdf);
      // Convert array data to JSON strings
      formData.append(
        "courseContents",
        JSON.stringify(courseDetails?.courseContents)
      );
      formData.append(
        "instructorIds",
        JSON.stringify(courseDetails?.instructorIds)
      );

      //create course
      const res = await editCourse(courseDetails?.id, formData);
      console.log(res);
      toast.success("Details updated successfully");

      onNext();
    } catch (error) {
      console.log(error);
      toast.error("Error creating course");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const {
      title,
      description,
      courseContents,
      image,
      pdf,
      instructorIds,
      categoryId,
    } = courseDetails;

    if (
      !title ||
      !description ||
      !categoryId ||
      !image ||
      !pdf ||
      !courseContents[0] ||
      !instructorIds[0]
    ) {
      toast.error("Please enter all course details");
      return;
    }
    if (!isCreated) {
      handleCreateCourse();
    } else {
      handleEditCourse();
    }
  };

  if (!isCategoryLoaded)
    return (
      <div className="flex justify-center items-center h-screen">
        Loading resources...
      </div>
    );

  return (
    <div>
      <h2 className="text-[var(--text-primary)] text-base font-semibold">
        Create Course
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mt-4 flex gap-8">
          <div className="w-2/3 space-y-3.5">
            <div>
              <label
                htmlFor="title"
                className="text-sm text-[var(--text-secondary)] font-semibold mt-3.5 mb-2"
              >
                Course Title
              </label>
              <input
                id="title"
                type="text"
                name="title"
                value={courseDetails.title}
                className="w-full h-10 px-3.5 py-2 text-sm text-[var(--text-secondary)] border border-[var(--border-primary)] rounded-xl outline-none placeholder:text-[var(--text-placeholder)] placeholder:italic focus:border-[var(--border-secondary)]"
                placeholder="Type here"
                onChange={handleOnChange}
              />
            </div>

            <div className="pb-0">
              <label
                htmlFor="description"
                className="text-sm text-[var(--text-secondary)] font-semibold mt-3.5 mb-2"
              >
                Course Description
              </label>
              <textarea
                id="description"
                type="text"
                name="description"
                value={courseDetails.description}
                className="w-full min-h-32 m-0 p-3.5 text-sm text-[var(--text-secondary)] border border-[var(--border-primary)] rounded-2xl outline-none placeholder:text-[var(--text-placeholder)] placeholder:italic focus:border-[var(--border-secondary)]"
                placeholder="Type here"
                onChange={handleOnChange}
              />
            </div>

            <div className="pb-0">
              <label
                htmlFor="categoryId"
                className="text-sm text-[var(--text-secondary)] font-semibold mt-3.5 mb-2"
              >
                Course Category
              </label>
              <select
                id="categoryId"
                name="categoryId"
                value={courseDetails.categoryId}
                className="w-full h-10 m-0 px-3.5 py-2 text-sm text-[var(--text-secondary)] border border-[var(--border-primary)] rounded-xl outline-none placeholder:text-[var(--text-placeholder)] placeholder:italic focus:border-[var(--border-secondary)]"
                placeholder="Type here"
                onChange={handleOnChange}
              >
                <option value="" selected disabled>
                  -- Select course category --
                </option>
                {categories.length > 0 &&
                  categories.map((category, index) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="courseContents"
                className="text-sm text-[var(--text-secondary)] font-semibold mt-3.5 mb-2"
              >
                Course Contents
              </label>
              <div className="w-full min-h-32 p-3.5 rounded-2xl border border-[var(--border-primary)] focus-within:border-[var(--border-secondary)]">
                {courseDetails.courseContents.length > 0 && (
                  <ul className="list-disc pl-5 space-y-2 text-[var(--text-secondary)]">
                    {courseDetails.courseContents.map((point, index) => (
                      <li key={index} className="relative pr-6">
                        <span className="text-sm">{point}</span>
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            handleDeletePoint(index);
                          }}
                          className="absolute right-0 top-0 size-5 bg-[var(--text-secondary)] text-white hover:bg-red-400 rounded-full flex justify-center items-center cursor-pointer"
                          title="Delete"
                          type="button"
                        >
                          <LuX size={12} />
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
                <textarea
                  id="courseContents"
                  name="courseContents"
                  value={newCoursePoint}
                  onChange={(e) => setNewCoursePoint(e.target.value)}
                  onKeyDown={handleAddPoint}
                  className="w-full mt-2 text-sm outline-none text-[var(--text-secondary)] placeholder:text-[var(--text-placeholder)] placeholder:italic resize-none"
                  placeholder="Type here and press Enter"
                  rows={3}
                />
              </div>
            </div>
          </div>
          <div className="w-1/3 space-y-3.5">
            <div>
              <label
                htmlFor="courseThumbnail"
                className="text-sm text-[var(--text-secondary)] font-semibold mt-3.5 mb-2"
              >
                Course Thumbnail
                {courseDetails.image && previewImgUrl ? (
                  <div className="w-full h-52 rounded-2xl border border-[var(--border-primary)] overflow-hidden flex justify-center items-center">
                    <img
                      src={previewImgUrl}
                      alt="Thumbnail"
                      className="w-full"
                    />
                  </div>
                ) : (
                  <div className="h-52 rounded-2xl bg-[var(--border-primary)] flex justify-center items-center">
                    <span className="text-[var(--text-secondary)] text-base font-normal">
                      + Upload photo
                    </span>
                  </div>
                )}
                <input
                  id="courseThumbnail"
                  type="file"
                  accept="image/*"
                  name="image"
                  className="hidden"
                  onChange={handleCourseThumbnail}
                />
              </label>
            </div>

            <div className="mt-10">
              <label
                htmlFor="courseMaterial"
                className="mt-3.5 mb-2 cursor-pointer"
              >
                {courseDetails.pdf?.name ? (
                  <div className="w-full h-10 px-3.5 py-2 bg-[#E7E7E7] border border-[var(--border-primary)] rounded-xl outline-none flex justify-between items-center gap-1">
                    <div className="h-10 flex justify-start items-center gap-1">
                      <img className="size-8" src="/pdf-icon.svg" alt="pdf" />
                      <span className="text-[var(--text-secondary)] text-xs font-semibold">
                        {courseDetails?.pdf?.name}
                      </span>
                    </div>
                    <span
                      onClick={(e) => {
                        e.preventDefault();
                        handleClearCourseMaterial();
                      }}
                    >
                      <FaTrashAlt className="text-xl text-[#B7B7B7]" />
                    </span>
                  </div>
                ) : (
                  <div className="w-full h-10 px-3.5 py-2 text-sm border border-[var(--border-secondary)] rounded-xl outline-none flex items-center">
                    <span className="text-[var(--border-secondary)]">
                      Upload whole course materials
                    </span>
                  </div>
                )}

                <input
                  id="courseMaterial"
                  type="file"
                  accept="application/pdf"
                  name="pdf"
                  className="hidden"
                  onChange={handleCourseMaterial}
                />
              </label>
            </div>

            <div className="mt-3">
              <label
                htmlFor="faculties"
                className="text-sm text-[var(--text-secondary)] font-semibold mt-3.5 mb-2"
              >
                Faculties
              </label>
              <div className="min-h-32 p-3.5 rounded-2xl border border-[var(--border-primary)] focus-within:border-[var(--border-secondary)] relative">
                {selectedFacultyList?.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {selectedFacultyList?.map((faculty, index) => (
                      <div
                        key={faculty.id}
                        className="bg-[#D9D9D9] flex justify-between items-center p-1 ps-2 rounded-2xl"
                      >
                        <span className="text-[var(--text-secondary)] text-sm">
                          <span>
                            <span className="font-bold">
                              {faculty?.facultyCode} -{" "}
                            </span>
                            <span>
                              {faculty?.firstName} {faculty?.lastName}
                            </span>
                          </span>
                        </span>
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            handleDeleteFaculty(index);
                          }}
                          className="ms-1 size-5 bg-[var(--text-secondary)] text-white hover:bg-red-400 rounded-full flex justify-center items-center cursor-pointer"
                          title="Delete"
                          type="button"
                        >
                          <LuX size={12} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                <input
                  type="search"
                  name="facultyQuery"
                  value={facultyQuery}
                  className="w-full mt-2 text-sm text-[var(--text-secondary)] outline-none placeholder:text-[var(--text-placeholder)] placeholder:italic resize-none"
                  placeholder="Enter faculty Id no:"
                  onChange={(e) => {
                    e.preventDefault();
                    const val = e.target.value;
                    setFacultyQuery(val);
                    searchFaculty(val);
                  }}
                />
                {/* Searched Faculty List */}
                {facultyQuery.length > 0 && (
                  <div className="w-full max-h-32 absolute top-32 left-0 z-10 bg-[var(--background-secondary)] rounded-b-2xl border border-[var(--border-primary)] overflow-y-auto">
                    <ul className="">
                      {searchedFaculties?.length < 1 ? (
                        <li className="h-12 text-sm text-[var(--text-primary)] italic font-light flex justify-center items-center">
                          <span>No faculties found</span>
                        </li>
                      ) : (
                        searchedFaculties
                          ?.filter(
                            (faculty) =>
                              !selectedFacultyList.some(
                                (selected) => selected.id === faculty.id
                              )
                          )
                          .map((faculty, index) => (
                            <li key={faculty.id}>
                              <Faculty
                                faculty={faculty}
                                onAddFaculty={handleAddFaculty}
                              />
                            </li>
                          ))
                      )}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-8 mt-[60px]">
          <button
            type="button"
            className="w-80 px-6 py-2 h-10 text-base bg-[#9D9D9D] text-white font-semibold rounded-xl cursor-pointer"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            className="w-80 px-6 py-2 h-10 text-base bg-[#72c347] text-white font-semibold rounded-xl cursor-pointer"
            type="submit"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Next"}
          </button>
        </div>
      </form>
    </div>
  );
}
