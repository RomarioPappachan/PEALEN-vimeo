// "use client";
// import React, { useState } from "react";
// import { useParams } from "next/navigation";
// import { useNewClassVideoStore } from "@/store/newClassVideoStore";
// import { useCourseDetailStore } from "@/store/courseDetailStore";
// import ModuleMaterial from "./ModuleMaterial";

// import { LiaTrashAlt } from "react-icons/lia";
// import { LuCircleCheckBig, LuMinus, LuPlus } from "react-icons/lu";
// import toast from "react-hot-toast";

// export default function NewClassVideoForm({ index, onCancel }) {
//   const { courseId } = useParams();

//   const {
//     newClassVideoDetails,
//     setNewClassVideoDetails,
//     addNewClassVideo,
//     resetNewClassVideo,
//   } = useNewClassVideoStore();
//   const { getCourseById } = useCourseDetailStore();

//   const [isExpanded, setIsExpanded] = useState(false);
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const [isAddClassMaterialOpen, setIsAddClassMaterialOpen] = useState(false);
//   const [isAddClassVideoOpen, setIsAddClassVideoOpen] = useState(false);

//   const handleOnChange = (e) => {
//     const { name, value } = e.target;
//     setNewClassVideoDetails(name, value); // in the store for form submission
//   };

//   const handleVideoThumbnail = (e) => {
//     const name = e.target.name;
//     const file = e.target.files[0];

//     setNewClassVideoDetails(name, file); // in the store for form submission
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);

//     const { title, image, videoId } = newClassVideoDetails;

//     if (!title || !videoId || !image) {
//       toast("Please add title, image and video");
//       setIsSubmitting(false);
//       return;
//     }

//     try {
//       const res = await addNewClassVideo(courseId);

//       toast.success("Intro Video added successfully");
//       resetNewClassVideo(); //reset store
//       onCancel(); // close edit section
//       getCourseById(courseId);
//     } catch (error) {
//       console.log(error);
//       toast.success("Error adding Intro Video.");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="px-8 py-4 bg-[var(--background-primary)] rounded-2xl drop-shadow-md dark:border dark:border-[var(--border-secondary)]">
//       <div className="flex justify-between items-center">
//         <h3 className="font-semibold text-sm text-[var(--text-secondary)]">
//           {index + 1}
//           <span className="ms-4">
//             {newClassVideoDetails?.title
//               ? newClassVideoDetails?.title
//               : "Untitled Video"}
//           </span>
//         </h3>
//         <div className="flex items-center gap-4">
//           <button
//             type="button"
//             onClick={() => setIsExpanded((prev) => !prev)}
//             className="size-6 rounded-full flex justify-center items-center bg-[#BEBEBE] cursor-pointer transition-all duration-300"
//             title={isExpanded ? "Minimise" : "Expand"}
//           >
//             {isExpanded ? (
//               <LuMinus className="text-white font-bold" />
//             ) : (
//               <LuPlus className="text-white font-bold" />
//             )}
//           </button>
//         </div>
//       </div>

//       {/* Expanded section  */}
//       <div
//         className={`transition-all duration-500 ease-in-out overflow-hidden ${
//           isExpanded ? "max-h-[1000px] mt-4" : "max-h-0"
//         }`}
//       >
//         <form className="m-0" onSubmit={handleSubmit}>
//           <h3 className="text-[var(--text-secondary)] text-sm font-normal">
//             Video Title
//           </h3>

//           <div className="flex gap-4">
//             <div className="w-4/5 flex gap-x-3">
//               <div className="flex-1 space-y-6">
//                 <input
//                   id={`introTitle-${index + 1}`}
//                   type="text"
//                   name="title"
//                   value={newClassVideoDetails?.title}
//                   className="w-full h-10 px-3.5 py-2 text-sm text-[var(--text-secondary)] border border-[var(--border-primary)] rounded-xl outline-none placeholder:text-[var(--text-placeholder)] placeholder:italic focus:border-[var(--border-secondary)]"
//                   placeholder="Type here"
//                   onChange={handleOnChange}
//                 />

//                 <div className="flex justify-between gap-x-10">
//                   <button
//                     className="w-full h-10 p-3 border border-[var(--border-secondary)] rounded-xl outline-none flex justify-center items-center gap-x-2 cursor-pointer"
//                     type="button"
//                     // onClick={() => setIsAddClassVideoOpen(true)}
//                   >
//                     <span className="text-sm text-[var(--border-secondary)] font-semibold">
//                       Intro Video
//                     </span>
//                     {newClassVideoDetails?.videoId > 0 && (
//                       <LuCircleCheckBig className="text-xl text-[var(--border-secondary)]" />
//                     )}
//                   </button>

