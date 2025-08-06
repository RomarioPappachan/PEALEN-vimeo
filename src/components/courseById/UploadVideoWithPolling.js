// "use client";
// import { useState } from "react";
// import { createPortal } from "react-dom";
// import axios from "axios";
// import * as tus from "tus-js-client";
// import { LuX } from "react-icons/lu";

// export default function UploadVideoWithPolling({ videoTitle = "", onClose }) {
//   const [file, setFile] = useState(null);
//   const [uploadProgress, setUploadProgress] = useState(0);
//   const [videoUrl, setVideoUrl] = useState(null);

//   const handleUpload = async () => {
//     if (!file) return alert("Please select a file");

//     // Step 1: Get TUS upload link from your backend
//     const { data } = await axios.get(
//       `${process.env.NEXT_PUBLIC_API_URL}/videos/generateUploadUrls?size=${file.size}&title=${videoTitle}`
//     );

//     const uploadLink = data.uploadLink;
//     const videoUri = data.videoUri;

//     // Step 2: Upload to Vimeo using tus-js-client
//     const upload = new tus.Upload(file, {
//       endpoint: uploadLink,
//       retryDelays: [0, 1000, 3000, 5000],
//       metadata: {
//         filename: file.name,
//         filetype: file.type,
//       },
//       uploadUrl: uploadLink,
//       onError: (error) => {
//         console.error("Upload failed:", error);
//         alert("Upload failed");
//       },
//       onProgress: (bytesUploaded, bytesTotal) => {
//         const percent = ((bytesUploaded / bytesTotal) * 100).toFixed(2);
//         setUploadProgress(percent);
//       },
//       onSuccess: () => {
//         console.log("Upload complete. Video URI:", videoUri);
//         setVideoUrl(`https://vimeo.com${videoUri}`);
//       },
//     });

//     upload.start();
//   };

//   return createPortal(
//     <div className="fixed inset-0 z-50 bg-black/40 flex justify-center items-center px-2 py-6">
//       <div className="relative w-full max-w-4xl max-h-[90vh] bg-[var(--background-primary)] rounded-2xl overflow-hidden flex flex-col">
//         {/* Close Button */}
//         <button
//           type="button"
//           onClick={() => onClose(false)}
//           className="absolute top-3 right-3 size-9 rounded-lg bg-[#DF5050] text-white flex justify-center items-center z-10 cursor-pointer"
//         >
//           <LuX className="text-xl" />
//         </button>

//         <div className="space-y-4">
//           <input
//             type="file"
//             accept="video/*"
//             onChange={(e) => setFile(e.target.files[0])}
//           />
//           <button
//             onClick={handleUpload}
//             className="bg-blue-600 text-white px-4 py-2 rounded"
//           >
//             Upload to Vimeo
//           </button>
//           {uploadProgress > 0 && <p>Uploading: {uploadProgress}%</p>}
//           {videoUrl && (
//             <div>
//               <p>Video Uploaded!</p>
//               <a href={videoUrl} target="_blank" rel="noopener noreferrer">
//                 Watch on Vimeo
//               </a>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>,
//     document.body
//   );
// }

"use client";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import axios from "axios";
import * as tus from "tus-js-client";
import { LuX } from "react-icons/lu";

export default function UploadVideoWithPolling({
  videoTitle = "",
  onSetVideoId,
  onClose,
}) {
  const [file, setFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [videoUrl, setVideoUrl] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [videoUri, setVideoUri] = useState(null);
  const [isOptimized, setIsOptimized] = useState(false);
  const [error, setError] = useState(null);

  const handleUpload = async () => {
    if (!file) return alert("Please select a file");

    setIsUploading(true);
    setError(null);

    try {
      // Step 1: Get TUS upload link from backend
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/videos/generateUploadUrls?size=${file.size}&title=${videoTitle}`
      );

      const uploadLink = data.uploadLink;
      const uri = data.videoUri;
      setVideoUri(uri);

      // Step 2: Upload to Vimeo using tus-js-client
      const upload = new tus.Upload(file, {
        endpoint: uploadLink,
        retryDelays: [0, 1000, 3000, 5000],
        metadata: {
          filename: file.name,
          filetype: file.type,
        },
        uploadUrl: uploadLink,
        onError: (error) => {
          console.error("Upload failed:", error);
          setError("Upload failed");
          setIsUploading(false);
        },
        onProgress: (bytesUploaded, bytesTotal) => {
          const percent = ((bytesUploaded / bytesTotal) * 100).toFixed(2);
          setUploadProgress(percent);
        },
        onSuccess: () => {
          console.log("Upload complete. Video URI:", uri);
          pollForOptimization(uri);
        },
      });

      upload.start();
    } catch (err) {
      console.error("Error initializing upload:", err);
      setError("Failed to initialize upload.");
      setIsUploading(false);
    }
  };

  const pollForOptimization = async (uri) => {
    const videoId = uri.split("/").pop();
    try {
      const intervalId = setInterval(async () => {
        try {
          const res = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}/videos/getVideoStatus/${videoId}`
          );

          const status = res.data.status;

          if (status === "complete") {
            clearInterval(intervalId);
            setIsUploading(false);
            setIsOptimized(true);
            setVideoUrl(`https://player.vimeo.com${uri}`);
            onSetVideoId(videoId); //set in store
            console.log("Optimization complete for", uri);
          } else {
            console.log("Still optimizing...");
          }
        } catch (err) {
          console.error("Polling error:", err.message);
          // Continue polling; don't break UI
        }
      }, 30000); // poll every 30 seconds
    } catch (err) {
      console.error("Failed to poll optimization:", err);
      setError("Failed to poll optimization.");
      setIsUploading(false);
    }
  };

  return createPortal(
    <div className="fixed inset-0 z-50 bg-black/40 flex justify-center items-center px-2 py-6">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-2xl overflow-hidden flex flex-col p-6 space-y-4">
        {/* Close Button */}
        <button
          type="button"
          onClick={() => onClose(false)}
          className="absolute top-3 right-3 size-9 rounded-lg bg-[#DF5050] text-white flex justify-center items-center z-10 cursor-pointer"
          disabled={isUploading}
        >
          <LuX className="text-xl" />
        </button>

        <input
          type="file"
          accept="video/*"
          onChange={(e) => setFile(e.target.files[0])}
          disabled={isUploading}
        />

        <button
          onClick={handleUpload}
          className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
          disabled={isUploading}
        >
          {isUploading ? "Uploading..." : "Upload to Vimeo"}
        </button>

        {uploadProgress > 0 && !isOptimized && (
          <p>Upload Progress: {uploadProgress}%</p>
        )}

        {isUploading && !isOptimized && <p>Waiting for optimization...</p>}

        {error && <p className="text-red-500">{error}</p>}

        {videoUrl && isOptimized && (
          <div className="mt-4">
            <p>Video Uploaded and Optimized!</p>
            <iframe
              src={videoUrl}
              width="640"
              height="360"
              frameBorder="0"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              title="Uploaded Vimeo Video"
            ></iframe>
          </div>
        )}
      </div>
    </div>,
    document.body
  );
}
