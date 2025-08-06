"use client";
import React, { useState } from "react";
import ViewMaterial from "./ViewMaterial";
import { LuCircleCheckBig } from "react-icons/lu";
import ViewVideo from "./ViewVideo";

export default function ConclusionVideoDetail({ videoIndex, video }) {
  const [isConclusionMaterialOpen, setIsConclusionMaterialOpen] =
    useState(false);
  const [isConclusionVideoOpen, setIsConclusionVideoOpen] = useState(false);

  return (
    <>
      <div className="flex gap-4">
        <div className="w-4/5">
          <div className="space-y-6">
            <div className="w-full h-10 px-3.5 py-2 text-sm text-[var(--text-secondary)] border border-[var(--border-primary)] rounded-xl outline-none placeholder:text-[var(--text-placeholder)] placeholder:italic focus:border-[var(--border-secondary)]">
              {video?.title}
            </div>

            <div className="flex justify-between gap-x-10">
              <button
                className="w-full h-10 p-3 border border-[var(--border-secondary)] rounded-xl outline-none flex justify-center items-center gap-x-2 cursor-pointer"
                type="button"
                onClick={() => setIsConclusionVideoOpen(true)}
              >
                <span className="text-sm text-[var(--border-secondary)] font-semibold">
                  Conclusion Video
                </span>
                {video?.videoId && (
                  <LuCircleCheckBig className="text-xl text-[var(--border-secondary)]" />
                )}
              </button>

              <button
                className="w-full h-10 p-3 border border-[var(--border-secondary)] rounded-xl outline-none flex justify-center items-center gap-x-2 cursor-pointer"
                type="button"
                onClick={() => setIsConclusionMaterialOpen(true)}
              >
                <span className="text-sm text-[var(--border-secondary)] font-semibold">
                  Module materials
                </span>
                {video?.moduleMaterial && (
                  <LuCircleCheckBig className="text-xl text-[var(--border-secondary)]" />
                )}
              </button>
            </div>
          </div>
        </div>

        <div className="w-1/5">
          <div>
            <div
              htmlFor={`conclusionVideoThumbnail-${videoIndex}`}
              className="text-base text-[var(--text-secondary)] font-semibold"
            >
              {video?.videoThumbnail ? (
                <div className="w-full h-32 rounded-2xl border border-[var(--border-primary)] overflow-hidden flex justify-center items-center">
                  <img
                    id={`conclusionVideoThumbnail-${videoIndex}`}
                    src={video?.videoThumbnail}
                    alt="Thumbnail"
                    className="w-full"
                  />
                </div>
              ) : (
                <div className="h-32 rounded-2xl bg-[var(--border-primary)] flex justify-center items-center">
                  <span className="text-[var(--text-secondary)] text-base font-normal">
                    Thumbnail unavailable
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {isConclusionMaterialOpen && (
        <ViewMaterial
          fileType="pdf"
          fileLink={video.moduleMaterial}
          onClose={() => setIsConclusionMaterialOpen(false)}
        />
      )}

      {isConclusionVideoOpen && (
        <ViewVideo
          videoTitle={video.title}
          videoId={video.videoId}
          onClose={() => setIsConclusionVideoOpen(false)}
        />
      )}
    </>
  );
}
