"use client";
import React, { useState } from "react";
import { useAddCourseDetailsStore } from "@/store/addCourseDetailsStore";
import { useAddCourseCertificateStore } from "@/store/addCourseCertificateStore";

import { useCreateIntroVideosStore } from "@/store/createIntroVideosStore";
import { useCreateClassVideosStore } from "@/store/createClassVideosStore";
import { useCreateConclusionVideosStore } from "@/store/createConclusionVideosStore";

import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function CreateCertificate({ onPrevious }) {
  const router = useRouter();
  const { currentCourseId } = useAddCourseDetailsStore();
  const { introVideos } = useCreateIntroVideosStore();
  const { classVideos } = useCreateClassVideosStore();
  const { conclusionVideos } = useCreateConclusionVideosStore();
  const {
    certificateDetails,
    setCertificateDetail,
    setIsWaterMark,
    addCourseCertificate,
    addCourseVideos,
  } = useAddCourseCertificateStore();

  const [previewImgUrl, setPreviewImgUrl] = useState("");

  console.log(certificateDetails);

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { fileName, certificateSize, image } = certificateDetails;

    if (!fileName || !certificateSize || !image?.name) {
      toast.error("Please enter Course name, Certificate size and image");
      return;
    }

    try {
      const formData = new FormData();

      // ✅ Add courseId
      formData.append("courseId", currentCourseId);

      // ✅ Add introVideos
      const introVideosJson = introVideos.map(
        ({ videoTitle, videoUrl, muxUploadId, muxAssetId, videoType }) => ({
          title: videoTitle,
          videoUrl,
          muxUploadId,
          muxAssetId,
          videoType,
        })
      );
      formData.append("introVideos", JSON.stringify(introVideosJson));

      // ✅ Add classVideos
      const classVideosJson = classVideos.map((video) => ({
        videoType: video.videoType,
        title: video.title,
        subject: video.subject,
        videoUrl: video.videoUrl,
        demoVideourl: video.demoVideourl,
        animationUrl: video.animationUrl,
        muxUploadId: video.muxUploadId,
        muxAssetId: video.muxAssetId,
        muxDemoUploadId: video.muxDemoUploadId,
        muxDemoAssetId: video.muxDemoAssetId,
        muxAnimationUploadId: video.muxAnimationUploadId,
        muxAnimationAssetId: video.muxAnimationAssetId,
        videoSteps: video.videoSteps,
      }));
      formData.append("classVideos", JSON.stringify(classVideosJson));

      // ✅ Add conclusionVideos
      const conclusionVideosJson = conclusionVideos.map(
        ({ videoTitle, videoUrl, muxUploadId, muxAssetId, videoType }) => ({
          title: videoTitle,
          videoUrl,
          muxUploadId,
          muxAssetId,
          videoType,
        })
      );
      formData.append("conclusionVideos", JSON.stringify(conclusionVideosJson));

      // ✅ Append related files (optional)
      introVideos.forEach((video, i) => {
        if (video.image)
          formData.append(`introVideos[${i}][image]`, video.image);
        if (video.pdf) formData.append(`introVideos[${i}][pdf]`, video.pdf);
      });

      classVideos.forEach((video, i) => {
        if (video.image)
          formData.append(`classVideos[${i}][image]`, video.image);
        if (video.pdf) formData.append(`classVideos[${i}][pdf]`, video.pdf);
        if (video.srt) formData.append(`classVideos[${i}][srt]`, video.srt);
      });

      conclusionVideos.forEach((video, i) => {
        if (video.image)
          formData.append(`conclusionVideos[${i}][image]`, video.image);
        if (video.pdf)
          formData.append(`conclusionVideos[${i}][pdf]`, video.pdf);
      });

      // Step 1: Submit videos (sequential)
      await addCourseVideos(currentCourseId, formData);

      // Step 2: Submit certificate
      const certificateFormData = new FormData();

      certificateFormData.append("courseId", currentCourseId);

      Object.entries(certificateDetails).forEach(([key, value]) => {
        if (value instanceof File) {
          certificateFormData.append(key, value); // image
        } else {
          certificateFormData.append(key, value?.toString() ?? ""); // string, boolean
        }
      });

      await addCourseCertificate(currentCourseId, certificateFormData);

      toast.success("Course details submitted successfully!");

      router.push(`/dashboard/courses/${currentCourseId}`);
    } catch (error) {
      console.error("Error submitting course details:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
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
                  value={certificateDetails?.fileName}
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
                value={certificateDetails?.certificateSize}
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
                    checked={certificateDetails?.downloadable}
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
                    checked={certificateDetails?.isWatermark}
                  />
                  Watermark
                </label>

                <input
                  id="watermark"
                  type="text"
                  name="watermark"
                  value={certificateDetails?.watermark}
                  disabled={!certificateDetails?.isWatermark}
                  className={`min-w-[268px] h-10 px-3.5 py-2 text-sm  rounded-xl outline-none placeholder:text-[var(--text-placeholder)] placeholder:italic focus:border-[var(--border-secondary)]
                    ${
                      !certificateDetails?.isWatermark
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
              {previewImgUrl ? (
                <img
                  src={previewImgUrl ? previewImgUrl : null}
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
            onClick={onPrevious}
          >
            Cancel
          </button>
          <button
            className="w-80 px-6 py-2 h-10 text-base bg-[#72c347] text-white font-semibold rounded-xl cursor-pointer"
            type="submit"
          >
            Next
          </button>
        </div>
      </form>
    </div>
  );
}