//                   <button
//                     className="w-full h-10 p-3 border border-[var(--border-secondary)] rounded-xl outline-none flex justify-center items-center gap-x-2 cursor-pointer"
//                     type="button"
//                     onClick={() => setIsAddClassMaterialOpen(true)}
//                   >
//                     <span className="text-sm text-[var(--border-secondary)] font-semibold">
//                       Module materials
//                     </span>
//                     {newClassVideoDetails?.pdf?.name && (
//                       <LuCircleCheckBig className="text-xl text-[var(--border-secondary)]" />
//                     )}
//                   </button>
//                 </div>
//               </div>

//               <div>
//                 <button
//                   type="button"
//                   className="h-10 p-4 text-sm rounded-xl bg-[#72c347] text-[var(--background-primary)] cursor-pointer flex justify-center items-center"
//                   //   onClick={() => setIsAddClassVideoOpen(true)}
//                 >
//                   {newClassVideoDetails?.videoId
//                     ? "Change Video"
//                     : "+ Add Video"}
//                 </button>
//               </div>
//             </div>

//             <div className="w-1/5">
//               <div>
//                 <label
//                   htmlFor={`introVideoThumbnail-${index + 1}`}
//                   className="text-base text-[var(--text-secondary)] font-semibold cursor-pointer"
//                 >
//                   {newClassVideoDetails?.image?.name ? (
//                     <div className="w-full h-32 rounded-2xl border border-[var(--border-primary)] overflow-hidden flex justify-center items-center">
//                       <img
//                         src={URL.createObjectURL(newClassVideoDetails?.image)}
//                         alt={newClassVideoDetails?.title || "Thumbnail"}
//                         className="w-full"
//                       />
//                     </div>
//                   ) : (
//                     <div className="h-32 rounded-2xl bg-[var(--border-primary)] flex justify-center items-center">
//                       <span className="text-[var(--text-secondary)] text-base font-normal">
//                         + Add Thumbnail
//                       </span>
//                     </div>
//                   )}
//                   <input
//                     id={`introVideoThumbnail-${index + 1}`}
//                     type="file"
//                     accept="image/*"
//                     name="image"
//                     hidden
//                     onChange={(e) => handleVideoThumbnail(e)}
//                   />
//                 </label>
//               </div>
//             </div>
//           </div>

//           {/* form buttons  */}
//           <div className="flex justify-end gap-4 mt-6">
//             <button
//               type="button"
//               onClick={() => {
//                 onCancel();
//                 resetNewClassVideo(); //reset store
//               }}
//               className={`px-4 py-2 text-sm font-semibold text-white bg-gray-500 rounded-xl ${
//                 isSubmitting ? "cursor-not-allowed" : "cursor-pointer"
//               }`}
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className={`px-4 py-2 text-sm font-semibold text-white bg-[#72C347] rounded-xl ${
//                 isSubmitting ? "cursor-not-allowed" : "cursor-pointer"
//               }`}
//               disabled={isSubmitting}
//             >
//               Submit
//             </button>
//           </div>
//         </form>
//       </div>
//       {isAddClassMaterialOpen && (
//         <ModuleMaterial
//           video={newClassVideoDetails}
//           onFileChange={setNewClassVideoDetails}
//           onClose={() => setIsAddClassMaterialOpen(false)}
//         />
//       )}
//     </div>
//   );
// }

"use client";
import React, { useState } from "react";
import { useParams } from "next/navigation";
import { useNewClassVideoStore } from "@/store/newClassVideoStore";
import { useCourseDetailStore } from "@/store/courseDetailStore";
import ModuleMaterial from "./ModuleMaterial";

import { LiaTrashAlt } from "react-icons/lia";
import { LuCircleCheckBig, LuMinus, LuPlus } from "react-icons/lu";
import toast from "react-hot-toast";
import VideoTranscript from "./VideoTranscript";
import VideoSteps from "./VideoSteps";

