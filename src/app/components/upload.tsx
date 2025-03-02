"use client";
import { useRef, useState } from "react";
import { onSubmit } from "../action/onSubmit";

export default function Upload() {
    const fileInput = useRef<HTMLInputElement>(null);
    const [uploading, setUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const handleFileUpload = async () => {
        if (fileInput.current && fileInput.current.files) {
            setUploading(true);
            const formData = new FormData();
            formData.append("file", fileInput.current.files[0]);

            try {
                await onSubmit(formData);
                setSuccessMessage("File uploaded successfully!");
                setUploadProgress(100);
            } catch {
                setError("Failed to upload file.");
            } finally {
                setUploading(false);
            }
        }
    };

    const handleFileClick = () => {
        if (fileInput.current) {
            fileInput.current.click();
        }
    };

    return (
        <div className="mb-8 p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Upload New File</h2>
            <div className="flex items-center">
                <button 
                    onClick={handleFileClick}
                    disabled={uploading}
                    className="flex flex-col items-center px-4 py-6 bg-blue-50 text-blue-900 rounded-lg cursor-pointer hover:bg-blue-100 border-2 border-blue-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <svg className="w-8 h-8 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                    </svg>
                    <span className="text-sm">{uploading ? 'Uploading...' : 'Select File'}</span>
                </button>
                <input 
                    ref={fileInput}
                    type="file" 
                    className="hidden" 
                    onChange={handleFileUpload} 
                    disabled={uploading}
                />
                <div className="ml-4 text-sm text-gray-500">
                    Allowed file types: .txt, .jpg, .jpeg, .png, .json, .pdf
                </div>
            </div>
            {uploading && (
                <div className="mt-4 w-full bg-gray-200 rounded-full">
                    <div className="bg-blue-500 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full" style={{ width: `${uploadProgress}%` }}>
                        {uploadProgress}%
                    </div>
                </div>
            )}
            {error && <p className="mt-4 text-red-500">{error}</p>}
            {successMessage && <p className="mt-4 text-green-500">{successMessage}</p>}
        </div>
    );
}