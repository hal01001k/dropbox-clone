import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export async function generateDownloadUrl(fileName: string, expiresIn: number = 3600) {
  try {
    // Validate environment variables
    if (!process.env.S3_BUCKET || !process.env.S3_REGION || !process.env.S3_ACCESS_KEY || !process.env.S3_SECRET_KEY) {
      throw new Error("Missing required environment variables for S3 configuration.");
    }

    // Validate file name
    if (!fileName || typeof fileName !== "string") {
      throw new Error("File name is required and must be a string.");
    }

    // Initialize S3 client with the correct endpoint
    const client = new S3Client({
      region: process.env.S3_REGION, // Ensure this is set to "eu-west-1"
      endpoint: process.env.S3_ENDPOINT, // Explicitly set the endpoint
      credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY,
        secretAccessKey: process.env.S3_SECRET_KEY,
      },
      forcePathStyle: true,
    });

    // Construct the file key (path in the bucket)
    const fileKey = fileName;

    // Create a command for getting the object
    const command = new GetObjectCommand({
      Bucket: process.env.S3_BUCKET,
      Key: fileKey,
      ResponseContentDisposition: `attachment; filename="${encodeURIComponent(fileName)}"`, // Forces download with the original filename
    });

    // Generate a presigned URL for download
    const presignedUrl = await getSignedUrl(client, command, { expiresIn });

    return {
      success: true,
      downloadUrl: presignedUrl,
      fileName,
      expiresAt: new Date(Date.now() + expiresIn * 1000).toISOString(), // Expiration time in ISO format
    };
  } catch (error) {
    console.error("Error generating download URL:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}