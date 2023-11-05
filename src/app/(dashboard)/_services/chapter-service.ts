import Mux from "@mux/mux-node"
import getSession, { getCurrentUser } from "@/lib/auth"
import { prisma } from "@/lib/db"
import { ChapterFormValues } from "./actions"

const { Video } = new Mux(
  process.env.MUX_TOKEN_ID!,
  process.env.MUX_TOKEN_SECRET!,
)


export async function getChapters() {

  const found = await prisma.chapter.findMany({
    orderBy: {
      createdAt: 'desc'
    },
  })

  return found;
}

export async function getChapter(id: string) {

  const found = await prisma.chapter.findUnique({
    where: {
      id
    },
    include: {
      muxData: true,
    }
  })

  return found
}

export async function createChapter(courseId: string, title: string) {

  const session= await getSession()
  if (!session) throw new Error(`Session not found`)

  const userId= session.user.id

  const courseOwner = await prisma.course.findUnique({
    where: {
      id: courseId,
      userId,
    }
  })

  if (!courseOwner) {
    throw new Error(`Course owner not found with id: ${courseId}`)
  }

  const lastChapter = await prisma.chapter.findFirst({
    where: {
      courseId,
    },
    orderBy: {
      position: "desc",
    },
  })

  const newPosition = lastChapter ? lastChapter.position + 1 : 1

  const created = await prisma.chapter.create({
    data: {
      title,
      courseId,
      position: newPosition,
    }
  })

  return created
}

export async function updateChapter(chapterId: string, data: ChapterFormValues) {

  const currentUser= await getCurrentUser()
  if (!currentUser) throw new Error(`User not found`)

  const userId= currentUser.id

  const chapter = await prisma.chapter.findUnique({
    where: {
      id: chapterId,
    },
    select: {
      courseId: true,
    }
  })

  if (!chapter) {
    throw new Error(`Chapter not found with id: ${chapterId}`)
  }

  const courseOwner = await prisma.course.findUnique({
    where: {
      id: chapter.courseId,
      userId,
    }
  })

  if (!courseOwner) {
    throw new Error(`Course owner not found with id: ${chapter.courseId}`)
  }

  if (data.videoUrl) {
    await processVideo(data.videoUrl, chapterId)
  }
  
  const updated = await prisma.chapter.update({
    where: {
      id: chapterId
    },
    data,
  })

  return updated
  
}

export async function deleteVideoOnMux(chapterId: string) {

  console.log("deleteVideoOnMux");
  

  const existingMuxData = await prisma.muxData.findFirst({
    where: {
      chapterId,
    }
  })

  if (existingMuxData) {
    try {
      await Video.Assets.del(existingMuxData.assetId);
    } catch (error) {
      console.log("Error deleting video on Mux")
      console.log(error)
    }   

    await prisma.muxData.delete({
      where: {
        id: existingMuxData.id,
      }
    })
  }
}

export async function processVideo(videoUrl: string, chapterId: string) {

  deleteVideoOnMux(chapterId)

  const asset = await Video.Assets.create({
    input: videoUrl,
    playback_policy: "public",
    test: false,
  })

  const created= await prisma.muxData.create({
    data: {
      chapterId,
      assetId: asset.id,
      playbackId: asset.playback_ids?.[0]?.id,
    }
  })

  return created
}


export async function eliminateChapter(id: string) {

  const currentUser= await getCurrentUser()
  if (!currentUser) throw new Error(`User not found`)

  const chapterToDelete = await prisma.chapter.findUnique({
    where: {
      id,
    },
    select: {
      courseId: true,
    }
  })

  const ownCourse = await prisma.course.findUnique({
    where: {
      id: chapterToDelete?.courseId,
      userId: currentUser.id,
    }
  })

  if (!ownCourse) {
    throw new Error(`Sin autorización para eliminar el curso con id: ${id}`)
  }

  await deleteVideoOnMux(id)

  const deleted= await prisma.chapter.delete({
    where: {
      id
    },
  })

  const publishedChaptersInCourse = await prisma.chapter.findMany({
    where: {
      courseId: deleted.courseId,
      isPublished: true,
    }
  })

  if (!publishedChaptersInCourse.length) {
    await prisma.course.update({
      where: {
        id: deleted.courseId,
      },
      data: {
        isPublished: false,
      }
    })
  }

  return deleted
}

export async function publishChapter(id: string) {
  
  const chapter = await prisma.chapter.findUnique({
    where: {
      id: id,
    }
  });

  const muxData = await prisma.muxData.findUnique({
    where: {
      chapterId: chapter?.id,
    }
  });

  if (!chapter || !muxData || !chapter.title || !chapter.description || !chapter.videoUrl) {
    throw new Error("No se puede publicar un capítulo sin título, descripción o video")
  }

  const published= await prisma.chapter.update({
    where: {
      id
    },
    data: {
      isPublished: true
    },
  })

  return published
}

export async function unpublishChapter(id: string) {
  
  const unpublishedChapter = await prisma.chapter.update({
    where: {
      id,
    },
    data: {
      isPublished: false,
    }
  });

  const publishedChaptersInCourse = await prisma.chapter.findMany({
    where: {
      courseId: unpublishedChapter.courseId,
      isPublished: true,
    }
  });

  if (!publishedChaptersInCourse.length) {
    await prisma.course.update({
      where: {
        id: unpublishedChapter.courseId,
      },
      data: {
        isPublished: false,
      }
    });
  }

  return unpublishedChapter
}

export type ChapterOrder = {
  id: string
  position: number
}
export async function reorder(courseId: string, list: ChapterOrder[]) {
  
  const session= await getSession()
  if (!session) throw new Error(`Session not found`)

  const userId= session.user.id

  const courseOwner = await prisma.course.findUnique({
    where: {
      id: courseId,
      userId,
    }
  })

  if (!courseOwner) {
    throw new Error(`Course owner not found with id: ${courseId}`)
  }

  for (let item of list) {
    await prisma.chapter.update({
      where: { id: item.id },
      data: { position: item.position }
    })
  }

  return true
}

export async function progress(isCompleted: boolean, chapterId: string) {

  const currentUser= await getCurrentUser()

  const userId= currentUser?.id?? "preview"

  const userProgress = await prisma.userProgress.upsert({
    where: {
      userId_chapterId: {
        userId,
        chapterId,
      }
    },
    update: {
      isCompleted
    },
    create: {
      userId,
      chapterId,
      isCompleted,
    }
  })

  return userProgress
}