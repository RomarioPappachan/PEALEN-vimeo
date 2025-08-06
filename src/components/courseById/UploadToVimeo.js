// "use client";
// import React, { useEffect, useState } from "react";
// import { createPortal } from "react-dom";
// import * as tus from "tus-js-client";
// import {
//   checkVimeoVideoStatus,
//   deleteVideoFromVimeo,
//   generateVimeoUploadUrl,
// } from "@/api/vimeoVideo";

// import toast from "react-hot-toast";

// export default function UploadToVimeo({
//   userAction,
//   videoTitle,
//   videoType,
//   videoId,
//   onSetVideoId,
//   onDeleteVideoId,
//   onClose,
// }) {
//   const [file, setFile] = useState(null);
//   const [isUploading, setIsUploading] = useState(false);
//   const [uploadProgress, setUploadProgress] = useState(0);
//   const [optimizationStatus, setOptimizationStatus] = useState(null); // "complete" or "in_progress"
//   const [error, setError] = useState(null);
//   const [playerUrl, setPlayerUrl] = useState(null);

//   // Fetch optimization status once if videoId is present
//   useEffect(() => {
//     if (!videoId) return;
//     setPlayerUrl(
//       `https://player.vimeo.com/video/${encodeURIComponent(videoId)}`
//     );

//     // API to check Vimeo video status
//     checkVimeoVideoStatus(videoId)
//       .then((res) => {
//         const status = res.data.status;
//         if (status === "in_progress") {
//           setOptimizationStatus("in_progress");
//         } else if (status === "complete") {
//           setOptimizationStatus("complete");
//         } else {
//           // unexpected, treat as in progress tip
//           setOptimizationStatus("in_progress");
//         }
//       })
//       .catch(() => {
//         setError("Failed to fetch optimization status.");
//       });
//   }, [videoId]);

//   const handleFileChange = (e) => {
//     if (e.target.files && e.target.files[0]) {
//       setFile(e.target.files[0]);
//     }
//   };

//   const handleUpload = async () => {
//     if (!file) {
//       setError("Select a file first.");
//       return;
//     }
//     setError(null);
//     setIsUploading(true);
//     setUploadProgress(0);

//     try {
//       const { data } = await generateVimeoUploadUrl(file.size, videoTitle); // generate Vimeo Upload URL

//       const uploadLink = data.uploadLink;
//       const uri = data.videoUri; // e.g. "/videos/12345"
//       if (!uploadLink || !uri) throw new Error("Invalid response");

//       const upload = new tus.Upload(file, {
//         endpoint: uploadLink,
//         retryDelays: [0, 1000, 3000],
//         metadata: {
//           filename: file.name,
//           filetype: file.type,
//         },
//         uploadUrl: uploadLink,
//         onError: (err) => {
//           setError("Upload failed.");
//           setIsUploading(false);
//         },
//         onProgress: (bytesUploaded, bytesTotal) => {
//           const percent = Math.floor((bytesUploaded / bytesTotal) * 100);
//           setUploadProgress(percent);
//         },
//         onSuccess: () => {
//           const generatedVideoId = uri.split("/").pop();
//           if (generatedVideoId) {
//             onSetVideoId(generatedVideoId, videoType);
//             setIsUploading(false);
//           } else {
//             setError("Could not parse video ID.");
//             setIsUploading(false);
//           }
//         },
//       });

//       upload.start();
//     } catch (e) {
//       setError("Failed to initialize upload.");
//       setIsUploading(false);
//     }
//   };

//   const handleDelete = async (e) => {
//     e.preventDefault();
//     if (userAction === "create") {
//       try {
//         const res = await deleteVideoFromVimeo(videoId); // delete video directly from vimeo

//         onDeleteVideoId(videoType); // clear in store
//         setOptimizationStatus(null);
//         setPlayerUrl(null);
//         setFile(null);
//         setUploadProgress(0);
//         setError(null);
//         setIsUploading(false);
//       } catch (error) {
//         toast.error(`Error deleting ${videoType} video`);
//       }
//     } else if (userAction === "edit") {
//       onDeleteVideoId(videoType); // clear only in store
//       setOptimizationStatus(null);
//       setPlayerUrl(null);
//       setFile(null);
//       setUploadProgress(0);
//       setError(null);
//       setIsUploading(false);
//     }
//   };

