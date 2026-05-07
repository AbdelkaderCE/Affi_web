import { v2 as cloudinary } from "cloudinary";

const cloudName = process.env["CLOUDINARY_CLOUD_NAME"];
const apiKey = process.env["CLOUDINARY_API_KEY"];
const apiSecret = process.env["CLOUDINARY_API_SECRET"];

export const cloudinaryEnabled =
  Boolean(cloudName) && Boolean(apiKey) && Boolean(apiSecret);

if (cloudinaryEnabled) {
  cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret,
    secure: true,
  });
}

export async function uploadToCloudinary(
  buffer: Buffer,
  originalName: string,
): Promise<string> {
  return new Promise((resolve, reject) => {
    const folder = "curated-uploads";
    const publicId = `${Date.now()}-${Math.round(Math.random() * 1e6)}`;

    cloudinary.uploader
      .upload_stream(
        {
          folder,
          public_id: publicId,
          resource_type: "image",
          format: "webp",
          transformation: [{ quality: "auto", fetch_format: "auto" }],
          original_filename: originalName,
        },
        (err, result) => {
          if (err || !result) return reject(err ?? new Error("Upload failed"));
          resolve(result.secure_url);
        },
      )
      .end(buffer);
  });
}
