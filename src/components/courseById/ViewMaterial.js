// "use client";

// import React from "react";
// import { createPortal } from "react-dom";

// import { LuX } from "react-icons/lu";

// export default function ViewMaterial({ fileType = "pdf", fileLink, onClose }) {
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
//             {fileType === "srt" ? "Video Transcript" : "Module Material"}
//           </h2>
//         </div>

//         {/* File Upload */}
//         <div className="flex flex-col items-center justify-center px-6 py-10 w-full">
//           {fileLink ? (
//             <div className="mt-5 flex flex-col items-center space-y-3">
//               <p className="text-center text-sm md:text-base text-[var(--text-secondary)] break-words max-w-xs md:max-w-md lg:max-w-lg">
//                 <span className="font-semibold">
//                   Selected
//                   {fileType === "srt"
//                     ? " Video Transcript"
//                     : " Module Material"}{" "}
//                 </span>
//                 : <br />
//                 <span className="font-medium">{fileLink}</span>
//               </p>
//             </div>
//           ) : (
//             <p className="text-center text-sm md:text-base text-[var(--text-secondary)]">
//               No file available
//             </p>
//           )}
//         </div>
//       </div>
//     </div>,
//     document.body
//   );
// }

"use client";

import React from "react";
import { createPortal } from "react-dom";
import { LuX } from "react-icons/lu";

export default function ViewMaterial({ fileType = "pdf", fileLink, onClose }) {
  return createPortal(
    <div className="fixed inset-0 z-50 flex justify-center items-start sm:items-center overflow-auto px-4 py-8 transition-all duration-150 bg-black/40 animate-fadeIn">
      <div
        className="relative w-full max-w-3xl rounded-3xl shadow-2xl border bg-white p-0 overflow-hidden animate-popIn flex flex-col"
        style={{ borderColor: "var(--border-secondary)" }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-8 py-6 border-b bg-white"
          style={{ borderBottomColor: "var(--border-secondary)" }}
        >
          <h2 className="text-xl font-bold text-[var(--text-primary)]">
            {fileType === "srt" ? "Video Transcript" : "Module Material"}
          </h2>
          <button
            type="button"
            onClick={() => onClose(false)}
            className="ml-8 px-4 py-2 rounded-full font-semibold shadow-lg transition disabled:opacity-60 cursor-pointer bg-[var(--border-secondary)] text-white"
            aria-label="Close material viewer"
          >
            {/* <LuX className="text-xl" /> */}
            Close
          </button>
        </div>

        {/* Content */}
        <div className="flex flex-col items-center justify-center px-8 py-10 w-full">
          {fileLink ? (
            <div className="mt-5 flex flex-col items-center gap-3">
              <p className="text-center text-sm md:text-base text-[var(--text-secondary)] break-words max-w-xs md:max-w-md lg:max-w-lg">
                <span className="font-semibold">
                  Selected
                  {fileType === "srt"
                    ? " Video Transcript"
                    : " Module Material"}{" "}
                </span>
                : <br />
                <span className="font-medium">{fileLink}</span>
              </p>
            </div>
          ) : (
            <p className="text-center text-sm md:text-base text-[var(--text-secondary)]">
              No file available
            </p>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}
