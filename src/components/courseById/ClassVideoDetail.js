import React from "react";

export default function ClassVideoDetail({ videoIndex, video }) {
  return (
    <div className="flex">
      <div className="w-3/4 pe-5 border-r-2 border-[#DCDCDC]">
        <div className="w-full px-3 py-2 bg-[var(--background-tertiary)] rounded-2xl">
          <div className="space-y-1">
            <h3 className="text-[var(--text-secondary)] text-sm font-semibold">
              Video Title
            </h3>
            <div className="w-full h-10 px-3.5 py-2 text-sm bg-[var(--background-primary)] text-[var(--text-secondary)] border border-[var(--border-primary)] rounded-xl outline-none placeholder:text-[var(--text-placeholder)] placeholder:italic focus:border-[var(--border-secondary)]">
              {video?.title}
            </div>
          </div>

          <div className="space-y-1 mt-3.5">
            <h3 className="text-[var(--text-secondary)] text-sm font-semibold">
              Video subject (First window of the Tutor)
            </h3>
            <div className="w-full h-10 px-3.5 py-2 text-sm bg-[var(--background-primary)] text-[var(--text-secondary)] border border-[var(--border-primary)] rounded-xl outline-none placeholder:text-[var(--text-placeholder)] placeholder:italic focus:border-[var(--border-secondary)]">
              {video?.subject}
            </div>
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
                // onClick={() => setIsAddTranscriptOpen(true)}
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
                // onClick={() => setIsAddStepsOpen(true)}
              >
                <span className="text-sm text-[var(--border-secondary)] font-semibold text-center leading-[18px]">
                  Add Steps
                </span>
              </button>
              <button
                type="button"
                className="w-full h-10 p-3 border border-[var(--border-secondary)] rounded-xl outline-none flex justify-center items-center cursor-pointer"
                // onClick={() => setIsAddClassMaterialOpen(true)}
              >
                <span className="text-sm text-[var(--border-secondary)] font-semibold text-center leading-[18px]">
                  Module Material
                </span>
              </button>
            </div>
            <div>
              <div className="w-44 h-28 rounded-2xl bg-[var(--border-primary)] flex justify-center items-center">
                <div className="text-sm text-[var(--text-secondary)] font-semibold cursor-pointer">
                  {video?.videoThumbnail ? (
                    <div className="w-full h-28 rounded-2xl border border-[var(--border-primary)] overflow-hidden flex justify-center items-center">
                      <img
                        src={video?.videoThumbnail}
                        alt={"Thumbnail"}
                        className="w-full"
                      />
                    </div>
                  ) : (
                    <div className="h-28 rounded-2xl bg-[var(--border-primary)] flex justify-center items-center">
                      <span className="text-sm text-[var(--text-secondary)] font-normal">
                        Thumbnail unavailable
                      </span>
                    </div>
                  )}
                </div>
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
                video.videoUrl
                  ? "border-[#05A8E3] bg-[#B6E9FB] border-dotted"
                  : "border-[#B3B8B8] bg-[#F1F1F1]"
              }`}
              //   onClick={() => setIsAddClassVideoOpen(true)}
            >
              <span className="text-xs text-center">
                {video.videoUrl ? "Video ✅" : ""}
              </span>
            </div>

            {/* Demo video  */}
            <div
              className={`size-[88px] rounded-2xl border-2 cursor-pointer flex justify-center items-center ${
                video.demoVideourl
                  ? "border-[#05A8E3] bg-[#B6E9FB] border-dotted"
                  : "border-[#B3B8B8] bg-[#F1F1F1]"
              }`}
              //   onClick={() => setIsAddDemoVideoOpen(true)}
            >
              <span className="text-xs text-center">
                {video.demoVideourl ? "Demo Video ✅" : ""}
              </span>
            </div>

            {/* Transcript  */}
            <div
              className={`size-[88px] rounded-2xl border-2 cursor-pointer flex justify-center items-center ${
                video?.videoTranscript
                  ? "border-[#05A8E3] bg-[#B6E9FB] border-dotted"
                  : "border-[#B3B8B8] bg-[#F1F1F1]"
              }`}
              onClick={() => setIsAddTranscriptOpen(true)}
            >
              <span className="text-xs text-center">
                {video?.videoTranscript ? "Transcript ✅" : ""}
              </span>
            </div>

            {/* Animation video  */}
            <div
              className={`size-[88px] rounded-2xl border-2 cursor-pointer flex justify-center items-center ${
                video.animationUrl
                  ? "border-[#05A8E3] bg-[#B6E9FB] border-dotted"
                  : "border-[#B3B8B8] bg-[#F1F1F1]"
              }`}
              //   onClick={() => setIsAddAnimationOpen(true)}
            >
              <span className="text-xs text-center">
                {video.animationUrl ? "Animation video ✅" : ""}
              </span>
            </div>

            {/* Audio  */}
            <div
              className={`size-[88px] rounded-2xl border-2 cursor-pointer flex justify-center items-center ${
                video.videoUrl
                  ? "border-[#05A8E3] bg-[#B6E9FB] border-dotted"
                  : "border-[#B3B8B8] bg-[#F1F1F1]"
              }`}
              // onClick={() => setIsAddTranscriptOpen(true)}
            >
              <span className="text-xs text-center">
                {video.videoUrl ? "Audio URL ✅" : ""}
              </span>
            </div>

            {/* Video steps  */}
            <div
              className={`size-[88px] rounded-2xl border-2 cursor-pointer flex justify-center items-center ${
                video.videoSteps.length > 0
                  ? "border-[#05A8E3] bg-[#B6E9FB] border-dotted"
                  : "border-[#B3B8B8] bg-[#F1F1F1]"
              }`}
              onClick={() => setIsAddStepsOpen(true)}
            >
              <span className="text-xs text-center">
                {video.videoSteps.length > 0 ? "Video Steps ✅" : ""}
              </span>
            </div>
          </div>
          <p className="text-center text-[var(--text-secondary)] text-[10px] leading-3.5">
            Please look at the selected area to see which slot you are uploading
            video/file.
          </p>
        </div>
      </div>
    </div>
  );
}
