import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

export const ourFileRouter = {
    imageUploader: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
        .onUploadComplete(async ({ metadata, file }) => {
            console.log("✅ Upload complete:", file.url);
            return { uploadedBy: "admin" };
        }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;