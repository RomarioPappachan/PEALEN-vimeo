"use client";
import React, { useState } from "react";
import { createPortal } from "react-dom";
import axios from "axios";
import { useCreateClassVideosStore } from "@/store/createClassVideosStore";
import ClassVideoUploader from "./ClassVideoUploader";
import ClassVideoPlayer from "./ClassVideoPlayer";

import { LuX } from "react-icons/lu";

export default function DemoVideo({ videoIndex, setIsAddDemoVideoOpen }) {
  const { classVideos, addMainClassVideoIds, removeMuxVideo } =
    useCreateClassVideosStore();

  const [isUploading, setIsUploading] = useState(false);
  const [isUploadComplete, setIsUploadComplete] = useState(false);

  const handleUploadStart = () => {
    setIsUploading(true);
    setIsUploadComplete(false);
  };

  const handleUploadComplete = () => {
    setIsUploading(false);
    setIsUploadComplete(true);
  };

  const pollForPlaybackId = (uploadId) => {
    const POLL_INTERVAL = 5000; // 5 seconds
    const MAX_ATTEMPTS = 10;
    let attempts = 0;

    const poll = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/videos/getvideos?uploadId=${uploadId}`
        );
        console.log("Polling response:", response.data);

        const muxUploadId = response.data.data.at(0)?.muxUploadId;
        const playbackId = response.data.data.at(0)?.playbackId;
        const muxAssetId = response.data.data.at(0)?.muxAssetId;

        if (playbackId) {
          console.log("Playback ID available:", playbackId);
          addMainClassVideoIds(
            videoIndex,
            muxUploadId,
            playbackId,
            muxAssetId,
            "demo"
          );
          handleUploadComplete(); // done!
        } else {
          attempts++;
          if (attempts >= MAX_ATTEMPTS) {
            console.warn("Playback ID not available after max attempts.");
            handleUploadComplete(); // fallback
          } else {
            setTimeout(poll, POLL_INTERVAL);
          }
        }
      } catch (error) {
        console.error("Error polling for playback ID:", error);
        handleUploadComplete(); // fallback
      }
    };

    poll(); // start polling
  };

  const handleDeleteMuxVideo = async (muxAssetId) => {
    try {
      const res = await removeMuxVideo(videoIndex, muxAssetId, "demo");
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return createPortal(
    <div className="fixed inset-0 z-50 bg-black/40 dark:bg-white/40 flex justify-center items-center px-2 py-6">
      <div className="relative w-full max-w-3xl min-h-[400px] max-h-[90vh] bg-[var(--background-primary)] rounded-2xl overflow-hidden flex flex-col">
        {/* Close Button */}
        <button
          type="button"
          onClick={() => setIsAddDemoVideoOpen(false)}
          // className="absolute top-3 right-3 size-9 rounded-lg bg-[#DF5050] text-white flex justify-center items-center z-10 cursor-pointer"
          className={`absolute top-3 right-3 size-9 rounded-lg ${
            isUploading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-[#DF5050] cursor-pointer"
          } text-white flex justify-center items-center z-10`}
          disabled={isUploading}
        >
          <LuX className="text-xl" />
        </button>

        <div className="pt-6 px-6 pb-3">
          <h2 className="text-center text-sm md:text-base font-semibold text-[var(--text-secondary)]">
            Add Demo Video
          </h2>
        </div>

        {classVideos[videoIndex]?.demoVideourl ? (
          <ClassVideoPlayer
            key={classVideos[videoIndex]?.demoVideourl}
            playbackId={classVideos[videoIndex]?.demoVideourl}
            muxAssetId={classVideos[videoIndex]?.muxDemoAssetId}
            onDeleteMuxVideo={handleDeleteMuxVideo}
          />
        ) : (
          <ClassVideoUploader
            onUploadStart={handleUploadStart}
            onUploadComplete={handleUploadComplete}
            onPollForPlaybackId={pollForPlaybackId}
          />
        )}
      </div>
    </div>,
    document.body
  );
}