//   // close on escape
//   useEffect(() => {
//     const onKey = (e) => {
//       if (e.key === "Escape") onClose();
//     };
//     document.addEventListener("keydown", onKey);
//     return () => document.removeEventListener("keydown", onKey);
//   }, [onClose]);

//   return createPortal(
//     <div className="fixed inset-0 z-50 bg-black/50 flex justify-center items-start sm:items-center overflow-auto px-4 py-8">
//       <div className="relative w-full max-w-3xl bg-white rounded-2xl p-6 space-y-6">
//         <button
//           onClick={onClose}
//           className="absolute top-4 right-4 p-2 bg-red-500 text-white rounded"
//           disabled={isUploading}
//         >
//           Close
//         </button>

//         <div>
//           <h2 className="text-lg font-semibold">{videoTitle || "Video"}</h2>
//           {videoType && (
//             <p className="text-sm text-gray-500">Type: {videoType}</p>
//           )}
//         </div>

//         {!videoId ? (
//           <div className="flex flex-col gap-4">
//             <label className="border-2 border-dashed rounded p-6 text-center">
//               <p className="mb-2">Drag & drop or select a video file</p>
//               <input
//                 type="file"
//                 accept="video/*"
//                 onChange={handleFileChange}
//                 disabled={isUploading}
//                 className="mx-auto"
//               />
//               {file && (
//                 <p className="mt-2 text-sm">
//                   Selected: {file.name} (
//                   {(file.size / (1024 * 1024)).toFixed(2)} MB)
//                 </p>
//               )}
//             </label>

//             <div className="flex flex-col sm:flex-row gap-3 items-center">
//               {isUploading && (
//                 <div className="flex-1">
//                   <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
//                     <div
//                       className="h-full"
//                       style={{
//                         width: `${uploadProgress}%`,
//                         backgroundColor: "#2563eb",
//                       }}
//                     ></div>
//                   </div>
//                   <p className="text-xs mt-1">{uploadProgress}%</p>
//                 </div>
//               )}
//               <button
//                 onClick={handleUpload}
//                 disabled={!file || isUploading}
//                 className="bg-blue-600 text-white px-4 py-2 rounded"
//               >
//                 {isUploading ? "Uploading..." : "Upload to Vimeo"}
//               </button>
//             </div>

//             {error && <p className="text-sm text-red-600">{error}</p>}
//           </div>
//         ) : (
//           <div className="flex flex-col gap-4">
//             <div className="w-full aspect-video bg-black rounded overflow-hidden">
//               {playerUrl ? (
//                 <iframe
//                   title="vimeo-player"
//                   src={playerUrl}
//                   frameBorder="0"
//                   allow="autoplay; fullscreen; picture-in-picture"
//                   allowFullScreen
//                   className="w-full h-full"
//                 ></iframe>
//               ) : (
//                 <div className="flex items-center justify-center h-full text-sm text-gray-400">
//                   Loading video...
//                 </div>
//               )}
//             </div>
//             {optimizationStatus === "in_progress" && (
//               <div className="text-sm bg-yellow-50 border border-yellow-200 rounded px-4 py-2">
//                 Tip: Video is still optimizing on Vimeo. Playback will be
//                 available soon.
//               </div>
//             )}
//             {error && <p className="text-sm text-red-600">{error}</p>}
//             <button
//               onClick={handleDelete}
//               className="inline-flex items-center gap-2 text-red-600 mt-2"
//               type="button"
//             >
//               Delete Video
//             </button>
//           </div>
//         )}
//       </div>
//     </div>,
//     document.body
//   );
// }

"use client";
import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import * as tus from "tus-js-client";
import {
  checkVimeoVideoStatus,
  deleteVideoFromVimeo,
  generateVimeoUploadUrl,
} from "@/api/vimeoVideo";
import toast from "react-hot-toast";

