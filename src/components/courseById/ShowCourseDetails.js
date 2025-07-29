"use client";
import { useCourseDetailStore } from "@/store/courseDetailStore";

function ShowCourseDetails({ onNext }) {
  const { courseDetails } = useCourseDetailStore();

  const url = courseDetails?.courseMaterial;
  const parts = url?.split("/") || [];
  const formattedCourseMaterial =
    decodeURIComponent(parts[parts.length - 1]) || "";

  return (
    <div>
      <h2 className="text-[var(--text-primary)] text-base font-semibold">
        {courseDetails?.title}
      </h2>
      <div className="m-0 p-0">
        <div className="mt-4 flex gap-8">
          <div className="w-2/3 space-y-3.5">
            <div>
              <p className="text-sm text-[var(--text-secondary)] font-semibold mb-1">
                Course Title
              </p>
              <p className="w-full h-10 px-3.5 py-2 text-sm text-[var(--text-secondary)] border border-[var(--border-primary)] rounded-xl">
                {courseDetails?.title}
              </p>
            </div>

            <div className="pb-0">
              <p className="text-sm text-[var(--text-secondary)] font-semibold mb-1">
                Course Description
              </p>
              <div className="w-full min-h-32 m-0 p-3.5 text-sm text-[var(--text-secondary)] border border-[var(--border-primary)] rounded-2xl overflow-y-auto">
                {courseDetails?.description}
              </div>
            </div>

            <div className="pb-0">
              <p className="text-sm text-[var(--text-secondary)] font-semibold mb-1">
                Course Category
              </p>
              <div className="w-full h-10 m-0 px-3.5 py-2 text-sm text-[var(--text-secondary)] border border-[var(--border-primary)] rounded-xl">
                {/* {categories.length > 0 &&
                    categories.map((category, index) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))} */}
                {courseDetails?.categoryId?.name}
              </div>
            </div>

            <div>
              <p className="text-sm text-[var(--text-secondary)] font-semibold mb-1">
                Course Contents
              </p>
              <div className="w-full min-h-32 p-3.5 rounded-2xl border border-[var(--border-primary)] focus-within:border-[var(--border-secondary)]">
                {courseDetails?.courseContents?.length > 0 && (
                  <ul className="list-disc pl-5 space-y-2 text-[var(--text-secondary)]">
                    {courseDetails?.courseContents?.map((point, index) => (
                      <li key={index}>
                        <span className="text-sm">{point}</span>
                      </li>
                    ))}
                  </ul>
                )}
                {/* <textarea
                    id="courseContents"
                    name="courseContents"
                    value={newCoursePoint}
                    onChange={(e) => setNewCoursePoint(e.target.value)}
                    onKeyDown={handleAddPoint}
                    className="w-full mt-2 text-sm outline-none text-[var(--text-secondary)] placeholder:text-[var(--text-placeholder)] placeholder:italic resize-none"
                    placeholder="Type here and press Enter"
                    rows={3}
                  /> */}
              </div>
            </div>
          </div>
          <div className="w-1/3 space-y-3.5">
            <div>
              <p className="text-sm text-[var(--text-secondary)] font-semibold mb-1">
                Course Thumbnail
              </p>

              <div className="w-full h-52 rounded-2xl border border-[var(--border-primary)] overflow-hidden flex justify-center items-center">
                <img
                  src={courseDetails?.thumbnail}
                  alt="Course Thumbnail"
                  className="w-full"
                />
              </div>
            </div>

            <div className="">
              <p className="text-sm text-[var(--text-secondary)] font-semibold mb-1">
                Course Material
              </p>

              <div className="w-full h-10 px-3.5 py-2 border border-[var(--border-primary)] rounded-xl outline-none flex justify-between items-center gap-1">
                <div className="h-10 flex justify-start items-center gap-1">
                  <img className="size-8" src="/pdf-icon.svg" alt="pdf" />
                  <span className="text-[var(--text-secondary)] text-xs font-semibold">
                    {`${
                      formattedCourseMaterial > 35
                        ? formattedCourseMaterial?.substring(0, 35) + "..."
                        : formattedCourseMaterial
                    }`}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-3">
              <p className="text-sm text-[var(--text-secondary)] font-semibold mb-1">
                Faculties
              </p>
              <div className="min-h-32 p-3.5 rounded-2xl border border-[var(--border-primary)] focus-within:border-[var(--border-secondary)]">
                {courseDetails?.instructorIds?.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {courseDetails?.instructorIds?.map((faculty, index) => (
                      <div
                        key={`${faculty.facultyCode}${index}`}
                        className="bg-[#D9D9D9] flex justify-start items-center p-1 ps-2 rounded-2xl"
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
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-8 mt-6">
          {/* <button
            type="button"
            className="w-80 px-6 py-2 h-10 text-base bg-[#9D9D9D] text-white font-semibold rounded-xl cursor-pointer"
          >
            Cancel
          </button> */}
          <button
            className="w-80 px-6 py-2 h-10 text-base bg-[#72c347] text-white font-semibold rounded-xl cursor-pointer"
            type="button"
            onClick={() => onNext()}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default ShowCourseDetails;
