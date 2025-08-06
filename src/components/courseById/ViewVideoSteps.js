// "use client";

// import React, { useState } from "react";
// import { createPortal } from "react-dom";

// import { LuX } from "react-icons/lu";

// export default function ViewVideoSteps({ videoSteps, onClose }) {
//   return createPortal(
//     <div className="fixed inset-0 z-50 bg-black/40 flex justify-center items-center px-2 py-6">
//       <div className="relative w-full max-w-4xl max-h-[90vh] bg-[var(--background-primary)] rounded-2xl overflow-hidden flex flex-col">
//         {/* Close Button */}
//         <button
//           type="button"
//           onClick={onClose}
//           className="absolute top-3 right-3 size-9 rounded-lg bg-[#DF5050] text-white flex justify-center items-center z-10 cursor-pointer"
//         >
//           <LuX className="text-xl" />
//         </button>

//         {/* Header */}
//         <div className="pt-6 px-6 pb-3">
//           <h2 className="text-center text-xl md:text-2xl font-semibold text-[var(--text-secondary)]">
//             Video Steps
//           </h2>
//         </div>

//         {/* Scrollable Content */}
//         <div className="overflow-y-auto mx-14 pb-24 flex-1">
//           <label className="block text-base text-[var(--text-secondary)] font-semibold mb-2">
//             Video Steps
//           </label>
//           <div className="w-full min-h-32 p-3.5 rounded-2xl border border-[var(--border-primary)] focus-within:border-[var(--border-secondary)]">
//             {videoSteps.length > 0 ? (
//               <ul className="list-disc pl-5 space-y-2 text-[var(--text-secondary)]">
//                 {videoSteps.map((step, index) => (
//                   <li key={index} className="relative pr-6">
//                     <span>{step}</span>
//                   </li>
//                 ))}
//               </ul>
//             ) : (
//               <p className="text-[var(--text-secondary)]">
//                 No video steps added
//               </p>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>,
//     document.body
//   );
// }

// "use client";

// import React from "react";
// import { createPortal } from "react-dom";
// import { LuX } from "react-icons/lu";

// export default function ViewVideoSteps({ videoSteps, onClose }) {
//   return createPortal(
//     <div className="fixed inset-0 z-50 flex justify-center items-start sm:items-center overflow-auto px-4 py-8 transition-all duration-150 bg-black/40 animate-fadeIn">
//       <div className="relative w-full max-w-3xl rounded-3xl shadow-2xl border bg-white p-0 overflow-hidden animate-popIn flex flex-col border-[var(--border-secondary)]">
//         {/* Header */}
//         <div className="flex items-center justify-between px-8 py-6 border-b bg-white border-b-[var(--border-secondary)]">
//           <h2 className="text-xl font-bold text-[var(--text-primary)] truncate">
//             Video Steps
//           </h2>
//           <button
//             type="button"
//             aria-label="Close video steps"
//             onClick={onClose}
//             className="ml-8 px-4 py-2 rounded-full font-semibold shadow-lg transition disabled:opacity-60 cursor-pointer bg-[var(--border-secondary)] text-white"
//           >
//             {/* <LuX className="text-xl" /> */}
//             Close
//           </button>
//         </div>

//         {/* Scrollable Content */}
//         <div className="overflow-y-auto px-8 pb-16 pt-8 flex-1">
//           <label className="block text-base font-semibold mb-2 text-[var(--text-secondary)]">
//             Video Steps
//           </label>
//           <div className="w-full min-h-32 p-3.5 rounded-2xl border border-[var(--border-primary)] focus-within:border-[var(--border-secondary)]">
//             {videoSteps.length > 0 ? (
//               <ul className="list-disc pl-5 space-y-2 text-[var(--text-secondary)]">
//                 {videoSteps.map((step, index) => (
//                   <li key={index} className="relative pr-6">
//                     <span>{step}</span>
//                   </li>
//                 ))}
//               </ul>
//             ) : (
//               <p className="text-[var(--text-secondary)]">
//                 No video steps added
//               </p>
//             )}
//           </div>
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

export default function ViewVideoSteps({ videoSteps, onClose }) {
  return createPortal(
    <div className="fixed inset-0 z-50 flex justify-center items-start sm:items-center overflow-auto px-4 py-6 bg-black/40 animate-fadeIn">
      <div className="relative w-full max-w-3xl sm:max-w-4xl md:max-w-5xl rounded-3xl shadow-2xl border bg-white p-0 overflow-hidden animate-popIn flex flex-col border-[var(--border-secondary)] max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 sm:px-8 py-5 border-b bg-white border-b-[var(--border-secondary)]">
          <h2 className="text-lg sm:text-xl font-bold text-[var(--text-primary)] truncate">
            Video Steps
          </h2>
          <button
            type="button"
            aria-label="Close video steps"
            onClick={onClose}
            className="ml-4 px-3 py-2 rounded-full font-semibold shadow-lg transition disabled:opacity-60 cursor-pointer bg-[var(--border-secondary)] text-white"
          >
            Close
          </button>
        </div>

        {/* Content */}
        <div className="flex flex-col px-6 sm:px-8 pt-6 pb-12 flex-1 min-h-0">
          <label className="block text-base font-semibold mb-2 text-[var(--text-secondary)]">
            Video Steps
          </label>

          {/* Scrollable List Container */}
          <div className="flex-1 min-h-0 overflow-y-auto rounded-2xl border border-[var(--border-primary)] focus-within:border-[var(--border-secondary)] p-4">
            {videoSteps.length > 0 ? (
              <ul className="list-disc pl-5 space-y-3 text-[var(--text-secondary)]">
                {videoSteps.map((step, index) => (
                  <li
                    key={index}
                    className="relative pr-6 break-words text-sm sm:text-base"
                  >
                    {step}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-[var(--text-secondary)] italic text-sm sm:text-base">
                No video steps added
              </p>
            )}
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