export default function NewClassVideoForm({ index, onCancel }) {
  const { courseId } = useParams();

  const {
    newClassVideoDetails,
    setNewClassVideoDetails,
    addClassVideoSteps,
    removeClassVideoSteps,
    addNewClassVideo,
    resetNewClassVideo,
  } = useNewClassVideoStore();
  const { getCourseById } = useCourseDetailStore();

  const [isExpanded, setIsExpanded] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [isAddClassMaterialOpen, setIsAddClassMaterialOpen] = useState(false);
  const [isAddTranscriptOpen, setIsAddTranscriptOpen] = useState(false);
  const [isAddStepsOpen, setIsAddStepsOpen] = useState(false);

  const [isAddClassVideoOpen, setIsAddClassVideoOpen] = useState(false);
  const [isAddDemoVideoOpen, setIsAddDemoVideoOpen] = useState(false);
  const [isAddAnimationOpen, setIsAddAnimationOpen] = useState(false);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setNewClassVideoDetails(name, value); // in the store for form submission
  };

  const handleVideoThumbnail = (e) => {
    const name = e.target.name;
    const file = e.target.files[0];

    setNewClassVideoDetails(name, file); // in the store for form submission
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const {
      title,
      subject,
      image,
      videoId,
      demoVideoId,
      animationVideoId,
      srt,
    } = newClassVideoDetails;

    if (
      !title ||
      !subject ||
      !image ||
      !videoId ||
      !demoVideoId ||
      !animationVideoId ||
      !srt
    ) {
      toast("Please add title, image and video");
      setIsSubmitting(false);
      return;
    }

    try {
      const res = await addNewClassVideo(courseId);

      toast.success("Class Video added successfully");
      resetNewClassVideo(); //reset store
      onCancel(); // close edit section
      getCourseById(courseId);
    } catch (error) {
      console.log(error);
      toast.error("Error adding Class Video.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="px-8 py-4 bg-[var(--background-primary)] rounded-2xl drop-shadow-md dark:border dark:border-[var(--border-secondary)]">
      <div className="flex justify-between items-center">
        <h3 className="font-semibold text-sm text-[var(--text-secondary)]">
          {index + 1}
          <span className="ms-4">
            {newClassVideoDetails?.title
              ? newClassVideoDetails?.title
              : "Untitled Video"}
          </span>
        </h3>
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => setIsExpanded((prev) => !prev)}
            className="size-6 rounded-full flex justify-center items-center bg-[#BEBEBE] cursor-pointer transition-all duration-300"
            title={isExpanded ? "Minimise" : "Expand"}
          >
            {isExpanded ? (
              <LuMinus className="text-white font-bold" />
            ) : (
              <LuPlus className="text-white font-bold" />
            )}
          </button>
        </div>
      </div>

      {/* Expanded section  */}
      <div
        className={`transition-all duration-500 ease-in-out overflow-hidden ${
          isExpanded ? "max-h-[1000px] mt-4" : "max-h-0"
        }`}
      >
        <form onSubmit={handleSubmit}>
          <div className="flex">
            <div className="w-3/4 pe-5 border-r-2 border-[#DCDCDC]">
              <div className="w-full px-3 py-2 bg-[var(--background-tertiary)] rounded-2xl">
                <div className="space-y-1">
                  <h3 className="text-[var(--text-secondary)] text-sm font-semibold">
                    Video Title
                  </h3>
                  <input
                    id="title"
                    type="text"
                    name="title"
                    value={newClassVideoDetails?.title}
                    className="w-full h-10 px-3.5 py-2 text-sm bg-[var(--background-primary)] text-[var(--text-secondary)] border border-[var(--border-primary)] rounded-xl outline-none placeholder:text-[var(--text-placeholder)] placeholder:italic focus:border-[var(--border-secondary)]"
                    placeholder="Type here"
                    onChange={(e) => handleOnChange(e)}
                  />
                </div>

                <div className="space-y-1 mt-3.5">
                  <h3 className="text-[var(--text-secondary)] text-sm font-semibold">
                    Video subject (First window of the Tutor)
                  </h3>
                  <input
                    id="subject"
                    type="text"
                    name="subject"
                    value={newClassVideoDetails?.subject}
                    className="w-full h-10 px-3.5 py-2 text-sm bg-[var(--background-primary)] text-[var(--text-secondary)] border border-[var(--border-primary)] rounded-xl outline-none placeholder:text-[var(--text-placeholder)] placeholder:italic focus:border-[var(--border-secondary)]"
                    placeholder="Type here"
                    onChange={(e) => handleOnChange(e)}
                  />
                </div>

                <div className="mt-7 flex gap-3.5">
                  <div className="flex-1 grid grid-cols-3 gap-5 gap-y-3">
                    <button
                      type="button"
                      className="w-full h-10 p-3 border border-[var(--border-secondary)] rounded-xl outline-none flex justify-center items-center cursor-pointer"
                      // onClick={() => setIsAddClassVideoOpen(true)}
                    >
                      <span className="text-sm text-[var(--border-secondary)] font-semibold text-center leading-[18px]">
                        Add Class Video
                      </span>
                    </button>
                    <button
                      type="button"
                      className="w-full h-10 p-3 border border-[var(--border-secondary)] rounded-xl outline-none flex justify-center items-center cursor-pointer"
                      onClick={() => setIsAddTranscriptOpen(true)}
                    >
                      <span className="text-sm text-[var(--border-secondary)] font-semibold text-center leading-[18px]">
                        Transcription (SRT)
                      </span>
                    </button>
                    <button
                      type="button"
                      className="w-full h-10 p-3 border border-[var(--border-secondary)] rounded-xl outline-none flex justify-center items-center cursor-pointer"
                      // onClick={() => setIsAddDemoVideoOpen(true)}
                    >
                      <span className="text-sm text-[var(--border-secondary)] font-semibold text-center leading-[18px]">
                        Demo Video
                      </span>
                    </button>
                    <button
                      type="button"
                      className="w-full h-10 p-3 border border-[var(--border-secondary)] rounded-xl outline-none flex justify-center items-center cursor-pointer"
                      // onClick={() => setIsAddAnimationOpen(true)}
                    >
                      <span className="text-sm text-[var(--border-secondary)] font-semibold text-center leading-[18px]">
                        Add Animation
                      </span>
                    </button>
                    <button
                      type="button"
                      className="w-full h-10 p-3 border border-[var(--border-secondary)] rounded-xl outline-none flex justify-center items-center cursor-pointer"
                      onClick={() => setIsAddStepsOpen(true)}
                    >
                      <span className="text-sm text-[var(--border-secondary)] font-semibold text-center leading-[18px]">
                        Add Steps
                      </span>
                    </button>
                    <button
                      type="button"
                      className="w-full h-10 p-3 border border-[var(--border-secondary)] rounded-xl outline-none flex justify-center items-center cursor-pointer"
                      onClick={() => setIsAddClassMaterialOpen(true)}
                    >
                      <span className="text-sm text-[var(--border-secondary)] font-semibold text-center leading-[18px]">
                        Module Material
                      </span>
                    </button>
                  </div>
                  <div>
                    <div className="w-44 h-28 rounded-2xl bg-[var(--border-primary)] flex justify-center items-center">
                      <label
                        htmlFor={`classVideoThumbnail-${index + 1}`}
                        className="text-sm text-[var(--text-secondary)] font-semibold cursor-pointer"
                      >
                        {newClassVideoDetails?.image?.name ? (
                          <div className="w-full h-28 rounded-2xl border border-[var(--border-primary)] overflow-hidden flex justify-center items-center">
                            <img
                              src={URL.createObjectURL(
                                newClassVideoDetails?.image
                              )}
                              alt={
                                newClassVideoDetails?.image?.name || "Thumbnail"
                              }
                              className="w-full"
                            />
                          </div>
                        ) : (
                          <div className="h-28 rounded-2xl bg-[var(--border-primary)] flex justify-center items-center">
                            <span className="text-sm text-[var(--text-secondary)] font-normal">
                              + Upload photo
                            </span>
                          </div>
                        )}
                        <input
                          id={`classVideoThumbnail-${index + 1}`}
                          type="file"
                          accept="image/*"
                          name="image"
                          className="hidden"
                          onChange={(e) => handleVideoThumbnail(e)}
                        />
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-1/4 px-6 max-w-max">
              <div className="p-2 bg-[var(--background-tertiary)] rounded-2xl space-y-2">
                <div className=" grid grid-cols-2 gap-1">
                  {/* class video */}
                  <div
                    className={`size-[88px] rounded-2xl border-2 cursor-pointer flex justify-center items-center ${
                      newClassVideoDetails.videoUrl
                        ? "border-[#05A8E3] bg-[#B6E9FB] border-dotted"
                        : "border-[#B3B8B8] bg-[#F1F1F1]"
                    }`}
                    //   onClick={() => setIsAddClassVideoOpen(true)}
                  >
                    <span className="text-xs text-center">
                      {newClassVideoDetails.videoUrl ? "Video ✅" : ""}
                    </span>
                  </div>

                  {/* Demo video  */}
                  <div
                    className={`size-[88px] rounded-2xl border-2 cursor-pointer flex justify-center items-center ${
                      newClassVideoDetails.demoVideourl
                        ? "border-[#05A8E3] bg-[#B6E9FB] border-dotted"
                        : "border-[#B3B8B8] bg-[#F1F1F1]"
                    }`}
                    //   onClick={() => setIsAddDemoVideoOpen(true)}
                  >
                    <span className="text-xs text-center">
                      {newClassVideoDetails.demoVideourl ? "Demo Video ✅" : ""}
                    </span>
                  </div>

                  {/* Transcript  */}
                  <div
                    className={`size-[88px] rounded-2xl border-2 cursor-pointer flex justify-center items-center ${
                      newClassVideoDetails.srt?.name
                        ? "border-[#05A8E3] bg-[#B6E9FB] border-dotted"
                        : "border-[#B3B8B8] bg-[#F1F1F1]"
                    }`}
                    onClick={() => setIsAddTranscriptOpen(true)}
                  >
                    <span className="text-xs text-center">
                      {newClassVideoDetails.srt?.name ? "Transcript ✅" : ""}
                    </span>
                  </div>

                  {/* Animation video  */}
                  <div
                    className={`size-[88px] rounded-2xl border-2 cursor-pointer flex justify-center items-center ${
                      newClassVideoDetails.animationUrl
                        ? "border-[#05A8E3] bg-[#B6E9FB] border-dotted"
                        : "border-[#B3B8B8] bg-[#F1F1F1]"
                    }`}
                    //   onClick={() => setIsAddAnimationOpen(true)}
                  >
                    <span className="text-xs text-center">
                      {newClassVideoDetails.animationUrl
                        ? "Animation video ✅"
                        : ""}
                    </span>
                  </div>

                  {/* Audio  */}
                  <div
                    className={`size-[88px] rounded-2xl border-2 cursor-pointer flex justify-center items-center ${
                      newClassVideoDetails.videoUrl
                        ? "border-[#05A8E3] bg-[#B6E9FB] border-dotted"
                        : "border-[#B3B8B8] bg-[#F1F1F1]"
                    }`}
                    // onClick={() => setIsAddTranscriptOpen(true)}
                  >
                    <span className="text-xs text-center">
                      {newClassVideoDetails.videoUrl ? "Audio URL ✅" : ""}
                    </span>
                  </div>

                  {/* Video steps  */}
                  <div
                    className={`size-[88px] rounded-2xl border-2 cursor-pointer flex justify-center items-center ${
                      newClassVideoDetails.videoSteps.length > 0
                        ? "border-[#05A8E3] bg-[#B6E9FB] border-dotted"
                        : "border-[#B3B8B8] bg-[#F1F1F1]"
                    }`}
                    onClick={() => setIsAddStepsOpen(true)}
                  >
                    <span className="text-xs text-center">
                      {newClassVideoDetails.videoSteps.length > 0
                        ? "Video Steps ✅"
                        : ""}
                    </span>
                  </div>
                </div>
                <p className="text-center text-[var(--text-secondary)] text-[10px] leading-3.5">
                  Please look at the selected area to see which slot you are
                  uploading video/file.
                </p>
              </div>
            </div>
          </div>

          {/* form buttons  */}
          <div className="flex justify-end gap-4 mt-6">
            <button
              type="button"
              onClick={() => {
                onCancel();
                resetNewClassVideo(); //reset store
              }}
              className={`px-4 py-2 text-sm font-semibold text-white bg-gray-500 rounded-xl ${
                isSubmitting ? "cursor-not-allowed" : "cursor-pointer"
              }`}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`px-4 py-2 text-sm font-semibold text-white bg-[#72C347] rounded-xl ${
                isSubmitting ? "cursor-not-allowed" : "cursor-pointer"
              }`}
              disabled={isSubmitting}
            >
              Submit
            </button>
          </div>
        </form>
      </div>

      {isAddClassMaterialOpen && (
        <ModuleMaterial
          video={newClassVideoDetails}
          onFileChange={setNewClassVideoDetails}
          onClose={() => setIsAddClassMaterialOpen(false)}
        />
      )}

      {isAddTranscriptOpen && (
        <VideoTranscript
          video={newClassVideoDetails}
          onFileChange={setNewClassVideoDetails}
          onClose={() => setIsAddTranscriptOpen(false)}
        />
      )}

      {isAddStepsOpen && (
        <VideoSteps
          video={newClassVideoDetails}
          onAddStep={addClassVideoSteps}
          onRemoveStep={removeClassVideoSteps}
          onClose={() => setIsAddStepsOpen(false)}
        />
      )}
    </div>
  );
}
