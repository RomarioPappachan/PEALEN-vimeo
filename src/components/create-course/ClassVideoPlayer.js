// import React from "react";
// import MuxPlayer from "@mux/mux-player-react";

// export default function ClassVideoPlayer({
//   playbackId,
//   muxAssetId,
//   onDeleteMuxVideo,
// }) {
//   return (
//     <div className="p-4 flex justify-center items-center">
//       <MuxPlayer
//         playbackId={playbackId}
//         accentColor="#72c347"
//         style={{
//           width: "400px",
//           maxHeight: "250px",
//           margin: "auto",
//           aspectRatio: "16 / 9",
//         }}
//       />
//       <button
//         onClick={() => onDeleteMuxVideo(muxAssetId)}
//         className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
//       >
//         Remove
//       </button>
//     </div>
//   );
// }

"use client";
import React, { useState } from "react";
import MuxPlayer from "@mux/mux-player-react";
import { LuX, LuTriangleAlert } from "react-icons/lu";

export default function ClassVideoPlayer({
  playbackId,
  muxAssetId,
  onDeleteMuxVideo,
}) {
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);

  const handleDelete = () => {
    onDeleteMuxVideo(muxAssetId);
    setIsConfirmVisible(false);
  };

  return (
    <div className="p-4 flex flex-col items-center w-full">
      {/* Video Player */}
      <MuxPlayer
        playbackId={playbackId}
        accentColor="#72c347"
        className="w-full sm:w-64 md:w-80 lg:w-[400px] xl:w-[450px] aspect-video rounded-lg shadow-lg"
      />

      {/* Remove Button (right-aligned) */}
      {!isConfirmVisible && (
        <div className="w-full sm:w-64 md:w-80 lg:w-[400px] xl:w-[450px] flex justify-end mt-2">
          <button
            type="button"
            onClick={() => setIsConfirmVisible(true)}
            className="text-sm bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition flex items-center gap-2 cursor-pointer"
          >
            <LuX size={16} /> Remove
          </button>
        </div>
      )}

      {/* Inline Confirmation Below Video */}
      {isConfirmVisible && (
        <div className="mt-4 w-full sm:w-64 md:w-80 lg:w-[400px] xl:w-[450px] bg-white border border-gray-300 rounded-lg shadow p-4">
          <div className="flex items-start gap-3">
            <LuTriangleAlert size={24} className="text-red-500 mt-1" />
            <div className="flex-1">
              <h2 className="text-sm font-semibold mb-2">
                Are you sure you want to delete this video?
              </h2>
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={handleDelete}
                  className="bg-red-500 text-white text-sm px-4 py-2 rounded hover:bg-red-600 transition cursor-pointer"
                >
                  Yes, Delete
                </button>
                <button
                  type="button"
                  onClick={() => setIsConfirmVisible(false)}
                  className="bg-gray-300 text-gray-800 text-sm px-4 py-2 rounded hover:bg-gray-400 transition cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
