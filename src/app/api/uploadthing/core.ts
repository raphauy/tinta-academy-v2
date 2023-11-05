import { createUploadthing, type FileRouter } from "uploadthing/next"

import { isTeacher } from "@/lib/teacher"
import { getCurrentUser } from "@/lib/auth"
 
const f = createUploadthing()
 
async function handleAuth() {
  const user= await getCurrentUser()
  if (!user) throw new Error("Unauthorized")

  const isAuthorized = isTeacher(user.role)

  if (!isAuthorized) throw new Error("Unauthorized")

  return { userId: user.id }
}

export const ourFileRouter = {
  courseImage: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(() => handleAuth())
    .onUploadComplete(() => {}),
  courseAttachment: f(["text", "image", "video", "audio", "pdf"])
    .middleware(() => handleAuth())
    .onUploadComplete(() => {}),
  chapterVideo: f({ video: { maxFileCount: 1, maxFileSize: "512GB" } })
    .middleware(() => handleAuth())
    .onUploadComplete(() => {})
} satisfies FileRouter
 
export type OurFileRouter = typeof ourFileRouter