"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import MuxUploader from "@mux/mux-uploader-react";

export default function ClassVideoUploader({
  onUploadStart,
  onUploadComplete,
  onPollForPlaybackId,
}) {
  const [endpoint, setEndpoint] = useState("");
  const [uploadId, setUploadId] = useState(null);

  useEffect(() => {
    const fetchUploadUrl = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/videos/generateUploadUrls`
        );

        console.log(response);
        setEndpoint(response.data?.mainUpload?.uploadUrl);
        setUploadId(response.data?.mainUpload?.uploadId);
      } catch (error) {
        console.error("Error fetching upload URL:", error);
      }
    };

    fetchUploadUrl();
  }, []);

  return (
    <div className="p-4 flex justify-center items-center">
      {!endpoint ? (
        <p>Preparing secure upload…</p>
      ) : (
        <MuxUploader
          endpoint={endpoint}
          onUploadStart={() => {
            onUploadStart();
          }}
          onSuccess={(event) => {
            console.log("Upload successful:", event);
            onPollForPlaybackId(uploadId);
          }}
          onUploadError={(e) => {
            console.error("Upload error:", e);
            onUploadComplete(); // let user close even on error
          }}
          style={{
            width: "400px",
            minHeight: "250px",
            border: "1px #b3b8b8",
            borderRadius: 10,
            padding: "",
            fontSize: 16,
            color: "#b3b8b8",
            background: "#eaeaf2",
          }}
        >
          <button
            slot="file-select"
            type="button"
            style={{
              /* your styles for .btn */
              padding: "6px 8px",
              border: "1px solid #2ed573",
              borderRadius: 5,
              fontSize: 16,
              color: "white",
              background: "#72c347",
              cursor: "pointer",
            }}
          >
            Upload Video
          </button>
        </MuxUploader>
      )}
    </div>
  );
}
