"use server";
import { S3Client } from "@aws-sdk/client-s3";
import { createPresignedPost } from "@aws-sdk/s3-presigned-post";
import { nanoid } from "nanoid";

export async function onSubmit(formData: FormData) {
    try {
        // Validate environment variables
        if (!process.env.S3_BUCKET || !process.env.S3_ENDPOINT || !process.env.S3_REGION || !process.env.S3_ACCESS_KEY || !process.env.S3_SECRET_KEY) {
            throw new Error("Missing required environment variables for S3 configuration.");
        }

        const client = new S3Client({
            region: process.env.S3_REGION,
            endpoint: process.env.S3_ENDPOINT,
            credentials: {
                accessKeyId: process.env.S3_ACCESS_KEY,
                secretAccessKey: process.env.S3_SECRET_KEY,
            },
        });

        // Generate a unique filename
        const key = nanoid();

        // Create a presigned post URL
        const { url, fields } = await createPresignedPost(client, {
            Bucket: process.env.S3_BUCKET,
            Key: key,
            Expires: 3600, // URL expires in 1 hour
            Conditions: [["content-length-range", 0, 10485760]], // Limit file size (10MB)
        });

        // Get the file from formData
        const file = formData.get("file") as Blob | null;
        if (!file) {
            throw new Error("No file provided for upload.");
        }

        // Prepare FormData for the S3 upload
        const formDataS3 = new FormData();
        Object.entries(fields).forEach(([key, value]) => {
            formDataS3.append(key, value as string);
        });
        formDataS3.append("file", file);

        // Upload file to S3
        const uploadResponse = await fetch(url, {
            method: "POST",
            body: formDataS3,
        });

        if (uploadResponse.ok) {
            console.log("File uploaded successfully:", key);
            return { success: true, key };
        } else {
            const errorText = await uploadResponse.text();
            console.error("Failed to upload file:", errorText);
            throw new Error("Upload failed");
        }
    } catch (err) {
        console.error("Error in file upload:", err);
        return { success: false, error: err instanceof Error ? err.message : "Unknown error" };
    }
}
