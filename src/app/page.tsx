"use client";
import { useState, useEffect } from 'react';
import axios from 'axios';
import Head from 'next/head';

import Upload from './components/upload';
import DownloadButton from './components/save';

export default function Home() {
  const [files, setFiles] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchFiles();
  }, []);

  const fetchFiles = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/files/', {
        baseURL: process.env.NEXT_PUBLIC_BASE_URL
      });
      setFiles(response.data.files); // Update this line to access the files property
      setError(null);
    } catch (err) {
      setError('Failed to fetch files');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Head>
        <title>Dropbox Clone</title>
        <meta name="description" content="A simple Dropbox clone" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Your Files</h1>
        <Upload/>
        
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">All Files</h2>
          </div>
          
          {loading ? (
            <div className="p-6 text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
              <p className="mt-2 text-gray-600">Loading files...</p>
            </div>
          ) : files.length === 0 ? (
            <div className="p-6 text-center text-gray-500">
              No files uploaded yet
            </div>
          ) : (
            <ul className="divide-y divide-gray-200">
              {files.map((filename, i) => (
                <li 
                  key={i} 
                  className="px-6 py-4 hover:bg-gray-50 cursor-pointer transition-colors"
                >
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 bg-gray-200 rounded-md flex items-center justify-center">
                      <svg className="h-6 w-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                      </svg>
                    </div>
                    <div className="ml-4 flex-1">
                      <div className="text-sm font-medium text-gray-800 truncate">{filename}</div>
                      <div className="flex text-xs text-gray-500">
                      </div>
                    </div>
                    <div>
                    <DownloadButton fileName={filename}/>
                    </div>
                  </div>
                </li>
                ))}
              </ul>
            )}
          </div>
        </main>
      </div>
  );
}