export default function UploadToVimeo({
  userAction,
  videoTitle,
  videoType,
  videoId,
  onSetVideoId,
  onDeleteVideoId,
  onClose,
}) {
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [optimizationStatus, setOptimizationStatus] = useState(null); // "complete" or "in_progress"
  const [error, setError] = useState(null);
  const [playerUrl, setPlayerUrl] = useState(null);

  const [confirmingDelete, setConfirmingDelete] = useState(false);

  // Fetch optimization status once if videoId is present
  useEffect(() => {
    if (!videoId) return;
    setPlayerUrl(
      `https://player.vimeo.com/video/${encodeURIComponent(videoId)}`
    );
    checkVimeoVideoStatus(videoId)
      .then((res) => {
        const status = res.data.status;
        if (status === "in_progress") {
          setOptimizationStatus("in_progress");
        } else if (status === "complete") {
          setOptimizationStatus("complete");
        } else {
          setOptimizationStatus("in_progress");
        }
      })
      .catch(() => {
        setError("Failed to fetch optimization status.");
      });
  }, [videoId]);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Select a file first.");
      return;
    }
    setError(null);
    setIsUploading(true);
    setUploadProgress(0);

    try {
      const { data } = await generateVimeoUploadUrl(file.size, videoTitle);
      const uploadLink = data.uploadLink;
      const uri = data.videoUri;
      if (!uploadLink || !uri) throw new Error("Invalid response");

      const upload = new tus.Upload(file, {
        endpoint: uploadLink,
        retryDelays: [0, 1000, 3000],
        metadata: {
          filename: file.name,
          filetype: file.type,
        },
        uploadUrl: uploadLink,
        onError: () => {
          setError("Upload failed.");
          setIsUploading(false);
        },
        onProgress: (bytesUploaded, bytesTotal) => {
          const percent = Math.floor((bytesUploaded / bytesTotal) * 100);
          setUploadProgress(percent);
        },
        onSuccess: () => {
          const generatedVideoId = uri.split("/").pop();
          if (generatedVideoId) {
            onSetVideoId(generatedVideoId, videoType);
            setIsUploading(false);
          } else {
            setError("Could not parse video ID.");
            setIsUploading(false);
          }
        },
      });

      upload.start();
    } catch {
      setError("Failed to initialize upload.");
      setIsUploading(false);
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    if (userAction === "create") {
      try {
        await deleteVideoFromVimeo(videoId);

        onDeleteVideoId(videoType);
        setOptimizationStatus(null);
        setPlayerUrl(null);
        setFile(null);
        setUploadProgress(0);
        setError(null);
        setIsUploading(false);
      } catch {
        toast.error(`Error deleting ${videoType} video`);
      }
    } else if (userAction === "edit") {
      onDeleteVideoId(videoType);
      setOptimizationStatus(null);
      setPlayerUrl(null);
      setFile(null);
      setUploadProgress(0);
      setError(null);
      setIsUploading(false);
    }
  };

  // close on escape
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  return createPortal(
    <div className="fixed inset-0 z-50 flex justify-center items-start sm:items-center overflow-auto px-4 py-8 transition-all duration-150 bg-black/40 animate-fadeIn">
      <div className="relative w-full max-w-3xl rounded-3xl shadow-2xl border bg-white p-0 overflow-hidden animate-popIn border-[color:var(--border-secondary)]">
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-6 border-b bg-white border-b-[color:var(--border-secondary)]">
          <div>
            <h2 className="text-xl font-bold text-[color:var(--text-primary)]">
              {videoTitle || "Video"}
            </h2>
            {videoType && (
              <p className="text-sm mt-1 text-[color:var(--text-secondary)]">
                Type:{" "}
                <span className="text-[color:var(--foreground-primary)] font-medium">
                  {videoType}
                </span>
              </p>
            )}
          </div>
          <button
            onClick={onClose}
            className="ml-8 px-4 py-2 rounded-full font-semibold shadow-lg transition disabled:opacity-60 cursor-pointer bg-[color:var(--border-secondary)] text-white"
            disabled={isUploading}
          >
            Close
          </button>
        </div>

        {/* Main Card Content */}
        <div className="p-8">
          {!videoId ? (
            <div className="flex flex-col gap-5">
              {/* File Picker */}
              <label className="flex flex-col items-center justify-center border-2 border-dashed rounded-2xl p-8 cursor-pointer hover:border-solid hover:shadow-xl transition border-[color:var(--border-secondary)] bg-[color-mix(in_srgb,var(--border-secondary)_10%,white)]">
                <svg
                  width="36"
                  height="36"
                  fill="currentColor"
                  className="mb-2 text-[color:var(--border-secondary)]"
                  viewBox="0 0 24 24"
                >
                  <path d="M19 16.94a6 6 0 1 0-9.4-7.27A5 5 0 1 0 7 21h11a5 5 0 0 0 1-9.88z"></path>
                </svg>
                <p className="mb-2 font-medium text-[color:var(--foreground-tertiary)]">
                  Drag & drop or select a video file
                </p>
                <input
                  type="file"
                  accept="video/*"
                  onChange={handleFileChange}
                  disabled={isUploading}
                  className="mx-auto hidden"
                />
                {file && (
                  <p className="mt-3 text-sm text-[color:var(--text-secondary)]">
                    <span className="text-[color:var(--border-secondary)] font-medium">
                      {file.name}
                    </span>{" "}
                    <span className="mx-1">|</span>
                    {(file.size / (1024 * 1024)).toFixed(2)} MB
                  </p>
                )}
              </label>

              {/* Upload & Progress */}
              <div className="flex flex-col sm:flex-row gap-4 items-center">
                {isUploading && (
                  <div className="flex-1 w-full">
                    <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all"
                        style={{
                          width: `${uploadProgress}%`,
                          background:
                            "linear-gradient(90deg, var(--border-secondary) 70%, #65ae3f 100%)",
                        }}
                      />
                    </div>
                    <p className="text-xs mt-1 text-right font-semibold text-[color:var(--border-secondary)]">
                      {uploadProgress}%
                    </p>
                  </div>
                )}
                <button
                  onClick={handleUpload}
                  disabled={!file || isUploading}
                  className="px-6 py-2.5 rounded-xl font-semibold shadow-md transition disabled:opacity-40 cursor-pointer bg-[color:var(--border-secondary)] text-white"
                >
                  {isUploading ? "Uploading..." : "Upload to Vimeo"}
                </button>
              </div>

              {error && (
                <p className="text-sm font-semibold text-[#f44336]">{error}</p>
              )}
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              <div className="rounded-2xl border-2 overflow-hidden aspect-video bg-gray-200 relative border-[color:var(--border-secondary)]">
                {playerUrl ? (
                  <iframe
                    title="vimeo-player"
                    src={playerUrl}
                    frameBorder="0"
                    allow="autoplay; fullscreen; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-sm text-[color:var(--text-secondary)]">
                    Loading video...
                  </div>
                )}
              </div>
              {optimizationStatus === "in_progress" && (
                <div className="text-sm border rounded-lg px-4 py-2 font-medium bg-[color-mix(in_srgb,var(--border-secondary)_10%,white)] border-[#f7df7c] text-[#b68400]">
                  Tip: Video is still optimizing on Vimeo. Playback will be
                  available soon.
                </div>
              )}
              {error && (
                <p className="text-sm font-semibold text-[#f44336]">{error}</p>
              )}
              {!confirmingDelete ? (
                <button
                  onClick={() => setConfirmingDelete(true)}
                  className="inline-flex items-center gap-2 rounded-lg px-5 py-2 border bg-red-50 hover:bg-red-100 transition font-semibold shadow-sm mt-2 cursor-pointer border-[#fae1e2] text-[#b91c1c]"
                  type="button"
                >
                  <svg
                    width="20"
                    height="20"
                    fill="none"
                    stroke="#b91c1c"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6v12zm2-12V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                  </svg>
                  Delete Video
                </button>
              ) : (
                <div className="flex items-center gap-3 mt-2">
                  <p className="text-red-700 font-semibold">
                    Are you sure you want to delete this video?{" "}
                  </p>

                  <button
                    onClick={handleDelete}
                    type="button"
                    className="px-4 py-2 rounded-xl font-semibold shadow-md transition cursor-pointer bg-[color:var(--border-secondary)] text-white"
                  >
                    Yes, Delete
                  </button>
                  <button
                    onClick={() => setConfirmingDelete(false)}
                    type="button"
                    className="px-4 py-2 rounded-xl font-semibold shadow-md transition cursor-pointer bg-white border border-[#b3b8b8] text-[color:var(--text-secondary)]"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}
