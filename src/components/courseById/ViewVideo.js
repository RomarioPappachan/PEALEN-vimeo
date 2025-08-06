// "use client";

// import React from "react";
// import { createPortal } from "react-dom";

// import { LuX } from "react-icons/lu";

// // const vimeo_url = https://player.vimeo.com/video/1106046364

// export default function ViewVideo({ videoTitle, videoId, onClose }) {
//   const videoUrl = `https://player.vimeo.com/video/${encodeURIComponent(
//     videoId
//   )}`;
//   console.log(videoUrl);
//   return createPortal(
//     <div className="fixed inset-0 z-50 bg-black/40 flex justify-center items-center px-2 py-6">
//       <div className="relative w-full max-w-2xl h-auto max-h-[90vh] bg-[var(--background-primary)] rounded-2xl overflow-hidden flex flex-col items-center pb-8">
//         {/* Close Button */}
//         <button
//           type="button"
//           onClick={() => onClose(false)}
//           className="absolute top-3 right-3 size-9 rounded-lg bg-[#DF5050] text-white flex justify-center items-center z-10 cursor-pointer"
//         >
//           <LuX className="text-xl" />
//         </button>

//         {/* Header */}
//         <div className="pt-6 px-6 pb-3 w-full text-center">
//           <h2 className="text-base md:text-lg font-semibold text-[var(--text-secondary)]">
//             {videoTitle}
//           </h2>
//         </div>

//         {/* File Upload */}
//         <div className="flex flex-col items-center justify-center px-6 pt-6 pb-16 w-full">
//           {videoId ? (
//             <div className="mt-5 flex flex-col items-center space-y-3">
//               <iframe
//                 title="vimeo-player"
//                 src={videoUrl}
//                 width="540"
//                 height="320"
//                 frameBorder="0"
//                 allowFullScreen
//                 allow="full-screen"
//               ></iframe>
//             </div>
//           ) : (
//             <p className="text-center text-sm md:text-base text-[var(--text-secondary)]">
//               No video available
//             </p>
//           )}
//         </div>
//       </div>
//     </div>,
//     document.body
//   );
// }

"use client";

import React, { useEffect, useState, useCallback } from "react";
import { createPortal } from "react-dom";
import { LuX } from "react-icons/lu";

export default function ViewVideo({ videoTitle, videoId, onClose }) {
  const [isMounted, setIsMounted] = useState(false);
  const [sanitizedId, setSanitizedId] = useState("");
  const [iframeKey, setIframeKey] = useState(0); // to force reload if ID changes

  // sanitize incoming videoId
  useEffect(() => {
    if (videoId) {
      const clean = String(videoId).trim();
      setSanitizedId(clean);
      // bump key so iframe re-renders fresh when id updates
      setIframeKey((k) => k + 1);
    } else {
      setSanitizedId("");
    }
  }, [videoId]);

  // only render portal on client
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleEsc = useCallback(
    (e) => {
      if (e.key === "Escape") onClose(false);
    },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [handleEsc]);

  if (!isMounted) return null;

  const videoUrl =
    sanitizedId !== ""
      ? `https://player.vimeo.com/video/${encodeURIComponent(sanitizedId)}`
      : "";

  return createPortal(
    <div className="fixed inset-0 z-50 flex justify-center items-start sm:items-center overflow-auto px-4 py-8 transition-all duration-150 bg-black/40 animate-fadeIn">
      <div className="relative w-full max-w-3xl rounded-3xl shadow-2xl border bg-white p-0 overflow-hidden animate-popIn flex flex-col border-[var(--border-secondary)]">
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-6 border-b bg-white border-b-[var(--border-secondary)]">
          <h2 className="text-xl font-bold text-[var(--text-primary)] truncate">
            {videoTitle || "Untitled Video"}
          </h2>
          <button
            onClick={() => onClose(false)}
            className="ml-8 px-4 py-2 rounded-full font-semibold shadow-lg transition disabled:opacity-60 cursor-pointer bg-[var(--border-secondary)] text-white"
            aria-label="Close video"
          >
            {/* <LuX className="text-xl" /> */}
            Close
          </button>
        </div>

        {/* Content */}
        <div className="flex flex-col items-center justify-center px-8 py-8 gap-6 w-full">
          {sanitizedId ? (
            <div className="w-full rounded-2xl border-2 overflow-hidden aspect-video bg-gray-200 relative border-[var(--border-secondary)]">
              <iframe
                key={iframeKey}
                title="vimeo-player"
                src={videoUrl}
                frameBorder="0"
                allowFullScreen
                allow="fullscreen"
                className="w-full h-full rounded-2xl"
              ></iframe>
            </div>
          ) : (
            <p className="text-center text-sm sm:text-base font-semibold text-[var(--text-secondary)]">
              No video available
            </p>
          )}
        </div>
      </div>
    </div>,
    typeof document !== "undefined" ? document.body : null
  );
}
