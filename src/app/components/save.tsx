"use client";
import { useState } from "react";

export default function DownloadButton({ fileName }: { fileName: string }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const handleDownload = async () => {
    setLoading(true);
    setError(null);

    try {
      // Call the API route to generate a presigned URL
      const response = await fetch("api/download", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fileName }),
      });

      const data = await response.json();

      if (data.success) {
        // Redirect the browser to the presigned URL to trigger the download
        window.location.href = data.downloadUrl;
      } else {
        setError(data.error || "Failed to generate download URL");
      }
    } catch {
      setError("An error occurred while downloading the file.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <button
        onClick={handleDownload}
        disabled={loading}
        className={`px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors ${
          loading ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {loading ? "Downloading..." : "Download File"}
      </button>
      {error && <p className="mt-2 text-red-500">{error}</p>}
    </div>
  );
}