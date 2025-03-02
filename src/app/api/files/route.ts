// addind cors to enable cross origin requests from the frontend to the backend
import { NextResponse } from "next/server";
import axios from 'axios';

const NEXT_PUBLIC_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || '';

export async function GET() {
  try {
    // Debugging: Log the API URL
    const apiUrl = `${NEXT_PUBLIC_BASE_URL}/api/files/`;
    console.log('Fetching files from:', apiUrl);

    // Fetch files from the API
    const response = await axios.get(apiUrl, {
      headers: {
        'Content-Type': 'application/json',
      },
    });



    // Extract files from the response
    const files = response.data.files || [];

    // Add CORS headers
    return NextResponse.json(
      { files },
      {
        headers: {
          'Access-Control-Allow-Origin': '*', // Allow all origins (or specify your frontend URL)
          'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        },
      }
    );
  } catch (error) {

    console.error("Error fetching files:", error);

    return NextResponse.json(
      { error: "Failed to fetch files" },
      {
        status: 500,
        headers: {
          'Access-Control-Allow-Origin': '*', // Allow all origins (or specify your frontend URL)
          'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        },
      }
    );
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*', // Allow all origins (or specify your frontend URL)
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}