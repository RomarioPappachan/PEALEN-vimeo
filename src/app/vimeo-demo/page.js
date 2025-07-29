"use client";
import { useState } from "react";
import axios from "axios";
import * as tus from "tus-js-client";

export default function UploadToVimeo() {
  const [file, setFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [videoUrl, setVideoUrl] = useState(null);

  const handleUpload = async () => {
    if (!file) return alert("Please select a file");

    // Step 1: Get TUS upload link from your backend
    const { data } = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/createVimeoUploadUrl`,
      {
        title: "Course Video",
        description: "Lesson 1",
        size: file.size,
      }
    );

    const uploadLink = data.uploadLink;
    const videoUri = data.videoUri;

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
        alert("Upload failed");
      },
      onProgress: (bytesUploaded, bytesTotal) => {
        const percent = ((bytesUploaded / bytesTotal) * 100).toFixed(2);
        setUploadProgress(percent);
      },
      onSuccess: () => {
        console.log("Upload complete. Video URI:", videoUri);
        setVideoUrl(`https://vimeo.com${videoUri}`);
      },
    });

    upload.start();
  };

  return (
    <div className="space-y-4">
      <input
        type="file"
        accept="video/*"
        onChange={(e) => setFile(e.target.files[0])}
      />
      <button
        onClick={handleUpload}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Upload to Vimeo
      </button>
      {uploadProgress > 0 && <p>Uploading: {uploadProgress}%</p>}
      {videoUrl && (
        <div>
          <p>Video Uploaded!</p>
          <a href={videoUrl} target="_blank" rel="noopener noreferrer">
            Watch on Vimeo
          </a>
        </div>
      )}
    </div>
  );
}
