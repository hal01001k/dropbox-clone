// src/app/api/download/route.ts
import { generateDownloadUrl } from "@/app/action/onSave";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { fileName } = await request.json();

    if (!fileName) {
      return NextResponse.json(
        { success: false, error: "File name is required" },
        { status: 400 }
      );
    }

    const result = await generateDownloadUrl(fileName);

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error in API route:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}