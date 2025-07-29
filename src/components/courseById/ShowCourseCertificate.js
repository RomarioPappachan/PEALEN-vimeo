"use client";
import { useCourseDetailStore } from "@/store/courseDetailStore";

function ShowCourseCertificate({ onPrevious }) {
  const { certificateDetails } = useCourseDetailStore();
  return (
    <div>
      <div>
        <h2 className="mb-2 text-[var(--text-primary)] text-xl font-semibold">
          Certificate
        </h2>
        <div>
          <div className="flex px-5 py-6">
            <div className="w-2/3 ">
              <h3 className="mb-7 text-[var(--text-secondary)] text-sm font-semibold">
                Upload Certificate
              </h3>
              <div className="space-y-[26px]">
                <div className="flex gap-6">
                  <div className="flex-1 h-10 px-3.5 py-2 text-sm bg-[var(--background-primary)] text-[var(--text-secondary)] border border-[var(--border-primary)] rounded-xl outline-none placeholder:text-[var(--text-placeholder)] placeholder:italic focus:border-[var(--border-secondary)]">
                    {certificateDetails?.fileName}
                  </div>
                </div>

                <div className="w-full h-10 px-3.5 py-2 text-sm bg-[var(--background-primary)] text-[var(--text-secondary)] border border-[var(--border-primary)] rounded-xl outline-none placeholder:text-[var(--text-placeholder)] placeholder:italic focus:border-[var(--border-secondary)]">
                  {certificateDetails?.certificateSize === "A3" && (
                    <span>A3 (297 x 420mm)</span>
                  )}
                  {certificateDetails?.certificateSize === "A4" && (
                    <span>A4 (210 x 297mm)</span>
                  )}
                  {certificateDetails?.certificateSize === "A5" && (
                    <span>A5 (148.5 x 210mm)</span>
                  )}
                  {certificateDetails?.certificateSize === "A6" && (
                    <span>A6 (105 x 148.5mm)</span>
                  )}
                </div>

                <div className="flex justify-start items-center gap-6">
                  <p className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                    {certificateDetails?.downloadable
                      ? "Downloadable"
                      : "Not Downloadable"}
                  </p>

                  <p
                    htmlFor="isWatermark"
                    className="flex items-center gap-2 text-sm text-[var(--text-secondary)]"
                  >
                    {certificateDetails?.watermark
                      ? "Has Watermark"
                      : "No Watermark"}
                  </p>

                  {certificateDetails?.watermark && (
                    <div className="min-w-[268px] h-10 px-3.5 py-2 text-sm  rounded-xl outline-none placeholder:text-[var(--text-placeholder)] placeholder:italic focus:border-[var(--border-secondary)] bg-[var(--background-primary)] text-[var(--text-secondary)] border border-[var(--border-primary)]">
                      Watermark :{certificateDetails?.watermark}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="w-1/3 ps-10">
              <div className="w-full h-72 bg-slate-200 border border-[var(--border-primary)] rounded-2xl overflow-hidden relative">
                {certificateDetails?.fileUrl ? (
                  <img
                    src={certificateDetails?.fileUrl}
                    alt="certificate img"
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <div className="w-full h-full flex justify-center items-center text-gray-600">
                    <span>No image to display</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* buttons  */}
          <div className="flex justify-end gap-8 mt-[60px]">
            <button
              type="button"
              className="w-80 px-6 py-2 h-10 text-base bg-[#9D9D9D] text-white font-semibold rounded-xl cursor-pointer"
              onClick={() => onPrevious()}
            >
              Back
            </button>
            {/* <button
          className="w-80 px-6 py-2 h-10 text-base bg-[#72c347] text-white font-semibold rounded-xl cursor-pointer"
          type="button"
          onClick={() => onNext()}
        >
          Next
        </button> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShowCourseCertificate;
