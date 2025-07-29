"use client";
import { useEffect, useState } from "react";
import { useEditCourseCertificateStore } from "@/store/editCourseCertificateStore";
import { useCourseDetailStore } from "@/store/courseDetailStore";
import toast from "react-hot-toast";
import { useParams } from "next/navigation";

function EditCourseCertificate({ onEdit }) {
  const { courseId } = useParams();

  const { certificateDetails, courseDetails, getCourseById } =
    useCourseDetailStore();
  const {
    updatedCertificateDetails,
    setInitialCertificateDetails,
    setCertificateDetail,
    setIsWaterMark,
    addCourseCertificate,
    editCourseCertificate,
  } = useEditCourseCertificateStore();

  const [isUpdating, setIsUpdating] = useState(false);
  const [previewImgUrl, setPreviewImgUrl] = useState("");

  useEffect(() => {
    setInitialCertificateDetails({
      id: certificateDetails?.id || null,
      fileName: certificateDetails?.fileName || "",
      certificateSize: certificateDetails?.certificateSize || "",
      downloadable: certificateDetails?.downloadable || true,
      watermark: certificateDetails?.watermark || "",
      fileUrl: certificateDetails?.fileUrl || null,
      image: null, //for new upload
      isWatermark: certificateDetails?.watermark ? true : false, //for new upload
    });
  }, []);

  function handleOnChange(e) {
    const { name, value, type, checked } = e.target;

    // Handle checkboxes correctly
    if (type === "checkbox") {
      setCertificateDetail(name, checked);
    } else {
      setCertificateDetail(name, value);
    }
  }

  function handleIsWatermark(e) {
    const { name, checked } = e.target;
    setIsWaterMark(checked);
  }

  function handleImageChange(e) {
    e.preventDefault();

    const name = e.target.name;
    const file = e.target.files[0];
    console.log(file);

    const imageUrl = URL.createObjectURL(file);

    setCertificateDetail(name, file);
    setPreviewImgUrl(imageUrl);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const { fileName, certificateSize, image, fileUrl } =
      updatedCertificateDetails;

    if (!fileName || !certificateSize || !(image?.name || fileUrl)) {
      toast.error("Please enter Course name, Certificate size and image");
      return;
    }

    const certificateFormData = new FormData();

    // certificateFormData.append("courseId", currentCourseId);

    Object.entries(updatedCertificateDetails).forEach(([key, value]) => {
      if (value instanceof File) {
        certificateFormData.append(key, value); // image
      } else {
        certificateFormData.append(key, value?.toString() ?? ""); // string, boolean
      }
    });

    console.log(certificateFormData);

    if (updatedCertificateDetails?.id)
      await editCourseCertificate(
        updatedCertificateDetails?.id,
        certificateFormData
      );
    else await addCourseCertificate(courseDetails?.id, certificateFormData);

    getCourseById(courseId);

    toast.success("Course certicate updated successfully.");
  }

  return (
    <div>
      <div>
        <h2 className="mb-2 text-[var(--text-primary)] text-xl font-semibold">
          Certificate
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="flex px-5 py-6">
            <div className="w-2/3 ">
              <h3 className="mb-7 text-[var(--text-secondary)] text-sm font-semibold">
                Upload Certificate
              </h3>
              <div className="space-y-[26px]">
                <div className="flex gap-6">
                  <input
                    id="fileName"
                    type="text"
                    name="fileName"
                    value={updatedCertificateDetails?.fileName}
                    className="flex-1 h-10 px-3.5 py-2 text-sm bg-[var(--background-primary)] text-[var(--text-secondary)] border border-[var(--border-primary)] rounded-xl outline-none placeholder:text-[var(--text-placeholder)] placeholder:italic focus:border-[var(--border-secondary)]"
                    placeholder="Course name"
                    onChange={handleOnChange}
                  />
                  <label
                    className="p-2 px-4 h-10 text-sm rounded-xl bg-[#72c347] text-[var(--background-primary)] cursor-pointer flex justify-center items-center"
                    htmlFor="image"
                  >
                    + Upload Image
                    <input
                      type="file"
                      id="image"
                      name="image"
                      accept="image/*"
                      hidden
                      onChange={handleImageChange}
                    />
                  </label>
                </div>

                <select
                  id="certificateSize"
                  name="certificateSize"
                  value={updatedCertificateDetails?.certificateSize}
                  className="w-full h-10 px-3.5 py-2 text-sm bg-[var(--background-primary)] text-[var(--text-secondary)] border border-[var(--border-primary)] rounded-xl outline-none placeholder:text-[var(--text-placeholder)] placeholder:italic focus:border-[var(--border-secondary)]"
                  onChange={handleOnChange}
                >
                  <option value="" selected disabled>
                    -- Select Certificate size --
                  </option>
                  <option value="A3">A3 (297 x 420mm)</option>
                  <option value="A4">A4 (210 x 297mm)</option>
                  <option value="A5">A5 (148.5 x 210mm)</option>
                  <option value="A6">A4 (105 x 148.5mm)</option>
                </select>

                <div className="flex justify-between items-center">
                  <label
                    htmlFor="downloadable"
                    className="flex items-center gap-2 text-sm text-[var(--text-secondary)]"
                  >
                    <input
                      type="checkbox"
                      name="downloadable"
                      id="downloadable"
                      className="size-4"
                      onChange={handleOnChange}
                      checked={updatedCertificateDetails?.downloadable}
                    />
                    Downloadable
                  </label>

                  <label
                    htmlFor="isWatermark"
                    className="flex items-center gap-2 text-sm text-[var(--text-secondary)]"
                  >
                    <input
                      type="checkbox"
                      name="isWatermark"
                      id="isWatermark"
                      className="size-4"
                      onChange={handleIsWatermark}
                      checked={updatedCertificateDetails?.isWatermark}
                    />
                    Watermark
                  </label>

                  <input
                    id="watermark"
                    type="text"
                    name="watermark"
                    value={updatedCertificateDetails?.watermark}
                    disabled={!updatedCertificateDetails?.isWatermark}
                    className={`min-w-[268px] h-10 px-3.5 py-2 text-sm  rounded-xl outline-none placeholder:text-[var(--text-placeholder)] placeholder:italic focus:border-[var(--border-secondary)]
                    ${
                      !updatedCertificateDetails?.isWatermark
                        ? "bg-gray-300 text-gray-300 border border-gray-300"
                        : "bg-[var(--background-primary)] text-[var(--text-secondary)] border border-[var(--border-primary)]"
                    }
                  `}
                    placeholder="Enter watermark"
                    onChange={handleOnChange}
                  />
                </div>
              </div>
            </div>

            <div className="w-1/3 ps-10">
              <div className="w-full h-72 bg-slate-200 border border-[var(--border-primary)] rounded-2xl overflow-hidden relative">
                {previewImgUrl || updatedCertificateDetails?.fileUrl ? (
                  <img
                    src={
                      previewImgUrl
                        ? previewImgUrl
                        : updatedCertificateDetails?.fileUrl
                    }
                    alt="certificate img"
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <span className="absolute top-1/2 left-1/4">
                    No image to display
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* buttons  */}
          <div className="flex justify-end gap-8 mt-[60px]">
            <button
              type="button"
              className="w-80 px-6 py-2 h-10 text-base bg-[#9D9D9D] text-white font-semibold rounded-xl cursor-pointer"
              disabled={isUpdating}
              onClick={() => onEdit(false)}
            >
              Cancel
            </button>
            <button
              className="w-80 px-6 py-2 h-10 text-base bg-[#72c347] text-white font-semibold rounded-xl cursor-pointer"
              type="submit"
              disabled={isUpdating}
            >
              {isUpdating ? "Updating..." : "Update"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditCourseCertificate;
